import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: true,
        },
        lastName: {
            type: String,
            trim: true,
            required: true,
        },
        images: {
            type: String,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 64,
        },
        country: {
            type: String,
            trim: true,
        },
        address1: {
            type: String,
            trim: true,
        },
        address2: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        state: {
            type: String,
            trim: true,
        },
        zipcode: {
            type: String,
            trim: true,
            min: 5,
            max: 5,
        },
        role: {
            type: Number,
            default: 0,
        },
        googleId: {
            type: String,
            required: true,
            default: "Default Google ID",
        },
        displayName: { type: String, required: true, default: "Default Name" },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
