// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import csrfReducer from "./slices/csrfSlice";
import { setupAxiosInterceptors } from "../utils/axios";
import { fetchCsrfToken } from "./slices/csrfSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    csrf: csrfReducer,
  },
});

// تنظیم interceptor ها بعد از ایجاد store
setupAxiosInterceptors(store, fetchCsrfToken);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
