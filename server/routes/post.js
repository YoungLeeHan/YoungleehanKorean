import express from "express";
const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";
// controllers
import {
    create,
    // productsByCategory,
} from "../controllers/post.js";

router.post("/blog", requireSignin, isAdmin, create);

export default router;
