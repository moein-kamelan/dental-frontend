import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/typedHooks";
import React from "react";

export function ProtectedUserDashboardRoute({
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

  if (!user) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}
