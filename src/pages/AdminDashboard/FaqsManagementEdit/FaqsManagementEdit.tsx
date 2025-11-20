import React, { useEffect } from "react";
import { useAdminDashboardHeader } from "../../../contexts";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import FaqManagementForm from "../../../components/templates/AdminDashboard/FaqsManagement/FaqManagementForm/FaqManagementForm";
import { useParams } from "react-router-dom";
import { useGetFaqById } from "../../../services/useFaqs";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import NotFound from "../../../pages/NotFound/NotFound";

function FaqsManagementEdit() {
  const { setHeaderConfig } = useAdminDashboardHeader();
  const { id } = useParams();
  const { data: faq, isLoading } = useGetFaqById(id ?? "");

  useEffect(() => {
    setHeaderConfig({ title: "ویرایش سوال متداول", backButton: true });
    return () => {
      setHeaderConfig({ title: undefined, backButton: false });
    };
  }, [setHeaderConfig]);

  if (isLoading) return <LoadingState text="در حال بارگذاری جزئیات سوال..." />;
  if (!faq) return <NotFound text="سوال یافت نشد" />;
  return (
    <main>
      <SectionContainer>
        <h5 className="main-header ">ویرایش سوال متداول</h5>
        <FaqManagementForm faq={faq?.data?.faq} />
      </SectionContainer>
    </main>
  );
}

export default FaqsManagementEdit;
