import AdminDashBaordHeader from "../../../components/modules/AdminDashboard/AdminDashBaordHeader/AdminDashBaordHeader";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import SettingsForm from "../../../components/templates/AdminDashboard/SettingsManagement/SettingsForm/SettingsForm";

function Settings() {
  return (
    <main>
      <AdminDashBaordHeader title="تنظیمات سایت" />

      <SectionContainer>
        <h5 className="main-header mb-6">ویرایش تنظیمات</h5>
        <SettingsForm />
      </SectionContainer>
    </main>
  );
}

export default Settings;
