import { useState, useEffect } from "react";
import { useAdminDashboardHeader } from "../../../contexts";
import {
  useGetAllInsurances,
  useDeleteInsurance,
} from "../../../services/useInsurances";
import { showSuccessToast, showErrorToast } from "../../../utils/toastify";
import { useQueryClient } from "@tanstack/react-query";
import AdminPagination from "../../../components/modules/AdminDashboard/AdminPagination/AdminPagination";
import InsuranceManagementTable from "../../../components/templates/AdminDashboard/InsurancesManagement/InsuranceManagementTable/InsuranceManagementTable";
import DeleteModal from "../../../components/modules/AdminDashboard/DeleteModal/DeleteModal";
import InsuranceManagementForm from "../../../components/templates/AdminDashboard/InsurancesManagement/InsuranceManagementForm/InsuranceManagementForm";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";

function InsurancesManagement() {
  const { setHeaderConfig } = useAdminDashboardHeader();
  const [page, setPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [insuranceToDelete, setInsuranceToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: deleteInsurance } = useDeleteInsurance();
  const {
    data: insurancesData,
    isLoading: isLoadingInsurances,
    isPending: isPendingInsurances,
    refetch: refetchInsurances,
    isFetching: isFetchingInsurances,
  } = useGetAllInsurances(page, 5, undefined);

  useEffect(() => {
    setHeaderConfig({ title: "مدیریت سازمان‌های بیمه" });
    return () => {
      setHeaderConfig({ title: undefined, backButton: false });
    };
  }, [setHeaderConfig]);

  const handleDeleteClick = (id: string, name: string) => {
    setInsuranceToDelete({ id, name });
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!insuranceToDelete) return;

    setIsDeleting(true);
    try {
      await deleteInsurance(insuranceToDelete.id);
      showSuccessToast("سازمان بیمه با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["insurances"] });
      setDeleteModalOpen(false);
      setInsuranceToDelete(null);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در حذف سازمان بیمه رخ داد";
      showErrorToast(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    if (!isDeleting) {
      setDeleteModalOpen(false);
      setInsuranceToDelete(null);
    }
  };

  const insurances = insurancesData?.data?.organizations || [];
  const meta = insurancesData?.meta;

  return (
    <main>
      <SectionContainer>
        <h5 className="main-header ">لیست سازمان‌های بیمه</h5>

        <InsuranceManagementTable
          insurances={insurances}
          isLoadingInsurances={isLoadingInsurances || isPendingInsurances}
          page={page}
          onDeleteClick={handleDeleteClick}
          onRefetch={refetchInsurances}
          isRefetching={isFetchingInsurances}
        />

        <div className="mb-12 mt-6">
          <AdminPagination
            meta={meta}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>

        <hr className="my-6 border-2 rounded-4xl border-gray-500" />

        <InsuranceManagementForm />
      </SectionContainer>
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="حذف سازمان بیمه"
        message={`آیا از حذف سازمان بیمه "${insuranceToDelete?.name}" اطمینان دارید؟ این عمل غیرقابل بازگشت است.`}
        confirmText="حذف"
        cancelText="انصراف"
        isLoading={isDeleting}
      />
    </main>
  );
}

export default InsurancesManagement;
