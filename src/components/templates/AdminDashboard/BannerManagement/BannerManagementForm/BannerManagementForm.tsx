import { useRef, useMemo } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../../modules/CustomInput/CustomInput";
import {
  useCreateHeroSlider,
  useUpdateHeroSlider,
} from "../../../../../services/useHeroSliders";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../../../utils/toastify";
import { getImageUrl } from "../../../../../utils/helpers";
import type { HeroSlider } from "../../../../../types/types";
import { useQueryClient } from "@tanstack/react-query";
import TextEditor from "../../../../modules/AdminDashboard/TextEditor/TextEditor";

function BannerManagementForm({ banner }: { banner?: HeroSlider }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: createBanner } = useCreateHeroSlider();
  const { mutateAsync: updateBanner } = useUpdateHeroSlider();

  const isEditMode = !!banner?.id;

  const validationSchema = useMemo(
    () =>
      Yup.object({
        title: Yup.string().max(200, "عنوان نباید بیشتر از 200 کاراکتر باشد"),
        description: Yup.string(),
        buttonText: Yup.string().max(
          100,
          "متن دکمه نباید بیشتر از 100 کاراکتر باشد"
        ),
        buttonLink: Yup.string().url("لینک معتبر نیست"),
        order: Yup.number()
          .integer("ترتیب باید عدد صحیح باشد")
          .min(0, "ترتیب باید عدد مثبت باشد"),
        published: Yup.boolean(),
      }),
    []
  );

  const handleSubmit = async (
    values: {
      title: string;
      description: string;
      buttonText: string;
      buttonLink: string;
      order: number;
      published: boolean;
      heroSliderImage: File | null;
    },
    resetForm: () => void
  ) => {
    try {
      // Validate image requirement
      if (!isEditMode && !values.heroSliderImage) {
        showErrorToast("لطفاً یک تصویر انتخاب کنید");
        return;
      }

      if (isEditMode && !values.heroSliderImage && !banner?.image) {
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

      if (values.buttonText) {
        formData.append("buttonText", values.buttonText);
      }

      if (values.buttonLink) {
        formData.append("buttonLink", values.buttonLink);
      }

      formData.append("order", values.order.toString());
      formData.append("published", values.published ? "true" : "false");

      if (values.heroSliderImage) {
        formData.append("heroSliderImage", values.heroSliderImage);
      }

      if (isEditMode && banner?.id) {
        const response = await updateBanner({ id: banner.id, data: formData });
        showSuccessToast("بنر با موفقیت ویرایش شد");
        // Update cache immediately with the response data
        if (response?.data?.slider) {
          queryClient.setQueryData(["heroSlider", banner.id], response);
        }
        // Invalidate and refetch queries to ensure all data is fresh
        queryClient.invalidateQueries({ queryKey: ["heroSliders"] });
        queryClient.invalidateQueries({ queryKey: ["heroSlider", banner.id] });
        navigate("/admin/banner-management");
      } else {
        await createBanner(formData);
        showSuccessToast("بنر با موفقیت ایجاد شد");
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["heroSliders"] });
        queryClient.invalidateQueries({ queryKey: ["heroSlider"] });
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
          ? "خطایی در ویرایش بنر رخ داد"
          : "خطایی در ایجاد بنر رخ داد");
      showErrorToast(errorMessage);
    }
  };

  return (
    <Formik
      initialValues={{
        title: banner?.title || "",
        description: banner?.description || "",
        buttonText: banner?.buttonText || "",
        buttonLink: banner?.buttonLink || "",
        order: banner?.order ?? 0,
        published: banner?.published ?? true,
        heroSliderImage: null as File | null,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(
          {
            title: values.title,
            description: values.description,
            buttonText: values.buttonText,
            buttonLink: values.buttonLink,
            order: values.order,
            published: values.published,
            heroSliderImage: values.heroSliderImage,
          },
          resetForm
        );
      }}
    >
      {(formik) => {
        const shouldShowCurrentImage =
          banner?.image && !formik.values.heroSliderImage;

        return (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomInput
                labelText="عنوان"
                placeholder="عنوان بنر را وارد کنید (اختیاری)"
                className="bg-white"
                {...formik.getFieldProps("title")}
                errorMessage={
                  formik.touched.title && formik.errors.title
                    ? formik.errors.title
                    : null
                }
              />

              <CustomInput
                labelText="متن دکمه"
                placeholder="متن دکمه را وارد کنید (اختیاری)"
                className="bg-white"
                {...formik.getFieldProps("buttonText")}
                errorMessage={
                  formik.touched.buttonText && formik.errors.buttonText
                    ? formik.errors.buttonText
                    : null
                }
              />

              <CustomInput
                labelText="لینک دکمه"
                placeholder="لینک دکمه را وارد کنید (اختیاری)"
                className="bg-white"
                {...formik.getFieldProps("buttonLink")}
                errorMessage={
                  formik.touched.buttonLink && formik.errors.buttonLink
                    ? formik.errors.buttonLink
                    : null
                }
              />

              <CustomInput
                labelText="ترتیب نمایش"
                placeholder="ترتیب نمایش را وارد کنید"
                type="number"
                className="bg-white"
                {...formik.getFieldProps("order")}
                errorMessage={
                  formik.touched.order && formik.errors.order
                    ? formik.errors.order
                    : null
                }
              />
            </div>

            <TextEditor
              labelText="توضیحات"
              placeholder="توضیحات بنر را وارد کنید (اختیاری)"
              optional
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
                    className="w-5 h-5 rounded border-2 border-main-border-color text-primary focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-dark font-estedad-light">
                    منتشر شده
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-dark font-estedad-lightbold mb-2 mr-4">
                تصویر بنر
                <span className="text-red-500 mr-1">*</span>
              </label>
              <div className="flex items-center gap-4 flex-wrap">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    formik.setFieldValue("heroSliderImage", file);
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    fileInputRef.current?.click();
                  }}
                  className="px-8 py-3 rounded-lg font-estedad-medium bg-purple-500/60 text-white hover:bg-purple-600/60 transition-colors"
                >
                  انتخاب فایل
                </button>
                {formik.values.heroSliderImage instanceof File && (
                  <span className="text-sm text-dark font-estedad-light">
                    {formik.values.heroSliderImage.name}
                  </span>
                )}
                {shouldShowCurrentImage && (
                  <div className="flex items-center gap-2 flex-wrap justify-center">
                    <img
                      src={getImageUrl(banner.image)}
                      alt="Banner"
                      className="w-32 h-20 rounded-lg object-cover"
                    />
                    <span className="text-sm text-paragray">تصویر فعلی</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="purple-btn flex items-center gap-2"
                disabled={formik.isSubmitting}
              >
                {isEditMode ? "ویرایش بنر" : "ایجاد بنر"}
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

export default BannerManagementForm;
