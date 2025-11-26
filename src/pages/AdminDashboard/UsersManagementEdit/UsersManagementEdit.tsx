import { useEffect } from "react";
import { useAdminDashboardHeader } from "../../../contexts";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import UserManagementForm from "../../../components/templates/AdminDashboard/UsersManagement/UserManagementForm/UserManagementForm";
import { useParams } from "react-router-dom";
import { useGetUserById } from "../../../services/useUsers";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import NotFound from "../../../pages/NotFound/NotFound";

function UsersManagementEdit() {
  const { setHeaderConfig } = useAdminDashboardHeader();
  const { id } = useParams();
  const { data: user, isLoading } = useGetUserById(id ?? "");

  useEffect(() => {
    setHeaderConfig({ title: "ویرایش کاربر", backButton: true });
    return () => {
      setHeaderConfig({ title: undefined, backButton: false });
    };
  }, [setHeaderConfig]);

  if (isLoading) return <LoadingState text="در حال بارگذاری جزئیات کاربر..." />;
  if (!user) return <NotFound text="کاربر یافت نشد" />;
  return (
    <main>
      <SectionContainer>
        <h5 className="main-header ">ویرایش کاربر</h5>
        <UserManagementForm user={user?.data?.user} />
      </SectionContainer>
    </main>
  );
}

export default UsersManagementEdit;
