import express from "express";
import formidable from "express-formidable";

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

router.get("/:productId/review", reviewList);
router.post("/review", requireSignin, reviewCreate);
router.put("/:productId/review", requireSignin, formidable(), reviewUpdate);
router.delete("/:productId/review", requireSignin, reviewRemove);
router.get("/:productId/review/images", reviewImages);

export default router;
