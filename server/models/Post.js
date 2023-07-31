import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
});

export default mongoose.model("Post", postSchema);