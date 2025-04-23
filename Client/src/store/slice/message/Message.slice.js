import { createSlice } from "@reduxjs/toolkit";
import { getMessagesThunk, sendMessagesThunk } from "./Message.thunk";


const initialState = {
  messages: [],
  loading: false,
  error: null,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setNewMessage: (state, action) => {
      const oldMessages = state.messages ?? [];
      state.messages = [...oldMessages, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessagesThunk.pending, (state) => {
        state.loading = true;
        console.log("pending");
      })
      .addCase(sendMessagesThunk.fulfilled, (state, action) => {
        console.log("fulfilled");
        const oldMessages = state.messages ?? [];
        state.messages = [...oldMessages, action.payload?.responseData?.message]; 
        state.loading = false;
      })
      .addCase(sendMessagesThunk.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getMessagesThunk.pending, (state) => {
        state.loading = true;
        console.log("pending");
      })
      .addCase(getMessagesThunk.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.messages = action.payload?.responseData?.messages;
        state.loading = false;
      })
      .addCase(getMessagesThunk.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setNewMessage } = messageSlice.actions;

export default messageSlice.reducer;