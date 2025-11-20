import React from "react";
import AdminDashBaordHeader from "../../../components/modules/AdminDashboard/AdminDashBaordHeader/AdminDashBaordHeader";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import GalleryManagementForm from "../../../components/templates/AdminDashboard/GalleryManagement/GalleryManagementForm/GalleryManagementForm";
import { useParams } from "react-router-dom";
import { useGetGalleryById } from "../../../services/useGallery";
import LoadingState from "../../../components/modules/Main/LoadingState/LoadingState";
import NotFound from "../../../pages/NotFound/NotFound";

function GalleryManagementEdit() {
  const { id } = useParams();
  const { data: image, isLoading } = useGetGalleryById(id ?? "");
  if (isLoading)
    return <LoadingState text="در حال بارگذاری جزئیات تصویر..." />;
  if (!image) return <NotFound text="تصویر یافت نشد" />;
  return (
    <main>
      <AdminDashBaordHeader title="ویرایش تصویر گالری" backButton />
      <SectionContainer>
        <h5 className="main-header ">ویرایش تصویر گالری</h5>
        <GalleryManagementForm image={image?.data?.image} />
      </SectionContainer>
    </main>
  );
}

export default GalleryManagementEdit;

