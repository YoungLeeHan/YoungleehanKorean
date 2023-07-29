import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true, maxlength: 160 },
    slug: { type: String, lowercase: true },
    images: { data: Buffer, contentType: String },
    category: { type: ObjectId, ref: "Category", required: true },
    age: { type: String, trim: true, required: true, maxlength: 160 },
    description: { type: {}, required: true, maxlength: 2000 },
    price: { type: Number, default: 0 },
    reviewRate: { type: Number, required: false },
    reviewNumber: { type: Number, required: false },
    numberSold: { type: Number, required: false },
    createdAt: { type: Date, default: Date.now, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

// price: { type: Number, trim: true, required: true },
