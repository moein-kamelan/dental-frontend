import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import CustomInput from "../../../../modules/CustomInput/CustomInput";
import CustomTextArea from "../../../../modules/CustomTextArea/CustomTextArea";
import {
  useCreateClinic,
  useUpdateClinic,
} from "../../../../../services/useClinics";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../../../utils/toastify";
import type { Clinic } from "../../../../../types/types";
import { useQueryClient } from "@tanstack/react-query";
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

function ClinicManagementForm({ clinic }: { clinic?: Clinic }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: createClinic } = useCreateClinic();
  const { mutateAsync: updateClinic } = useUpdateClinic();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [removeImage, setRemoveImage] = useState(false);

  const isEditMode = !!clinic?.id;

  const validationSchema = Yup.object({
    name: Yup.string().required("نام کلینیک الزامی است"),
    address: Yup.string().required("آدرس الزامی است"),
    phoneNumber: Yup.string(),
    description: Yup.string(),
    latitude: Yup.number()
      .nullable()
      .min(-90, "عرض جغرافیایی باید بین -90 تا 90 باشد")
      .max(90, "عرض جغرافیایی باید بین -90 تا 90 باشد"),
    longitude: Yup.number()
      .nullable()
      .min(-180, "طول جغرافیایی باید بین -180 تا 180 باشد")
      .max(180, "طول جغرافیایی باید بین -180 تا 180 باشد"),
    workingHours: Yup.object(),
    eitaaChatId: Yup.string().nullable(),
  });

  const handleSubmit = async (
    values: {
      name: string;
      address: string;
      phoneNumber: string;
      description: string;
      latitude: number | null;
      longitude: number | null;
      workingHours: Record<string, TimeRange[]>;
      image: File | null;
      eitaaChatId: string | null;
    },
    resetForm: () => void
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("address", values.address);
      formData.append("phoneNumber", values.phoneNumber);

      if (values.description) {
        formData.append("description", values.description);
      }

      // Only append latitude if it has a valid value
      if (
        values.latitude !== null &&
        values.latitude !== undefined &&
        !isNaN(values.latitude)
      ) {
        formData.append("latitude", values.latitude.toString());
      }

      // Only append longitude if it has a valid value
      if (
        values.longitude !== null &&
        values.longitude !== undefined &&
        !isNaN(values.longitude)
      ) {
        formData.append("longitude", values.longitude.toString());
      }

      if (values.workingHours) {
        const formattedWorkingHours: Record<string, string | null> = {};
        daysOfWeek.forEach((day) => {
          const timeRanges = values.workingHours[day.value] || [];
          if (timeRanges.length > 0) {
            const timeStrings = timeRanges
              .filter((range) => range.start && range.end)
              .map((range) => `${range.start}-${range.end}`);
            formattedWorkingHours[day.value] =
              timeStrings.length > 0 ? timeStrings.join(" & ") : null;
          } else {
            formattedWorkingHours[day.value] = null;
          }
        });
        formData.append("workingHours", JSON.stringify(formattedWorkingHours));
      }

      // Always append eitaaChatId (mandatory) - send empty string if null/undefined to allow clearing
      const eitaaChatIdValue = values.eitaaChatId || "";
      console.log('=== FRONTEND DEBUG - eitaaChatId ===');
      console.log('values.eitaaChatId:', values.eitaaChatId);
      console.log('eitaaChatIdValue to send:', eitaaChatIdValue);
      console.log('isEditMode:', isEditMode);
      formData.append("eitaaChatId", eitaaChatIdValue);
      
      // Debug: Log all FormData entries
      console.log('=== FormData entries ===');
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      console.log('========================');

      // Handle image upload
      if (values.image instanceof File) {
        formData.append("image", values.image);
      }
      // #region agent log
      fetch(
        "http://127.0.0.1:7242/ingest/c5282bb0-1a44-499c-bce8-9a51f667292e",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: "ClinicManagementForm.tsx:122",
            message: "Before adding removeImage to FormData",
            data: {
              removeImage,
              isEditMode,
              hasImageFile: values.image instanceof File,
            },
            timestamp: Date.now(),
            sessionId: "debug-session",
            runId: "run1",
            hypothesisId: "B",
          }),
        }
      ).catch(() => {});
      // #endregion
      if (removeImage && isEditMode) {
        formData.append("removeImage", "true");
        // #region agent log
        fetch(
          "http://127.0.0.1:7242/ingest/c5282bb0-1a44-499c-bce8-9a51f667292e",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              location: "ClinicManagementForm.tsx:125",
              message: "removeImage added to FormData",
              data: { removeImage, isEditMode },
              timestamp: Date.now(),
              sessionId: "debug-session",
              runId: "run1",
              hypothesisId: "B",
            }),
          }
        ).catch(() => {});
        // #endregion
      }

      if (isEditMode && clinic?.id) {
        // #region agent log
        fetch(
          "http://127.0.0.1:7242/ingest/c5282bb0-1a44-499c-bce8-9a51f667292e",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              location: "ClinicManagementForm.tsx:127",
              message: "Before updateClinic call",
              data: {
                clinicId: clinic.id,
                removeImage,
                hasImageFile: formData.has("image"),
                hasRemoveImage: formData.has("removeImage"),
              },
              timestamp: Date.now(),
              sessionId: "debug-session",
              runId: "run1",
              hypothesisId: "B",
            }),
          }
        ).catch(() => {});
        // #endregion
        let response;
        try {
          response = await updateClinic({ id: clinic.id, data: formData });
          // #region agent log
          fetch(
            "http://127.0.0.1:7242/ingest/c5282bb0-1a44-499c-bce8-9a51f667292e",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                location: "ClinicManagementForm.tsx:130",
                message: "After updateClinic response - SUCCESS",
                data: {
                  clinicId: clinic.id,
                  responseImage: response?.data?.clinic?.image,
                  responseImageNull: response?.data?.clinic?.image === null,
                  responseImageUndefined:
                    response?.data?.clinic?.image === undefined,
                  fullResponse: JSON.stringify(response),
                },
                timestamp: Date.now(),
                sessionId: "debug-session",
                runId: "run1",
                hypothesisId: "D",
              }),
            }
          ).catch(() => {});
          // #endregion
        } catch (error: unknown) {
          // #region agent log
          const errorObj = error as { message?: string; response?: { data?: unknown } };
          fetch(
            "http://127.0.0.1:7242/ingest/c5282bb0-1a44-499c-bce8-9a51f667292e",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                location: "ClinicManagementForm.tsx:155",
                message: "After updateClinic response - ERROR",
                data: {
                  clinicId: clinic.id,
                  error: errorObj?.message,
                  errorResponse: errorObj?.response?.data,
                },
                timestamp: Date.now(),
                sessionId: "debug-session",
                runId: "run1",
                hypothesisId: "D",
              }),
            }
          ).catch(() => {});
          // #endregion
          throw error;
        }
        showSuccessToast("کلینیک با موفقیت ویرایش شد");
        setRemoveImage(false);
        // Update cache immediately with the response data
        if (response?.data?.clinic) {
          queryClient.setQueryData(["clinic", clinic.id], response);
          // #region agent log
          fetch(
            "http://127.0.0.1:7242/ingest/c5282bb0-1a44-499c-bce8-9a51f667292e",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                location: "ClinicManagementForm.tsx:135",
                message: "Cache updated with response",
                data: {
                  clinicId: clinic.id,
                  cachedImage: response?.data?.clinic?.image,
                },
                timestamp: Date.now(),
                sessionId: "debug-session",
                runId: "run1",
                hypothesisId: "E",
              }),
            }
          ).catch(() => {});
          // #endregion
        }
        // Invalidate and refetch queries to ensure all data is fresh
        await queryClient.invalidateQueries({
          queryKey: ["clinics"],
          refetchType: "active",
        });
        await queryClient.invalidateQueries({
          queryKey: ["clinic", clinic.id],
          refetchType: "active",
        });
        // Force refetch all clinics queries immediately
        await queryClient.refetchQueries({
          queryKey: ["clinics"],
        });
        // #region agent log
        fetch(
          "http://127.0.0.1:7242/ingest/c5282bb0-1a44-499c-bce8-9a51f667292e",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              location: "ClinicManagementForm.tsx:139",
              message: "Queries invalidated",
              data: { clinicId: clinic.id },
              timestamp: Date.now(),
              sessionId: "debug-session",
              runId: "run1",
              hypothesisId: "E",
            }),
          }
        ).catch(() => {});
        // #endregion
        navigate("/admin/clinics-management");
      } else {
        await createClinic(formData);
        showSuccessToast("کلینیک با موفقیت ایجاد شد");
        resetForm();
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        queryClient.invalidateQueries({ queryKey: ["clinics"] });
        queryClient.invalidateQueries({ queryKey: ["clinic"] });
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
          ? "خطایی در ویرایش کلینیک رخ داد"
          : "خطایی در ایجاد کلینیک رخ داد");
      showErrorToast(errorMessage);
    }
  };

  return (
    <Formik
      initialValues={{
        name: clinic?.name || "",
        address: clinic?.address || "",
        phoneNumber: clinic?.phoneNumber || "",
        description: clinic?.description || "",
        image: null as File | null,
        latitude: clinic?.latitude ?? null,
        longitude: clinic?.longitude ?? null,
        eitaaChatId: clinic?.eitaaChatId || null,
        workingHours: (() => {
          const workingHoursData = clinic?.workingHours;
          if (workingHoursData) {
            const converted: Record<string, TimeRange[]> = {};

            daysOfWeek.forEach((day) => {
              const value = workingHoursData[day.value];

              if (value === null || value === undefined) {
                converted[day.value] = [];
              } else if (typeof value === "string" && value.trim()) {
                if (value.includes(" & ")) {
                  const timeRanges = value.split(" & ").map((range) => {
                    const [start, end] = range.trim().split("-");
                    return { start: start || "", end: end || "" };
                  });
                  converted[day.value] = timeRanges.filter(
                    (range) => range.start && range.end
                  );
                } else {
                  const [start, end] = value.split("-");
                  converted[day.value] =
                    start && end
                      ? [{ start: start.trim(), end: end.trim() }]
                      : [];
                }
              } else if (Array.isArray(value)) {
                converted[day.value] = value.map((item) => {
                  if (typeof item === "string") {
                    const [start, end] = item.split("-");
                    return { start: start || "", end: end || "" };
                  }
                  return item as TimeRange;
                });
              } else {
                converted[day.value] = [];
              }
            });

            return converted;
          }
          return {} as Record<string, TimeRange[]>;
        })(),
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(
          {
            name: values.name,
            address: values.address,
            phoneNumber: values.phoneNumber,
            description: values.description,
            image: values.image,
            latitude:
              values.latitude === null || values.latitude === undefined
                ? null
                : Number(values.latitude),
            longitude:
              values.longitude === null || values.longitude === undefined
                ? null
                : Number(values.longitude),
            workingHours: values.workingHours,
            eitaaChatId: values.eitaaChatId || null,
          },
          resetForm
        );
      }}
    >
      {(formik) => {
        const shouldShowCurrentImage =
          clinic?.image && !formik.values.image && !removeImage;

        return (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <CustomInput
                labelText="نام کلینیک"
                placeholder="نام کلینیک را وارد کنید"
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
                labelText="شماره تماس"
                placeholder="شماره تماس را وارد کنید"
                requiredText
                className="bg-white"
                {...formik.getFieldProps("phoneNumber")}
                inputType="phone"
                errorMessage={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? formik.errors.phoneNumber
                    : null
                }
              />
            </div>

            <CustomInput
              labelText="آدرس"
              placeholder="آدرس کلینیک را وارد کنید"
              requiredText
              className="bg-white"
              {...formik.getFieldProps("address")}
              errorMessage={
                formik.touched.address && formik.errors.address
                  ? formik.errors.address
                  : null
              }
            />

            <CustomTextArea
              labelText="توضیحات"
              placeholder="توضیحات کلینیک را وارد کنید"
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

            {/* تنظیمات ایتا */}
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
              <h6 className="text-md font-estedad-semibold text-dark mb-3">
                <i className="fas fa-paper-plane ml-2"></i>
                تنظیمات ایتا
              </h6>
              <p className="text-xs text-gray-600 mb-3 font-estedad-light">
                شناسه کانال/گروه ایتا برای ارسال نوتیفیکیشن نوبت‌های این کلینیک
              </p>
              <CustomInput
                labelText="شناسه کانال/گروه ایتا"
                placeholder="مثال: 1404 یا eitaayar"
                optional
                className="bg-white"
                {...formik.getFieldProps("eitaaChatId")}
                errorMessage={
                  formik.touched.eitaaChatId && formik.errors.eitaaChatId
                    ? formik.errors.eitaaChatId
                    : null
                }
              />
            </div>

            <div>
              <label className="block text-dark font-estedad-lightbold mb-2 mr-4">
                تصویر کلینیک
              </label>
              <div className="flex items-center gap-4 flex-wrap">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    formik.setFieldValue("image", file);
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
                {formik.values.image instanceof File && (
                  <span className="text-sm text-dark font-estedad-light">
                    {formik.values.image.name}
                  </span>
                )}
                {shouldShowCurrentImage && (
                  <div className="flex items-center gap-2 flex-wrap justify-center">
                    <img
                      src={getImageUrl(clinic.image)}
                      alt={clinic.name || "تصویر کلینیک"}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <span className="text-sm text-paragray">تصویر فعلی</span>
                    <button
                      type="button"
                      onClick={() => {
                        // #region agent log
                        fetch(
                          "http://127.0.0.1:7242/ingest/c5282bb0-1a44-499c-bce8-9a51f667292e",
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              location: "ClinicManagementForm.tsx:347",
                              message: "Remove image button clicked",
                              data: {
                                removeImageBefore: removeImage,
                                clinicId: clinic?.id,
                              },
                              timestamp: Date.now(),
                              sessionId: "debug-session",
                              runId: "run1",
                              hypothesisId: "A",
                            }),
                          }
                        ).catch(() => {});
                        // #endregion
                        setRemoveImage(true);
                        formik.setFieldValue("image", null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                        // #region agent log
                        fetch(
                          "http://127.0.0.1:7242/ingest/c5282bb0-1a44-499c-bce8-9a51f667292e",
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              location: "ClinicManagementForm.tsx:354",
                              message: "Remove image state set",
                              data: {
                                removeImageAfter: true,
                                imageValue: formik.values.image,
                              },
                              timestamp: Date.now(),
                              sessionId: "debug-session",
                              runId: "run1",
                              hypothesisId: "A",
                            }),
                          }
                        ).catch(() => {});
                        // #endregion
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <CustomInput
                labelText="عرض جغرافیایی (Latitude)"
                placeholder="مثال: 35.6892"
                optional
                className="bg-white"
                name="latitude"
                type="number"
                step="any"
                value={
                  formik.values.latitude === null
                    ? ""
                    : formik.values.latitude?.toString() || ""
                }
                onChange={(e) => {
                  const value = e.target.value;
                  formik.setFieldValue(
                    "latitude",
                    value === "" ? null : parseFloat(value)
                  );
                }}
                onBlur={formik.handleBlur}
                errorMessage={
                  formik.touched.latitude && formik.errors.latitude
                    ? formik.errors.latitude
                    : null
                }
              />

              <CustomInput
                labelText="طول جغرافیایی (Longitude)"
                placeholder="مثال: 51.3890"
                optional
                className="bg-white"
                name="longitude"
                type="number"
                step="any"
                value={
                  formik.values.longitude === null
                    ? ""
                    : formik.values.longitude?.toString() || ""
                }
                onChange={(e) => {
                  const value = e.target.value;
                  formik.setFieldValue(
                    "longitude",
                    value === "" ? null : parseFloat(value)
                  );
                }}
                onBlur={formik.handleBlur}
                errorMessage={
                  formik.touched.longitude && formik.errors.longitude
                    ? formik.errors.longitude
                    : null
                }
              />
            </div>

            <div>
              <label className="block text-dark font-estedad-lightbold mb-4 mr-4">
                روزهای کاری
              </label>
              <div className="grid grid-cols-1 xl:grid-cols-2  gap-4 ">
                {daysOfWeek.map((day) => {
                  const timeRanges =
                    formik.values.workingHours[day.value] || [];

                  const addTimeRange = () => {
                    const newRanges = [
                      ...timeRanges,
                      { start: "08:00", end: "12:00" },
                    ];
                    const newWorkingDays = {
                      ...formik.values.workingHours,
                      [day.value]: newRanges,
                    };
                    formik.setFieldValue("workingHours", newWorkingDays);
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
                      ...formik.values.workingHours,
                      [day.value]: newRanges,
                    };
                    formik.setFieldValue("workingHours", newWorkingDays);
                  };

                  const removeTimeRange = (index: number) => {
                    const newRanges = timeRanges.filter((_, i) => i !== index);
                    const newWorkingDays = {
                      ...formik.values.workingHours,
                      [day.value]: newRanges,
                    };
                    formik.setFieldValue("workingHours", newWorkingDays);
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

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="purple-btn flex items-center gap-2"
                disabled={formik.isSubmitting}
              >
                {isEditMode ? "ویرایش کلینیک" : "ایجاد کلینیک"}
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

export default ClinicManagementForm;
