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

router.post("/blog/category", requireSignin, isAdmin, create);
router.put("/blog/category/:categoryId", requireSignin, isAdmin, update);
router.delete("/blog/category/:categoryId", requireSignin, isAdmin, remove);
router.get("/blog/categories", list);
router.get("/blog/category/:slug", read);
// router.get("/products-by-category/:slug", productsByCategory);

export default router;
