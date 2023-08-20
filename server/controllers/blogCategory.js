import BlogCategory from "../models/BlogCategory.js";
import slugify from "slugify";

export const create = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name.trim()) {
            return res.json({ error: "Name is required" });
        }
        const existingCategory = await BlogCategory.findOne({ name });
        if (existingCategory) {
            return res.json({ error: "Already exists" });
        }

        const category = await new BlogCategory({
            name,
            slug: slugify(name),
        }).save();
        res.json(category);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
};

export const update = async (req, res) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params;
        // console.log(name, categoryId);
        const category = await BlogCategory.findByIdAndUpdate(
            categoryId,
            {
                name,
                slug: slugify(name),
            },
            { new: true }
        );
        res.json(category);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

export const remove = async (req, res) => {
    try {
        const removed = await BlogCategory.findByIdAndDelete(
            req.params.categoryId
        );
        res.json(removed);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

export const list = async (req, res) => {
    try {
        const all = await BlogCategory.find({});
        res.json(all);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

export const read = async (req, res) => {
    try {
        const category = await BlogCategory.findOne({ slug: req.params.slug });
        res.json(category);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};
