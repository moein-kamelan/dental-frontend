import React, { useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../../modules/CustomInput/CustomInput";
import {
  useCreateReview,
  useUpdateReview,
} from "../../../../../services/useReviews";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../../../utils/toastify";
import type { Review } from "../../../../../types/types";
import { useQueryClient } from "@tanstack/react-query";
import CustomTextArea from "../../../../modules/CustomTextArea/CustomTextArea";

function ReviewManagementForm({ review }: { review?: Review }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: createReview } = useCreateReview();
  const { mutateAsync: updateReview } = useUpdateReview();
  const [removeImage, setRemoveImage] = useState(false);

  const isEditMode = !!review?.id;

  const validationSchema = React.useMemo(
    () =>
      Yup.object({
        name: Yup.string().required("نام الزامی است"),
        content: Yup.string().required("متن نظر الزامی است"),
        rating: Yup.number()
          .required("امتیاز الزامی است")
          .min(1, "امتیاز باید حداقل 1 باشد")
          .max(5, "امتیاز باید حداکثر 5 باشد"),
        order: Yup.number().nullable().min(0, "ترتیب باید مثبت باشد"),
        published: Yup.boolean(),
      }),
    []
  );

  const handleSubmit = async (
    values: {
      name: string;
      content: string;
      rating: number;
      order: number | null;
      published: boolean;
      profileImage: File | null;
    },
    resetForm: () => void
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("content", values.content);
      formData.append("rating", values.rating.toString());
      formData.append("order", (values.order || 0).toString());
      formData.append("published", values.published.toString());

      if (values.profileImage) {
        formData.append("profileImage", values.profileImage);
      }
      if (removeImage && isEditMode) {
        formData.append("removeProfileImage", "true");
      }

      if (isEditMode && review?.id) {
        const response = await updateReview({ id: review.id, data: formData });
        showSuccessToast("نظر با موفقیت ویرایش شد");
        setRemoveImage(false);
        // Update cache immediately with the response data
        if (response?.data?.review) {
          queryClient.setQueryData(["review", review.id], response);
        }
        // Invalidate and refetch queries to ensure all data is fresh
        queryClient.invalidateQueries({ queryKey: ["reviews"] });
        queryClient.invalidateQueries({ queryKey: ["review", review.id] });
        navigate("/admin/reviews-management");
      } else {
        await createReview(formData);
        showSuccessToast("نظر با موفقیت ایجاد شد");
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["reviews"] });
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
          ? "خطایی در ویرایش نظر رخ داد"
          : "خطایی در ایجاد نظر رخ داد");
      showErrorToast(errorMessage);
    }
  };

  return (
    <Formik
      initialValues={{
        name: review?.name || "",
        content: review?.content || "",
        rating: review?.rating || 5,
        order: review?.order || 0,
        published: review?.published || false,
        profileImage: null as File | null,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(
          {
            name: values.name,
            content: values.content,
            rating: values.rating,
            order: values.order,
            published: values.published,
            profileImage: values.profileImage,
          },
          resetForm
        );
      }}
    >
      {(formik) => {
        const getCurrentFileName = () => {
          if (
            formik.values.profileImage &&
            formik.values.profileImage instanceof File
          ) {
            return formik.values.profileImage.name;
          }
          if (review?.profileImage && !removeImage) {
            const urlParts = review.profileImage.split("/");
            return urlParts[urlParts.length - 1] || "فایل موجود";
          }
          return null;
        };

        const currentFileName = getCurrentFileName();
        const shouldShowCurrentImage =
          review?.profileImage && !formik.values.profileImage && !removeImage;

        return (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <CustomInput
                labelText="نام"
                placeholder="نام کاربر را وارد کنید"
                className="bg-white"
                requiredText
                {...formik.getFieldProps("name")}
                errorMessage={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : null
                }
              />

              <CustomInput
                labelText="امتیاز (1 تا 5)"
                placeholder="امتیاز را وارد کنید"
                type="number"
                min={1}
                max={5}
                className="bg-white"
                requiredText
                {...formik.getFieldProps("rating")}
                errorMessage={
                  formik.touched.rating && formik.errors.rating
                    ? formik.errors.rating
                    : null
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <CustomInput
                labelText="ترتیب نمایش"
                placeholder="ترتیب نمایش را وارد کنید"
                type="number"
                min={0}
                optional
                className="bg-white"
                {...formik.getFieldProps("order")}
                errorMessage={
                  formik.touched.order && formik.errors.order
                    ? formik.errors.order
                    : null
                }
              />

              <div>
                <label className="block text-dark font-estedad-lightbold mb-2 mr-4">
                  وضعیت انتشار
                </label>
                <div className="flex items-center gap-4 mr-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formik.values.published}
                      onChange={(e) =>
                        formik.setFieldValue("published", e.target.checked)
                      }
                      className="w-5 h-5 rounded border-2 border-main-border-color text-primary focus:ring-primary"
                    />
                    <span className="text-dark font-estedad-light">
                      منتشر شده
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <CustomTextArea
                labelText="متن نظر"
                placeholder="متن نظر را وارد کنید"
                className="bg-white"
                requiredText
                rows={5}
                {...formik.getFieldProps("content")}
                errorMessage={
                  formik.touched.content && formik.errors.content
                    ? formik.errors.content
                    : null
                }
              />
            </div>

            <div>
              <label className="block text-dark font-estedad-lightbold mb-2 mr-4">
                تصویر پروفایل
              </label>
              <div className="flex items-center gap-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden "
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    formik.setFieldValue("profileImage", file);
                    setRemoveImage(false);
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    fileInputRef.current?.click();
                    setRemoveImage(false);
                  }}
                  className="px-8 py-3 mr-4 rounded-lg  font-estedad-medium bg-purple-500/60 text-white hover:bg-purple-600/60  transition-colors"
                >
                  انتخاب فایل
                </button>
                {currentFileName && (
                  <span className="text-sm text-dark font-estedad-light">
                    {currentFileName}
                  </span>
                )}
                {shouldShowCurrentImage && (
                  <div className="flex items-center gap-2">
                    <img
                      src={`http://localhost:4000${review.profileImage}`}
                      alt={review.name || "تصویر پروفایل"}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span className="text-sm text-paragray">تصویر فعلی</span>
                    <button
                      type="button"
                      onClick={() => {
                        setRemoveImage(true);
                        formik.setFieldValue("profileImage", null);
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
                {isEditMode ? "ویرایش نظر" : "ایجاد نظر"}
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

export default ReviewManagementForm;
