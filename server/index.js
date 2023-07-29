import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import product from "./routes/product.js";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB ERROR => ", err));

// middlewares
app.use(cors());
app.use(express.json());
app.use("/image", express.static("./image"));

app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", product);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Node server is running on port ${port}`);
});
