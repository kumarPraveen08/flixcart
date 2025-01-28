import express from "express";
import {
  createOrder,
  createTransaction,
  getOrdersByUserId,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/transaction", createTransaction);
router.get("/:userId", getOrdersByUserId);
router.post("/", createOrder);

export default router;
