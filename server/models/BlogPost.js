import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const blogPostSchema = new mongoose.Schema(
    {
        title: { type: String, trim: true, required: true, maxlength: 160 },
        category: { type: ObjectId, ref: "BlogCategory", required: true },
        value: { type: String, required: true, maxlength: 5000 },
        createdAt: { type: Date, default: Date.now, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("BlogPost", blogPostSchema);
