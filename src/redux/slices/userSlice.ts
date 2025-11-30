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
  loading: true, // Start with true to prevent redirect before fetchUser completes
  error: null,
};

// گرفتن اطلاعات کاربر فعلی
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/me");
      console.log("fetchUser response", response);
      
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        return rejectWithValue(null);
      }

      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
    setUser: (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.loading = false;
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

        if (action.payload !== null) {
          state.error = action.error.message ?? "خطا در دریافت اطلاعات کاربر";
        } else {
          state.data = null;
          state.error = null;
        }
      });
  },
});

export const { clearUser, setUser } = userSlice.actions;
export default userSlice.reducer;
