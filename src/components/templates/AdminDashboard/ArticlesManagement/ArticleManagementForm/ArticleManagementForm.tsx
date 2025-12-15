import { useRef, useMemo, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../../modules/CustomInput/CustomInput";
import CustomTextArea from "../../../../modules/CustomTextArea/CustomTextArea";
import Select, { components } from "react-select";
import type { DropdownIndicatorProps } from "react-select";
import {
  useCreateArticle,
  useUpdateArticle,
} from "../../../../../services/useArticles";
import { useGetArticleCategories } from "../../../../../services/useCategories";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../../../utils/toastify";
import { getImageUrl } from "../../../../../utils/helpers";
import type { OptionType, Category, Article } from "../../../../../types/types";
import { useQueryClient } from "@tanstack/react-query";
import TextEditor from "../../../../modules/AdminDashboard/TextEditor/TextEditor";

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

function ArticleManagementForm({ article }: { article?: Article }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: createArticle } = useCreateArticle();
  const { mutateAsync: updateArticle } = useUpdateArticle();
  const { data: categoriesData } = useGetArticleCategories();
  const [removeImage, setRemoveImage] = useState(false);

  const isEditMode = !!article?.id;

  const categoryOptions: OptionType[] = useMemo(
    () =>
      categoriesData?.data?.categories?.map((category: Category) => ({
        value: category.id,
        label: category.name,
      })) || [],
    [categoriesData?.data?.categories]
  );

  const validationSchema = useMemo(
    () =>
      Yup.object({
        title: Yup.string().required("عنوان الزامی است"),
        content: Yup.string().required("محتوای مقاله الزامی است"),
        excerpt: Yup.string(),
        author: Yup.string(),
        published: Yup.boolean(),
        // id های دسته‌بندی را به صورت رشته ساده اعتبارسنجی می‌کنیم
        categoryIds: Yup.array()
          .of(Yup.string())
          .min(1, "انتخاب حداقل یک دسته‌بندی الزامی است")
          .required("انتخاب دسته‌بندی الزامی است"),
      }),
    []
  );

  const handleSubmit = async (
    values: {
      title: string;
      content: string;
      excerpt: string;
      author: string;
      published: boolean;
      categoryIds: string[];
      coverImage: File | null;
    },
    resetForm: () => void
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);

      if (values.excerpt) {
        formData.append("excerpt", values.excerpt);
      }

      if (values.author) {
        formData.append("author", values.author);
      }

      formData.append("published", values.published.toString());

      if (values.categoryIds && values.categoryIds.length > 0) {
        formData.append("categoryIds", JSON.stringify(values.categoryIds));
      }

      if (values.coverImage) {
        formData.append("coverImage", values.coverImage);
      }
      if (removeImage && isEditMode) {
        formData.append("removeCoverImage", "true");
      }

      if (isEditMode && article?.id) {
        const response = await updateArticle({
          id: article.id,
          data: formData,
        });
        showSuccessToast("مقاله با موفقیت ویرایش شد");
        setRemoveImage(false);
        // Update cache immediately with the response data
        if (response?.data?.article) {
          queryClient.setQueryData(["article", article.id], response);
        }
        // Invalidate and refetch queries to ensure all data is fresh
        queryClient.invalidateQueries({ queryKey: ["articles"] });
        queryClient.invalidateQueries({ queryKey: ["article", article.id] });
        navigate("/admin/articles-management");
      } else {
        await createArticle(formData);
        showSuccessToast("مقاله با موفقیت ایجاد شد");
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["articles"] });
        queryClient.invalidateQueries({ queryKey: ["article"] });
        // اسکرول به بالای container اصلی
        const scrollContainer = document.querySelector(".overflow-auto");
        if (scrollContainer) {
          scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }

      setTimeout(() => {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 0);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ||
        (isEditMode
          ? "خطایی در ویرایش مقاله رخ داد"
          : "خطایی در ایجاد مقاله رخ داد");
      showErrorToast(errorMessage);
    }
  };

  return (
    <Formik
      initialValues={{
        title: article?.title || "",
        content: article?.content || "",
        excerpt: article?.excerpt || "",
        author: article?.author || "",
        published: article?.published ?? false,
        categoryIds:
          article?.categories?.map((category) => category.id) ||
          ([] as string[]),
        coverImage: null as File | null,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(
          {
            title: values.title,
            content: values.content,
            excerpt: values.excerpt,
            author: values.author,
            published: values.published,
            categoryIds: values.categoryIds,
            coverImage: values.coverImage,
          },
          resetForm
        );
      }}
    >
      {(formik) => {
        const shouldShowCurrentImage =
          article?.coverImage && !formik.values.coverImage && !removeImage;

        return (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <CustomInput
                labelText="عنوان"
                placeholder="عنوان مقاله را وارد کنید"
                className="bg-white"
                requiredText
                {...formik.getFieldProps("title")}
                errorMessage={
                  formik.touched.title && formik.errors.title
                    ? formik.errors.title
                    : null
                }
              />

              <CustomInput
                labelText="نویسنده"
                placeholder="نام نویسنده را وارد کنید"
                optional
                className="bg-white"
                {...formik.getFieldProps("author")}
                errorMessage={
                  formik.touched.author && formik.errors.author
                    ? formik.errors.author
                    : null
                }
              />
            </div>

            <CustomTextArea
              labelText="خلاصه"
              placeholder="خلاصه مقاله را وارد کنید"
              optional
              rows={3}
              className="bg-white"
              {...formik.getFieldProps("excerpt")}
              errorMessage={
                formik.touched.excerpt && formik.errors.excerpt
                  ? formik.errors.excerpt
                  : null
              }
            />

            <TextEditor
              labelText="محتوا"
              placeholder="محتوا مقاله را وارد کنید"
              value={formik.values.content}
              onChange={(data) => {
                formik.setFieldValue("content", data);
                formik.setFieldTouched("content", true);
              }}
              errorMessage={
                formik.touched.content && formik.errors.content
                  ? formik.errors.content
                  : null
              }
            />

            <div>
              <label className="block text-dark font-estedad-lightbold mb-2 mr-4">
                دسته‌بندی‌ها
                <span className="text-red-500 mr-1">*</span>
              </label>
              <div className="">
                <Select<OptionType, true>
                  isMulti
                  options={categoryOptions}
                  value={categoryOptions.filter((option) =>
                    formik.values.categoryIds.includes(option.value)
                  )}
                  onChange={(selected) => {
                    const ids = selected
                      ? selected.map((opt) => opt.value)
                      : [];
                    formik.setFieldValue("categoryIds", ids);
                  }}
                  onBlur={() => formik.setFieldTouched("categoryIds", true)}
                  placeholder="دسته‌بندی‌ها را انتخاب کنید"
                  components={{ DropdownIndicator }}
                  classNames={{
                    control: () =>
                      `!text-dark px-5 !min-h-[52px] !rounded-lg !border-2 ${
                        formik.touched.categoryIds && formik.errors.categoryIds
                          ? "!border-red-500"
                          : "!border-main-border-color"
                      } !focus:outline-none h-full !cursor-pointer`,
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
                <div
                  className={`text-red-500 text-[10px] mt-1 mr-4 min-h-[20px] ${
                    (formik.touched.categoryIds || formik.submitCount > 0) &&
                    formik.errors.categoryIds
                      ? "visible"
                      : "invisible"
                  }`}
                >
                  {formik.errors.categoryIds || "\u00A0"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formik.values.published}
                  onChange={(e) =>
                    formik.setFieldValue("published", e.target.checked)
                  }
                  className="w-5 h-5 rounded border-2 border-main-border-color text-primary focus:ring-primary"
                />
                <span className="text-dark font-estedad-lightbold">
                  منتشر شده
                </span>
              </label>
            </div>

            <div>
              <label className="block text-dark font-estedad-lightbold mb-2 mr-4">
                تصویر کاور
              </label>
              <div className="flex items-center gap-4 flex-wrap">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden "
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    formik.setFieldValue("coverImage", file);
                    setRemoveImage(false);
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    fileInputRef.current?.click();
                    setRemoveImage(false);
                  }}
                  className="px-8 py-3  rounded-lg  font-estedad-medium bg-purple-500/60 text-white hover:bg-purple-600/60  transition-colors"
                >
                  انتخاب فایل
                </button>
                {formik.values.coverImage instanceof File && (
                  <span className="text-sm text-dark font-estedad-light">
                    {formik.values.coverImage.name}
                  </span>
                )}
                {shouldShowCurrentImage && (
                  <div className="flex items-center gap-2 flex-wrap justify-center ">
                    <img
                      src={getImageUrl(article.coverImage)}
                      alt={article.title || "تصویر کاور"}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="text-sm text-paragray">تصویر فعلی</span>
                    <button
                      type="button"
                      onClick={() => {
                        setRemoveImage(true);
                        formik.setFieldValue("coverImage", null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      className="px-4 py-1.5 text-sm rounded-lg font-estedad-medium bg-red-500/60 text-white hover:bg-red-600/60 transition-colors"
                    >
                      حذف عکس
                    </button>
                  </div>
                )}
                {removeImage && (
                  <span className="text-sm text-red-500 font-estedad-light">
                    عکس در حال حذف است
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="purple-btn flex items-center gap-2"
                disabled={formik.isSubmitting}
              >
                {isEditMode ? "ویرایش مقاله" : "ایجاد مقاله"}
                {formik.isSubmitting && (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                )}
              </button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}

export default ArticleManagementForm;
