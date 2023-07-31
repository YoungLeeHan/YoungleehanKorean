import mongoose from "mongoose";
const { Schema } = mongoose;

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
        address: {
            type: String,
            trim: true,
        },
        role: {
            type: Number,
            default: 0,
        },
        googleId: {
            type: String,
            required: true,
        },
        displayName: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
