// src/hooks/useCsrfToken.ts
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/typedHooks";
import { fetchCsrfToken, clearCsrfToken } from "../redux/slices/csrfSlice";

/**
 * Hook برای مدیریت CSRF token
 * به صورت خودکار CSRF token را دریافت می‌کند اگر کاربر لاگین باشد
 */
export const useCsrfToken = () => {
  const dispatch = useAppDispatch();
  const { token, loading, error } = useAppSelector((state) => state.csrf);
  const user = useAppSelector((state) => state.user.data);

  useEffect(() => {
    // اگر کاربر لاگین است و CSRF token نداریم، آن را دریافت کن
    if (user && !token && !loading) {
      dispatch(fetchCsrfToken());
    }

    // اگر کاربر لاگین نیست، CSRF token را پاک کن
    if (!user && token) {
      dispatch(clearCsrfToken());
    }
  }, [user, token, loading, dispatch]);

  return {
    token,
    loading,
    error,
    refetch: () => dispatch(fetchCsrfToken()),
  };
};
