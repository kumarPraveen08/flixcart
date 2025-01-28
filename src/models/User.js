import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  phone: { type: Number, required: true, unique: true },
  address: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);
export default User;
