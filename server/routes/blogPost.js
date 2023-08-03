import express from "express";
import formidable from "express-formidable";

const router = express.Router();

//middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";

//controllers
import { create, list } from "../controllers/blog.js";

// routes
router.post("/blog/post-create", requireSignin, isAdmin, formidable(), create);
router.get("/blog/list", list);
export default router;
