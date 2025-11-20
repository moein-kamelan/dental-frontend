import AdminDashBaordHeader from "../../../components/modules/AdminDashboard/AdminDashBaordHeader/AdminDashBaordHeader";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import ServicesCategoryManagementForm from "../../../components/templates/AdminDashboard/ServicesCategoryManagement/ServicesCategoryManagementForm/ServicesCategoryManagementForm";
import { useParams } from "react-router-dom";
import { useGetServiceCategoryByIdentifier } from "../../../services/useCategories";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import NotFound from "../../../pages/NotFound/NotFound";

function ServicesCategoryManagementEdit() {
  const { id } = useParams();
  const { data: category, isLoading } = useGetServiceCategoryByIdentifier(id ?? "");
  if (isLoading) return <LoadingState text="در حال بارگذاری جزئیات دسته‌بندی..." />;
  if (!category) return <NotFound text="دسته‌بندی یافت نشد" />;
  return (
    <main>
      <AdminDashBaordHeader title="ویرایش دسته‌بندی" backButton />
      <SectionContainer>
        <h5 className="main-header ">ویرایش دسته‌بندی</h5>
        <ServicesCategoryManagementForm category={category?.data?.category} />
      </SectionContainer>
    </main>
  );
}

export default ServicesCategoryManagementEdit;

