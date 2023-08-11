import express from "express";
import formidable from "express-formidable";

const router = express.Router();

//middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";

//controllers
// import { create, list } from "../controllers/blog.js";
import {create, list, images, read, update, remove } from "../controllers/blog.js";

// routes
router.post("/post-create", requireSignin, isAdmin, formidable(), create);
router.get("/list", list);
router.get("/:slug", read);
router.get("/images/:postId", images);
router.delete("/:postId", requireSignin, isAdmin, remove);
router.put("/:postId", requireSignin, isAdmin, formidable(), update);



export default router;
