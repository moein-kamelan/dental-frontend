import { useState, useEffect } from "react";
import { useAdminDashboardHeader } from "../../../contexts";
import {
  useGetAllDoctors,
  useDeleteDoctor,
} from "../../../services/useDoctors";
import { showSuccessToast, showErrorToast } from "../../../utils/toastify";
import { useQueryClient } from "@tanstack/react-query";
import AdminPagination from "../../../components/modules/AdminDashboard/AdminPagination/AdminPagination";
import DoctorsManagementTable from "../../../components/templates/AdminDashboard/DoctorsManagement/DoctorManagementTable/DoctorManagementTable";
import { useDebounce } from "use-debounce";
import DeleteModal from "../../../components/modules/AdminDashboard/DeleteModal/DeleteModal";
import CustomInput from "../../../components/modules/CustomInput/CustomInput";
import DoctorManagementForm from "../../../components/templates/AdminDashboard/DoctorsManagement/DoctorManagementForm/DoctorManagementForm";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";

function DoctorsManagement() {
  const { setHeaderConfig } = useAdminDashboardHeader();
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebounce(searchInput, 500);
  const [isSearching, setIsSearching] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: deleteDoctor } = useDeleteDoctor();
  const {
    data: doctorsData,
    isLoading: isLoadingDoctors,
    isPending: isPendingDoctors,
  } = useGetAllDoctors(page, 5, debouncedSearch);

  useEffect(() => {
    setHeaderConfig({ title: "مدیریت پزشکان" });
    return () => {
      setHeaderConfig({ title: undefined, backButton: false });
    };
  }, [setHeaderConfig]);

  // مدیریت loading state برای جستجو
  useEffect(() => {
    if (searchInput.trim()) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [searchInput]);

  useEffect(() => {
    // وقتی درخواست تمام شد و نتیجه آمده، loading را خاموش کن
    if (!isLoadingDoctors) {
      // اگر مقدار جستجو با debounced value برابر است (یعنی کاربر دیگر تایپ نمی‌کند)
      if (debouncedSearch === searchInput) {
        setIsSearching(false);
      }
    }
  }, [isLoadingDoctors, debouncedSearch, searchInput]);

  const handleDeleteClick = (
    id: string,
    firstName: string,
    lastName: string
  ) => {
    setDoctorToDelete({ id, name: `${firstName} ${lastName}` });
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!doctorToDelete) return;

    setIsDeleting(true);
    try {
      await deleteDoctor(doctorToDelete.id);
      showSuccessToast("پزشک با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      setDeleteModalOpen(false);
      setDoctorToDelete(null);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در حذف پزشک رخ داد";
      showErrorToast(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    if (!isDeleting) {
      setDeleteModalOpen(false);
      setDoctorToDelete(null);
    }
  };

  const doctors = doctorsData?.data?.doctors || [];
  const meta = doctorsData?.meta;

  return (
    <main>
      <SectionContainer>
        <h5 className="main-header ">لیست پزشکان</h5>

        {/* Search Input */}
        <div className="mb-4">
          <div className="relative max-w-md">
            <CustomInput
              labelText="جستجو"
              placeholder="جستجو بر اساس نام، نام خانوادگی یا بیوگرافی..."
              className="bg-white pr-12"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setPage(1);
              }}
            />
            {isSearching && searchInput && (
              <div className="absolute left-6 top-[calc(100%-38px)] flex items-center pointer-events-none">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
              </div>
            )}
          </div>
        </div>

        <DoctorsManagementTable
          doctors={doctors}
          isLoadingDoctors={isLoadingDoctors || isPendingDoctors}
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

        <DoctorManagementForm />
      </SectionContainer>
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="حذف پزشک"
        message={`آیا از حذف دکتر ${doctorToDelete?.name} اطمینان دارید؟ این عمل غیرقابل بازگشت است.`}
        confirmText="حذف"
        cancelText="انصراف"
        isLoading={isDeleting}
      />
    </main>
  );
}

export default DoctorsManagement;
