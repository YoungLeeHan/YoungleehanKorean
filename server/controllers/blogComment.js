import BlogComment from "../models/BlogComment.js";
import { validateMongodbId } from "../helpers/validateMongodbID.js";

export const create = async (req, res) => {
    const user = req.user;
    const { postId, description } = req.body;
    try {
        const comment = await BlogComment.create({
            post: postId,
            user,
            description,
        });
        res.json(comment);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
};

export const list = async (req, res) => {
    const { postId } = req.params;
    try {
        const all = await BlogComment.find({ post: postId })
            .populate("user", ["firstName", "lastName"])
            .sort({
                createdAt: -1,
            });

        // process data to send only first letter of lastName
        all.forEach((comment) => {
            if (comment.user && comment.user.lastName) {
                comment.user.lastName = comment.user.lastName.charAt(0);
            }
        });
        res.json(all);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

export const update = async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);

    try {
        const existingComment = await BlogComment.findById(id);
        if (!existingComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        const update = await BlogComment.findByIdAndUpdate(
            id,
            {
                user: req?.user,
                description: req?.body?.newDescription,
            },
            {
                new: true,
                runValidators: true,
            }
        );
        res.json(update);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

export const remove = async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);

    try {
        const removed = await BlogComment.findByIdAndDelete(id);
        res.json(removed);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

export const like = async (req, res) => {
    const { id } = req.body;
    const comment = await BlogComment.findById(id);

    const loginUserId = req?.user?._id;
    const isLiked = comment?.isLiked;

    if (isLiked) {
        const comment = await BlogComment.findByIdAndUpdate(
            id,
            {
                $pull: { likes: loginUserId },
                isLiked: false,
            },
            { new: true }
        );
        res.json(comment);
    } else {
        //add to likes
        const comment = await BlogComment.findByIdAndUpdate(
            id,
            {
                $push: { likes: loginUserId },
                isLiked: true,
            },
            { new: true }
        );
        res.json(comment);
    }
};
