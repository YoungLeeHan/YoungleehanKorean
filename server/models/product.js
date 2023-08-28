import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        title: { type: String, trim: true, required: true, maxlength: 160 },
        slug: { type: String, lowercase: true },
        // prev img
        images: { data: Buffer, contentType: String },
        // new img
        // thumbnail: { type: String },
        uploadedImagesPath: [{ type: String }],
        //
        category: { type: ObjectId, ref: "Category", required: true },
        ageCategory: { type: ObjectId, ref: "ageCategory", required: true },
        description: { type: {}, required: true, maxlength: 2000 },
        price: { type: Number, required: true },
        reviewRate: {
            type: Number,
            required: false,
            default: 0,
            get: (value) => value.toFixed(2),
            set: (value) => parseFloat(value.toFixed(2)),
        },
        reviewNumber: {
            type: Number,
            required: false,
            default: 0,
        },
        numberSold: { type: Number, required: false, default: 0 },
        createdAt: { type: Date, default: Date.now, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);
