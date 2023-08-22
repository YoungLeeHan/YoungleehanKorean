// Import necessary modules and packages
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import path from "path";

// Import custom routes
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import reviewRoutes from "./routes/review.js";
import checkoutRoutes from "./routes/checkout.js";
import userOrderRoutes from "./routes/userOrder.js";
import configurePassport from "./controllers/google.js";
import blogCommentRoutes from "./routes/blogComment.js";
import blogCategoryRoutes from "./routes/blogCategory.js";
import blogPostRoutes from "./routes/blogPost.js";
import authGoogle from "./routes/authGoogle.js";
import indexGoogle from "./routes/indexGoogle.js";
import ageCategoryRoutes from "./routes/ageCategory.js";

// Load environment variables
dotenv.config();

// Create Express application & Set the directory path for the current file
const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

//이 세션이 아래 passport middleware보다 전에 위치해야함! 주의!!
app.use(
    session({
        secret: "keyboard-siba",
        resave: false,
        saveUninitialized: false,
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

const applyCOOP = (req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "cross-origin");
    next();
};

// middlewares
app.use(applyCOOP);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("/views", path.join(__dirname, "views"));
app.use("/image", express.static("./image"));
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", ageCategoryRoutes);
app.use("/api", productRoutes);
app.use("/api/blog/comment", blogCommentRoutes);
app.use("/api/blog/category", blogCategoryRoutes);
app.use("/api/blog", blogPostRoutes);
app.use("/api", reviewRoutes);
app.use("/api", checkoutRoutes);
app.use("/api", userOrderRoutes);

app.use("/auth", authGoogle);
app.use("/index", indexGoogle);

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

// Passport 설정을 configurePassport 함수로 이동
configurePassport(passport);

app.get("/", (req, res) => {
    res.render("login");
    // console.log(`여기는 "localhost ${port}/"입니다!`);
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Node server is running on port ${port}`);
});
