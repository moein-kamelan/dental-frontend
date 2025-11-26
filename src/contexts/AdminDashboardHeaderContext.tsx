import { useState, type ReactNode } from "react";
import { AdminDashboardHeaderContext } from "./AdminDashboardHeaderContextValue";

export function AdminDashboardHeaderProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [backButton, setBackButton] = useState<boolean>(false);

  const setHeaderConfig = (config: {
    title?: string;
    backButton?: boolean;
  }) => {
    setTitle(config.title);
    setBackButton(config.backButton ?? false);
  };

  return (
    <AdminDashboardHeaderContext.Provider
      value={{ title, backButton, setHeaderConfig }}
    >
      {children}
    </AdminDashboardHeaderContext.Provider>
  );
}
