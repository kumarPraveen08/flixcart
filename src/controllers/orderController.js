import Razorpay from "razorpay";
import crypto from "crypto";
import Transaction from "../models/Transaction.js";
import Order from "../models/Order.js";

const createTransaction = async (req, res) => {
  const { amount, userId } = req.body;

  const razorpay = new Razorpay({
    key_id: process.env.RAZOR_PAY_SECRET_ID,
    key_secret: process.env.RAZOR_PAY_SECRET_KEY,
  });

  const options = {
    amount: amount,
    currency: "INR",
    receipt: `receipt#${Date.now()}`,
  };

  try {
    if (!amount || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Amount and User Id is requried." });
    }

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      key: process.env.RAZOR_PAY_SECRET_ID,
      amount: razorpayOrder.amount,
      order_id: razorpayOrder.id,
      currency: razorpayOrder?.currency,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to create Order.",
      error,
    });
  }
};

const createOrder = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userId,
    cartItems,
    deliveryDate,
    address,
  } = req.body;

  const key_secret = process.env.RAZOR_PAY_SECRET_KEY;
  const generated_signature = crypto
    .createHmac("sha256", key_secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    try {
      const transaction = await Transaction.create({
        user: userId,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        status: "Success",
        amount: cartItems.reduce(
          (total, item) => total + item?.quantity * item.price,
          0
        ),
      });

      const order = await Order.create({
        user: userId,
        address,
        deliveryDate,
        items: cartItems?.map((item) => ({
          product: item?._id,
          quantity: item?.quantity,
        })),
        status: "Order Placed",
      });

      transaction.order = order._id;
      await transaction.save();
      res.json({
        success: true,
        message: "Payment verified and order created.",
        order,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Failed to create transaction or order",
        error,
      });
    }
  }
};

const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ user: userId })
      .populate("user", "name phone email")
      .populate("items.product", "name price image_uri ar_uri")
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found with id " + userId,
      });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to get orders",
      error,
    });
  }
};

export { createTransaction, createOrder, getOrdersByUserId };
