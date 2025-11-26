import React, { useEffect } from "react";
import { useAdminDashboardHeader } from "../../../contexts";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import GalleryManagementForm from "../../../components/templates/AdminDashboard/GalleryManagement/GalleryManagementForm/GalleryManagementForm";
import { useParams } from "react-router-dom";
import { useGetGalleryById } from "../../../services/useGallery";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import NotFound from "../../../pages/NotFound/NotFound";

function GalleryManagementEdit() {
  const { setHeaderConfig } = useAdminDashboardHeader();
  const { id } = useParams();
  const { data: image, isLoading } = useGetGalleryById(id ?? "");

  useEffect(() => {
    setHeaderConfig({ title: "ویرایش تصویر گالری", backButton: true });
    return () => {
      setHeaderConfig({ title: undefined, backButton: false });
    };
  }, [setHeaderConfig]);

  if (isLoading)
    return <LoadingState text="در حال بارگذاری جزئیات تصویر..." />;
  if (!image) return <NotFound text="تصویر یافت نشد" />;
  return (
    <main>
      <SectionContainer>
        <h5 className="main-header ">ویرایش تصویر گالری</h5>
        <GalleryManagementForm image={image?.data?.image} />
      </SectionContainer>
    </main>
  );
}

export default GalleryManagementEdit;

