import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import postRoutes from "./routes/post.js";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import authGoogle from "./routes/authGoogle.js";
import indexGoogle from "./routes/indexGoogle.js";
import path from "path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
import configurePassport from "./controllers/google.js";

dotenv.config();

const app = express();

const applyCOOP = (req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "cross-origin"); // 또는 다른 COOP 정책 값을 사용할 수 있습니다.
    next();
};
app.use(applyCOOP);
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/image", express.static("./image"));
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", postRoutes);
app.use("/auth", authGoogle);
app.use("/index", indexGoogle);

//db
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB ERROR => ", err));

// Express 세션 미들웨어 설정
const sessionStore = MongoStore.create({ mongoUrl: process.env.MONGO_URI });

app.use(
    session({
        secret: "keyboard siba",
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
    })
);

configurePassport(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.render("login"); // views 디렉토리의 index.ejs를 렌더링
    console.log(`여기는 "localhost ${port}/"입니다!`); // 이 줄은 콘솔에 출력되지만 응답으로 보내지 않습니다.
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Node server is running on port ${port}`);
});
