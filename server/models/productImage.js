import mongoose from "mongoose";

const productImageSchema = new mongoose.Schema({
    imgUrl: {
        type: String,
    },
});

export default mongoose.model("productImage", productImageSchema);