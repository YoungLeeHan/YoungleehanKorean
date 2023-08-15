import mongoose from "mongoose";

const blogCommentSchema = new mongoose.Schema({
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BlogPost",
            required: [true, "Post is required"],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Logged in User only able to write"]
        },
        description: {
            type: String,
            required: true,
        },
        isLiked: {
            type: Boolean,
            default: false,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    }, { timestamps: true }
);

export default mongoose.model("blogComment", blogCommentSchema);
