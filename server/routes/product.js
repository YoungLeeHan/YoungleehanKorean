import express from "express";

const router = express.Router();

//controllers
import { getToken, processPayment } from "../controllers/product.js";

router.get("/braintree/token", getToken);
router.post("/braintree/payment", processPayment);

export default router;
