import express from "express";

const router = express.Router();

import { requireSignin } from "../middlewares/auth.js";

import { getToken, processPayment } from "../controllers/checkout.js";

router.get("/braintree/token", getToken);
router.post("/braintree/payment", requireSignin, processPayment);

export default router;
