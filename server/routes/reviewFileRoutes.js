import express from "express";
const router = express.Router();

//middlewares
import { requireSignin } from "../middlewares/auth.js";

import { createReviewWithFiles } from "../controllers/reviewFile.js";

router.post("/createReviewWithFiles", requireSignin, createReviewWithFiles);

export default router;
