import React, { useRef, useMemo } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../../modules/CustomInput/CustomInput";
import Select, { components } from "react-select";
import TextEditor from "../../../../modules/AdminDashboard/TextEditor/TextEditor";
import type { DropdownIndicatorProps } from "react-select";
import {
  useCreateService,
  useUpdateService,
} from "../../../../../services/useServices";
import { useGetServiceCategories } from "../../../../../services/useCategories";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../../../utils/toastify";
import type {
  OptionType,
  ServiceCategory,
  Service,
} from "../../../../../types/types";
import { useQueryClient } from "@tanstack/react-query";

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

function ServiceManagementForm({ service }: { service?: Service }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: createService } = useCreateService();
  const { mutateAsync: updateService } = useUpdateService();
  const { data: categoriesData } = useGetServiceCategories();

  const isEditMode = !!service?.id;

  const categoryOptions: OptionType[] = useMemo(
    () =>
      categoriesData?.data?.categories?.map((category: ServiceCategory) => ({
        value: category.id,
        label: category.name,
      })) || [],
    [categoriesData?.data?.categories]
  );

  const validationSchema = useMemo(
    () =>
      Yup.object({
        title: Yup.string().required("عنوان الزامی است"),
        description: Yup.string().required("توضیحات الزامی است"),
        price: Yup.number().nullable().min(0, "قیمت باید مثبت باشد"),
        durationMinutes: Yup.number()
          .nullable()
          .min(1, "مدت زمان باید حداقل 1 دقیقه باشد"),
        categoryIds: Yup.array()
          .of(Yup.string().uuid())
          .min(1, "انتخاب حداقل یک دسته‌بندی الزامی است")
          .required("انتخاب دسته‌بندی الزامی است"),
      }),
    []
  );

  const handleSubmit = async (
    values: {
      title: string;
      description: string;

      price: number | null;
      durationMinutes: number | null;
      categoryIds: string[];
      coverImage: File | null;
    },
    resetForm: () => void
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);

      if (values.price !== null && values.price !== undefined) {
        formData.append("price", values.price.toString());
      }

      if (
        values.durationMinutes !== null &&
        values.durationMinutes !== undefined
      ) {
        formData.append("durationMinutes", values.durationMinutes.toString());
      }

      if (values.categoryIds && values.categoryIds.length > 0) {
        formData.append("categoryIds", JSON.stringify(values.categoryIds));
      }

      // Only append file if it's a valid File object (not a fake one from URL)
      if (
        values.coverImage &&
        values.coverImage instanceof File &&
        values.coverImage.size > 0
      ) {
        formData.append("coverImage", values.coverImage);
      }

      if (isEditMode && service?.id) {
        await updateService({ id: service.id, data: formData });
        showSuccessToast("خدمت با موفقیت ویرایش شد");
        queryClient.invalidateQueries({ queryKey: ["services"] });
        queryClient.invalidateQueries({ queryKey: ["service"] });
        navigate("/admin/services-management");
      } else {
        await createService(formData);
        showSuccessToast("خدمت با موفقیت ایجاد شد");
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["services"] });
        queryClient.invalidateQueries({ queryKey: ["service"] });
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
          ? "خطایی در ویرایش خدمت رخ داد"
          : "خطایی در ایجاد خدمت رخ داد");
      showErrorToast(errorMessage);
    }
  };

  return (
    <Formik
      initialValues={{
        title: service?.title || "",
        description: service?.description || "",
        price: service?.price || null,
        durationMinutes: service?.durationMinutes || null,
        categoryIds:
          service?.categories?.map((category) => category.id) ||
          ([] as string[]),
        coverImage: null as File | null,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(
          {
            title: values.title,
            description: values.description,
            price: values.price,
            durationMinutes: values.durationMinutes,
            categoryIds: values.categoryIds,
            coverImage: values.coverImage,
          },
          resetForm
        );
      }}
    >
      {(formik) => {
        // استخراج نام فایل از URL موجود یا از فایل انتخاب شده
        const getCurrentFileName = () => {
          if (
            formik.values.coverImage &&
            formik.values.coverImage instanceof File
          ) {
            return formik.values.coverImage.name;
          }
          if (service?.coverImage) {
            // استخراج نام فایل از URL
            const urlParts = service.coverImage.split("/");
            return urlParts[urlParts.length - 1] || "فایل موجود";
          }
          return null;
        };

        const currentFileName = getCurrentFileName();

        return (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <CustomInput
                labelText="عنوان"
                placeholder="عنوان خدمت را وارد کنید"
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
                labelText="قیمت (تومان)"
                placeholder="قیمت را وارد کنید"
                type="number"
                optional
                className="bg-white"
                {...formik.getFieldProps("price")}
                errorMessage={
                  formik.touched.price && formik.errors.price
                    ? formik.errors.price
                    : null
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <CustomInput
                labelText="مدت زمان (دقیقه)"
                placeholder="مدت زمان را وارد کنید"
                type="number"
                optional
                className="bg-white"
                {...formik.getFieldProps("durationMinutes")}
                errorMessage={
                  formik.touched.durationMinutes &&
                  formik.errors.durationMinutes
                    ? formik.errors.durationMinutes
                    : null
                }
              />
            </div>

            <TextEditor
              labelText="توضیحات"
              placeholder="توضیحات خدمت را وارد کنید"
              value={formik.values.description}
              onChange={(data) => {
                formik.setFieldValue("description", data);
                formik.setFieldTouched("description", true);
              }}
              errorMessage={
                formik.touched.description && formik.errors.description
                  ? formik.errors.description
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
                    formik.setFieldTouched("categoryIds", true);
                  }}
                  onBlur={() => formik.setFieldTouched("categoryIds", true)}
                  placeholder="دسته‌بندی‌ها را انتخاب کنید"
                  components={{ DropdownIndicator }}
                  classNames={{
                    control: () =>
                      `!text-dark px-5 !min-h-[52px] !rounded-lg !border-2  ${
                        formik.touched.categoryIds && formik.errors.categoryIds
                          ? "!border-red-500"
                          : "!border-main-border-color"
                      } !focus:outline-none h-full !cursor-pointer `,
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
                    formik.touched.categoryIds && formik.errors.categoryIds
                      ? "visible"
                      : "invisible"
                  }`}
                >
                  {formik.errors.categoryIds || "\u00A0"}
                </div>
              </div>
            </div>

            <div>
              <CustomInput
                ref={fileInputRef}
                inputType="file"
                labelText="تصویر کاور"
                placeholder="تصویر کاور را انتخاب کنید"
                className="bg-white"
                optional
                name="coverImage"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0] || null;
                  formik.setFieldValue("coverImage", file);
                }}
                errorMessage={
                  formik.touched.coverImage && formik.errors.coverImage
                    ? formik.errors.coverImage
                    : null
                }
              />
              {currentFileName && (
                <div className="mr-4 mt-2 text-sm text-paragray">
                  <span className="font-estedad-lightbold">فایل فعلی: </span>
                  <span className="font-estedad-light">{currentFileName}</span>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="purple-btn flex items-center gap-2"
                disabled={formik.isSubmitting}
              >
                {isEditMode ? "ویرایش خدمت" : "ایجاد خدمت"}
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

export default ServiceManagementForm;
