import { useState, useEffect } from "react";
import AdminDashBaordHeader from "../AdminDashBaordHeader/AdminDashBaordHeader";
import {
  useGetAllServices,
  useDeleteService,
} from "../../../../services/useServices";
import { showSuccessToast, showErrorToast } from "../../../../utils/toastify";
import { useQueryClient } from "@tanstack/react-query";
import AdminPagination from "../AdminPagination/AdminPagination";
import ServiceManagementTable from "../../../templates/AdminDashboard/ServicesManagement/ServiceManagementTable/ServiceManagementTable";
import { useDebounce } from "use-debounce";
import DeleteModal from "../DeleteModal/DeleteModal";
import CustomInput from "../../CustomInput/CustomInput";
import ServiceManagementForm from "../../../templates/AdminDashboard/ServicesManagement/ServiceManagementForm/ServiceManagementForm";
import SectionContainer from "../SectionContainer/SectionContainer";

function ServicesManagement() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebounce(searchInput, 500);
  const [isSearching, setIsSearching] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: deleteService } = useDeleteService();
  const {
    data: servicesData,
    isLoading: isLoadingServices,
    isPending: isPendingServices,
  } = useGetAllServices(page, 5, debouncedSearch);

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
    if (!isLoadingServices) {
      // اگر مقدار جستجو با debounced value برابر است (یعنی کاربر دیگر تایپ نمی‌کند)
      if (debouncedSearch === searchInput) {
        setIsSearching(false);
      }
    }
  }, [isLoadingServices, debouncedSearch, searchInput]);

  const handleDeleteClick = (id: string, title: string) => {
    setServiceToDelete({ id, title });
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!serviceToDelete) return;

    setIsDeleting(true);
    try {
      await deleteService(serviceToDelete.id);
      showSuccessToast("خدمت با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["services"] });
      setDeleteModalOpen(false);
      setServiceToDelete(null);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در حذف خدمت رخ داد";
      showErrorToast(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    if (!isDeleting) {
      setDeleteModalOpen(false);
      setServiceToDelete(null);
    }
  };

  const services = servicesData?.data?.services || [];
  const meta = servicesData?.meta;

  return (
    <main>
      <AdminDashBaordHeader title="مدیریت خدمات" />

      <SectionContainer>
        <h5 className="main-header ">لیست خدمات</h5>

        {/* Search Input */}
        <div className="mb-4">
          <div className="relative max-w-md">
            <CustomInput
              labelText="جستجو"
              placeholder="جستجو بر اساس عنوان، توضیحات یا نکات..."
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

        <ServiceManagementTable
          services={services}
          isLoadingServices={isLoadingServices || isPendingServices}
          page={page}
          onDeleteClick={handleDeleteClick}
        />

        <div className="mb-12 mt-6">
          <AdminPagination
            meta={meta}
            onPageChange={(newPage: number) => setPage(newPage)}
          />
        </div>

        <hr className="my-6 border-2 rounded-4xl border-gray-500" />

        <ServiceManagementForm />
      </SectionContainer>
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="حذف خدمت"
        message={`آیا از حذف خدمت "${serviceToDelete?.title}" اطمینان دارید؟ این عمل غیرقابل بازگشت است.`}
        confirmText="حذف"
        cancelText="انصراف"
        isLoading={isDeleting}
      />
    </main>
  );
}

export default ServicesManagement;
