import { Formik } from "formik";
import React, { useRef, useMemo, type ChangeEvent } from "react";
import CustomInput from "../../../../modules/CustomInput/CustomInput";
import * as Yup from "yup";
import { formatPhoneNumber } from "../../../../../validators/phoneNumberValidator";

import { useCreateDoctorApplication } from "../../../../../services/useDoctorApplications";
import {
  showSuccessToast,
  showWarnToast,
  showErrorToast,
} from "../../../../../utils/toastify";
import { isValidFileType } from "../../../../../validators/fileTypeValidator";
import { useGetAllClinics } from "../../../../../services/useClinics";
import Select, { components } from "react-select";
import type { DropdownIndicatorProps } from "react-select";
import type { OptionType, Clinic } from "../../../../../types/types";

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

interface BecomeDoctorFormProps {
  applicationType?: "DENTIST" | "NURSE";
}

function BecomeDoctorForm({ applicationType = "DENTIST" }: BecomeDoctorFormProps) {
  const { mutateAsync: createDoctorApplication } = useCreateDoctorApplication();
  const { data: clinicsData } = useGetAllClinics(1, 100);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clinicOptions: OptionType[] = useMemo(
    () =>
      clinicsData?.data?.clinics?.map((clinic: Clinic) => ({
        value: clinic.id,
        label: clinic.name,
      })) || [],
    [clinicsData?.data?.clinics]
  );

  const handleSubmit = async (
    values: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      documents: File[];
      information: string;
      clinicId: string | null;
    },
    resetForm: () => void
  ) => {
    try {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("phoneNumber", values.phone);
      formData.append("doctorInfo", values.information);

      if (values.clinicId) {
        formData.append("clinicId", values.clinicId);
      }

      if (values.documents && values.documents.length > 0) {
        values.documents.forEach((file: File) => {
          formData.append("documents", file);
        });
      }

      // Add applicationType to formData
      formData.append("applicationType", applicationType);

      const response = await createDoctorApplication(formData);
      console.log(response);
      showSuccessToast(
        "درخواست شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت."
      );

      // ریست کردن فرم
      resetForm();

      // ریست کردن input فایل (با کمی تاخیر برای اطمینان از reset شدن فرم)
      setTimeout(() => {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:mt-0 mt-8 mb-10">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          documents: [],
          information: "",
          clinicId: null as string | null,
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required("نام الزامی است"),
          lastName: Yup.string().required("نام خانوادگی الزامی است"),
          email: Yup.string().email("ایمیل معتبر نیست"),
          phone: Yup.string()
            .required("شماره الزامی است")
            .test("is-valid-phone", "شماره موبایل معتبر نمیباشد", (value) => {
              try {
                formatPhoneNumber(value);
                return true;
              } catch (error) {
                console.log(error);
                return false;
              }
            }),
          documents: Yup.array()
            .max(10, "حداکثر 10 فایل مجاز است")
            .test(
              "file-type",
              "نوع فایل نامعتبر است. فقط PDF، تصاویر و فایل‌های Word مجاز هستند",
              (files) => {
                if (!files || files.length === 0) return true;
                return files.every((file: File) => isValidFileType(file));
              }
            ),
          information: Yup.string()
            .required("اطلاعات الزامی است")
            .min(20, "اطلاعات پزشک باید حداقل 20 کاراکتر باشد"),
          clinicId: Yup.string().uuid().nullable(),
        })}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values, resetForm);
        }}
      >
        {(formik) => {
          return (
            <form
              onSubmit={formik.handleSubmit}
              className="section-border p-6 md:p-8"
            >
              <h2 className="main-header ">ارسال اطلاعات</h2>

              <CustomInput
                labelText="نام"
                placeholder="نام را وارد کنید"
                {...formik.getFieldProps("firstName")}
                errorMessage={
                  formik.touched.firstName && formik.errors.firstName
                    ? formik.errors.firstName
                    : null
                }
              />

              <CustomInput
                labelText="نام خانوادگی"
                placeholder="نام خانوادگی را وارد کنید"
                {...formik.getFieldProps("lastName")}
                errorMessage={
                  formik.touched.lastName && formik.errors.lastName
                    ? formik.errors.lastName
                    : null
                }
              />

              <CustomInput
                labelText="ایمیل"
                placeholder="example@gmail.com"
                optional
                {...formik.getFieldProps("email")}
                errorMessage={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : null
                }
              />
              <CustomInput
                inputType="phone"
                labelText="شماره"
                placeholder="شماره را وارد کنید"
                {...formik.getFieldProps("phone")}
                errorMessage={
                  formik.touched.phone && formik.errors.phone
                    ? formik.errors.phone
                    : null
                }
              />

              <div>
                <label className="block text-dark font-estedad-lightbold mb-2">
                  کلینیک (اختیاری)
                </label>
                <Select<OptionType>
                  options={clinicOptions}
                  value={
                    clinicOptions.find(
                      (option) => option.value === formik.values.clinicId
                    ) || null
                  }
                  onChange={(selected) => {
                    formik.setFieldValue("clinicId", selected?.value || null);
                    formik.setFieldTouched("clinicId", true);
                  }}
                  onBlur={() => formik.setFieldTouched("clinicId", true)}
                  placeholder="کلینیک را انتخاب کنید (اختیاری)"
                  isClearable
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
                    placeholder: () => `!text-paragray font-estedad-light`,
                  }}
                />
                <div className="text-red-500 text-[10px] mr-4 mt-1 min-h-[20px]">
                  {formik.touched.clinicId && formik.errors.clinicId
                    ? formik.errors.clinicId
                    : null}
                </div>
              </div>

              <CustomInput
                ref={fileInputRef}
                inputType="file"
                labelText="آپلود مدارک (اختیاری - حداکثر 10 فایل - PDF، تصاویر JPG/PNG، Word)"
                placeholder="آپلود مدارک"
                className="text-paragray! font-estedad-light"
                multiple
                name="documents"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    const newFilesArray = Array.from(files);
                    const currentFiles = formik.values.documents || [];

                    // بررسی نوع فایل‌های جدید
                    const validFiles: File[] = [];
                    const invalidFiles: File[] = [];

                    newFilesArray.forEach((file) => {
                      if (isValidFileType(file)) {
                        validFiles.push(file);
                      } else {
                        invalidFiles.push(file);
                      }
                    });

                    // ترکیب فایل‌های معتبر قبلی با فایل‌های معتبر جدید
                    const allFiles = [...currentFiles, ...validFiles];

                    // محدود کردن به حداکثر 10 فایل
                    const limitedFiles = allFiles.slice(0, 10);

                    // اگر بیشتر از 10 فایل انتخاب شده، به کاربر اطلاع بده
                    if (allFiles.length > 10) {
                      showWarnToast(
                        `فقط 10 فایل اول انتخاب شد. ${
                          allFiles.length - 10
                        } فایل دیگر نادیده گرفته شد.`
                      );
                    }

                    // تنظیم مقدار فایل‌ها (بدون اعتبارسنجی خودکار)
                    formik.setFieldValue("documents", limitedFiles, false);

                    // نمایش خطا برای فایل‌های نامعتبر (بعد از setFieldValue)
                    if (invalidFiles.length > 0) {
                      const errorMessage = `${invalidFiles.length} فایل نامعتبر است. فقط PDF، تصاویر (JPG, PNG) و فایل‌های Word مجاز هستند.`;
                      showErrorToast(errorMessage);

                      // نمایش خطا در errorMessage فیلد
                      formik.setFieldTouched("documents", true, false);
                      formik.setFieldError(
                        "documents",
                        "نوع فایل نامعتبر است. فقط PDF، تصاویر و فایل‌های Word مجاز هستند"
                      );
                    } else if (validFiles.length > 0) {
                      // اگر فقط فایل‌های معتبر وجود داشت، خطا را پاک کن
                      formik.setFieldError("documents", undefined);
                    }
                  } else {
                    if (formik.values.documents.length === 0) {
                      formik.setFieldTouched("documents", true);
                    }
                  }
                }}
                errorMessage={
                  formik.touched.documents && formik.errors.documents
                    ? formik.errors.documents
                    : null
                }
              />
              {/* نمایش تعداد فایل‌های انتخاب شده */}
              {formik.values.documents &&
                formik.values.documents.length > 0 && (
                  <div className="mt-2 mr-4 text-sm text-gray-600">
                    {formik.values.documents.length >= 10 && (
                      <span className="text-orange-500 mr-2">
                        (حداکثر تعداد فایل)
                      </span>
                    )}
                  </div>
                )}

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  اطلاعات پزشک
                </label>
                <textarea
                  rows={4}
                  placeholder="توضیحات لازم را وارد نمایید.."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                  {...formik.getFieldProps("information")}
                ></textarea>
                <span className="block text-red-500 text-[10px] font-iran-sans-normal mr-4 mb-2 h-4">
                  {formik.touched.information && formik.errors.information && (
                    <>{formik.errors.information}</>
                  )}
                </span>
              </div>
              <div>
                {/* <div className="flex items-start gap-2 mb-4">
                  <input
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    className="mt-1 w-4 h-4 text-secondary -300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="flexCheckDefault"
                    className="text-gray-700 text-sm"
                  >
                    شما با دوستان ما موافقت می کنید
                    <a
                      href="privacy.html"
                      className="text-secondary -blue-800 underline"
                    >
                      سیاست حفظ حریم خصوصی
                    </a>
                  </label>
                </div> */}
                <button type="submit" className="main-btn group/btn relative flex items-center justify-center">
                  <span className="group-hover/btn:translate-x-1 transition-all duration-200">ارسال درخواست</span>
                  <i className="fas fa-arrow-left absolute left-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 -translate-x-2 transition-all duration-200 text-sm"></i>
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default BecomeDoctorForm;
