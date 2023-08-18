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
  userInfo,
  verifyEmail,
} from "../controllers/auth.js";

router.post("/register", register);
router.get("/:id/verify/:token", verifyEmail);
router.post("/login", login);
router.get("/userInfo", requireSignin, userInfo);
router.put("/profileUpdate", requireSignin, updateProfile);
router.get("/auth-check", requireSignin, (req, res) => {
  res.json({ ok: true });
});
router.get("/admin-check", requireSignin, isAdmin, (req, res) => {
  res.json({ ok: true });
});
router.get("/secret", requireSignin, isAdmin, secret);

export default router;
