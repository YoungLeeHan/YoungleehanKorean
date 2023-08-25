import mongoose from "mongoose";
const { Schema, model } = mongoose;

const singleFileSchema = new Schema(
    {
        fileName: {
            type: String,
            required: true,
        },
        filePath: {
            type: String,
            required: true,
        },
        fileType: {
            type: String,
            required: true,
        },
        fileSize: {
            type: String,
            required: true,
        },
        review: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    },
    { timestamps: true }
);

export default model("SingleFile", singleFileSchema);
