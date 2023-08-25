import mongoose from "mongoose";
const { Schema, model } = mongoose;

const multipleFileSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        files: [Object],
        review: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    },
    { timestamps: true }
);

export default model("MultipleFile", multipleFileSchema);
