import express from "express";
// import multer from "multer";
import { upload } from "../helpers/filehelper.js";
const router = express.Router();

//middlewares
import { requireSignin } from "../middlewares/auth.js";

import {
    reviewList,
    reviewCreate,
    reviewUpdate,
    reviewRemove,
} from "../controllers/review.js";

router.get("/review/:productId", reviewList);
router.post(
    "/review",
    requireSignin,
    upload.array("reviewImages", 5),
    reviewCreate
);
router.put(
    "/review/:id",
    requireSignin,
    upload.array("reviewImages", 5),
    reviewUpdate
);
router.delete("/review/:id", requireSignin, reviewRemove);

export default router;
