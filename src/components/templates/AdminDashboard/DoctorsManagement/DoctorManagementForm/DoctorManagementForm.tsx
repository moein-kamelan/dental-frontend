import React, { useRef, useMemo } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../../modules/CustomInput/CustomInput";
import CustomTextArea from "../../../../modules/CustomTextArea/CustomTextArea";
import Select, { components } from "react-select";
import type { DropdownIndicatorProps } from "react-select";
import {
  useCreateDoctor,
  useUpdateDoctor,
} from "../../../../../services/useDoctors";
import { useGetAllClinics } from "../../../../../services/useClinics";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../../../utils/toastify";
import type { OptionType, Clinic, Doctor } from "../../../../../types/types";
import { useQueryClient } from "@tanstack/react-query";

const daysOfWeek = [
  { value: "saturday", label: "شنبه" },
  { value: "sunday", label: "یکشنبه" },
  { value: "monday", label: "دوشنبه" },
  { value: "tuesday", label: "سه‌شنبه" },
  { value: "wednesday", label: "چهارشنبه" },
  { value: "thursday", label: "پنج‌شنبه" },
  { value: "friday", label: "جمعه" },
];

const timeSlots = [
  { value: "08:00-10:00", label: "08:00-10:00" },
  { value: "10:00-12:00", label: "10:00-12:00" },
  { value: "12:00-14:00", label: "12:00-14:00" },
  { value: "14:00-16:00", label: "14:00-16:00" },
  { value: "16:00-18:00", label: "16:00-18:00" },
  { value: "18:00-20:00", label: "18:00-20:00" },
  { value: "20:00-22:00", label: "20:00-22:00" },
];

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

function DoctorManagementForm({ doctor }: { doctor?: Doctor }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: createDoctor } = useCreateDoctor();
  const { mutateAsync: updateDoctor } = useUpdateDoctor();
  const { data: clinicsData } = useGetAllClinics(1, 100);

  const isEditMode = !!doctor?.id;

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
        firstName: Yup.string().required("نام الزامی است"),
        lastName: Yup.string().required("نام خانوادگی الزامی است"),
        university: Yup.string().required("دانشگاه الزامی است"),
        medicalLicenseNo: Yup.string().required("شماره نظام پزشکی الزامی است"),
        biography: Yup.string(),
        skills: Yup.array().of(Yup.string()),
        clinicIds: Yup.array().of(Yup.string().uuid()),
        workingDays: Yup.object(),
      }),
    []
  );

  const handleSubmit = async (
    values: {
      firstName: string;
      lastName: string;
      university: string;
      biography: string;
      skills: string[];
      medicalLicenseNo: string;
      clinicIds: string[];
      workingDays: Record<string, string | null>;
      profileImage: File | null;
    },
    resetForm: () => void
  ) => {
    try {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("university", values.university);
      formData.append("medicalLicenseNo", values.medicalLicenseNo);

      if (values.biography) {
        formData.append("biography", values.biography);
      }

      if (values.skills && values.skills.length > 0) {
        formData.append("skills", JSON.stringify(values.skills));
      }

      if (values.clinicIds && values.clinicIds.length > 0) {
        formData.append("clinicIds", JSON.stringify(values.clinicIds));
      }

      if (values.workingDays) {
        formData.append("workingDays", JSON.stringify(values.workingDays));
      }

      if (values.profileImage) {
        formData.append("profileImage", values.profileImage);
      }

      if (isEditMode && doctor?.id) {
        await updateDoctor({ id: doctor.id, data: formData });
        showSuccessToast("پزشک با موفقیت ویرایش شد");
        queryClient.invalidateQueries({ queryKey: ["doctors"] });
        queryClient.invalidateQueries({ queryKey: ["doctor"] });
        navigate("/admin-dashboard/doctors-management");
      } else {
        await createDoctor(formData);
        showSuccessToast("پزشک با موفقیت ایجاد شد");
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["doctors"] });
        queryClient.invalidateQueries({ queryKey: ["doctor"] });
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
          ? "خطایی در ویرایش پزشک رخ داد"
          : "خطایی در ایجاد پزشک رخ داد");
      showErrorToast(errorMessage);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: doctor?.firstName || "",
        lastName: doctor?.lastName || "",
        university: doctor?.university || "",
        biography: doctor?.biography || "",
        skills: doctor?.skills || ([] as string[]),
        medicalLicenseNo: doctor?.medicalLicenseNo || "",
        clinicIds:
          doctor?.clinics?.map((clinic) => clinic.clinic.id) ||
          ([] as string[]),
        workingDays:
          doctor?.workingDays || ({} as Record<string, string | null>),
        profileImage: doctor?.profileImage
          ? new File([], doctor.profileImage)
          : (null as File | null),
        skillInput: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(
          {
            firstName: values.firstName,
            lastName: values.lastName,
            university: values.university,
            biography: values.biography,
            skills: values.skills,
            medicalLicenseNo: values.medicalLicenseNo,
            clinicIds: values.clinicIds,
            workingDays: values.workingDays,
            profileImage: values.profileImage,
          },
          resetForm
        );
      }}
    >
      {(formik) => {
        const addSkill = () => {
          if (formik.values.skillInput.trim()) {
            const newSkills = [
              ...formik.values.skills,
              formik.values.skillInput.trim(),
            ];
            formik.setFieldValue("skills", newSkills);
            formik.setFieldValue("skillInput", "");
          }
        };

        const removeSkill = (index: number) => {
          const newSkills = formik.values.skills.filter((_, i) => i !== index);
          formik.setFieldValue("skills", newSkills);
        };

        return (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
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
                labelText="دانشگاه تحصیلی"
                placeholder="دانشگاه را وارد کنید"
                requiredText
                className="bg-white"
                {...formik.getFieldProps("university")}
                errorMessage={
                  formik.touched.university && formik.errors.university
                    ? formik.errors.university
                    : null
                }
              />

              <CustomInput
                labelText="شماره نظام پزشکی"
                placeholder="شماره نظام پزشکی را وارد کنید"
                requiredText
                className="bg-white"
                {...formik.getFieldProps("medicalLicenseNo")}
                errorMessage={
                  formik.touched.medicalLicenseNo &&
                  formik.errors.medicalLicenseNo
                    ? formik.errors.medicalLicenseNo
                    : null
                }
              />
            </div>

            <CustomTextArea
              labelText="بیوگرافی"
              placeholder="بیوگرافی پزشک را وارد کنید"
              optional
              rows={4}
              className="bg-white"
              {...formik.getFieldProps("biography")}
              errorMessage={
                formik.touched.biography && formik.errors.biography
                  ? formik.errors.biography
                  : null
              }
            />

            <div>
              <label className="block text-dark font-estedad-lightbold mb-2 mr-4">
                تخصص‌ ها
              </label>
              <div className="flex items-center gap-3 mb-2">
                <CustomInput
                  className="flex-1 bg-white"
                  labelText=""
                  placeholder="تخصص را وارد کنید و Enter بزنید"
                  {...formik.getFieldProps("skillInput")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />
                <button type="button" onClick={addSkill} className="purple-btn">
                  افزودن
                </button>
              </div>
              {formik.values.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mr-4 mb-2">
                  {formik.values.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full flex items-center gap-2"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-dark font-estedad-lightbold mb-2 mr-4">
                کلینیک‌ ها
              </label>
              <div className="mr-4">
                <Select<OptionType, true>
                  isMulti
                  options={clinicOptions}
                  value={clinicOptions.filter((option) =>
                    formik.values.clinicIds.includes(option.value)
                  )}
                  onChange={(selected) => {
                    const ids = selected
                      ? selected.map((opt) => opt.value)
                      : [];
                    formik.setFieldValue("clinicIds", ids);
                  }}
                  placeholder="کلینیک‌ها را انتخاب کنید"
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

            <div>
              <label className="block text-dark font-estedad-lightbold mb-4 mr-4">
                روزهای کاری
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mr-4">
                {daysOfWeek.map((day) => (
                  <div key={day.value} className="space-y-2">
                    <label className="block text-sm font-medium text-dark">
                      {day.label}
                    </label>
                    <Select<OptionType, false>
                      options={timeSlots}
                      value={
                        formik.values.workingDays[day.value]
                          ? timeSlots.find(
                              (slot) =>
                                slot.value ===
                                formik.values.workingDays[day.value]
                            ) || null
                          : null
                      }
                      onChange={(selected) => {
                        const newWorkingDays = {
                          ...formik.values.workingDays,
                          [day.value]: selected ? selected.value : null,
                        };
                        formik.setFieldValue("workingDays", newWorkingDays);
                      }}
                      placeholder="انتخاب زمان"
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
                ))}
              </div>
            </div>

            <CustomInput
              ref={fileInputRef}
              inputType="file"
              labelText="تصویر پروفایل"
              placeholder="تصویر پروفایل را انتخاب کنید"
              className="bg-white"
              optional
              name="profileImage"
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

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="purple-btn flex items-center gap-2"
                disabled={formik.isSubmitting}
              >
                {isEditMode ? "ویرایش پزشک" : "ایجاد پزشک"}
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

export default DoctorManagementForm;
