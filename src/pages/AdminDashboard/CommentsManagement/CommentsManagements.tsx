import { useState, useEffect } from "react";
import { useAdminDashboardHeader } from "../../../contexts";
import {
  useGetAllComments,
  useDeleteComment,
} from "../../../services/useComments";
import { showSuccessToast, showErrorToast } from "../../../utils/toastify";
import { useQueryClient } from "@tanstack/react-query";
import AdminPagination from "../../../components/modules/AdminDashboard/AdminPagination/AdminPagination";
import DoctorCommentsTable from "../../../components/templates/AdminDashboard/CommentsManagements/DoctorCommentsTable/DoctorCommentsTable";
import ArticleCommentsTable from "../../../components/templates/AdminDashboard/CommentsManagements/ArticleCommentsTable/ArticleCommentsTable";
import ServiceCommentsTable from "../../../components/templates/AdminDashboard/CommentsManagements/ServiceCommentsTable/ServiceCommentsTable";
import CommentsStats from "../../../components/templates/AdminDashboard/CommentsManagements/CommentsStats/CommentsStats";
import { useDebounce } from "use-debounce";
import DeleteModal from "../../../components/modules/AdminDashboard/DeleteModal/DeleteModal";
import CustomInput from "../../../components/modules/CustomInput/CustomInput";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import ViewCommentModal from "../../../components/modules/AdminDashboard/ViewCommentModal/ViewCommentModal";
import type { Comment } from "../../../types/types";

type CommentType = "doctor" | "article" | "service";

function CommentsManagements() {
  const { setHeaderConfig } = useAdminDashboardHeader();
  const [activeTab, setActiveTab] = useState<CommentType>("doctor");
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebounce(searchInput, 500);
  const [isSearching, setIsSearching] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<{
    id: string;
    content: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const queryClient = useQueryClient();
  const { mutateAsync: deleteComment } = useDeleteComment();

  useEffect(() => {
    setHeaderConfig({ title: "مدیریت نظرات" });
    return () => {
      setHeaderConfig({ title: undefined, backButton: false });
    };
  }, [setHeaderConfig]);

  // کامنت‌های پزشکان
  const {
    data: doctorCommentsData,
    isLoading: isLoadingDoctorComments,
    isPending: isPendingDoctorComments,
    refetch: refetchDoctorComments,
    isFetching: isFetchingDoctorComments,
  } = useGetAllComments(page, 5, debouncedSearch, "doctor");

  // کامنت‌های مقالات
  const {
    data: articleCommentsData,
    isLoading: isLoadingArticleComments,
    isPending: isPendingArticleComments,
    refetch: refetchArticleComments,
    isFetching: isFetchingArticleComments,
  } = useGetAllComments(page, 5, debouncedSearch, "article");

  // کامنت‌های خدمات
  const {
    data: serviceCommentsData,
    isLoading: isLoadingServiceComments,
    isPending: isPendingServiceComments,
    refetch: refetchServiceComments,
    isFetching: isFetchingServiceComments,
  } = useGetAllComments(page, 5, debouncedSearch, "service");

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
    const isLoading =
      activeTab === "doctor"
        ? isLoadingDoctorComments
        : activeTab === "article"
        ? isLoadingArticleComments
        : isLoadingServiceComments;

    if (!isLoading) {
      // اگر مقدار جستجو با debounced value برابر است (یعنی کاربر دیگر تایپ نمی‌کند)
      if (debouncedSearch === searchInput) {
        setIsSearching(false);
      }
    }
  }, [
    isLoadingDoctorComments,
    isLoadingArticleComments,
    isLoadingServiceComments,
    debouncedSearch,
    searchInput,
    activeTab,
  ]);

  const handleDeleteClick = (id: string, content: string) => {
    setCommentToDelete({ id, content });
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!commentToDelete) return;

    setIsDeleting(true);
    try {
      await deleteComment(commentToDelete.id);
      showSuccessToast("نظر با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["commentsStats"] });
      setDeleteModalOpen(false);
      setCommentToDelete(null);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در حذف نظر رخ داد";
      showErrorToast(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    if (!isDeleting) {
      setDeleteModalOpen(false);
      setCommentToDelete(null);
    }
  };

  const handleCommentClick = (comment: Comment) => {
    setSelectedComment(comment);
    setViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedComment(null);
  };

  // داده‌های مربوط به تب فعال
  const getActiveTabData = () => {
    if (activeTab === "doctor") {
      return {
        comments: doctorCommentsData?.data?.comments || [],
        meta: doctorCommentsData?.meta,
        isLoading: isLoadingDoctorComments || isPendingDoctorComments,
        refetch: refetchDoctorComments,
        isRefetching: isFetchingDoctorComments,
      };
    } else if (activeTab === "article") {
      return {
        comments: articleCommentsData?.data?.comments || [],
        meta: articleCommentsData?.meta,
        isLoading: isLoadingArticleComments || isPendingArticleComments,
        refetch: refetchArticleComments,
        isRefetching: isFetchingArticleComments,
      };
    } else {
      return {
        comments: serviceCommentsData?.data?.comments || [],
        meta: serviceCommentsData?.meta,
        isLoading: isLoadingServiceComments || isPendingServiceComments,
        refetch: refetchServiceComments,
        isRefetching: isFetchingServiceComments,
      };
    }
  };

  const activeTabData = getActiveTabData();

  // وقتی تب تغییر می‌کند، صفحه را به 1 برگردان
  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  // وقتی جستجو تغییر می‌کند (بعد از debounce)، صفحه را به 1 برگردان
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  return (
    <main>
      <SectionContainer>
        <CommentsStats />

        <h5 className="main-header ">لیست نظرات</h5>

        {/* Tabs */}
        <div className="mb-6 border-b border-main-border-color">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("doctor")}
              className={`px-6 py-3 font-estedad-medium text-sm transition-colors ${
                activeTab === "doctor"
                  ? "border-b-2 border-primary text-primary"
                  : "text-paragray hover:text-dark"
              }`}
            >
              <i className="fas fa-user-md ml-2"></i>
              نظرات پزشکان
            </button>
            <button
              onClick={() => setActiveTab("article")}
              className={`px-6 py-3 font-estedad-medium text-sm transition-colors ${
                activeTab === "article"
                  ? "border-b-2 border-primary text-primary"
                  : "text-paragray hover:text-dark"
              }`}
            >
              <i className="fas fa-newspaper ml-2"></i>
              نظرات مقالات
            </button>
            <button
              onClick={() => setActiveTab("service")}
              className={`px-6 py-3 font-estedad-medium text-sm transition-colors ${
                activeTab === "service"
                  ? "border-b-2 border-primary text-primary"
                  : "text-paragray hover:text-dark"
              }`}
            >
              <i className="fas fa-handshake ml-2"></i>
              نظرات خدمات
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <div className="relative max-w-md">
            <CustomInput
              labelText="جستجو"
              placeholder="جستجو بر اساس متن نظر، نام کاربر، نام پزشک/مقاله/خدمت..."
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

        {/* Tables based on active tab */}
        {activeTab === "doctor" && (
          <DoctorCommentsTable
            comments={activeTabData.comments}
            isLoadingComments={activeTabData.isLoading}
            page={page}
            onDeleteClick={handleDeleteClick}
            onCommentClick={handleCommentClick}
            onRefetch={activeTabData.refetch}
            isRefetching={activeTabData.isRefetching}
          />
        )}

        {activeTab === "article" && (
          <ArticleCommentsTable
            comments={activeTabData.comments}
            isLoadingComments={activeTabData.isLoading}
            page={page}
            onDeleteClick={handleDeleteClick}
            onCommentClick={handleCommentClick}
            onRefetch={activeTabData.refetch}
            isRefetching={activeTabData.isRefetching}
          />
        )}

        {activeTab === "service" && (
          <ServiceCommentsTable
            comments={activeTabData.comments}
            isLoadingComments={activeTabData.isLoading}
            page={page}
            onDeleteClick={handleDeleteClick}
            onCommentClick={handleCommentClick}
            onRefetch={activeTabData.refetch}
            isRefetching={activeTabData.isRefetching}
          />
        )}

        <div className="mb-12 mt-6">
          <AdminPagination
            meta={activeTabData.meta}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </SectionContainer>
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="حذف نظر"
        message={`آیا از حذف این نظر اطمینان دارید؟ این عمل غیرقابل بازگشت است.`}
        confirmText="حذف"
        cancelText="انصراف"
        isLoading={isDeleting}
      />
      <ViewCommentModal
        isOpen={viewModalOpen}
        onClose={handleCloseViewModal}
        comment={selectedComment}
        commentType={activeTab}
        onRefetch={activeTabData.refetch}
      />
    </main>
  );
}

export default CommentsManagements;
