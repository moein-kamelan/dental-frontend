import axios from "axios";
import type { AppStore } from "../redux/store";
import type { AsyncThunk } from "@reduxjs/toolkit";

// Backend origin is configurable per environment (dev/prod)
// Default to localhost in dev if env is not provided.
// در حالت combined (frontend + backend روی همان سرور)، از relative path استفاده می‌کنیم
const rawBackendBase =
  import.meta.env.VITE_BACKEND_URL ||
  (import.meta.env.DEV ? "http://localhost:4000" : "");

// Keep without trailing slash so we can safely append paths.
let backendBaseUrl = rawBackendBase.replace(/\/$/, "");

// در حالت combined (production)، اگر VITE_BACKEND_URL به localhost اشاره می‌کند
// یا اگر origin فعلی با backend URL متفاوت است، از relative path استفاده می‌کنیم
if (typeof window !== "undefined") {
  const currentOrigin = window.location.origin;
  
  // فقط در production این منطق را اعمال می‌کنیم
  // در development همیشه از backendBaseUrl کامل استفاده می‌کنیم
  if (!import.meta.env.DEV) {
    // اگر در production هستیم و VITE_BACKEND_URL به localhost اشاره می‌کند
    if (backendBaseUrl.includes("localhost")) {
      backendBaseUrl = ""; // استفاده از relative path
    }
    // اگر backendBaseUrl تنظیم شده اما با origin فعلی متفاوت است
    else if (backendBaseUrl && !backendBaseUrl.startsWith(currentOrigin)) {
      // اگر backendBaseUrl یک URL کامل است و با origin فعلی متفاوت است
      // در حالت combined باید از relative path استفاده کنیم
      if (backendBaseUrl.startsWith("http://") || backendBaseUrl.startsWith("https://")) {
        backendBaseUrl = ""; // استفاده از relative path
      }
    }
  }
  // در development، backendBaseUrl را بدون تغییر نگه می‌داریم
}

// در حالت combined، اگر VITE_BACKEND_URL تنظیم نشده باشد، از relative path استفاده می‌کنیم
// این باعث می‌شود که درخواست‌ها به همان origin ارسال شوند
const apiBaseUrl = backendBaseUrl ? `${backendBaseUrl}/api` : "/api";

/**
 * Getter function for backendBaseUrl
 * این function مقدار فعلی backendBaseUrl را برمی‌گرداند
 * در حالت combined (production)، اگر به localhost اشاره می‌کند، خالی برمی‌گرداند
 */
export function getBackendBaseUrl(): string {
  // اگر در browser هستیم، منطق را دوباره بررسی می‌کنیم
  if (typeof window !== "undefined") {
    const currentOrigin = window.location.origin;
    const url = backendBaseUrl;
    
    // فقط در production این منطق را اعمال می‌کنیم
    // در development همیشه از backendBaseUrl کامل استفاده می‌کنیم
    if (!import.meta.env.DEV) {
      // اگر در production هستیم و VITE_BACKEND_URL به localhost اشاره می‌کند
      if (url.includes("localhost")) {
        return ""; // استفاده از relative path
      }
      // اگر backendBaseUrl تنظیم شده اما با origin فعلی متفاوت است
      else if (url && !url.startsWith(currentOrigin)) {
        // اگر backendBaseUrl یک URL کامل است و با origin فعلی متفاوت است
        // در حالت combined باید از relative path استفاده کنیم
        if (url.startsWith("http://") || url.startsWith("https://")) {
          return ""; // استفاده از relative path
        }
      }
    }
    
    return url;
  }
  
  return backendBaseUrl;
}

// لاگ برای دیباگ (فقط در development)
if (import.meta.env.DEV) {
  console.log("Axios Configuration:", {
    VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
    rawBackendBase,
    backendBaseUrl,
    apiBaseUrl,
    currentOrigin: typeof window !== "undefined" ? window.location.origin : "N/A",
    isDev: import.meta.env.DEV,
  });
}

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

      // لاگ کردن خطا برای دیباگ (فقط در development)
      if (import.meta.env.DEV) {
        console.error("Axios Error:", {
          url: originalRequest?.url,
          method: originalRequest?.method,
          baseURL: originalRequest?.baseURL,
          fullURL: originalRequest?.baseURL ? `${originalRequest.baseURL}${originalRequest.url}` : originalRequest?.url,
          hasResponse: !!error.response,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          errorCode: error.code,
          errorMessage: error.message,
          config: {
            timeout: originalRequest?.timeout,
            withCredentials: originalRequest?.withCredentials,
          },
        });
      }

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
