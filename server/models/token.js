import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 360 },
});

export default mongoose.model("Token", tokenSchema);
