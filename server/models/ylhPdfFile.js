import mongoose from "mongoose";

const ylhPdfFileSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
  },
  location: {
    type: String,
  },
});

export default mongoose.model("ylhPdfFile", ylhPdfFileSchema);
