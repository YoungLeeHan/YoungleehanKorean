import express from "express";
import { ensureAuth, ensureGuest } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", ensureGuest, (req, res) => {
    res.render("login");
});

router.get("/log", ensureAuth, async (req, res) => {
    res.render("index", { userinfo: req.user });
});

export default router;
