import express from "express";
import formidable from "express-formidable";

const router = express.Router();
// const { Post } = require("../models/Post.js")
// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";
// controllers
import {
    create, read, list, images, update, remove,
} from "../controllers/post.js";

router.post("/dashboard/admin/post", requireSignin, isAdmin, formidable() ,create);
// router.get("/posts", list);
// router.get("/post/:slug", read);
// router.get("/images/:postId", images);
// router.delete("/:postId", requireSignin, isAdmin, remove);
// router.put("/:postId", requireSignin, isAdmin, formidable(), update);




export default router;
