import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const requireSignin = (req, res, next) => {
    // console.log("Request received:", req.method, req.originalUrl);
    // console.log("Request:", req.body);

    try {
        const decoded = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Unauthorized" });
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (user.role !== 1) {
            return res.status(401).send("Unautorized");
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
    }
};

export const google = {
    ensureAuth: (req, res, next) => {},
    ensureGuest: (req, res, next) => {},
};

export const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/");
    }
    // ensureAuth의 기능 구현
};

export const ensureGuest = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/log");
    }
    // ensureGuest의 기능 구현
};
