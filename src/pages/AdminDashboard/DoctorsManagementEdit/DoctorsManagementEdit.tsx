import React from "react";
import AdminDashBaordHeader from "../../../components/modules/AdminDashboard/AdminDashBaordHeader/AdminDashBaordHeader";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import DoctorManagementForm from "../../../components/templates/AdminDashboard/DoctorsManagement/DoctorManagementForm/DoctorManagementForm";
import { useParams } from "react-router-dom";
import { useGetDoctorByIdentifier } from "../../../services/useDoctors";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import NotFound from "../../../pages/NotFound/NotFound";

function DoctorsManagementEdit() {
  const { id } = useParams();
  const { data: doctor, isLoading } = useGetDoctorByIdentifier(id ?? "");
  if (isLoading) return <LoadingState text="در حال بارگذاری جزئیات دکتر..." />;
  if (!doctor) return <NotFound text="پزشک یافت نشد" />;
  return (
    <main>
      <AdminDashBaordHeader title="ویرایش پزشک" backButton />
      <SectionContainer>
        <h5 className="main-header ">ویرایش پزشک</h5>
        <DoctorManagementForm doctor={doctor?.data?.doctor} />
      </SectionContainer>
    </main>
  );
}

export default DoctorsManagementEdit;
