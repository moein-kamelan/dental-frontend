import { useContext } from "react";
import { AdminDashboardHeaderContext } from "./AdminDashboardHeaderContextValue";

export function useAdminDashboardHeader() {
  const context = useContext(AdminDashboardHeaderContext);
  if (context === undefined) {
    throw new Error(
      "useAdminDashboardHeader must be used within AdminDashboardHeaderProvider"
    );
  }
  return context;
}
