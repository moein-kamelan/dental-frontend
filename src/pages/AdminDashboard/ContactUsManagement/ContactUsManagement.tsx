import { useState, useEffect } from "react";
import AdminDashBaordHeader from "../../../components/modules/AdminDashboard/AdminDashBaordHeader/AdminDashBaordHeader";
import {
  useGetAllContactMessages,
  useDeleteContactMessage,
  useMarkAsRead,
  useMarkAsUnread,
} from "../../../services/useContact";
import { showSuccessToast, showErrorToast } from "../../../utils/toastify";
import { useQueryClient } from "@tanstack/react-query";
import AdminPagination from "../../../components/modules/AdminDashboard/AdminPagination/AdminPagination";
import ContactUsManagementTable from "../../../components/templates/AdminDashboard/ContactUsManagement/ContactUsManagementTable/ContactUsManagementTable";
import ContactUsStats from "../../../components/templates/AdminDashboard/ContactUsManagement/ContactUsStats/ContactUsStats";
import { useDebounce } from "use-debounce";
import DeleteModal from "../../../components/modules/AdminDashboard/DeleteModal/DeleteModal";
import ViewMessageModal from "../../../components/modules/AdminDashboard/ViewMessageModal/ViewMessageModal";
import CustomInput from "../../../components/modules/CustomInput/CustomInput";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import { useCsrfToken } from "../../../services/useCsrfToken";
import type { ContactMessage } from "../../../types/types";

function ContactUsManagement() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebounce(searchInput, 500);
  const [isSearching, setIsSearching] = useState(false);
  const [readFilter, setReadFilter] = useState<boolean | undefined>(undefined);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const queryClient = useQueryClient();
  const { mutateAsync: deleteMessage } = useDeleteContactMessage();
  const { mutateAsync: markAsRead } = useMarkAsRead();
  const { mutateAsync: markAsUnread } = useMarkAsUnread();
  const { refetch: refetchCsrfToken } = useCsrfToken();

  const {
    data: messagesData,
    isLoading: isLoadingMessages,
    isPending: isPendingMessages,
  } = useGetAllContactMessages(page, 5, debouncedSearch, readFilter);

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
    if (!isLoadingMessages) {
      // اگر مقدار جستجو با debounced value برابر است (یعنی کاربر دیگر تایپ نمی‌کند)
      if (debouncedSearch === searchInput) {
        setIsSearching(false);
      }
    }
  }, [isLoadingMessages, debouncedSearch, searchInput]);

  const handleDeleteClick = (id: string, name: string) => {
    setMessageToDelete({ id, name });
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!messageToDelete) return;

    setIsDeleting(true);
    try {
      await refetchCsrfToken();
      await deleteMessage(messageToDelete.id);
      showSuccessToast("پیام با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["contactMessages"] });
      queryClient.invalidateQueries({ queryKey: ["contactMessagesStats"] });
      setDeleteModalOpen(false);
      setMessageToDelete(null);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در حذف پیام رخ داد";
      showErrorToast(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    if (!isDeleting) {
      setDeleteModalOpen(false);
      setMessageToDelete(null);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await refetchCsrfToken();
      await markAsRead(id);
      showSuccessToast("پیام به عنوان خوانده شده علامت‌گذاری شد");
      queryClient.invalidateQueries({ queryKey: ["contactMessages"] });
      queryClient.invalidateQueries({ queryKey: ["contactMessagesStats"] });
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در به‌روزرسانی وضعیت پیام رخ داد";
      showErrorToast(errorMessage);
    }
  };

  const handleMarkAsUnread = async (id: string) => {
    try {
      await refetchCsrfToken();
      await markAsUnread(id);
      showSuccessToast("پیام به عنوان خوانده نشده علامت‌گذاری شد");
      queryClient.invalidateQueries({ queryKey: ["contactMessages"] });
      queryClient.invalidateQueries({ queryKey: ["contactMessagesStats"] });
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در به‌روزرسانی وضعیت پیام رخ داد";
      showErrorToast(errorMessage);
    }
  };

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedMessage(null);
  };

  const messages = messagesData?.data?.messages || [];
  const meta = messagesData?.meta;

  return (
    <main>
      <AdminDashBaordHeader title="مدیریت تماس با ما" />

      <SectionContainer>
        <ContactUsStats />

        <h5 className="main-header ">لیست پیام‌ها</h5>

        {/* Search Input and Filters */}
        <div className="mb-4 flex flex-col md:flex-row  justify-between gap-4">
          <div className="relative max-w-md flex-1">
            <CustomInput
              labelText="جستجو"
              placeholder="جستجو بر اساس نام، ایمیل، موضوع یا پیام..."
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

        <ContactUsManagementTable
          messages={messages}
          isLoadingMessages={isLoadingMessages || isPendingMessages}
          page={page}
          onDeleteClick={handleDeleteClick}
          onMarkAsRead={handleMarkAsRead}
          onMarkAsUnread={handleMarkAsUnread}
          onMessageClick={handleViewMessage}
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
        title="حذف پیام"
        message={`آیا از حذف پیام ${messageToDelete?.name} اطمینان دارید؟ این عمل غیرقابل بازگشت است.`}
        confirmText="حذف"
        cancelText="انصراف"
        isLoading={isDeleting}
      />

      <ViewMessageModal
        isOpen={viewModalOpen}
        onClose={handleCloseViewModal}
        message={selectedMessage}
      />
    </main>
  );
}

export default ContactUsManagement;
