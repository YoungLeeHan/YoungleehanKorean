import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        review: { type: String, required: true, maxlength: 160 },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Product is required"],
        },
        rating: { type: Number, required: true },
        imagePath: [{ type: String }],
    },

    { collection: "reviews", timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
