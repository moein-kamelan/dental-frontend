import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/typedHooks";
import React from "react";

export function ProtectedAdminOnlyRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, loading } = useAppSelector((state) => state.user);
  const location = useLocation();

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

  if (!user || user.role !== "ADMIN") {
    // اگر منشی است، به داشبورد هدایت شود
    if (user?.role === "SECRETARY") {
      return <Navigate to="/admin" replace />;
    }
    // اگر لاگین نیست یا نقش دیگری دارد، به صفحه لاگین هدایت شود
    const redirectTo = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/admin-login?redirect=${redirectTo}`} replace />;
  }

  return <>{children}</>;
}

