import express from "express";
import {
  getAllProducts,
  getProductsByCategoryId,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:categoryId", getProductsByCategoryId);

export default router;
