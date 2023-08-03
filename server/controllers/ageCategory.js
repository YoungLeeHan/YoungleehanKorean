import ageCategory from "../models/ageCategory.js";
import slugify from "slugify";

export const create = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name.trim()) {
            return res.json({ error: "Name is required" });
        }
        const existingCategory = await ageCategory.findOne({ name });
        if (existingCategory) {
            return res.json({ error: "Already exists" });
        }

        const category = await new ageCategory({
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
        const { ageCategoryId } = req.params;
        const category = await ageCategory.findByIdAndUpdate(
            ageCategoryId,
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
        const removed = await ageCategory.findByIdAndDelete(
            req.params.ageCategoryId
        );
        res.json(removed);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

export const list = async (req, res) => {
    try {
        const all = await ageCategory.find({});
        res.json(all);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

export const read = async (req, res) => {
    try {
        const category = await ageCategory.findOne({ slug: req.params.slug });
        res.json(category);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};
