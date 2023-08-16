import express from "express";

const router = express.Router();

// middlewares
import { requireSignin } from "../middlewares/auth.js";
// controllers
import {
    create,
    list,
    read,
    update,
    remove,
    // like,
    // dislike
} from "../controllers/blogComment.js";

router.get("/", list);
router.post("/", requireSignin, create);
router.get("/:id", requireSignin, read);
router.put("/:id", requireSignin, update);
router.delete("/:id", requireSignin, remove);
// router.put("likes", requireSignin, like);
// router.put("dislikes", requireSignin, dislike);


export default router;
