import express from "express";

const router = express.Router();

// middlewares
import { requireSignin } from "../middlewares/auth.js";
// controllers
import {
    create,
    list,
    update,
    remove,
    like,
} from "../controllers/blogComment.js";

router.get("/:postId", list);
router.post("/", requireSignin, create);
router.put("/:id", requireSignin, update);
router.delete("/:id", requireSignin, remove);
router.put("/:id/like", requireSignin, like);

export default router;
