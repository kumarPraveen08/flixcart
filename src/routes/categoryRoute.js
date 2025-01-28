import express from "express";
import {
  getAllCatgories,
  getCategoryById,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getAllCatgories);
router.get("/:categoryId", getCategoryById);

export default router;
