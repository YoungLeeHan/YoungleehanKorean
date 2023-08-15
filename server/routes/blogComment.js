import express from "express";

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";
// controllers
import {
    create,
} from "../controllers/blogComment.js";

router.post("/create", requireSignin, isAdmin, create);

export default router;
