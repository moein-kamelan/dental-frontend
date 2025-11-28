import React, { useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../../../modules/CustomInput/CustomInput";
import CustomTextArea from "../../../../modules/CustomTextArea/CustomTextArea";
import Select, { components } from "react-select";
import type { DropdownIndicatorProps } from "react-select";
import { useUpdateProfileWithImage } from "../../../../../services/useAuth";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../../../utils/toastify";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../redux/typedHooks";
import { setUser } from "../../../../../redux/slices/userSlice";
import type { OptionType } from "../../../../../types/types";

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

const genderOptions: OptionType[] = [
  { value: "MALE", label: "مرد" },
  { value: "FEMALE", label: "زن" },
  { value: "OTHER", label: "سایر" },
];

function ProfileManagementForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();
  const { mutateAsync: updateProfile, isPending } = useUpdateProfileWithImage();

  const validationSchema = React.useMemo(
    () =>
      Yup.object({
        firstName: Yup.string()
          .min(2, "نام باید حداقل 2 کاراکتر باشد")
          .max(50, "نام نمی‌تواند بیشتر از 50 کاراکتر باشد"),
        lastName: Yup.string()
          .min(2, "نام خانوادگی باید حداقل 2 کاراکتر باشد")
          .max(50, "نام خانوادگی نمی‌تواند بیشتر از 50 کاراکتر باشد"),
        nationalCode: Yup.string()
          .nullable()
          .matches(/^[0-9]{10}$/, "کد ملی باید 10 رقم باشد")
          .optional(),
        address: Yup.string()
          .max(500, "آدرس نمی‌تواند بیشتر از 500 کاراکتر باشد")
          .nullable()
          .optional(),
        gender: Yup.string()
          .oneOf(["MALE", "FEMALE", "OTHER"], "جنسیت نامعتبر است")
          .nullable()
          .optional(),
      }),
    []
  );

  const handleSubmit = async (values: {
    firstName: string;
    lastName: string;
    nationalCode: string | null;
    address: string | null;
    gender: string | null;
    profileImage: File | null;
  }) => {
    try {
      const formData = new FormData();

      if (values.firstName) {
        formData.append("firstName", values.firstName);
      }
      if (values.lastName) {
        formData.append("lastName", values.lastName);
      }
      if (values.nationalCode) {
        formData.append("nationalCode", values.nationalCode);
      } else {
        formData.append("nationalCode", "");
      }
      // Append address (empty string is allowed and will be converted to null in backend)
      if (values.address !== null && values.address !== undefined) {
        formData.append("address", values.address);
      } else {
        formData.append("address", "");
      }
      if (values.gender) {
        formData.append("gender", values.gender);
      }

      // Only append file if it's a valid File object (not a fake one from URL)
      if (
        values.profileImage &&
        values.profileImage instanceof File &&
        values.profileImage.size > 0
      ) {
        formData.append("profileImage", values.profileImage);
      }

      const response = await updateProfile(formData);
      showSuccessToast("پروفایل با موفقیت به‌روزرسانی شد");

      // Update Redux store with new user data
      // Preserve the role field from the current user to prevent redirect issues
      if (response?.data?.user) {
        const updatedUser = {
          ...response.data.user,
          role: user?.role || response.data.user.role,
        };
        dispatch(setUser(updatedUser));
      }

      // Reset file input
      setTimeout(() => {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 0);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در به‌روزرسانی پروفایل رخ داد";
      showErrorToast(errorMessage);
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        nationalCode: user?.nationalCode || "",
        address: user?.address || "",
        gender: user?.gender || null,
        profileImage: null as File | null,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await handleSubmit({
          firstName: values.firstName,
          lastName: values.lastName,
          nationalCode: values.nationalCode || null,
          address: values.address || null,
          gender: values.gender || null,
          profileImage: values.profileImage,
        });
      }}
    >
      {(formik) => {
        return (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomInput
                labelText="نام"
                placeholder="نام را وارد کنید"
                className="bg-white"
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
                className="bg-white"
                {...formik.getFieldProps("lastName")}
                errorMessage={
                  formik.touched.lastName && formik.errors.lastName
                    ? formik.errors.lastName
                    : null
                }
              />

              <CustomInput
                labelText="کد ملی"
                placeholder="کد ملی را وارد کنید"
                type="text"
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
              <div className="flex items-center gap-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    formik.setFieldValue("profileImage", file);
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-8 py-3 mr-4 rounded-lg font-estedad-medium bg-purple-500/60 text-white hover:bg-purple-600/60 transition-colors"
                >
                  انتخاب فایل
                </button>
                {formik.values.profileImage &&
                  formik.values.profileImage instanceof File && (
                    <span className="text-sm text-dark font-estedad-light">
                      {formik.values.profileImage.name}
                    </span>
                  )}
                {user?.profileImage && !formik.values.profileImage && (
                  <div className="flex items-center gap-2">
                    <img
                      src={`http://localhost:4000${user.profileImage}`}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span className="text-sm text-paragray">تصویر فعلی</span>
                  </div>
                )}
              </div>
              {formik.touched.profileImage && formik.errors.profileImage && (
                <div className="text-red-500 text-[10px] mr-4 mt-1 min-h-[20px]">
                  {formik.errors.profileImage}
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="purple-btn flex items-center gap-2"
                disabled={formik.isSubmitting || isPending}
              >
                ذخیره تغییرات
                {(formik.isSubmitting || isPending) && (
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

export default ProfileManagementForm;
