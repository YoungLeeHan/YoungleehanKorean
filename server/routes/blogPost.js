import express from "express";
import formidable from "express-formidable";

const router = express.Router();

//middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";

//controllers
// import { create, list } from "../controllers/blog.js";
import {create, list, images, read, update, remove } from "../controllers/blog.js";

// routes
router.post("/blog/post-create", requireSignin, isAdmin, formidable(), create);
router.get("/blog/list", list);
router.get("/blog/:slug", read);
router.get("/blog/images/:postId", images);
router.delete("/blog/:postId", requireSignin, isAdmin, remove);
router.put("/blog/:postId", requireSignin, isAdmin, formidable(), update);



export default router;
