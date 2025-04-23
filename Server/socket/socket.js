import {} from 'socket.io';
import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173","https://chat-backend-h0qf.onrender.com"]
  },
});

const userSocketMap = {
    // userId: socketId
}

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (!userId) {
        return;
    }

    userSocketMap[userId] = socket.id;
    io.emit("onlineUsers", Object.keys(userSocketMap));
    console.log("User connected:", userId, socket.id);

    socket.on("disconnect", () => {
        delete userSocketMap[userId];
        io.emit("onlineUsers", Object.keys(userSocketMap));
    });
})

const getSocketId = (userId) => {
    return userSocketMap[userId];
}

export {io, app, server, getSocketId};