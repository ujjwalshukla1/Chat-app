import { createSlice } from "@reduxjs/toolkit";
import {
  getOtherUsersThunk,
  getUserProfileThunk,
  loginUserThunk,
  logoutUserThunk,
  signupUserThunk,
} from "./User.thunk";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {},
  reducers: {},
});

const initialState = {
  screenLoading: true,
  isAuthenticated: false,
  otherUsers: null,
  userProfile: null,
  loading: false,
  selectedUser: JSON.parse(localStorage.getItem("selectedUser")) || null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      localStorage.setItem("selectedUser", JSON.stringify(action.payload));
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        console.log("pending");
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.userProfile = action.payload?.user;
        console.log("login user", action.payload?.user);
        state.loading = false;
        state.screenLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUserThunk.rejected, () => {
        console.log("rejected");
      });

    // signup user
    builder
      .addCase(signupUserThunk.pending, (state) => {
        state.loading = true;
        console.log("pending");
      })
      .addCase(signupUserThunk.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.userProfile = action.payload;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(signupUserThunk.rejected, () => {
        console.log("rejected");
      });
    // logout user
    builder
      .addCase(logoutUserThunk.pending, (state) => {
        state.loading = true;
        console.log("pending");
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        console.log("fulfilled");
        state.userProfile = null;
        state.otherUsers = null;
        state.loading = false;
        state.selectedUser = null;
        state.screenLoading = false;
        state.isAuthenticated = false;
        localStorage.clear();

      })
      .addCase(logoutUserThunk.rejected, () => {
        console.log("rejected");
      });

    // get user profile
    builder
      .addCase(getUserProfileThunk.pending, (state) => {
        state.screenLoading = true;
        state.loading = true;
      })
      .addCase(getUserProfileThunk.fulfilled, (state, action) => {
        state.userProfile = action.payload?.responseData;
        state.loading = false;
        state.screenLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(getUserProfileThunk.rejected, (state) => {
        state.screenLoading = false;
      });

    // get other users
    builder
      .addCase(getOtherUsersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOtherUsersThunk.fulfilled, (state, action) => {
        state.otherUsers = action.payload?.responseData;
        state.loading = false;
        state.screenLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(getOtherUsersThunk.rejected, (state) => {
        state.screenLoading = false;
      });
  },
});
export const {setSelectedUser} = userSlice.actions;

export default userSlice.reducer;
