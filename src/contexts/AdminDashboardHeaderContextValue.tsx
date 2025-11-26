import { createContext } from "react";

interface AdminDashboardHeaderContextType {
  title: string | undefined;
  backButton: boolean;
  setHeaderConfig: (config: { title?: string; backButton?: boolean }) => void;
}

export const AdminDashboardHeaderContext = createContext<
  AdminDashboardHeaderContextType | undefined
>(undefined);

AdminDashboardHeaderContext.displayName = "AdminDashboardHeaderContext";

export type { AdminDashboardHeaderContextType };
