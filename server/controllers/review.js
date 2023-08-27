import Product from "../models/product.js";
import Review from "../models/review.js";
import { validateMongodbId } from "../helpers/validateMongodbID.js";

export const reviewCreate = async (req, res) => {
    const user = req.user;
    const uploadedImages = req.files;
    const { review, productId, rating } = req.body;

    try {
        const uploadedImagesPath = uploadedImages.map((img) => img.path);

        const newReview = await Review.create({
            product: productId,
            user,
            review,
            rating,
            uploadedImagesPath: uploadedImagesPath,
        });

        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
};

export const reviewList = async (req, res) => {
    const { productId } = req.params;
    try {
        const all = await Review.find({ product: productId })
            .populate("user", ["firstName", "lastName"])
            .sort({
                createdAt: -1,
            });

        all.forEach((review) => {
            if (review.user && review.user.lastName) {
                review.user.lastName = review.user.lastName.charAt(0);
            }
        });
        res.json(all);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

export const reviewUpdate = async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);

    try {
        const existingReview = await Review.findById(id);

        if (!existingReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        const uploadedImagesPath = req?.files?.map((file) => file.path);
        const update = await Review.findByIdAndUpdate(
            id,
            {
                user: req?.user,
                review: req?.body?.newReview,
                rating: req?.body?.rating,
                uploadedImagesPath: uploadedImagesPath,
            },
            {
                new: true,
                runValidators: true,
            }
        );
        res.json(update);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const reviewRemove = async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);

    try {
        const removed = await Review.findByIdAndDelete(id);
        res.json(removed);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};
