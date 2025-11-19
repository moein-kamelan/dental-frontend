import { useState } from "react";
import AdminDashBaordHeader from "../../../components/modules/AdminDashboard/AdminDashBaordHeader/AdminDashBaordHeader";
import {
  useGetAllClinics,
  useDeleteClinic,
} from "../../../services/useClinics";
import { showSuccessToast, showErrorToast } from "../../../utils/toastify";
import { useQueryClient } from "@tanstack/react-query";
import AdminPagination from "../../../components/modules/AdminDashboard/AdminPagination/AdminPagination";
import ClinicManagementTable from "../../../components/templates/AdminDashboard/ClinicsManagement/ClinicManagementTable/ClinicManagementTable";
import DeleteModal from "../../../components/modules/AdminDashboard/DeleteModal/DeleteModal";
import ClinicManagementForm from "../../../components/templates/AdminDashboard/ClinicsManagement/ClinicManagementForm/ClinicManagementForm";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";

function ClinicsManagement() {
  const [page, setPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [clinicToDelete, setClinicToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: deleteClinic } = useDeleteClinic();
  const {
    data: clinicsData,
    isLoading: isLoadingClinics,
    isPending: isPendingClinics,
  } = useGetAllClinics(page, 5);

  const handleDeleteClick = (id: string, name: string) => {
    setClinicToDelete({ id, name });
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!clinicToDelete) return;

    setIsDeleting(true);
    try {
      await deleteClinic(clinicToDelete.id);
      showSuccessToast("کلینیک با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["clinics"] });
      setDeleteModalOpen(false);
      setClinicToDelete(null);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در حذف کلینیک رخ داد";
      showErrorToast(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    if (!isDeleting) {
      setDeleteModalOpen(false);
      setClinicToDelete(null);
    }
  };

  const clinics = clinicsData?.data?.clinics || [];
  const meta = clinicsData?.meta;

  return (
    <main>
      <AdminDashBaordHeader title="مدیریت کلینیک‌ها" />

      <SectionContainer>
        <h5 className="main-header ">لیست کلینیک‌ها</h5>

        <ClinicManagementTable
          clinics={clinics}
          isLoadingClinics={isLoadingClinics || isPendingClinics}
          page={page}
          onDeleteClick={handleDeleteClick}
        />

        <div className="mb-12 mt-6">
          <AdminPagination
            meta={meta}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>

        <hr className="my-6 border-2 rounded-4xl border-gray-500" />

        <ClinicManagementForm />
      </SectionContainer>
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="حذف کلینیک"
        message={`آیا از حذف کلینیک ${clinicToDelete?.name} اطمینان دارید؟ این عمل غیرقابل بازگشت است.`}
        confirmText="حذف"
        cancelText="انصراف"
        isLoading={isDeleting}
      />
    </main>
  );
}

export default ClinicsManagement;
