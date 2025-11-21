import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/typedHooks";
import React from "react";

export function ProtectedAdminAuthRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, loading } = useAppSelector((state) => state.user);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-dark font-estedad-medium">در حال بررسی...</p>
        </div>
      </div>
    );
  }

  // اگر کاربر لاگین است (چه مدیر، منشی یا بیمار)، نباید به صفحه لاگین دسترسی داشته باشد
  if (user) {
    // اگر مدیر یا منشی است، به داشبورد ادمین هدایت شود
    if (user.role === "ADMIN" || user.role === "SECRETARY") {
      return <Navigate to="/admin-dashboard" replace />;
    }
    // اگر بیمار است، به صفحه اصلی هدایت شود
    return <Navigate to="/home" replace />;
  }



  // اگر کاربر لاگین نیست، اجازه دسترسی به صفحه لاگین را بده
  return <>{children}</>;
}
