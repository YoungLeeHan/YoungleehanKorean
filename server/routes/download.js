import express from "express";

const router = express.Router();

// middlewares
//import { requireSignin } from "../middlewares/auth.js";

// controllers
import { downloadFromS3 } from "../controllers/download.js";

router.get("/download/:productId", downloadFromS3);
// router.get("/download/:productId", requireSignin, downloadFromS3);

export default router;
