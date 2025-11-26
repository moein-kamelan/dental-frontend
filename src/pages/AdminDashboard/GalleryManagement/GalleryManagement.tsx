import { useState, useEffect } from "react";
import { useAdminDashboardHeader } from "../../../contexts";
import {
  useGetAllGallery,
  useDeleteGallery,
} from "../../../services/useGallery";
import { showSuccessToast, showErrorToast } from "../../../utils/toastify";
import { useQueryClient } from "@tanstack/react-query";
import AdminPagination from "../../../components/modules/AdminDashboard/AdminPagination/AdminPagination";
import GalleryManagementTable from "../../../components/templates/AdminDashboard/GalleryManagement/GalleryManagementTable/GalleryManagementTable";
import DeleteModal from "../../../components/modules/AdminDashboard/DeleteModal/DeleteModal";
import GalleryManagementForm from "../../../components/templates/AdminDashboard/GalleryManagement/GalleryManagementForm/GalleryManagementForm";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";

function GalleryManagement() {
  const { setHeaderConfig } = useAdminDashboardHeader();
  const [page, setPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: deleteGallery } = useDeleteGallery();
  const {
    data: galleryData,
    isLoading: isLoadingImages,
    isPending: isPendingImages,
    refetch: refetchGallery,
    isFetching: isFetchingGallery,
  } = useGetAllGallery(page, 5);

  useEffect(() => {
    setHeaderConfig({ title: "مدیریت گالری" });
    return () => {
      setHeaderConfig({ title: undefined, backButton: false });
    };
  }, [setHeaderConfig]);

  const handleDeleteClick = (id: string, title: string) => {
    setImageToDelete({ id, title });
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!imageToDelete) return;

    setIsDeleting(true);
    try {
      await deleteGallery(imageToDelete.id);
      showSuccessToast("تصویر با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      setDeleteModalOpen(false);
      setImageToDelete(null);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در حذف تصویر رخ داد";
      showErrorToast(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    if (!isDeleting) {
      setDeleteModalOpen(false);
      setImageToDelete(null);
    }
  };

  const images = galleryData?.data?.images || [];
  const meta = galleryData?.meta;

  return (
    <main>
      <SectionContainer>
        <h5 className="main-header ">لیست تصاویر</h5>

        <GalleryManagementTable
          images={images}
          isLoadingImages={isLoadingImages || isPendingImages}
          page={page}
          onDeleteClick={handleDeleteClick}
          onRefetch={refetchGallery}
          isRefetching={isFetchingGallery}
        />

        <div className="mb-12 mt-6">
          <AdminPagination
            meta={meta}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>

        <hr className="my-6 border-2 rounded-4xl border-gray-500" />

        <GalleryManagementForm />
      </SectionContainer>
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="حذف تصویر"
        message={`آیا از حذف تصویر ${imageToDelete?.title} اطمینان دارید؟ این عمل غیرقابل بازگشت است.`}
        confirmText="حذف"
        cancelText="انصراف"
        isLoading={isDeleting}
      />
    </main>
  );
}

export default GalleryManagement;

