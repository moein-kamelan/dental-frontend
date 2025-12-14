import { useRef, useMemo, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../../modules/CustomInput/CustomInput";
import CustomTextArea from "../../../../modules/CustomTextArea/CustomTextArea";
import Select, { components } from "react-select";
import type { DropdownIndicatorProps } from "react-select";
import { useCreateUser, useUpdateUser } from "../../../../../services/useUsers";
import { useGetAllClinics } from "../../../../../services/useClinics";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../../../utils/toastify";
import { getImageUrl } from "../../../../../utils/helpers";
import type { OptionType, Clinic, User } from "../../../../../types/types";
import { useQueryClient } from "@tanstack/react-query";
import { formatPhoneNumber } from "../../../../../validators/phoneNumberValidator";

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

const roleOptions: OptionType[] = [
  { value: "ADMIN", label: "مدیر" },
  { value: "SECRETARY", label: "منشی" },
  { value: "PATIENT", label: "بیمار" },
];

const genderOptions: OptionType[] = [
  { value: "MALE", label: "مرد" },
  { value: "FEMALE", label: "زن" },
  { value: "OTHER", label: "سایر" },
];

function UserManagementForm({ user }: { user?: User }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: createUser } = useCreateUser();
  const { mutateAsync: updateUser } = useUpdateUser();
  const { data: clinicsData } = useGetAllClinics(1, 100);
  const [removeImage, setRemoveImage] = useState(false);

  const isEditMode = !!user?.id;

  const clinicOptions: OptionType[] = useMemo(
    () =>
      clinicsData?.data?.clinics?.map((clinic: Clinic) => ({
        value: clinic.id,
        label: clinic.name,
      })) || [],
    [clinicsData?.data?.clinics]
  );

  const validationSchema = useMemo(
    () =>
      Yup.object({
        phoneNumber: Yup.string()
          .required("شماره تلفن الزامی است")
          .test("is-valid-phone", "شماره تلفن معتبر نیست", (value) => {
            try {
              formatPhoneNumber(value || "");
              return true;
            } catch {
              return false;
            }
          }),
        firstName: Yup.string()
          .required("نام الزامی است")
          .min(2, "نام باید حداقل ۲ کاراکتر باشد")
          .max(50, "نام باید حداکثر ۵۰ کاراکتر باشد"),
        lastName: Yup.string()
          .required("نام خانوادگی الزامی است")
          .min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد")
          .max(50, "نام خانوادگی باید حداکثر ۵۰ کاراکتر باشد"),
        password: isEditMode
          ? Yup.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
          : Yup.string()
              .required("رمز عبور الزامی است")
              .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
        role: Yup.string()
          .oneOf(["ADMIN", "SECRETARY", "PATIENT"], "نقش نامعتبر است")
          .required("نقش الزامی است"),
        nationalCode: Yup.string().nullable(),
        address: Yup.string().max(500, "آدرس نباید بیشتر از ۵۰۰ کاراکتر باشد"),
        gender: Yup.string()
          .oneOf(["MALE", "FEMALE", "OTHER"], "جنسیت نامعتبر است")
          .nullable(),
        clinicId: Yup.string().uuid().nullable(),
      }),
    [isEditMode]
  );

  const handleSubmit = async (
    values: {
      phoneNumber: string;
      firstName: string;
      lastName: string;
      password: string;
      role: string;
      nationalCode: string | null;
      address: string | null;
      gender: string | null;
      clinicId: string | null;
      profileImage: File | null;
    },
    resetForm: () => void
  ) => {
    try {
      const formData = new FormData();
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      if (values.password) {
        formData.append("password", values.password);
      }
      formData.append("role", values.role);
      if (values.nationalCode) {
        formData.append("nationalCode", values.nationalCode);
      }
      if (values.address) {
        formData.append("address", values.address);
      }
      if (values.gender) {
        formData.append("gender", values.gender);
      }
      if (values.clinicId) {
        formData.append("clinicId", values.clinicId);
      }
      if (values.profileImage) {
        formData.append("profileImage", values.profileImage);
      }
      if (removeImage && isEditMode) {
        formData.append("removeProfileImage", "true");
      }

      if (isEditMode && user?.id) {
        const response = await updateUser({ id: user.id, data: formData });
        showSuccessToast("کاربر با موفقیت ویرایش شد");
        setRemoveImage(false);
        // Update cache immediately with the response data
        if (response?.data?.user) {
          queryClient.setQueryData(["user", user.id], response);
        }
        // Invalidate and refetch queries to ensure all data is fresh
        queryClient.invalidateQueries({ queryKey: ["users"] });
        queryClient.invalidateQueries({ queryKey: ["user", user.id] });
        navigate("/admin/users-management");
      } else {
        await createUser(formData);
        showSuccessToast("کاربر با موفقیت ایجاد شد");
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["users"] });
        // اسکرول به بالای container اصلی
        const scrollContainer = document.querySelector(".overflow-auto");
        if (scrollContainer) {
          scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ||
        (isEditMode
          ? "خطایی در ویرایش کاربر رخ داد"
          : "خطایی در ایجاد کاربر رخ داد");
      showErrorToast(errorMessage);
    }
  };

  return (
    <Formik
      initialValues={{
        phoneNumber: user?.phoneNumber || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        password: "",
        role: user?.role || "PATIENT",
        nationalCode: user?.nationalCode || "",
        address: user?.address || "",
        gender: user?.gender || null,
        clinicId: user?.clinicId || null,
        profileImage: null as File | null,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(
          {
            phoneNumber: values.phoneNumber,
            firstName: values.firstName,
            lastName: values.lastName,
            password: values.password,
            role: values.role,
            nationalCode: values.nationalCode || null,
            address: values.address || null,
            gender: values.gender || null,
            clinicId: values.clinicId || null,
            profileImage: values.profileImage,
          },
          resetForm
        );
      }}
    >
      {(formik) => {
        const shouldShowCurrentImage =
          user?.profileImage && !formik.values.profileImage && !removeImage;

        return (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomInput
                labelText="نام"
                placeholder="نام را وارد کنید"
                className="bg-white"
                requiredText
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
                requiredText
                className="bg-white"
                {...formik.getFieldProps("lastName")}
                errorMessage={
                  formik.touched.lastName && formik.errors.lastName
                    ? formik.errors.lastName
                    : null
                }
              />

              <CustomInput
                labelText="شماره تماس"
                placeholder="شماره تماس را وارد کنید"
                requiredText
                className="bg-white"
                inputType="phone"
                {...formik.getFieldProps("phoneNumber")}
                errorMessage={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? formik.errors.phoneNumber
                    : null
                }
              />

              <CustomInput
                labelText="رمز عبور"
                placeholder={
                  isEditMode
                    ? "در صورت تغییر وارد کنید"
                    : "رمز عبور را وارد کنید"
                }
                requiredText={!isEditMode}
                className="bg-white"
                type="password"
                {...formik.getFieldProps("password")}
                errorMessage={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : null
                }
              />

              <div>
                <label className="block text-dark font-estedad-lightbold mb-2 mr-4">
                  نقش
                  <span className="text-red-500 mr-1">*</span>
                </label>
                <Select<OptionType>
                  options={roleOptions}
                  value={roleOptions.find(
                    (option) => option.value === formik.values.role
                  )}
                  onChange={(selected) => {
                    formik.setFieldValue("role", selected?.value || "PATIENT");
                    // اگر نقش منشی نیست، کلینیک را پاک کن
                    if (selected?.value !== "SECRETARY") {
                      formik.setFieldValue("clinicId", null);
                    }
                    formik.setFieldTouched("role", true);
                  }}
                  onBlur={() => formik.setFieldTouched("role", true)}
                  placeholder="نقش را انتخاب کنید"
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
                <div className="text-red-500 text-[10px] mr-4 mt-1 min-h-[20px]">
                  {formik.touched.role && formik.errors.role
                    ? formik.errors.role
                    : null}
                </div>
              </div>

              {formik.values.role === "SECRETARY" && (
                <div>
                  <label className="block text-dark font-estedad-lightbold mb-2 mr-4">
                    کلینیک
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
                    placeholder="کلینیک را انتخاب کنید"
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
                      placeholder: () => `!text-dark`,
                    }}
                  />
                </div>
              )}

              <CustomInput
                labelText="کد ملی"
                placeholder="کد ملی را وارد کنید"
                optional
                className="bg-white"
                {...formik.getFieldProps("nationalCode")}
                errorMessage={
                  formik.touched.nationalCode && formik.errors.nationalCode
                    ? formik.errors.nationalCode
                    : null
                }
              />

              <div>
                <label className="block text-dark font-estedad-lightbold mb-2 mr-4">
                  جنسیت
                </label>
                <Select<OptionType>
                  options={genderOptions}
                  value={
                    genderOptions.find(
                      (option) => option.value === formik.values.gender
                    ) || null
                  }
                  onChange={(selected) => {
                    formik.setFieldValue("gender", selected?.value || null);
                    formik.setFieldTouched("gender", true);
                  }}
                  onBlur={() => formik.setFieldTouched("gender", true)}
                  placeholder="جنسیت را انتخاب کنید"
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
                    placeholder: () => `!text-dark`,
                  }}
                />
              </div>
            </div>

            <CustomTextArea
              labelText="آدرس"
              placeholder="آدرس را وارد کنید"
              optional
              rows={3}
              className="bg-white"
              {...formik.getFieldProps("address")}
              errorMessage={
                formik.touched.address && formik.errors.address
                  ? formik.errors.address
                  : null
              }
            />

            <div>
              <label className="block text-dark font-estedad-lightbold mb-2 mr-4">
                تصویر پروفایل
              </label>
              <div className="flex items-center gap-4 flex-wrap">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden "
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    formik.setFieldValue("profileImage", file);
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
                {formik.values.profileImage instanceof File && (
                  <span className="text-sm text-dark font-estedad-light">
                    {formik.values.profileImage.name}
                  </span>
                )}
                {shouldShowCurrentImage && (
                  <div className="flex items-center gap-2 flex-wrap justify-center ">
                    <img
                      src={getImageUrl(user.profileImage)}
                      alt="Profile"
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
                {isEditMode ? "ویرایش کاربر" : "ایجاد کاربر"}
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

export default UserManagementForm;
