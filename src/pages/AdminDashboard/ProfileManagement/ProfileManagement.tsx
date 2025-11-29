import { useEffect } from "react";
import { useAdminDashboardHeader } from "../../../contexts";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import ProfileManagementForm from "../../../components/templates/AdminDashboard/ProfileManagement/ProfileManagementForm/ProfileManagementForm";

function ProfileManagement() {
  const { setHeaderConfig } = useAdminDashboardHeader();

  useEffect(() => {
    setHeaderConfig({ title: "مدیریت پروفایل" });
    return () => {
      setHeaderConfig({ title: undefined, backButton: false });
    };
  }, [setHeaderConfig]);

  return (
    <main>
      <SectionContainer>
        <h5 className="main-header">ویرایش پروفایل</h5>
        <ProfileManagementForm />
      </SectionContainer>
    </main>
  );
}

export default ProfileManagement;
