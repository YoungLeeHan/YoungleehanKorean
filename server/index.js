import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import product from "./routes/product.js";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import authGoo from "./routes/authGoo.js";
import indexGoo from "./routes/index.js";
import path from "path";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
import User from "./models/User.js";

// let monStore = MongoStore(session);

dotenv.config();

const app = express();

dotenv.config({ path: "./config/config.env" });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.json());
app.use(cors());

const applyCOOP = (req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "cross-origin"); // 또는 다른 COOP 정책 값을 사용할 수 있음
    next();
};
// COOP 미들웨어를 애플리케이션에 적용
app.use(applyCOOP);

//db
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB ERROR => ", err));

app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", product);

// Express 세션 미들웨어 설정
const sessionRoom = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions", // 세션 데이터가 저장될 컬렉션 이름 (기본값: sessions)
    ttl: 60 * 60, // 세션의 유효기간 (기본값: 14 days)
});

app.use(
    session({
        secret: "keyboard siba",
        resave: false,
        saveUninitialized: false,
        store: sessionRoom, // sessionStore를 사용하여 세션을 저장합니다.
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// app.use(indexRoutes);

// app.get("/", (req, res) => {
//     res.render("login"); // views 디렉토리의 index.ejs를 렌더링
//     console.log(`여기는 "localhost ${port}/"입니다!`); // 이 줄은 콘솔에 출력되지만 응답으로 보내지 않습니다.
// });
app.use("/auth", authGoo);
app.use("/index", indexGoo);

const sessionStore = MongoStore.create({ mongoUrl: process.env.MONGO_URI });

app.use(
    session({
        secret: "keyboard siba",
        resave: false,
        saveUninitialized: false,
        store: sessionStore, // sessionStore를 사용하여 세션을 저장합니다.
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//구글 인증 로직
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8000/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            //get the user data from google
            const newUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value,
                email: profile.emails[0].value,
            };

            try {
                // find the user in our database
                const user = await User.findOne({
                    googleId: profile.id,
                });

                if (user) {
                    // If user present in our database.
                    done(null, user);
                } else {
                    // if user is not present in our database, save user data to the database.
                    user = await models.User.create(newUser);
                    done(null, user);
                }
            } catch (err) {
                console.error(err);
                done(err, null);
            }
        }
    )
);

// used to serialize the user for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// used to deserialize the user

// passport.deserializeUser((id, done) => {
//     User.findById(id)
//         .then((user) => {
//             done(null, user);
//         })
//         .catch((err) => {
//             done(err, null);
//         });
// });

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);

        if (!user) {
            done(null, null);
        } else {
            done(null, user);
        }
    } catch (err) {
        done(err);
    }
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Node server is running on port ${port}`);
});
