import { useState, useEffect } from "react";
import { useAdminDashboardHeader } from "../../../contexts";
import {
  useGetAllHeroSliders,
  useDeleteHeroSlider,
} from "../../../services/useHeroSliders";
import { showSuccessToast, showErrorToast } from "../../../utils/toastify";
import { useQueryClient } from "@tanstack/react-query";
import AdminPagination from "../../../components/modules/AdminDashboard/AdminPagination/AdminPagination";
import BannerManagementTable from "../../../components/templates/AdminDashboard/BannerManagement/BannerManagementTable/BannerManagementTable";
import DeleteModal from "../../../components/modules/AdminDashboard/DeleteModal/DeleteModal";
import BannerManagementForm from "../../../components/templates/AdminDashboard/BannerManagement/BannerManagementForm/BannerManagementForm";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import Select from "react-select";
import type { OptionType } from "../../../types/types";
import { components } from "react-select";
import type { DropdownIndicatorProps } from "react-select";

const DropdownIndicator = (props: DropdownIndicatorProps<OptionType>) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 7.5L10 12.5L15 7.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </components.DropdownIndicator>
  );
};

const publishedOptions: OptionType[] = [
  { value: "", label: "همه" },
  { value: "true", label: "منتشر شده" },
  { value: "false", label: "منتشر نشده" },
];

function BannerManagement() {
  const { setHeaderConfig } = useAdminDashboardHeader();
  const [page, setPage] = useState(1);
  const [publishedFilter, setPublishedFilter] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: deleteBanner } = useDeleteHeroSlider();
  const {
    data: bannersData,
    isLoading: isLoadingBanners,
    isPending: isPendingBanners,
    refetch: refetchBanners,
    isFetching: isFetchingBanners,
  } = useGetAllHeroSliders(page, 5, publishedFilter || undefined);

  useEffect(() => {
    setHeaderConfig({ title: "مدیریت بنر" });
    return () => {
      setHeaderConfig({ title: undefined, backButton: false });
    };
  }, [setHeaderConfig]);

  const handleDeleteClick = (id: string, title: string) => {
    setBannerToDelete({ id, title });
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!bannerToDelete) return;

    setIsDeleting(true);
    try {
      await deleteBanner(bannerToDelete.id);
      showSuccessToast("بنر با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["heroSliders"] });
      setDeleteModalOpen(false);
      setBannerToDelete(null);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در حذف بنر رخ داد";
      showErrorToast(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    if (!isDeleting) {
      setDeleteModalOpen(false);
      setBannerToDelete(null);
    }
  };

  const banners = bannersData?.data?.sliders || [];
  const meta = bannersData?.meta;

  return (
    <main>
      <SectionContainer>
        <h5 className="main-header">لیست بنرها</h5>

        {/* Filter */}
        <div className="mb-4">
          <div className="max-w-md">
            <label className="block text-dark font-estedad-lightbold mb-2 mr-4">
              فیلتر بر اساس وضعیت
            </label>
            <Select<OptionType>
              options={publishedOptions}
              value={publishedOptions.find(
                (opt) => opt.value === publishedFilter
              )}
              onChange={(selected) => {
                setPublishedFilter(selected?.value || "");
                setPage(1);
              }}
              placeholder="همه"
              components={{ DropdownIndicator }}
              classNames={{
                control: () =>
                  `!text-dark px-5 !min-h-[52px] !rounded-lg !border-2 !border-main-border-color !focus:outline-none h-full !cursor-pointer`,
                option: ({ isFocused, isSelected }) =>
                  `px-3 py-2 cursor-pointer !text-lg border-r-6 ${
                    isSelected
                      ? "!bg-primary text-white !cursor-pointer"
                      : isFocused
                      ? "!text-secondary !cursor-pointer"
                      : "bg-white !cursor-pointer"
                  }`,
                menu: () =>
                  "!mt-0 !rounded-t-none shadow-lg bg-white overflow-hidden",
                placeholder: () => `!text-dark`,
              }}
            />
          </div>
        </div>

        <BannerManagementTable
          banners={banners}
          isLoadingBanners={isLoadingBanners || isPendingBanners}
          page={page}
          onDeleteClick={handleDeleteClick}
          onRefetch={refetchBanners}
          isRefetching={isFetchingBanners}
        />

        <div className="mb-12 mt-6">
          <AdminPagination
            meta={meta}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>

        <hr className="my-6 border-2 rounded-4xl border-gray-500" />

        <BannerManagementForm />
      </SectionContainer>
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="حذف بنر"
        message={`آیا از حذف بنر "${bannerToDelete?.title}" اطمینان دارید؟ این عمل غیرقابل بازگشت است.`}
        confirmText="حذف"
        cancelText="انصراف"
        isLoading={isDeleting}
      />
    </main>
  );
}

export default BannerManagement;
