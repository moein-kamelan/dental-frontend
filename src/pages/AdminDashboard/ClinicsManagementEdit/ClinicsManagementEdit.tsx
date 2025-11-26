import React, { useEffect } from "react";
import { useAdminDashboardHeader } from "../../../contexts";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import ClinicManagementForm from "../../../components/templates/AdminDashboard/ClinicsManagement/ClinicManagementForm/ClinicManagementForm";
import { useParams } from "react-router-dom";
import { useGetClinicById } from "../../../services/useClinics";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import NotFound from "../../../pages/NotFound/NotFound";

function ClinicsManagementEdit() {
  const { setHeaderConfig } = useAdminDashboardHeader();
  const { id } = useParams();
  const { data: clinic, isLoading } = useGetClinicById(id ?? "");

  useEffect(() => {
    setHeaderConfig({ title: "ویرایش کلینیک", backButton: true });
    return () => {
      setHeaderConfig({ title: undefined, backButton: false });
    };
  }, [setHeaderConfig]);

  if (isLoading)
    return <LoadingState text="در حال بارگذاری جزئیات کلینیک..." />;
  if (!clinic) return <NotFound text="کلینیک یافت نشد" />;
  return (
    <main>
      <SectionContainer>
        <h5 className="main-header ">ویرایش کلینیک</h5>
        <ClinicManagementForm clinic={clinic?.data?.clinic} />
      </SectionContainer>
    </main>
  );
}

export default ClinicsManagementEdit;
