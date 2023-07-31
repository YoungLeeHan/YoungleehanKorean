import Post from "../models/Post.js";
import slugify from "slugify";

export const create = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title.trim()) {
            return res.status(400).json({ error: "Title is required" });
        }
        const post = await new Post({ title, slug: slugify(title) }).save();
        res.json(post);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Failed to create the post" });
    }
};