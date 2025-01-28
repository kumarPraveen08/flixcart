import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the Database.");
  } catch (error) {
    console.log("Problem with connected Database.", error);
  }
};

export default connectDB;
