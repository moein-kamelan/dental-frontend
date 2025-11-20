import AdminDashBaordHeader from "../../../components/modules/AdminDashboard/AdminDashBaordHeader/AdminDashBaordHeader";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import ServiceManagementForm from "../../../components/templates/AdminDashboard/ServicesManagement/ServiceManagementForm/ServiceManagementForm";
import { useParams } from "react-router-dom";
import { useGetServiceByIdentifier } from "../../../services/useServices";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import NotFound from "../../NotFound/NotFound";

function ServicesManagementEdit() {
  const { id } = useParams();
  const { data: service, isLoading } = useGetServiceByIdentifier(id ?? "");
  if (isLoading) return <LoadingState text="در حال بارگذاری جزئیات خدمت..." />;
  if (!service) return <NotFound text="خدمت یافت نشد" />;
  return (
    <main>
      <AdminDashBaordHeader title="ویرایش خدمت" backButton />
      <SectionContainer>
        <h5 className="main-header ">ویرایش خدمت</h5>
        <ServiceManagementForm service={service?.data?.service} />
      </SectionContainer>
    </main>
  );
}

export default ServicesManagementEdit;

