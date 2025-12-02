import { useRef, useMemo } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../../modules/CustomInput/CustomInput";
import CustomTextArea from "../../../../modules/CustomTextArea/CustomTextArea";
import {
  useCreateGallery,
  useUpdateGallery,
} from "../../../../../services/useGallery";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../../../utils/toastify";
import type { Gallery } from "../../../../../types/types";
import { useQueryClient } from "@tanstack/react-query";

function GalleryManagementForm({ image }: { image?: Gallery }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: createGallery } = useCreateGallery();
  const { mutateAsync: updateGallery } = useUpdateGallery();

  const isEditMode = !!image?.id;

  const validationSchema = useMemo(
    () =>
      Yup.object({
        title: Yup.string().max(200, "عنوان نباید بیشتر از ۲۰۰ کاراکتر باشد"),
        description: Yup.string(),
        order: Yup.number()
          .integer("ترتیب باید عدد صحیح باشد")
          .min(0, "ترتیب نمی‌تواند منفی باشد"),
        published: Yup.boolean(),
        galleryImage: Yup.mixed()
          .nullable()
          .test("file-required", "تصویر الزامی است", function (value) {
            // در هر دو حالت ایجاد و ویرایش، تصویر الزامی است
            // در حالت ویرایش، اگر تصویر جدید انتخاب نشده باشد، تصویر فعلی باید وجود داشته باشد
            if (isEditMode && !value && image?.image) {
              return true; // تصویر فعلی وجود دارد
            }
            // در حالت ایجاد یا ویرایش بدون تصویر فعلی، باید تصویر جدید انتخاب شود
            return value !== null && value !== undefined && value !== "";
          }),
      }),
    [isEditMode]
  );

  const handleSubmit = async (
    values: {
      title: string;
      description: string;
      order: number;
      published: boolean;
      galleryImage: File | null;
    },
    resetForm: () => void
  ) => {
    try {
      // Validate image requirement
      if (!isEditMode && !values.galleryImage) {
        showErrorToast("لطفاً یک تصویر انتخاب کنید");
        return;
      }

      if (isEditMode && !values.galleryImage && !image?.image) {
        showErrorToast("لطفاً یک تصویر انتخاب کنید");
        return;
      }

      const formData = new FormData();

      if (values.title) {
        formData.append("title", values.title);
      }

      if (values.description) {
        formData.append("description", values.description);
      }

      formData.append("order", values.order.toString());
      formData.append("published", values.published.toString());

      if (values.galleryImage) {
        formData.append("galleryImage", values.galleryImage);
      }

      if (isEditMode && image?.id) {
        const response = await updateGallery({ id: image.id, data: formData });
        showSuccessToast("تصویر با موفقیت ویرایش شد");
        // Update cache immediately with the response data
        if (response?.data?.image) {
          queryClient.setQueryData(["gallery", image.id], response);
        }
        // Invalidate and refetch queries to ensure all data is fresh
        queryClient.invalidateQueries({ queryKey: ["gallery"] });
        queryClient.invalidateQueries({ queryKey: ["gallery", image.id] });
        navigate("/admin/gallery-management");
      } else {
        await createGallery(formData);
        showSuccessToast("تصویر با موفقیت آپلود شد");
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["gallery"] });
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
      let errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ||
        (isEditMode
          ? "خطایی در ویرایش تصویر رخ داد"
          : "خطایی در آپلود تصویر رخ داد");

      // تبدیل خطاهای انگلیسی به فارسی
      if (
        errorMessage.includes("galleryImage cannot be null") ||
        errorMessage.includes("galleryImage is required") ||
        errorMessage.includes("cannot be null")
      ) {
        errorMessage = "تصویر الزامی است";
      }

      showErrorToast(errorMessage);
    }
  };

  return (
    <Formik
      initialValues={{
        title: image?.title || "",
        description: image?.description || "",
        order: image?.order ?? 0,
        published: image?.published ?? true,
        galleryImage: null as File | null,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(
          {
            title: values.title,
            description: values.description,
            order: values.order,
            published: values.published,
            galleryImage: values.galleryImage,
          },
          resetForm
        );
      }}
    >
      {(formik) => {
        const shouldShowCurrentImage =
          image?.image && !formik.values.galleryImage;

        return (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <CustomInput
              labelText="عنوان"
              placeholder="عنوان تصویر را وارد کنید"
              className="bg-white"
              optional
              {...formik.getFieldProps("title")}
              errorMessage={
                formik.touched.title && formik.errors.title
                  ? formik.errors.title
                  : null
              }
            />

            <CustomTextArea
              labelText="توضیحات"
              placeholder="توضیحات تصویر را وارد کنید"
              optional
              rows={4}
              className="bg-white"
              {...formik.getFieldProps("description")}
              errorMessage={
                formik.touched.description && formik.errors.description
                  ? formik.errors.description
                  : null
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomInput
                labelText="ترتیب"
                placeholder="ترتیب نمایش را وارد کنید"
                className="bg-white"
                inputType="number"
                {...formik.getFieldProps("order")}
                errorMessage={
                  formik.touched.order && formik.errors.order
                    ? formik.errors.order
                    : null
                }
              />

              <div className="flex items-center gap-4 pt-8">
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
            </div>

            <div>
              <label className="block text-dark font-estedad-lightbold mb-2 ">
                تصویر {!isEditMode && <span className="text-red-500">*</span>}
              </label>
              <div className="flex items-center gap-4 flex-wrap">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden "
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    formik.setFieldValue("galleryImage", file);
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    fileInputRef.current?.click();
                  }}
                  className="px-8 py-3  rounded-lg  font-estedad-medium bg-purple-500/60 text-white hover:bg-purple-600/60  transition-colors"
                >
                  انتخاب فایل
                </button>
                {formik.values.galleryImage instanceof File && (
                  <span className="text-sm text-dark font-estedad-light">
                    {formik.values.galleryImage.name}
                  </span>
                )}
                {shouldShowCurrentImage && (
                  <div className="flex items-center gap-2 flex-wrap justify-center ">
                    <img
                      src={`http://localhost:4000${image.image}`}
                      alt={image.title || "تصویر گالری"}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="text-sm text-paragray">تصویر فعلی</span>
                  </div>
                )}
              </div>
              {formik.touched.galleryImage && formik.errors.galleryImage && (
                <div className="text-red-500 text-[10px] mr-4 mt-1 min-h-[20px]">
                  {formik.errors.galleryImage}
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="purple-btn flex items-center gap-2"
                disabled={formik.isSubmitting}
              >
                {isEditMode ? "ویرایش تصویر" : "آپلود تصویر"}
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

export default GalleryManagementForm;
