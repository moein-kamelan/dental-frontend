import { useState, useEffect } from "react";
import { useAdminDashboardHeader } from "../../../../contexts";
import {
  useGetAllReviews,
  useDeleteReview,
} from "../../../../services/useReviews";
import { showSuccessToast, showErrorToast } from "../../../../utils/toastify";
import { useQueryClient } from "@tanstack/react-query";
import AdminPagination from "../AdminPagination/AdminPagination";
import ReviewManagementTable from "../../../templates/AdminDashboard/ReviewsManagement/ReviewManagementTable/ReviewManagementTable";
import { useDebounce } from "use-debounce";
import DeleteModal from "../DeleteModal/DeleteModal";
import CustomInput from "../../CustomInput/CustomInput";
import ReviewManagementForm from "../../../templates/AdminDashboard/ReviewsManagement/ReviewManagementForm/ReviewManagementForm";
import SectionContainer from "../SectionContainer/SectionContainer";

function ReviewsManagement() {
  const { setHeaderConfig } = useAdminDashboardHeader();
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebounce(searchInput, 500);
  const [isSearching, setIsSearching] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: deleteReview } = useDeleteReview();
  const {
    data: reviewsData,
    isLoading: isLoadingReviews,
    isPending: isPendingReviews,
    refetch: refetchReviews,
    isFetching: isFetchingReviews,
  } = useGetAllReviews(page, 5, debouncedSearch);

  useEffect(() => {
    setHeaderConfig({ title: "مدیریت نظرات" });
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
    if (!isLoadingReviews) {
      // اگر مقدار جستجو با debounced value برابر است (یعنی کاربر دیگر تایپ نمی‌کند)
      if (debouncedSearch === searchInput) {
        setIsSearching(false);
      }
    }
  }, [isLoadingReviews, debouncedSearch, searchInput]);

  const handleDeleteClick = (id: string, name: string) => {
    setReviewToDelete({ id, name });
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!reviewToDelete) return;

    setIsDeleting(true);
    try {
      await deleteReview(reviewToDelete.id);
      showSuccessToast("نظر با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      setDeleteModalOpen(false);
      setReviewToDelete(null);
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
      setReviewToDelete(null);
    }
  };

  const reviews = reviewsData?.data?.reviews || [];
  const meta = reviewsData?.meta;

  return (
    <main>
      <SectionContainer>
        <h5 className="main-header ">لیست نظرات</h5>

        {/* Search Input */}
        <div className="mb-4">
          <div className="relative max-w-md">
            <CustomInput
              labelText="جستجو"
              placeholder="جستجو بر اساس نام یا متن نظر..."
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

        <ReviewManagementTable
          reviews={reviews}
          isLoadingReviews={isLoadingReviews || isPendingReviews}
          page={page}
          onDeleteClick={handleDeleteClick}
          onRefetch={refetchReviews}
          isRefetching={isFetchingReviews}
        />

        <div className="mb-12 mt-6">
          <AdminPagination
            meta={meta}
            onPageChange={(newPage: number) => setPage(newPage)}
          />
        </div>

        <hr className="my-6 border-2 rounded-4xl border-gray-500" />

        <ReviewManagementForm />
      </SectionContainer>
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="حذف نظر"
        message={`آیا از حذف نظر "${reviewToDelete?.name}" اطمینان دارید؟ این عمل غیرقابل بازگشت است.`}
        confirmText="حذف"
        cancelText="انصراف"
        isLoading={isDeleting}
      />
    </main>
  );
}

export default ReviewsManagement;

