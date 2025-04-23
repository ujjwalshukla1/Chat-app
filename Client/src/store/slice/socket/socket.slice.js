import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

const initialState = {
  socket: null,
  onlineUsers: null,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    initializeSocket: (state, action) => {
      const socket = io("https://chat-backend-h0qf.onrender.com", {
        query: {
          userId: action.payload,
        },
        transports: ["websocket"],
      });
      state.socket = socket;
    },

    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
      console.log("Online users:", action.payload);
    },
  },
});

export const { initializeSocket, setOnlineUsers } = socketSlice.actions;

export default socketSlice.reducer;