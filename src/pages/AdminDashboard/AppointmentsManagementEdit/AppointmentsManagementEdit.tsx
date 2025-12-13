import React, { useEffect } from "react";
import { useAdminDashboardHeader } from "../../../contexts";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import AppointmentManagementForm from "../../../components/templates/AdminDashboard/AppointmentsManagement/AppointmentManagementForm/AppointmentManagementForm";
import { useParams } from "react-router-dom";
import { useGetAppointmentById } from "../../../services/useAppointments";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import NotFound from "../../../pages/NotFound/NotFound";

function AppointmentsManagementEdit() {
  const { setHeaderConfig } = useAdminDashboardHeader();
  const { id } = useParams();
  const { data: appointment, isLoading } = useGetAppointmentById(id ?? "");

  useEffect(() => {
    setHeaderConfig({ title: "ویرایش نوبت", backButton: true });
    return () => {
      setHeaderConfig({ title: undefined, backButton: false });
    };
  }, [setHeaderConfig]);

  if (isLoading) return <LoadingState text="در حال بارگذاری جزئیات نوبت..." />;
  if (!appointment) return <NotFound text="نوبت یافت نشد" />;

  return (
    <main>
      <SectionContainer>
        <h5 className="main-header">ویرایش نوبت</h5>
        <AppointmentManagementForm
          appointment={appointment?.data?.appointment}
        />
      </SectionContainer>
    </main>
  );
}

export default AppointmentsManagementEdit;
