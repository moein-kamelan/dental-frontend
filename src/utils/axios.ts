import axios from "axios";
import type { AppStore } from "../redux/store";
import type { AsyncThunk } from "@reduxjs/toolkit";

// Backend origin is configurable per environment (dev/prod)
// Default to localhost in dev if env is not provided.
const rawBackendBase =
  import.meta.env.VITE_BACKEND_URL ||
  (import.meta.env.DEV ? "http://localhost:4000" : "");

  console.log(import.meta.env.VITE_BACKEND_URL);
  

// Keep without trailing slash so we can safely append paths.
export const backendBaseUrl = rawBackendBase.replace(/\/$/, "");

const apiBaseUrl = backendBaseUrl ? `${backendBaseUrl}/api` : "/api";

export const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  withCredentials: true,
});

// متغیرهای lazy برای جلوگیری از circular dependency
let storeInstance: AppStore | null = null;
let fetchCsrfTokenAction: AsyncThunk<string | null, void, object> | null = null;

// تابع برای تنظیم store و action (بعد از ایجاد store فراخوانی می‌شود)
export const setupAxiosInterceptors = (
  store: AppStore,
  fetchCsrfToken: AsyncThunk<string | null, void, object>
) => {
  storeInstance = store;
  fetchCsrfTokenAction = fetchCsrfToken;

  // افزودن CSRF token به درخواست‌های POST, PUT, DELETE
  axiosInstance.interceptors.request.use(
    (config) => {
      // فقط برای درخواست‌های POST, PUT, DELETE
      if (
        ["post", "put", "delete", "patch"].includes(
          config.method?.toLowerCase() || ""
        )
      ) {
        if (storeInstance) {
          const state = storeInstance.getState();
          const csrfToken = state.csrf.token;

          if (csrfToken) {
            config.headers["X-CSRF-Token"] = csrfToken;
          }
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // مدیریت خطای 403 (CSRF token نامعتبر) و دریافت مجدد token
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // اگر خطای 403 مربوط به CSRF باشد و قبلاً retry نشده باشد
      if (
        error.response?.status === 403 &&
        error.response?.data?.message?.toLowerCase().includes("csrf") &&
        !originalRequest._retry &&
        storeInstance &&
        fetchCsrfTokenAction
      ) {
        originalRequest._retry = true;

        try {
          // دریافت مجدد CSRF token
          await storeInstance.dispatch(fetchCsrfTokenAction());

          const newState = storeInstance.getState();
          const newCsrfToken = newState.csrf.token;

          if (
            newCsrfToken &&
            ["post", "put", "delete", "patch"].includes(
              originalRequest.method?.toLowerCase() || ""
            )
          ) {
            originalRequest.headers["X-CSRF-Token"] = newCsrfToken;
          }

          // تلاش مجدد برای درخواست
          return axiosInstance(originalRequest);
        } catch (retryError) {
          return Promise.reject(retryError);
        }
      }

      return Promise.reject(error);
    }
  );
};
