import { useEffect } from "react";
import { useAdminDashboardHeader } from "../../../contexts";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import BannerManagementForm from "../../../components/templates/AdminDashboard/BannerManagement/BannerManagementForm/BannerManagementForm";
import { useParams } from "react-router-dom";
import { useGetHeroSliderById } from "../../../services/useHeroSliders";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import NotFound from "../../../pages/NotFound/NotFound";

function BannerManagementEdit() {
  const { setHeaderConfig } = useAdminDashboardHeader();
  const { id } = useParams();
  const { data: banner, isLoading } = useGetHeroSliderById(id ?? "");

  useEffect(() => {
    setHeaderConfig({ title: "ویرایش بنر", backButton: true });
    return () => {
      setHeaderConfig({ title: undefined, backButton: false });
    };
  }, [setHeaderConfig]);

  if (isLoading) return <LoadingState text="در حال بارگذاری جزئیات بنر..." />;
  if (!banner) return <NotFound text="بنر یافت نشد" />;
  return (
    <main>
      <SectionContainer>
        <h5 className="main-header">ویرایش بنر</h5>
        <BannerManagementForm banner={banner?.data?.slider} />
      </SectionContainer>
    </main>
  );
}

export default BannerManagementEdit;
