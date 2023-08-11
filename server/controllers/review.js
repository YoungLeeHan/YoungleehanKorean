import Product from "../models/product.js";
import fs from "fs";
import slugify from "slugify";

export const reviewCreate = async (req, res) => {
    try {
        const {
            title,
            category,
            ageCategory,
            description,
            price,
            downloadUrl,
        } = req.fields;
        const { images } = req.files;

        // validation
        switch (true) {
            case !title.trim():
                return res.json({ error: "title is required" });
            case images && images.size > 1000000:
                return res.json({
                    error: "Image should be less than 1mb in size",
                });
            case !category.trim():
                return res.json({ error: "Category is required" });
            case !ageCategory.trim():
                return res.json({ error: "Age category is required" });
            case !description.trim():
                return res.json({ error: "Description is required" });
            case !price.trim():
                return res.json({ error: "Price is required" });
            case !downloadUrl.trim():
                return res.json({ error: "DownloadUrl is required" });
        }
        // create product
        const product = new Product({ ...req.fields, slug: slugify(title) });

        if (images) {
            product.images.data = fs.readFileSync(images.path);
            product.images.contentType = images.type;
        }

        await product.save();
        res.json(product);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

export const reviewList = async (req, res) => {
    try {
        const products = await Product.find({})
            .populate("category")
            .select("-images -downloadUrl")
            .limit(12)
            .sort({ createdAt: -1 });

        res.json(products);
    } catch (err) {
        console.log(err);
    }
};

export const reviewImages = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).select(
            "images"
        );
        if (product.images.data) {
            res.set("Content-Type", product.images.contentType);
            return res.send(product.images.data);
        }
    } catch (err) {
        console.log(err);
    }
};

export const reviewRemove = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(
            req.params.productId
        ).select("-images -downloadUrl");
        res.json(product);
    } catch (err) {
        console.log(err);
    }
};

export const reviewUpdate = async (req, res) => {
    try {
        const { title } = req.body;
        const { productId } = req.params;
        const product = await product.findByIdAndUpdate(
            productId,
            {
                title,
                slug: slugify(title),
            },
            { new: true }
        );
        res.json(product);
    } catch (err) {
        return res.status(500).json(err.message);
    }
};
