import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../../components/utilities/axiosinstance";

export const loginUserThunk = createAsyncThunk(
  "users/login",
  async ({ userName, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/user/login", {
        userName,
        password,
      });
      console.log(response.data);
      if (response.status === 200) {
        toast.success("Login successful");
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

export const signupUserThunk = createAsyncThunk(
  "users/signup",
  async (
    { fullName, email, userName, password, gender },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/user/register", {
        fullName,
        email,
        userName,
        password,
        gender,
      });
      console.log(response.data);
      if (response.status === 201) {
        toast.success("Registered successful");
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

export const logoutUserThunk = createAsyncThunk(
  "users/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/logout");
      console.log(response.data);
      if (response.status === 200) {
        toast.success("Logout successful");
        return response.data;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.errMessage || "Logout failed");
      return rejectWithValue(
        error.response?.data?.errMessage || "Logout failed"
      );
    }
  }
);

export const getUserProfileThunk = createAsyncThunk(
  "users/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/profile");
      return response.data;
    } catch (error) {
      console.log(error);
      const err = error;
      return rejectWithValue(err.response.data.errMessage);
    }
  }
);

export const getOtherUsersThunk = createAsyncThunk(
  "users/other-users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/other-users");
      return response.data;
    } catch (error) {
      console.log(error);
      const err = error;
      return rejectWithValue(err.response.data.errMessage);
    }
  }
);
