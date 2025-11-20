import { useState, useEffect } from "react";
import { useAdminDashboardHeader } from "../../../contexts";
import {
  useGetArticleCategories,
  useDeleteArticleCategory,
} from "../../../services/useCategories";
import { showSuccessToast, showErrorToast } from "../../../utils/toastify";
import { useQueryClient } from "@tanstack/react-query";
import ArticlesCategoryManagementTable from "../../../components/templates/AdminDashboard/ArticlesCategoryManagement/ArticlesCategoryManagementTable/ArticlesCategoryManagementTable";
import { useDebounce } from "use-debounce";
import DeleteModal from "../../../components/modules/AdminDashboard/DeleteModal/DeleteModal";
import CustomInput from "../../../components/modules/CustomInput/CustomInput";
import ArticlesCategoryManagementForm from "../../../components/templates/AdminDashboard/ArticlesCategoryManagement/ArticlesCategoryManagementForm/ArticlesCategoryManagementForm";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";

function ArticlesCategoryManagement() {
  const { setHeaderConfig } = useAdminDashboardHeader();
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebounce(searchInput, 500);
  const [isSearching, setIsSearching] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: deleteCategory } = useDeleteArticleCategory();
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isPending: isPendingCategories,
  } = useGetArticleCategories();

  useEffect(() => {
    setHeaderConfig({ title: "مدیریت دسته‌بندی مقالات" });
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
    if (!isLoadingCategories) {
      // اگر مقدار جستجو با debounced value برابر است (یعنی کاربر دیگر تایپ نمی‌کند)
      if (debouncedSearch === searchInput) {
        setIsSearching(false);
      }
    }
  }, [isLoadingCategories, debouncedSearch, searchInput]);

  const handleDeleteClick = (id: string, name: string) => {
    setCategoryToDelete({ id, name });
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;

    setIsDeleting(true);
    try {
      await deleteCategory(categoryToDelete.id);
      showSuccessToast("دسته‌بندی با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["articleCategories"] });
      setDeleteModalOpen(false);
      setCategoryToDelete(null);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در حذف دسته‌بندی رخ داد";
      showErrorToast(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    if (!isDeleting) {
      setDeleteModalOpen(false);
      setCategoryToDelete(null);
    }
  };

  // فیلتر کردن دسته‌بندی‌ها بر اساس جستجو
  const categories = categoriesData?.data?.categories || [];
  const filteredCategories = categories.filter(
    (category: { name?: string; description?: string; slug?: string }) => {
      if (!debouncedSearch.trim()) return true;
      const searchLower = debouncedSearch.toLowerCase();
      return (
        category.name?.toLowerCase().includes(searchLower) ||
        category.description?.toLowerCase().includes(searchLower) ||
        category.slug?.toLowerCase().includes(searchLower)
      );
    }
  );

  return (
    <main>
      <SectionContainer>
        <h5 className="main-header ">لیست دسته‌بندی‌ها</h5>

        {/* Search Input */}
        <div className="mb-4">
          <div className="relative max-w-md">
            <CustomInput
              labelText="جستجو"
              placeholder="جستجو بر اساس نام، توضیحات یا slug..."
              className="bg-white pr-12"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
            {isSearching && searchInput && (
              <div className="absolute left-6 top-[calc(100%-38px)] flex items-center pointer-events-none">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
              </div>
            )}
          </div>
        </div>

        <ArticlesCategoryManagementTable
          categories={filteredCategories}
          isLoadingCategories={isLoadingCategories || isPendingCategories}
          onDeleteClick={handleDeleteClick}
        />

        <hr className="my-6 border-2 rounded-4xl border-gray-500" />

        <ArticlesCategoryManagementForm />
      </SectionContainer>
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="حذف دسته‌بندی"
        message={`آیا از حذف دسته‌بندی ${categoryToDelete?.name} اطمینان دارید؟ این عمل غیرقابل بازگشت است.`}
        confirmText="حذف"
        cancelText="انصراف"
        isLoading={isDeleting}
      />
    </main>
  );
}

export default ArticlesCategoryManagement;
