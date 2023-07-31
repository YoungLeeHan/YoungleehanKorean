import express from "express";
// const express = require("express");
import passport from "passport";
const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";
// controllers
import { register, login, secret } from "../controllers/auth.js";

router.get("/", (req, res) => {
    res.render("login");
    console.log(`여기는 "/auth"입니다!`);
});

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("http://localhost:8000/index/log");
    }
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

export default router;
