import { useMemo, useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../../modules/CustomInput/CustomInput";
import CustomTextArea from "../../../../modules/CustomTextArea/CustomTextArea";
import {
  useCreateInsurance,
  useUpdateInsurance,
} from "../../../../../services/useInsurances";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../../../utils/toastify";
import { useQueryClient } from "@tanstack/react-query";

interface Insurance {
  id: string;
  name: string;
  description?: string;
  website?: string;
  phoneNumber?: string;
  email?: string;
  logo?: string;
  published: boolean;
  order: number;
  createdAt: string;
}

function InsuranceManagementForm({ insurance }: { insurance?: Insurance }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: createInsurance } = useCreateInsurance();
  const { mutateAsync: updateInsurance } = useUpdateInsurance();
  const [removeImage, setRemoveImage] = useState(false);

  const isEditMode = !!insurance?.id;

  const validationSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string()
          .required("نام سازمان بیمه الزامی است")
          .min(2, "نام باید حداقل ۲ کاراکتر باشد")
          .max(100, "نام نباید بیشتر از ۱۰۰ کاراکتر باشد"),
        description: Yup.string().max(
          1000,
          "توضیحات نباید بیشتر از ۱۰۰۰ کاراکتر باشد"
        ),
        website: Yup.string().url("آدرس وب‌سایت معتبر نیست").nullable(),
        phoneNumber: Yup.string().nullable(),
        email: Yup.string().email("ایمیل معتبر نیست").nullable(),
        logo: Yup.mixed().nullable(),
        order: Yup.number()
          .integer("ترتیب باید عدد صحیح باشد")
          .min(0, "ترتیب نمی‌تواند منفی باشد"),
        published: Yup.boolean(),
      }),
    []
  );

  const handleSubmit = async (
    values: {
      name: string;
      description?: string;
      website?: string;
      phoneNumber?: string;
      email?: string;
      logo?: File | null;
      published: boolean;
      order: number;
    },
    resetForm: () => void
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("published", values.published.toString());
      formData.append("order", values.order.toString());

      if (values.description) {
        formData.append("description", values.description);
      }
      if (values.website) {
        formData.append("website", values.website);
      }
      if (values.phoneNumber) {
        formData.append("phoneNumber", values.phoneNumber);
      }
      if (values.email) {
        formData.append("email", values.email);
      }

      if (values.logo) {
        formData.append("logo", values.logo);
      }
      if (removeImage && isEditMode) {
        formData.append("removeLogo", "true");
      }

      if (isEditMode && insurance?.id) {
        const response = await updateInsurance({
          id: insurance.id,
          data: formData,
        });
        showSuccessToast("سازمان بیمه با موفقیت ویرایش شد");
        setRemoveImage(false);
        // Update cache immediately with the response data
        if (response?.data?.insurance) {
          queryClient.setQueryData(["insurance", insurance.id], response);
        }
        // Invalidate and refetch queries to ensure all data is fresh
        queryClient.invalidateQueries({ queryKey: ["insurances"] });
        queryClient.invalidateQueries({
          queryKey: ["insurance", insurance.id],
        });
        navigate("/admin/insurance-management");
      } else {
        await createInsurance(formData);
        showSuccessToast("سازمان بیمه با موفقیت ایجاد شد");
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["insurances"] });
        queryClient.invalidateQueries({ queryKey: ["insurance"] });
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
          ? "خطایی در ویرایش سازمان بیمه رخ داد"
          : "خطایی در ایجاد سازمان بیمه رخ داد");
      showErrorToast(errorMessage);
    }
  };

  return (
    <Formik
      initialValues={{
        name: insurance?.name || "",
        description: insurance?.description || "",
        website: insurance?.website || "",
        phoneNumber: insurance?.phoneNumber || "",
        email: insurance?.email || "",
        logo: null as File | null,
        order: insurance?.order ?? 0,
        published: insurance?.published ?? true,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(
          {
            name: values.name,
            description: values.description || undefined,
            website: values.website || undefined,
            phoneNumber: values.phoneNumber || undefined,
            email: values.email || undefined,
            logo: values.logo,
            published: values.published,
            order: values.order,
          },
          resetForm
        );
      }}
    >
      {(formik) => {
        const shouldShowCurrentImage =
          insurance?.logo && !formik.values.logo && !removeImage;

        return (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <CustomInput
              labelText="نام سازمان بیمه"
              placeholder="نام سازمان بیمه را وارد کنید"
              className="bg-white"
              requiredText
              {...formik.getFieldProps("name")}
              errorMessage={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : null
              }
            />

            <CustomTextArea
              labelText="توضیحات"
              placeholder="توضیحات سازمان بیمه را وارد کنید"
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
                labelText="وب‌سایت"
                placeholder="آدرس وب‌سایت را وارد کنید"
                className="bg-white"
                optional
                {...formik.getFieldProps("website")}
                errorMessage={
                  formik.touched.website && formik.errors.website
                    ? formik.errors.website
                    : null
                }
              />

              <CustomInput
                labelText="شماره تماس"
                placeholder="شماره تماس را وارد کنید"
                className="bg-white"
                optional
                {...formik.getFieldProps("phoneNumber")}
                errorMessage={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? formik.errors.phoneNumber
                    : null
                }
              />

              <CustomInput
                labelText="ایمیل"
                placeholder="ایمیل را وارد کنید"
                className="bg-white"
                optional
                inputType="email"
                {...formik.getFieldProps("email")}
                errorMessage={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : null
                }
              />

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
              <label className="block text-dark font-estedad-lightbold mb-2 mr-4">
                لوگو
              </label>
              <div className="flex items-center gap-4 flex-wrap">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden "
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    formik.setFieldValue("logo", file);
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
                {formik.values.logo instanceof File && (
                  <span className="text-sm text-dark font-estedad-light">
                    {formik.values.logo.name}
                  </span>
                )}
                {shouldShowCurrentImage && (
                  <div className="flex items-center gap-2 flex-wrap justify-center ">
                    <img
                      src={`${insurance.logo}`}
                      alt={insurance.name || "لوگو سازمان بیمه"}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="text-sm text-paragray">لوگوی فعلی</span>
                    <button
                      type="button"
                      onClick={() => {
                        setRemoveImage(true);
                        formik.setFieldValue("logo", null);
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
                {isEditMode ? "ویرایش سازمان بیمه" : "ایجاد سازمان بیمه"}
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

export default InsuranceManagementForm;
