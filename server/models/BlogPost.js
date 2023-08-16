import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema;

const blogPostSchema = new mongoose.Schema(
    {
        title: {type: String, trim: true, required: true, maxlength: 160},
        category: {type: ObjectId, ref: "BlogCategory", required: true},
        value: {type: String, required: true, maxlength: 5000},
        createdAt: {type: Date, default: Date.now, required: true},
        author: {type: ObjectId, ref: "User"},
        images: {data: Buffer, contentType: String},
        slug: {type: String, lowercase: true},
    },
    {
        toJSON: {virtuals: true,},
        toObject: {virtuals: true,},
        timestamps: true,
}
);

//populate comments
blogPostSchema.virtual("comments", {
        ref: "BlogComment",
        foreignField: "BlogPost",
        localField: "_id",
});

export default mongoose.model("BlogPost", blogPostSchema);
