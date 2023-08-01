import express from "express";

const router = express.Router();
// const { Post } = require("../models/Post.js")
// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";
// controllers
import { create } from "../controllers/post.js";

router.post("/dashboard/admin/post", requireSignin, isAdmin, create);

export default router;
