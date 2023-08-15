import express from "express";

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";
// controllers
import {
    create,
    update,
    remove,
    list,
    read,
    // productsByCategory,
} from "../controllers/blogCategory.js";

router.post("/", requireSignin, isAdmin, create);
router.put("/:categoryId", requireSignin, isAdmin, update);
router.delete("/:categoryId", requireSignin, isAdmin, remove);
router.get("/list", list);
router.get("/:slug", read);
// router.get("/products-by-category/:slug", productsByCategory);

export default router;
