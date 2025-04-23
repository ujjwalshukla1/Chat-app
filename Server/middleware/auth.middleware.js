import { asyncHnandler } from "../utilities/asyncHandler.utility.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = asyncHnandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
});
