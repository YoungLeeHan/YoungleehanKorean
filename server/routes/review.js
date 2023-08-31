import express from "express";
import { requireSignin } from "../middlewares/auth.js";
import { upload } from "../middlewares/filehelper.js";
import {
  reviewList,
  reviewCreate,
  reviewUpdate,
  reviewRemove,
} from "../controllers/review.js";

const router = express.Router();

router.get("/review/:productId", reviewList);
router.post(
  "/review",
  requireSignin,
  upload("reviewImages").array("images", 5),
  reviewCreate
);
router.put(
  "/review/:id",
  requireSignin,
  upload("reviewImages").array("images", 5),
  reviewUpdate
);
router.delete("/review/:id", requireSignin, reviewRemove);

export default router;
