import { useRef, useMemo, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../../../../components/modules/CustomInput/CustomInput";
import CustomTextArea from "../../../../../components/modules/CustomTextArea/CustomTextArea";
import Select, { components } from "react-select";
import type { DropdownIndicatorProps } from "react-select";
import { useUpdateProfileWithImage } from "../../../../../services/useAuth";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../../../utils/toastify";
import type { OptionType } from "../../../../../types/types";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../redux/typedHooks";
import { setUser } from "../../../../../redux/slices/userSlice";

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
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const { mutateAsync: updateProfile } = useUpdateProfileWithImage();
  const [removeImage, setRemoveImage] = useState(false);

  const validationSchema = useMemo(
    () =>
      Yup.object({
        firstName: Yup.string()
          .required("نام الزامی است")
          .min(2, "نام باید حداقل ۲ کاراکتر باشد")
          .max(50, "نام باید حداکثر ۵۰ کاراکتر باشد"),
        lastName: Yup.string()
          .required("نام خانوادگی الزامی است")
          .min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد")
          .max(50, "نام خانوادگی باید حداکثر ۵۰ کاراکتر باشد"),
        nationalCode: Yup.string().nullable(),
        address: Yup.string().max(500, "آدرس نباید بیشتر از ۵۰۰ کاراکتر باشد"),
        gender: Yup.string()
          .oneOf(["MALE", "FEMALE", "OTHER"], "جنسیت نامعتبر است")
          .nullable(),
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
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      if (values.nationalCode) {
        formData.append("nationalCode", values.nationalCode);
      } else {
        formData.append("nationalCode", "");
      }
      if (values.address) {
        formData.append("address", values.address);
      } else {
        formData.append("address", "");
      }
      if (values.gender) {
        formData.append("gender", values.gender);
      }
      if (values.profileImage) {
        formData.append("profileImage", values.profileImage);
      }
      if (removeImage) {
        formData.append("removeProfileImage", "true");
      }

      const response = await updateProfile(formData);
      showSuccessToast("پروفایل با موفقیت به‌روزرسانی شد");

      // Update Redux state with new user data
      if (response?.data?.user) {
        dispatch(setUser(response.data.user));
      }

      setRemoveImage(false);

      // Scroll to top of the container
      const scrollContainer = document.querySelector(".overflow-auto");
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در به‌روزرسانی پروفایل رخ داد";
      showErrorToast(errorMessage);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        nationalCode: user?.nationalCode || "",
        address: user?.address || "",
        gender: user?.gender || null,
        profileImage: null as File | null,
      }}
      validationSchema={validationSchema}
      enableReinitialize
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
                    ? String(formik.errors.firstName)
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
                    ? String(formik.errors.lastName)
                    : null
                }
              />

              <CustomInput
                labelText="کد ملی"
                placeholder="کد ملی را وارد کنید"
                optional
                className="bg-white"
                {...formik.getFieldProps("nationalCode")}
                errorMessage={
                  formik.touched.nationalCode && formik.errors.nationalCode
                    ? String(formik.errors.nationalCode)
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
                  ? String(formik.errors.address)
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
                  className="hidden"
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
                  className="px-8 py-3 rounded-lg font-estedad-medium bg-purple-500/60 text-white hover:bg-purple-600/60 transition-colors"
                >
                  انتخاب فایل
                </button>
                {formik.values.profileImage instanceof File && (
                  <span className="text-sm text-dark font-estedad-light">
                    {formik.values.profileImage.name}
                  </span>
                )}
                {shouldShowCurrentImage && (
                  <div className="flex items-center gap-2 flex-wrap justify-center">
                    <img
                      src={`http://localhost:4000${user.profileImage}`}
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
                به‌روزرسانی پروفایل
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

export default ProfileManagementForm;
