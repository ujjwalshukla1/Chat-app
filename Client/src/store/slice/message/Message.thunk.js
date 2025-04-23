import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../../components/utilities/axiosinstance";

export const sendMessagesThunk = createAsyncThunk(
  "message/send",
  async ({ receiverId, message }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/message/send/${receiverId}`, {
        message,
      });
      console.log(response.data);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      const err = error;
      toast.error(err.response.data.errMessage);
      return rejectWithValue(err.response.data.errMessage);
    }
  }
);

export const getMessagesThunk = createAsyncThunk(
  "message/get",
  async ({ receiverId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/message/get/${receiverId}`);
      console.log(response.data);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      const err = error;
      toast.error(err.response.data.errMessage);
      return rejectWithValue(err.response.data.errMessage);
    }
  }
);
