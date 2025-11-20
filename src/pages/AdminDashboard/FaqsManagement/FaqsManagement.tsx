import { useState } from "react";
import AdminDashBaordHeader from "../../../components/modules/AdminDashboard/AdminDashBaordHeader/AdminDashBaordHeader";
import { useGetAllFaqs, useDeleteFaq } from "../../../services/useFaqs";
import { showSuccessToast, showErrorToast } from "../../../utils/toastify";
import { useQueryClient } from "@tanstack/react-query";
import AdminPagination from "../../../components/modules/AdminDashboard/AdminPagination/AdminPagination";
import FaqsManagementTable from "../../../components/templates/AdminDashboard/FaqsManagement/FaqsManagementTable/FaqsManagementTable";
import DeleteModal from "../../../components/modules/AdminDashboard/DeleteModal/DeleteModal";
import FaqManagementForm from "../../../components/templates/AdminDashboard/FaqsManagement/FaqManagementForm/FaqManagementForm";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import Select, { components } from "react-select";
import type { DropdownIndicatorProps } from "react-select";
import type { OptionType } from "../../../types/types";

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
  { value: "false", label: "پیش‌نویس" },
];

function FaqsManagement() {
  const [page, setPage] = useState(1);
  const [publishedFilter, setPublishedFilter] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState<{
    id: string;
    question: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: deleteFaq } = useDeleteFaq();
  const {
    data: faqsData,
    isLoading: isLoadingFaqs,
    isPending: isPendingFaqs,
  } = useGetAllFaqs(page, 5, publishedFilter || undefined);

  const handleDeleteClick = (id: string, question: string) => {
    setFaqToDelete({ id, question });
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!faqToDelete) return;

    setIsDeleting(true);
    try {
      await deleteFaq(faqToDelete.id);
      showSuccessToast("سوال با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      setDeleteModalOpen(false);
      setFaqToDelete(null);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در حذف سوال رخ داد";
      showErrorToast(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    if (!isDeleting) {
      setDeleteModalOpen(false);
      setFaqToDelete(null);
    }
  };

  const faqs = faqsData?.data?.faqs || [];
  const meta = faqsData?.meta;

  return (
    <main>
      <AdminDashBaordHeader title="مدیریت سوالات متداول" />

      <SectionContainer>
        <h5 className="main-header ">لیست سوالات متداول</h5>

        {/* Filter Input */}
        <div className="mb-4">
          <div className="relative max-w-md">
            <label className="block text-dark font-estedad-lightbold mb-2 mr-4">
              فیلتر بر اساس وضعیت
            </label>
            <Select<OptionType, false>
              options={publishedOptions}
              value={
                publishedOptions.find(
                  (option) => option.value === publishedFilter
                ) || publishedOptions[0]
              }
              onChange={(selected) => {
                setPublishedFilter(selected?.value || "");
                setPage(1);
              }}
              placeholder="انتخاب وضعیت"
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

        <FaqsManagementTable
          faqs={faqs}
          isLoadingFaqs={isLoadingFaqs || isPendingFaqs}
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

        <FaqManagementForm />
      </SectionContainer>
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="حذف سوال"
        message={`آیا از حذف سوال "${faqToDelete?.question}" اطمینان دارید؟ این عمل غیرقابل بازگشت است.`}
        confirmText="حذف"
        cancelText="انصراف"
        isLoading={isDeleting}
      />
    </main>
  );
}

export default FaqsManagement;
