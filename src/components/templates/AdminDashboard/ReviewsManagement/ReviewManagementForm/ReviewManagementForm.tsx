import React, { useRef } from "react";
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

function ReviewManagementForm({ review }: { review?: Review }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: createReview } = useCreateReview();
  const { mutateAsync: updateReview } = useUpdateReview();

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
        order: Yup.number()
          .nullable()
          .min(0, "ترتیب باید مثبت باشد"),
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

      // Only append file if it's a valid File object (not a fake one from URL)
      if (
        values.profileImage &&
        values.profileImage instanceof File &&
        values.profileImage.size > 0
      ) {
        formData.append("profileImage", values.profileImage);
      }

      if (isEditMode && review?.id) {
        await updateReview({ id: review.id, data: formData });
        showSuccessToast("نظر با موفقیت ویرایش شد");
        queryClient.invalidateQueries({ queryKey: ["reviews"] });
        queryClient.invalidateQueries({ queryKey: ["review"] });
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
        // استخراج نام فایل از URL موجود یا از فایل انتخاب شده
        const getCurrentFileName = () => {
          if (
            formik.values.profileImage &&
            formik.values.profileImage instanceof File
          ) {
            return formik.values.profileImage.name;
          }
          if (review?.profileImage) {
            // استخراج نام فایل از URL
            const urlParts = review.profileImage.split("/");
            return urlParts[urlParts.length - 1] || "فایل موجود";
          }
          return null;
        };

        const currentFileName = getCurrentFileName();

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
              <CustomInput
                labelText="متن نظر"
                placeholder="متن نظر را وارد کنید"
                className="bg-white"
                requiredText
                inputType="textarea"
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
              <CustomInput
                ref={fileInputRef}
                inputType="file"
                labelText="تصویر پروفایل"
                placeholder="تصویر پروفایل را انتخاب کنید"
                className="bg-white"
                optional
                name="profileImage"
                accept="image/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0] || null;
                  formik.setFieldValue("profileImage", file);
                }}
                errorMessage={
                  formik.touched.profileImage && formik.errors.profileImage
                    ? formik.errors.profileImage
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

