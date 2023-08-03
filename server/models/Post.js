import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

        title: {
            type: String,
            required: [true, "Post title is required"],
            // trim: true,
        },
        //Created by only category
        category: {
            type: String,
            required: [true, "Post category is required"],
        },
        isLiked: {
            type: Boolean,
            default: false,
        },
        isDisLiked: {
            type: Boolean,
            default: false,
        },
        numViews: {
            type: Number,
            default: 0,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User",
        //     required: [true, "Author is required"],
        // },
        description: {
            type: String,
            required: [true, "Post description is required"],
        },
        image: {
            type: String,
            default:
            "https://img.freepik.com/free-photo/learn-korean-language-online-education-concept_53876-132635.jpg?w=1380&t=st=1690952342~exp=1690952942~hmac=846d80494428eba1c5a467cb35c6b5e39d5dab73473cab3017465dbcc8bb5a41",
    },
        createdAt: { type: Date, default: Date.now, required: true },
    },
    {
        toJSON: {
    //         virtuals: true,
    //     },
    //     toObject: {
    //         virtuals: true,
    //     },
        timestamps: true,
    }}
    );


export default mongoose.model("Post", postSchema);