import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import postRoutes from "./routes/post.js";
import blogCategoryRoutes from "./routes/blogCategory.js";
import blogPostRoutes from "./routes/blogPost.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const applyCOOP = (req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "cross-origin"); // 또는 다른 COOP 정책 값을 사용할 수 있습니다.
    next();
};

// COOP 미들웨어를 애플리케이션에 적용합니다.
app.use(applyCOOP);

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
app.use("/api", productRoutes);
app.use("/api", postRoutes);
app.use("/api", blogCategoryRoutes);
app.use("/api", blogPostRoutes);

const GOOGLE_CLIENT_ID =
    "648107269067-pkuskdnjnvp1sek3rab03uknj8h8dndj.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GOOGLE_REDIRECT_URI = "http://localhost:8000/login";

app.get("/", (req, res) => {
    res.send("안녕");
});
app.get("/login", (req, res) => {
    let url = "https://accounts.google.com/o/oauth2/v2/auth";
    // client_id는 위 스크린샷을 보면 발급 받았음을 알 수 있음
    // 단, 스크린샷에 있는 ID가 아닌 당신이 직접 발급 받은 ID를 사용해야 함.
    url += `?client_id=${GOOGLE_CLIENT_ID}`;
    // 아까 등록한 redirect_uri
    // 로그인 창에서 계정을 선택하면 구글 서버가 이 redirect_uri로 redirect 시켜줌
    url += `&redirect_uri=${GOOGLE_REDIRECT_URI}`;
    // 필수 옵션.
    url += "&response_type=code";
    // 구글에 등록된 유저 정보 email, profile을 가져오겠다 명시
    url += "&scope=email profile";
    // 완성된 url로 이동
    // 이 url이 위에서 본 구글 계정을 선택하는 화면임.
    res.redirect(url);
});

app.get("/login/redirect", async (req, res) => {
    const { code } = req.query;
    const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
    const tokenResp = await axios.post(GOOGLE_TOKEN_URL, {
        // x-www-form-urlencoded(body)
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
    });
    const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo";
    const userInfoResp = await axios.get(GOOGLE_USERINFO_URL, {
        headers: {
            Authorization: `Bearer ${tokenResp.data.access_token}`,
        },
    });
    console.log(userInfoResp.data);
    res.json(userInfoResp.data);
});

app.get("/login/signin", (req, res) => {
    const { code } = req.query;
    console.log(`code: ${code}`);
    res.send("ok");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Node server is running on port ${port}`);
});
