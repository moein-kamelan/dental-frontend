import React from "react";
import AdminDashBaordHeader from "../../../components/modules/AdminDashboard/AdminDashBaordHeader/AdminDashBaordHeader";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import ClinicManagementForm from "../../../components/templates/AdminDashboard/ClinicsManagement/ClinicManagementForm/ClinicManagementForm";
import { useParams } from "react-router-dom";
import { useGetClinicById } from "../../../services/useClinics";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import NotFound from "../../../pages/NotFound/NotFound";

function ClinicsManagementEdit() {
  const { id } = useParams();
  const { data: clinic, isLoading } = useGetClinicById(id ?? "");
  if (isLoading)
    return <LoadingState text="در حال بارگذاری جزئیات کلینیک..." />;
  if (!clinic) return <NotFound text="کلینیک یافت نشد" />;
  return (
    <main>
      <AdminDashBaordHeader title="ویرایش کلینیک" backButton />
      <SectionContainer>
        <h5 className="main-header ">ویرایش کلینیک</h5>
        <ClinicManagementForm clinic={clinic?.data?.clinic} />
      </SectionContainer>
    </main>
  );
}

export default ClinicsManagementEdit;
