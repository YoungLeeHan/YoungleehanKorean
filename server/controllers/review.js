import Product from "../models/product.js";
import Review from "../models/review.js";
import User from "../models/User.js";

export const reviewCreate = async (req, res) => {
    try {
        const temp = {
            review: req.body.review,
            productId: req.body.productId,
        };

        const author = await User.findOne({ _id: req.body._id }).exec();

        if (!author) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }

        temp.author = author._id;
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
        const all = await Review.find({}).sort("-created");
        res.json(all);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

export const reviewUpdate = async (req, res) => {
    const { reviewId } = req.params;

    try {
        const existingReview = await Review.findById(reviewId);
        if (!existingReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        const { review, productId } = req.body;

        if (review) {
            existingReview.review = review;
        }

        if (productId) {
            existingReview.productId = productId;
        }

        await existingReview.save();

        return res.status(200).json({ message: "Review updated successfully" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const reviewRemove = async (req, res) => {
    const { reviewId } = req.params;

    try {
        const removed = await Review.findByIdAndDelete(reviewId);
        res.json(removed);
    } catch (err) {
        return res.status(400).json(err.message);
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
