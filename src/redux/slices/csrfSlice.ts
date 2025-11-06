// src/redux/slices/csrfSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";

interface CsrfState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: CsrfState = {
  token: null,
  loading: false,
  error: null,
};

// دریافت CSRF token از سرور
export const fetchCsrfToken = createAsyncThunk(
  "csrf/fetchCsrfToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/csrf-token");
      return response.data?.data?.csrfToken || null;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        err.response?.data?.message || "خطا در دریافت CSRF token"
      );
    }
  }
);

const csrfSlice = createSlice({
  name: "csrf",
  initialState,
  reducers: {
    clearCsrfToken: (state) => {
      state.token = null;
      state.error = null;
    },
    setCsrfToken: (state, action) => {
      state.token = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCsrfToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCsrfToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(fetchCsrfToken.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "خطا در دریافت CSRF token";
        state.token = null;
      });
  },
});

export const { clearCsrfToken, setCsrfToken } = csrfSlice.actions;
export default csrfSlice.reducer;
