import express from "express";

const router = express.Router();

import { requireSignin, isAdmin } from "../middlewares/auth.js";

import { getOrders, allOrders } from "../controllers/userOrder.js";

router.get("/orders", requireSignin, getOrders);
router.get("/all-orders", requireSignin, isAdmin, allOrders);

export default router;
