import Product from "../models/product.js";
import Review from "../models/review.js";
import User from "../models/User.js";
import fs from "fs";
import slugify from "slugify";

export const reviewCreate = async (req, res) => {
    try {
        const temp = {
            review: req.body.review,
            productId: req.body.productId,
        };

        const userInfo = await User.findOne({ _id: req.body._id }).exec();

        if (!userInfo) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        temp.author = userInfo._id;
        const newReview = new Review(temp);
        await newReview.save();

        await Product.findOneAndUpdate(
            { _id: req.body.productId },
            { $inc: { reviewNum: 1 } }
        ).exec();

        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
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
