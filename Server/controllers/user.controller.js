import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncHnandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";

export const register = asyncHnandler(async (req, res, next) => {
  const { fullName, email, userName, password, gender } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  if (!fullName || !email || !userName || !password || !gender) {
    return next(new errorHandler("All fields are required", 400));
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new errorHandler("User already exists", 400));
  }

  const avatarType = gender === "male" ? "boy" : "girl";
  const avatar = `https://avatar.iran.liara.run/public/${avatarType}?username=${userName}`;
  const user = new User({
    fullName,
    email,
    userName,
    password: hashedPassword,
    gender,
    avatar,
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  await user.save();
  if (user) {
    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 10 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      })
      .json({
        success: true,
        responseData: {
          user,
          token,
        },
        message: "User registered successfully",
      });
  }

  console.error(error);
  return next(new errorHandler("Internal server error", 500));
});

export const login = asyncHnandler(async (req, res, next) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return next(new errorHandler("All fields are required", 400));
  }
  const user = await User.findOne({ userName });
  if (!user) {
    return next(new errorHandler("User not found", 404));
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return next(new errorHandler("Invalid credentials", 401));
  }
  const { password: pass, ...userData } = user._doc;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 10 * 60 * 1000),
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })
    .json({
      success: true,
      message: "User logged in successfully",
      user: userData,
      token,
    });
});

export const getProfile = asyncHnandler(async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user) {
    return next(new errorHandler("User not found", 404));
  }
  res.status(200).json({
    success: true,
    responseData: user,
    message: "User profile fetched successfully",
  });
});

export const logout = asyncHnandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })
    .json({
      success: true,
      message: "User logged out successfully",
    });
});

export const getOtherUsers = asyncHnandler(async (req, res, next) => {
  const otherUser = await User.find({ _id: { $ne: req.user.id } });
  if (!otherUser) {
    return next(new errorHandler("No other users found", 404));
  }
  res.status(200).json({
    success: true,
    responseData: otherUser,
    message: "User profile fetched successfully",
  });
});
