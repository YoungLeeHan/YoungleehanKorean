import blogComment from "../models/BlogComment.js";
import mongoose from "mongoose";

const validateMongodbId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new Error("The id is not valid or found");
};

export const create = async (req, res) => {
    console.log("create comment");

    const user = req.user;
    const { postId, description } = req.body;
    try {
        const comment = await blogComment.create({
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
    try {
        const all = await blogComment.find({}).sort("-created");
        res.json(all);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

export const read = async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const comment = await blogComment.findById(id);
        res.json(comment);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

export const update = async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);

    try {
        const update = await blogComment.findByIdAndUpdate(
            id,
            {
                post: req.body?.postId,
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
        return res.status(400).json(err.message);
    }
};

export const remove = async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);

    try {
        const removed = await blogComment.findByIdAndDelete(id);
        res.json(removed);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

export const like = async (req, res) => {
    const { id } = req.body;
    const comment = await blogComment.findById(id);

    const loginUserId = req?.user?._id;
    const isLiked = comment?.isLiked;

    if (isLiked) {
        const comment = await blogComment.findByIdAndUpdate(
            postId,
            {
                $pull: { likes: loginUserId },
                isLiked: false,
            },
            { new: true }
        );
        res.json(comment);
    } else {
        //add to likes
        const comment = await blogComment.findByIdAndUpdate(
            postId,
            {
                $push: { likes: loginUserId },
                isLiked: true,
            },
            { new: true }
        );
        res.json(comment);
    }
};
