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
} from "../controllers/ageCategory.js";

router.post("/ageCategory", requireSignin, isAdmin, create);
router.put("/ageCategory/:ageCategoryId", requireSignin, isAdmin, update);
router.delete("/ageCategory/:ageCategoryId", requireSignin, isAdmin, remove);
router.get("/ageCategories", list);
router.get("/ageCategory/:slug", read);
// router.get("/products-by-category/:slug", productsByCategory);

export default router;
