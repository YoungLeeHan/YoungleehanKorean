import express from "express";

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";
// controllers
import {
    register,
    login,
    secret,
    updateProfile,
    getOrders,
    getRecentOrders,
    allOrders,
} from "../controllers/auth.js";

router.post("/register", register);
router.post("/login", login);
router.put("/profile", requireSignin, updateProfile);
router.get("/auth-check", requireSignin, (req, res) => {
    res.json({ ok: true });
});
router.get("/admin-check", requireSignin, isAdmin, (req, res) => {
    res.json({ ok: true });
});
router.get("/orders", requireSignin, getOrders);
router.get("/recent-order", requireSignin, getRecentOrders);
router.get("/all-orders", requireSignin, isAdmin, allOrders);
router.get("/secret", requireSignin, isAdmin, secret);

export default router;
