import React, { useMemo, useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../../modules/CustomInput/CustomInput";
import CustomTextArea from "../../../../modules/CustomTextArea/CustomTextArea";
import { useCreateInsurance, useUpdateInsurance } from "../../../../../services/useInsurances";
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

  const isEditMode = !!insurance?.id;

  const validationSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string()
          .required("نام سازمان بیمه الزامی است")
          .min(2, "نام باید حداقل ۲ کاراکتر باشد")
          .max(100, "نام نباید بیشتر از ۱۰۰ کاراکتر باشد"),
        description: Yup.string().max(1000, "توضیحات نباید بیشتر از ۱۰۰۰ کاراکتر باشد"),
        website: Yup.string().url("آدرس وب‌سایت معتبر نیست").nullable(),
        phoneNumber: Yup.string().nullable(),
        email: Yup.string().email("ایمیل معتبر نیست").nullable(),
        logo: Yup.string().nullable(),
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
      logo?: string;
      published: boolean;
      order: number;
    },
    resetForm: () => void
  ) => {
    try {
      const data: {
        name: string;
        description?: string;
        website?: string;
        phoneNumber?: string;
        email?: string;
        logo?: string;
        published?: boolean;
        order?: number;
      } = {
        name: values.name,
        published: values.published,
        order: values.order,
      };

      if (values.description) {
        data.description = values.description;
      }
      if (values.website) {
        data.website = values.website;
      }
      if (values.phoneNumber) {
        data.phoneNumber = values.phoneNumber;
      }
      if (values.email) {
        data.email = values.email;
      }
      if (values.logo) {
        data.logo = values.logo;
      }

      if (isEditMode && insurance?.id) {
        await updateInsurance({ id: insurance.id, data });
        showSuccessToast("سازمان بیمه با موفقیت ویرایش شد");
        queryClient.invalidateQueries({ queryKey: ["insurances"] });
        queryClient.invalidateQueries({ queryKey: ["insurance"] });
        navigate("/admin-dashboard/insurances-management");
      } else {
        await createInsurance(data);
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
        logo: insurance?.logo || "",
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
            logo: values.logo || undefined,
            published: values.published,
            order: values.order,
          },
          resetForm
        );
      }}
    >
      {(formik) => {
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
                labelText="لوگو (مسیر فایل)"
                placeholder="مسیر فایل لوگو را وارد کنید"
                className="bg-white"
                optional
                {...formik.getFieldProps("logo")}
                errorMessage={
                  formik.touched.logo && formik.errors.logo
                    ? formik.errors.logo
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

