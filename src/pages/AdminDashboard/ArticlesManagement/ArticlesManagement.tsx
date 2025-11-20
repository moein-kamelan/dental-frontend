import { useState, useEffect } from "react";
import { useAdminDashboardHeader } from "../../../contexts";
import {
  useGetAllArticles,
  useDeleteArticle,
} from "../../../services/useArticles";
import { showSuccessToast, showErrorToast } from "../../../utils/toastify";
import { useQueryClient } from "@tanstack/react-query";
import AdminPagination from "../../../components/modules/AdminDashboard/AdminPagination/AdminPagination";
import ArticleManagementTable from "../../../components/templates/AdminDashboard/ArticlesManagement/ArticleManagementTable/ArticleManagementTable";
import { useDebounce } from "use-debounce";
import DeleteModal from "../../../components/modules/AdminDashboard/DeleteModal/DeleteModal";
import CustomInput from "../../../components/modules/CustomInput/CustomInput";
import ArticleManagementForm from "../../../components/templates/AdminDashboard/ArticlesManagement/ArticleManagementForm/ArticleManagementForm";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";

function ArticlesManagement() {
  const { setHeaderConfig } = useAdminDashboardHeader();
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebounce(searchInput, 500);
  const [isSearching, setIsSearching] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: deleteArticle } = useDeleteArticle();
  const {
    data: articlesData,
    isLoading: isLoadingArticles,
    isPending: isPendingArticles,
  } = useGetAllArticles(page, 5, debouncedSearch, "");

  useEffect(() => {
    setHeaderConfig({ title: "مدیریت مقالات" });
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
    if (!isLoadingArticles) {
      // اگر مقدار جستجو با debounced value برابر است (یعنی کاربر دیگر تایپ نمی‌کند)
      if (debouncedSearch === searchInput) {
        setIsSearching(false);
      }
    }
  }, [isLoadingArticles, debouncedSearch, searchInput]);

  const handleDeleteClick = (id: string, title: string) => {
    setArticleToDelete({ id, title });
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!articleToDelete) return;

    setIsDeleting(true);
    try {
      await deleteArticle(articleToDelete.id);
      showSuccessToast("مقاله با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      setDeleteModalOpen(false);
      setArticleToDelete(null);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در حذف مقاله رخ داد";
      showErrorToast(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    if (!isDeleting) {
      setDeleteModalOpen(false);
      setArticleToDelete(null);
    }
  };

  const articles = articlesData?.data?.articles || [];
  const meta = articlesData?.meta;

  return (
    <main>
      <SectionContainer>
        <h5 className="main-header ">لیست مقالات</h5>

        {/* Search Input */}
        <div className="mb-4">
          <div className="relative max-w-md">
            <CustomInput
              labelText="جستجو"
              placeholder="جستجو بر اساس عنوان، خلاصه یا محتوا..."
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

        <ArticleManagementTable
          articles={articles}
          isLoadingArticles={isLoadingArticles || isPendingArticles}
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

        <ArticleManagementForm />
      </SectionContainer>
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="حذف مقاله"
        message={`آیا از حذف مقاله "${articleToDelete?.title}" اطمینان دارید؟ این عمل غیرقابل بازگشت است.`}
        confirmText="حذف"
        cancelText="انصراف"
        isLoading={isDeleting}
      />
    </main>
  );
}

export default ArticlesManagement;
