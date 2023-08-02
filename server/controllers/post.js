import Post from "../models/Post.js";
import slugify from "slugify";
import fs from "fs";
import Product from "../models/product.js";

export const create = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.fields);
        // console.log(req.files);
        const { title, category, description } = req.fields;
        const { images } = req.files;

        switch (true) {
            case !title.trim():
                return res.json({ error: "title is required" });
            case images && images.size > 1000000:
                return res.json({ error: "Image should be less than 1mb in size" });
            case !category.trim():
                return res.json({ error: "Category is required" });
            case !description.trim():
                return res.json({ error: "Description is required" });
        }
        // create product
        const post = new Post({ ...req.fields, slug: slugify(title) });

        if (images) {
            product.images.data = fs.readFileSync(images.path);
            product.images.contentType = images.type;
        }
        await post.save();
        res.json(post);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};


export const list = async (req, res) => {
    try {
        const posts = await Product.find({})
            .populate("category")
            .select("-images")
            .limit(12)
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (err) {
        console.log(err);
    }
};

export const read = async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug })
            .select("-images")
            .populate("category");

        res.json(posts);
    } catch (err) {
        console.log(err);
    }
};

export const images = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).select(
            "images"
        );
        if (post.images.data) {
            res.set("Content-Type", post.images.contentType);
            return res.send(post.images.data);
        }
    } catch (err) {
        console.log(err);
    }
};

export const remove = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(
            req.params.postId
        ).select("-images");
        res.json(post);
    } catch (err) {
        console.log(err);
    }
};



export const update = async (req, res) => {
    try {
        const { title, description, category } = req.fields;
        const { images } = req.files;

        // validation
        switch (true) {
            case !title.trim():
                res.json({ error: "Title is required" });
            case !description.trim():
                res.json({ error: "Description is required" });
            case !category.trim():
                res.json({ error: "Category is required" });
            case images && images.size > 2000000:
                res.json({ error: "Image should be less than 1mb in size" });
        }

        // update product
        const post = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                ...req.fields,
                slug: slugify(title),
            },
            { new: true }
        );

        if (images) {
            post.images.data = fs.readFileSync(images.path);
            post.images.contentType = images.type;
        }

        await post.save();
        res.json(post);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};


export const postSearch = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await Post.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        }).select("-images");

        res.json(results);
    } catch (err) {
        console.log(err);
    }
};