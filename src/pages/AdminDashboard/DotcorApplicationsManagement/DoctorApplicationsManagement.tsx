import { useState, useEffect } from "react";
import { useAdminDashboardHeader } from "../../../contexts";
import {
  useGetAllDoctorApplications,
  useDeleteDoctorApplication,
  useMarkAsRead,
  useMarkAsUnread,
} from "../../../services/useDoctorApplications";
import { showSuccessToast, showErrorToast } from "../../../utils/toastify";
import { useQueryClient } from "@tanstack/react-query";
import AdminPagination from "../../../components/modules/AdminDashboard/AdminPagination/AdminPagination";
import DoctorApplicationsManagementTable from "../../../components/templates/AdminDashboard/DotcorApplicationsManagement/DoctorApplicationsManagementTable/DoctorApplicationsManagementTable";
import DoctorApplicationsStats from "../../../components/templates/AdminDashboard/DotcorApplicationsManagement/DoctorApplicationsStats/DoctorApplicationsStats";
import { useDebounce } from "use-debounce";
import DeleteModal from "../../../components/modules/AdminDashboard/DeleteModal/DeleteModal";
import ViewApplicationModal from "../../../components/modules/AdminDashboard/ViewApplicationModal/ViewApplicationModal";
import CustomInput from "../../../components/modules/CustomInput/CustomInput";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import { useCsrfToken } from "../../../services/useCsrfToken";
import type { DoctorApplication } from "../../../types/types";

function DoctorApplicationsManagement() {
  const { setHeaderConfig } = useAdminDashboardHeader();
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebounce(searchInput, 500);
  const [isSearching, setIsSearching] = useState(false);
  const [readFilter, setReadFilter] = useState<boolean | undefined>(undefined);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<DoctorApplication | null>(null);
  const queryClient = useQueryClient();
  const { mutateAsync: deleteApplication } = useDeleteDoctorApplication();
  const { mutateAsync: markAsRead } = useMarkAsRead();
  const { mutateAsync: markAsUnread } = useMarkAsUnread();
  const { refetch: refetchCsrfToken } = useCsrfToken();

  const {
    data: applicationsData,
    isLoading: isLoadingApplications,
    isPending: isPendingApplications,
    refetch: refetchApplications,
    isFetching: isFetchingApplications,
  } = useGetAllDoctorApplications(page, 5, debouncedSearch, readFilter);

  useEffect(() => {
    setHeaderConfig({ title: "مدیریت درخواست‌های همکاری پزشکان" });
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
    if (!isLoadingApplications) {
      // اگر مقدار جستجو با debounced value برابر است (یعنی کاربر دیگر تایپ نمی‌کند)
      if (debouncedSearch === searchInput) {
        setIsSearching(false);
      }
    }
  }, [isLoadingApplications, debouncedSearch, searchInput]);

  const handleDeleteClick = (id: string, name: string) => {
    setApplicationToDelete({ id, name });
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!applicationToDelete) return;

    setIsDeleting(true);
    try {
      await refetchCsrfToken();
      await deleteApplication(applicationToDelete.id);
      showSuccessToast("درخواست با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["doctorApplications"] });
      queryClient.invalidateQueries({
        queryKey: ["doctorApplicationsStats"],
      });
      setDeleteModalOpen(false);
      setApplicationToDelete(null);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در حذف درخواست رخ داد";
      showErrorToast(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    if (!isDeleting) {
      setDeleteModalOpen(false);
      setApplicationToDelete(null);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await refetchCsrfToken();
      await markAsRead(id);
      showSuccessToast("درخواست به عنوان خوانده شده علامت‌گذاری شد");
      queryClient.invalidateQueries({ queryKey: ["doctorApplications"] });
      queryClient.invalidateQueries({
        queryKey: ["doctorApplicationsStats"],
      });
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در به‌روزرسانی وضعیت درخواست رخ داد";
      showErrorToast(errorMessage);
    }
  };

  const handleMarkAsUnread = async (id: string) => {
    try {
      await refetchCsrfToken();
      await markAsUnread(id);
      showSuccessToast("درخواست به عنوان خوانده نشده علامت‌گذاری شد");
      queryClient.invalidateQueries({ queryKey: ["doctorApplications"] });
      queryClient.invalidateQueries({
        queryKey: ["doctorApplicationsStats"],
      });
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در به‌روزرسانی وضعیت درخواست رخ داد";
      showErrorToast(errorMessage);
    }
  };

  const handleViewApplication = (application: DoctorApplication) => {
    setSelectedApplication(application);
    setViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedApplication(null);
  };

  const applications = applicationsData?.data?.applications || [];
  const meta = applicationsData?.meta;

  return (
    <main>
      <SectionContainer>
        <DoctorApplicationsStats />

        <h5 className="main-header ">لیست درخواست‌ها</h5>

        {/* Search Input and Filters */}
        <div className="mb-4 flex flex-col md:flex-row  justify-between gap-4">
          <div className="relative max-w-md flex-1">
            <CustomInput
              labelText="جستجو"
              placeholder="جستجو بر اساس نام، ایمیل، شماره تماس یا اطلاعات..."
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

          {/* Filter by read status */}
          <div className="flex items-end gap-2">
            <label className="text-sm font-estedad-semibold mb-2">
              فیلتر وضعیت:
            </label>
            <select
              value={
                readFilter === undefined
                  ? "all"
                  : readFilter
                  ? "read"
                  : "unread"
              }
              onChange={(e) => {
                const value = e.target.value;
                setReadFilter(value === "all" ? undefined : value === "read");
                setPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">همه</option>
              <option value="read">خوانده شده</option>
              <option value="unread">خوانده نشده</option>
            </select>
          </div>
        </div>

        <DoctorApplicationsManagementTable
          applications={applications}
          isLoadingApplications={isLoadingApplications || isPendingApplications}
          page={page}
          onDeleteClick={handleDeleteClick}
          onMarkAsRead={handleMarkAsRead}
          onMarkAsUnread={handleMarkAsUnread}
          onApplicationClick={handleViewApplication}
          onRefetch={refetchApplications}
          isRefetching={isFetchingApplications}
        />

        <div className="mb-12 mt-6">
          <AdminPagination
            meta={meta}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </SectionContainer>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="حذف درخواست"
        message={`آیا از حذف درخواست ${applicationToDelete?.name} اطمینان دارید؟ این عمل غیرقابل بازگشت است.`}
        confirmText="حذف"
        cancelText="انصراف"
        isLoading={isDeleting}
      />

      <ViewApplicationModal
        isOpen={viewModalOpen}
        onClose={handleCloseViewModal}
        application={selectedApplication}
      />
    </main>
  );
}

export default DoctorApplicationsManagement;
