import Razorpay from "razorpay";
import Product from "../models/Product.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductsByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ category: categoryId });
    if (!products || products.length === 0) {
      return res.status(200).json({
        success: false,
        message: `Products not found with category ${categoryId}`,
      });
    }

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getAllProducts, getProductsByCategoryId };
