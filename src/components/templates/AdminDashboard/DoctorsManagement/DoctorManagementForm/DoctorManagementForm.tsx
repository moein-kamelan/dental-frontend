import { useRef, useMemo, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../../modules/CustomInput/CustomInput";
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
import TextEditor from "../../../../modules/AdminDashboard/TextEditor/TextEditor";
import { getImageUrl } from "../../../../../utils/helpers";

const daysOfWeek = [
  { value: "saturday", label: "شنبه" },
  { value: "sunday", label: "یکشنبه" },
  { value: "monday", label: "دوشنبه" },
  { value: "tuesday", label: "سه‌شنبه" },
  { value: "wednesday", label: "چهارشنبه" },
  { value: "thursday", label: "پنج‌شنبه" },
  { value: "friday", label: "جمعه" },
];

type TimeRange = {
  start: string;
  end: string;
};

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
  const [removeImage, setRemoveImage] = useState(false);

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
        // شناسه‌ها را به صورت رشته ساده اعتبارسنجی می‌کنیم (نه uuid)،
        // چون در اکثر سناریوها id ها uuid استاندارد نیستند.
        clinicIds: Yup.array()
          .of(Yup.string())
          .min(1, "انتخاب حداقل یک کلینیک الزامی است")
          .required("انتخاب کلینیک الزامی است"),
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
      workingDays: Record<string, Record<string, TimeRange[]>>; // { clinicId: { day: TimeRange[] } }
      profileImage: File | null;
      isAppointmentEnabled: boolean;
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

      if (values.workingDays && values.clinicIds.length > 0) {
        // تبدیل به فرمت موردنظر: {"clinicId": {"saturday": "14:00-15:00 & 15:00-16:00", "sunday": null, ...}}
        const formattedWorkingDays: Record<string, Record<string, string | null>> = {};

        // برای هر کلینیک
        values.clinicIds.forEach((clinicId) => {
          const clinicWorkingDays = values.workingDays[clinicId] || {};
          const formattedClinicDays: Record<string, string | null> = {};

        daysOfWeek.forEach((day) => {
            const timeRanges = clinicWorkingDays[day.value] || [];
          if (timeRanges.length > 0) {
            // تبدیل هر بازه به "start-end" و اتصال با " & "
            const timeStrings = timeRanges
              .filter((range) => range.start && range.end)
              .map((range) => `${range.start}-${range.end}`);
              formattedClinicDays[day.value] =
              timeStrings.length > 0 ? timeStrings.join(" & ") : null;
          } else {
              formattedClinicDays[day.value] = null;
          }
          });

          formattedWorkingDays[clinicId] = formattedClinicDays;
        });

        formData.append("workingDays", JSON.stringify(formattedWorkingDays));
      }

      if (values.profileImage) {
        formData.append("profileImage", values.profileImage);
      }
      if (removeImage && isEditMode) {
        formData.append("removeProfileImage", "true");
      }

      formData.append("isAppointmentEnabled", values.isAppointmentEnabled ? "true" : "false");

      if (isEditMode && doctor?.id) {
        const response = await updateDoctor({ id: doctor.id, data: formData });
        showSuccessToast("پزشک با موفقیت ویرایش شد");
        setRemoveImage(false);
        // Update cache immediately with the response data
        if (response?.data?.doctor) {
          queryClient.setQueryData(["doctor", doctor.id], response);
        }
        // Invalidate and refetch queries to ensure all data is fresh
        queryClient.invalidateQueries({ queryKey: ["doctors"] });
        queryClient.invalidateQueries({ queryKey: ["doctor", doctor.id] });
        navigate("/admin/doctors-management");
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
        isAppointmentEnabled: doctor?.isAppointmentEnabled ?? false,
        workingDays: (() => {
          // تبدیل داده‌های ورودی به ساختار جدید: { clinicId: { day: TimeRange[] } }
          const workingDaysData = doctor?.workingDays;
          const clinicIds = doctor?.clinics?.map((c) => c.clinic.id) || [];
          
          if (workingDaysData && clinicIds.length > 0) {
            const converted: Record<string, Record<string, TimeRange[]>> = {};

            // برای هر کلینیک
            clinicIds.forEach((clinicId) => {
              const clinicWorkingDays = workingDaysData[clinicId];
              if (!clinicWorkingDays || typeof clinicWorkingDays !== "object") {
                // اگر برای این کلینیک داده‌ای نیست، یک object خالی می‌سازیم
                converted[clinicId] = {};
                daysOfWeek.forEach((day) => {
                  converted[clinicId][day.value] = [];
                });
                return;
              }

              converted[clinicId] = {};

            // برای هر روز از هفته
            daysOfWeek.forEach((day) => {
                const value = clinicWorkingDays[day.value];

              if (value === null || value === undefined) {
                  converted[clinicId][day.value] = [];
              } else if (typeof value === "string" && value.trim()) {
                // اگر string است و شامل " & " باشد، چندین بازه زمانی دارد
                if (value.includes(" & ")) {
                  // تقسیم به بازه‌های جداگانه: "14:00-15:00 & 15:00-16:00"
                  const timeRanges = value.split(" & ").map((range) => {
                    const [start, end] = range.trim().split("-");
                    return { start: start || "", end: end || "" };
                  });
                    converted[clinicId][day.value] = timeRanges.filter(
                    (range) => range.start && range.end
                  );
                } else {
                  // یک بازه زمانی ساده: "14:00-15:00"
                  const [start, end] = value.split("-");
                    converted[clinicId][day.value] =
                    start && end
                      ? [{ start: start.trim(), end: end.trim() }]
                      : [];
                }
              } else if (Array.isArray(value)) {
                // اگر array است (فرمت قدیمی)
                  converted[clinicId][day.value] = value.map((item) => {
                  if (typeof item === "string") {
                    const [start, end] = item.split("-");
                    return { start: start || "", end: end || "" };
                  }
                  return item as TimeRange;
                });
              } else {
                  converted[clinicId][day.value] = [];
              }
              });
            });

            return converted;
          }
          return {} as Record<string, Record<string, TimeRange[]>>;
        })(),
        profileImage: null as File | null,
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
            isAppointmentEnabled: values.isAppointmentEnabled,
          },
          resetForm
        );
      }}
    >
      {(formik) => {
        const shouldShowCurrentImage =
          doctor?.profileImage && !formik.values.profileImage && !removeImage;

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

            <TextEditor
              labelText="بیوگرافی"
              placeholder="بیوگرافی پزشک را وارد کنید"
              optional
              value={formik.values.biography}
              onChange={(data) => {
                formik.setFieldValue("biography", data);
                formik.setFieldTouched("biography", true);
              }}
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
              <div className="flex items-center gap-3 mb-2 flex-wrap">
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
                <span className="text-red-500 mr-1">*</span>
              </label>
              <div className="">
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
                  onBlur={() => formik.setFieldTouched("clinicIds", true)}
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
                <div className="text-red-500 text-[10px] mr-4 mt-1 min-h-[20px]">
                  {(formik.touched.clinicIds || formik.submitCount > 0) &&
                    formik.errors.clinicIds && (
                      <span>{formik.errors.clinicIds}</span>
                    )}
                </div>
              </div>
            </div>

            {/* فعال بودن نوبت‌گیری */}
            <div className="flex items-center gap-3 mr-4">
              <input
                type="checkbox"
                id="isAppointmentEnabled"
                checked={formik.values.isAppointmentEnabled}
                onChange={(e) => {
                  formik.setFieldValue("isAppointmentEnabled", e.target.checked);
                }}
                className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
              />
              <label
                htmlFor="isAppointmentEnabled"
                className="text-dark font-estedad-lightbold cursor-pointer"
              >
                فعال بودن امکان نوبت‌گیری برای این پزشک
              </label>
            </div>

            {/* روزهای کاری به تفکیک کلینیک */}
            {formik.values.clinicIds.length > 0 && (
            <div>
              <label className="block text-dark font-estedad-lightbold mb-4 mr-4">
                  ساعت‌های کاری (به تفکیک کلینیک)
              </label>
                <div className="space-y-6">
                  {formik.values.clinicIds.map((clinicId) => {
                    const clinic = clinicOptions.find((opt) => opt.value === clinicId);
                    const clinicWorkingDays = formik.values.workingDays[clinicId] || {};

                    // Initialize empty working days for this clinic if not exists
                    if (!formik.values.workingDays[clinicId]) {
                      const newWorkingDays = { ...formik.values.workingDays };
                      newWorkingDays[clinicId] = {};
                      daysOfWeek.forEach((day) => {
                        newWorkingDays[clinicId][day.value] = [];
                      });
                      formik.setFieldValue("workingDays", newWorkingDays);
                    }

                    return (
                      <div
                        key={clinicId}
                        className="border-2 border-primary/20 rounded-xl p-6 bg-gradient-to-br from-primary/5 to-purple-50"
                      >
                        <h6 className="text-lg font-estedad-semibold text-dark mb-4 flex items-center gap-2">
                          <i className="fas fa-hospital text-primary"></i>
                          {clinic?.label || "کلینیک"}
                        </h6>
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {daysOfWeek.map((day) => {
                            const timeRanges = clinicWorkingDays[day.value] || [];

                  const addTimeRange = () => {
                    const newRanges = [
                      ...timeRanges,
                      { start: "08:00", end: "12:00" },
                    ];
                    const newWorkingDays = {
                      ...formik.values.workingDays,
                                [clinicId]: {
                                  ...clinicWorkingDays,
                      [day.value]: newRanges,
                                },
                    };
                    formik.setFieldValue("workingDays", newWorkingDays);
                  };

                  const updateTimeRange = (
                    index: number,
                    field: "start" | "end",
                    value: string
                  ) => {
                    const newRanges = [...timeRanges];
                    newRanges[index] = {
                      ...newRanges[index],
                      [field]: value,
                    };
                    const newWorkingDays = {
                      ...formik.values.workingDays,
                                [clinicId]: {
                                  ...clinicWorkingDays,
                      [day.value]: newRanges,
                                },
                    };
                    formik.setFieldValue("workingDays", newWorkingDays);
                  };

                  const removeTimeRange = (index: number) => {
                    const newRanges = timeRanges.filter((_, i) => i !== index);
                    const newWorkingDays = {
                      ...formik.values.workingDays,
                                [clinicId]: {
                                  ...clinicWorkingDays,
                      [day.value]: newRanges,
                                },
                    };
                    formik.setFieldValue("workingDays", newWorkingDays);
                  };

                  return (
                    <div
                      key={day.value}
                      className="space-y-3 p-4 border-2 border-main-border-color rounded-lg bg-white"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-dark">
                          {day.label}
                        </label>
                        <button
                          type="button"
                          onClick={addTimeRange}
                          className="text-primary hover:text-primary/80 text-xs font-estedad-lightbold flex items-center gap-1"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 3V13M3 8H13"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          افزودن بازه
                        </button>
                      </div>

                      {timeRanges.length === 0 ? (
                        <div className="text-center py-4 text-paragray text-sm">
                          بازه زمانی انتخاب نشده است
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {timeRanges.map((range, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-main-border-color"
                            >
                              <div className="flex-1 flex flex-wrap items-center gap-2">
                                <div className="flex-1">
                                  <label className="block text-xs text-paragray mb-1">
                                    از
                                  </label>
                                  <input
                                    type="time"
                                    value={range.start}
                                    onChange={(e) =>
                                      updateTimeRange(
                                        index,
                                        "start",
                                        e.target.value
                                      )
                                    }
                                    className="w-full px-3 py-2 border-2 border-main-border-color rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                  />
                                </div>
                                <div className="flex-1">
                                  <label className="block text-xs text-paragray mb-1">
                                    تا
                                  </label>
                                  <input
                                    type="time"
                                    value={range.end}
                                    onChange={(e) =>
                                      updateTimeRange(
                                        index,
                                        "end",
                                        e.target.value
                                      )
                                    }
                                    min={range.start}
                                    className="w-full px-3 py-2 border-2 border-main-border-color rounded-lg text-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                  />
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeTimeRange(index)}
                                className="text-red-500 hover:text-red-700 p-2 transition-colors"
                                title="حذف"
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M5 5L15 15M15 5L5 15"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
                    );
                  })}
                </div>
              </div>
            )}

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
                {formik.values.profileImage instanceof File && (
                  <span className="text-sm text-dark font-estedad-light">
                    {formik.values.profileImage.name}
                  </span>
                )}
                {shouldShowCurrentImage && (
                  <div className="flex items-center gap-2 flex-wrap justify-center ">
                    <img
                      src={getImageUrl(doctor.profileImage)}
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
