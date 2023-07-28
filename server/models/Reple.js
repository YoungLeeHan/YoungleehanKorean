const mongoose = require("mongoose");

const repleSchema = new mongoose.Schema(
  {
    reple: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { collection: "reples", timestamps: true }
);

const Reple = mongoose.model("Reple", repleSchema);

module.exports = { Reple };
