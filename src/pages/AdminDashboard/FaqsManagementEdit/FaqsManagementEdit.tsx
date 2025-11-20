import React from "react";
import AdminDashBaordHeader from "../../../components/modules/AdminDashboard/AdminDashBaordHeader/AdminDashBaordHeader";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import FaqManagementForm from "../../../components/templates/AdminDashboard/FaqsManagement/FaqManagementForm/FaqManagementForm";
import { useParams } from "react-router-dom";
import { useGetFaqById } from "../../../services/useFaqs";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import NotFound from "../../../pages/NotFound/NotFound";

function FaqsManagementEdit() {
  const { id } = useParams();
  const { data: faq, isLoading } = useGetFaqById(id ?? "");
  if (isLoading) return <LoadingState text="در حال بارگذاری جزئیات سوال..." />;
  if (!faq) return <NotFound text="سوال یافت نشد" />;
  return (
    <main>
      <AdminDashBaordHeader title="ویرایش سوال متداول" backButton />
      <SectionContainer>
        <h5 className="main-header ">ویرایش سوال متداول</h5>
        <FaqManagementForm faq={faq?.data?.faq} />
      </SectionContainer>
    </main>
  );
}

export default FaqsManagementEdit;
