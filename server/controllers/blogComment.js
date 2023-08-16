<<<<<<< HEAD
import BlogComment from "../models/BlogComment.js";
import { validateMongodbId } from "../helpers/validateMongodbID.js";
=======
import blogComment from "../models/blogComment.js";
import BlogPost from "../models/BlogPost.js";
import mongoose from "mongoose";

const validateMongodbId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new Error("The id is not valid or found");
};
>>>>>>> ff6bb10 (chore: for pulling)

export const create = async (req, res) => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
    console.log("create comment");

>>>>>>> f394049 (chore: .)
    const user = req.user;
    const { postId, description } = req.body;
    try {
        const comment = await BlogComment.create({
            post: postId,
=======
    const user = req.user;
    const { postId, description } = req.body;
    try {
        validateMongodbId(postId);

        const post = await BlogPost.findOne({ _id: postId });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comment = await blogComment.create({
            post: post._id,
>>>>>>> ff6bb10 (chore: for pulling)
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
        const all = await BlogComment.find({ post: postId }).sort("-created");
        res.json(all);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};


<<<<<<< HEAD
=======
export const read = async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const comment = await BlogComment.findById(id);
        res.json(comment);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

>>>>>>> f394049 (chore: .)
export const update = async (req, res) => {
    const { id } = req.params;
<<<<<<< HEAD
    validateMongodbId(id);

    try {
        const existingComment = await BlogComment.findById(id);
        if (!existingComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const update = await BlogComment.findByIdAndUpdate(
            id,
            {
=======
    // validateMongodbId(id);

    try {
        const update = await blogComment.findByIdAndUpdate(
            id,
            {
                post: req.body?.postId,
>>>>>>> ff6bb10 (chore: for pulling)
                user: req?.user,
                description: req?.body?.description,
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

<<<<<<< HEAD

=======
>>>>>>> ff6bb10 (chore: for pulling)
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

<<<<<<< HEAD

export const like = async (req, res) => {

    const { id } = req.body;
    const comment = await BlogComment.findById(id)

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


=======
export const like = async (req, res) => {
    const { commentId } = req.body;
    try {
        validateMongodbId(commentId);

        const comment = await blogComment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        const loginUserId = req?.user?._id;
        if (comment.likes.includes(loginUserId)) {
            comment.likes.pull(loginUserId); // Remove the loginUserId from the array
        } else {
            comment.likes.push(loginUserId); // Add the loginUserId to the array
        }

        comment.isLiked = comment.likes.includes(loginUserId);
        await comment.save(); // Save the updated comment

        res.json(comment);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};
>>>>>>> ff6bb10 (chore: for pulling)
