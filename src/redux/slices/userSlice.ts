/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store/userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";

interface UserState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

// گرفتن اطلاعات کاربر فعلی
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data?.user || null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "خطا در دریافت اطلاعات کاربر";
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
