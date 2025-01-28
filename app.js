import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/userRoute.js";
import categoryRoutes from "./src/routes/categoryRoute.js";
import productRoutes from "./src/routes/productRoute.js";
import orderRoutes from "./src/routes/orderRoute.js";
import { MONGO_URI, PORT } from "./src/config/config.js";
import { buildAdminJS } from "./src/config/setup.js";

const app = express();

app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);

const start = async () => {
  try {
    await connectDB(MONGO_URI);

    await buildAdminJS(app);

    app.listen({ port: PORT, host: "0.0.0.0" }, (err, addr) => {
      if (err) {
        console.log("Something went wrong while running server", err);
        process.exit();
      } else {
        console.log(`Server is running on: http://localhost:${PORT}/admin`);
      }
    });
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

start();
