import React, { useEffect } from "react";
import { useAdminDashboardHeader } from "../../../contexts";
import QuickStats from "../../../components/templates/AdminDashboard/AdminDashboardHome/QuickStats/QuickStats";
import WelcomeSection from "../../../components/templates/AdminDashboard/AdminDashboardHome/WelcomeSection/WelcomeSection";
import AdditionalStats from "../../../components/templates/AdminDashboard/AdminDashboardHome/AdditionalStats/AdditionalStats";

function AdminDashboardHome() {
  const { setHeaderConfig } = useAdminDashboardHeader();

  useEffect(() => {
    setHeaderConfig({ title: "نمای کلی داشبورد" });
    return () => {
      setHeaderConfig({ title: undefined, backButton: false });
    };
  }, [setHeaderConfig]);

  return (
    <main>
      <WelcomeSection />
      <QuickStats />
      <AdditionalStats />
    </main>
  );
}

export default AdminDashboardHome;
