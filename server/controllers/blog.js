import BlogPost from "../models/BlogPost.js";

export const create = async (req, res) => {
    try {
        const { title, category, value } = req.fields;

        // validation
        switch (true) {
            case !title.trim():
                return res.json({ error: "title is required" });
            case !category.trim():
                return res.json({ error: "Category is required" });
            case !value.trim():
                return res.json({ error: "Content is required" });
        }
        // create post
        const post = await new BlogPost({ ...req.fields }).save();
        res.json(post);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

export const list = async (req, res) => {
    try {
        const posts = await BlogPost.find({})
            .populate("category")
            .limit(12)
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        console.log(err);
    }
};
