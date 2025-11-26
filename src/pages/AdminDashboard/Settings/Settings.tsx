import { useEffect } from "react";
import { useAdminDashboardHeader } from "../../../contexts";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import SettingsForm from "../../../components/templates/AdminDashboard/SettingsManagement/SettingsForm/SettingsForm";

function Settings() {
  const { setHeaderConfig } = useAdminDashboardHeader();

  useEffect(() => {
    setHeaderConfig({ title: "تنظیمات سایت" });
    return () => {
      setHeaderConfig({ title: undefined, backButton: false });
    };
  }, [setHeaderConfig]);

  return (
    <main>
      <SectionContainer>
        <h5 className="main-header mb-6">ویرایش تنظیمات</h5>
        <SettingsForm />
      </SectionContainer>
    </main>
  );
}

export default Settings;
