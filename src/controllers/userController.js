import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN }
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN }
  );

  return { accessToken, refreshToken };
};

const loginOrSignUp = async (req, res) => {
  const { phone, address } = req.body;

  try {
    let user = await User.findOne({ phone });
    if (!user) {
      user = await User({ phone, address });
      await user.save();
    } else {
      user.address = address;
      await user.save();
    }

    const { refreshToken, accessToken } = generateToken(user.toObject());

    res.status(200).json({
      success: true,
      user,
      refreshToken,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default loginOrSignUp;
