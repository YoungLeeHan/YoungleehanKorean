import express from "express";
const router = express.Router();

//middlewares
import { requireSignin } from "../middlewares/auth.js";

import {
    reviewList,
    reviewCreate,
    reviewUpdate,
    reviewRemove,
    reviewImages,
} from "../controllers/review.js";

router.get("/review/:productId", reviewList);
router.post("/review", requireSignin, reviewCreate);
router.put("/review/:id", requireSignin, reviewUpdate);
router.delete("/review/:id", requireSignin, reviewRemove);

router.get("/:productId/review/images", reviewImages);

export default router;
