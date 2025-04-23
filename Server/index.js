import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import ConnectDB from "./libs/db.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chat-frontend-five-neon.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoute);
app.use(errorMiddleware); // Error handling middleware
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  ConnectDB();
});
