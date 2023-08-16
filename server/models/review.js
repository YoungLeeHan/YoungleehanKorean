import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = new mongoose.Schema(
    {
        review: { type: String, trim: true, required: true, maxlength: 160 },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        productId: { type: ObjectId, ref: "Product", required: false },
    },

    { collection: "reviews", timestamps: true }
);

export default mongoose.model("Review", reviewSchema);

// productId: { type: mongoose.Schema.Types.ObjectId },
