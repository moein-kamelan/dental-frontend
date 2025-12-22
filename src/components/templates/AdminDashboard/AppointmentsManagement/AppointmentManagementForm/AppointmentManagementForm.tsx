import { useMemo } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../../modules/CustomInput/CustomInput";
import CustomTextArea from "../../../../modules/CustomTextArea/CustomTextArea";
import Select, { components } from "react-select";
import type { DropdownIndicatorProps } from "react-select";
import {
  useUpdateAppointment,
  useApproveAppointment,
  useCancelAppointment,
} from "../../../../../services/useAppointments";
import { useGetAllClinics } from "../../../../../services/useClinics";
import { useGetAllDoctors } from "../../../../../services/useDoctors";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../../../utils/toastify";
import type { OptionType, Clinic, Doctor } from "../../../../../types/types";
import { useQueryClient } from "@tanstack/react-query";
// @ts-expect-error - moment-jalaali doesn't have types
import moment from "moment-jalaali";

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

interface AppointmentUser {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender?: string | null;
}

interface AppointmentClinic {
  id: string;
  name: string;
}

interface AppointmentDoctor {
  id: string;
  firstName: string;
  lastName: string;
}

interface Appointment {
  id: string;
  appointmentDate: string;
  patientName?: string | null;
  patientPhone?: string | null;
  status: string;
  notes?: string | null;
  user?: AppointmentUser | null; // Optional - ممکنه برای نوبت‌های سینک شده null باشه
  clinic: AppointmentClinic;
  doctor?: AppointmentDoctor | null;
  source?: string; // برای تشخیص نوبت‌های سینک شده
}

interface AppointmentManagementFormProps {
  appointment?: Appointment;
}

function AppointmentManagementForm({
  appointment,
}: AppointmentManagementFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: updateAppointment } = useUpdateAppointment();
  const { mutateAsync: approveAppointment, isPending: isApproving } =
    useApproveAppointment();
  const { mutateAsync: cancelAppointment, isPending: isCanceling } =
    useCancelAppointment();
  const { data: clinicsData } = useGetAllClinics(1, 100);
  const { data: doctorsData } = useGetAllDoctors(1, 100, "");

  const isEditMode = !!appointment?.id;

  const clinicOptions: OptionType[] = useMemo(
    () =>
      clinicsData?.data?.clinics?.map((clinic: Clinic) => ({
        value: clinic.id,
        label: clinic.name,
      })) || [],
    [clinicsData?.data?.clinics]
  );

  // فیلتر کردن پزشکان بر اساس کلینیک انتخاب شده
  const getDoctorOptions = (clinicId: string | null): OptionType[] => {
    if (!clinicId || !doctorsData?.data?.doctors) return [];

    return doctorsData.data.doctors
      .filter((doctor: Doctor) => {
        return doctor.clinics?.some((dc) => dc.clinic.id === clinicId);
      })
      .map((doctor: Doctor) => ({
        value: doctor.id,
        label: `دکتر ${doctor.firstName} ${doctor.lastName}`,
      }));
  };

  // توابع تبدیل تاریخ
  const gregorianToJalali = (dateString: string): { date: string; time: string } => {
    const date = new Date(dateString);
    const jalaliDate = moment(date);
    const dateStr = jalaliDate.format("jYYYY/jMM/jDD");
    const timeStr = jalaliDate.format("HH:mm");
    return { date: dateStr, time: timeStr };
  };

  const jalaliToGregorian = (jalaliDate: string, time: string): string => {
    // تبدیل تاریخ شمسی به میلادی
    const [year, month, day] = jalaliDate.split("/").map(Number);
    const [hours, minutes] = time.split(":").map(Number);
    
    const gregorianDate = moment(`${year}/${month}/${day}`, "jYYYY/jMM/jDD");
    gregorianDate.hour(hours || 0);
    gregorianDate.minute(minutes || 0);
    gregorianDate.second(0);
    gregorianDate.millisecond(0);
    
    return gregorianDate.toDate().toISOString();
  };

  const validationSchema = useMemo(
    () =>
      Yup.object({
        clinicId: Yup.string().required("انتخاب کلینیک الزامی است"),
        doctorId: Yup.string().nullable(),
        jalaliDate: Yup.string()
          .required("تاریخ نوبت الزامی است")
          .matches(
            /^\d{4}\/\d{2}\/\d{2}$/,
            "فرمت تاریخ باید به صورت 1403/10/15 باشد"
          ),
        appointmentTime: Yup.string()
          .required("ساعت نوبت الزامی است")
          .matches(/^\d{2}:\d{2}$/, "فرمت ساعت باید به صورت 14:30 باشد"),
        patientName: Yup.string().nullable(),
        notes: Yup.string().nullable(),
      }),
    []
  );

  const initialValues = useMemo(() => {
    if (appointment?.appointmentDate) {
      const { date, time } = gregorianToJalali(appointment.appointmentDate);
      return {
        clinicId: appointment?.clinic?.id || "",
        doctorId: appointment?.doctor?.id || null,
        jalaliDate: date,
        appointmentTime: time,
        patientName: appointment?.patientName || "",
        notes: appointment?.notes || "",
      };
    }
    return {
      clinicId: appointment?.clinic?.id || "",
      doctorId: appointment?.doctor?.id || null,
      jalaliDate: "",
      appointmentTime: "",
      patientName: appointment?.patientName || "",
      notes: appointment?.notes || "",
    };
  }, [appointment]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => {
          try {
            if (!isEditMode || !appointment?.id) {
              showErrorToast("نوبت یافت نشد");
              return;
            }

            const updateData: {
              appointmentDate?: string;
              doctorId?: string;
              patientName?: string;
              notes?: string;
            } = {};

            // تبدیل تاریخ شمسی به میلادی
            if (values.jalaliDate && values.appointmentTime) {
              try {
                updateData.appointmentDate = jalaliToGregorian(
                  values.jalaliDate,
                  values.appointmentTime
                );
              } catch {
                showErrorToast("تاریخ یا ساعت نامعتبر است");
                setSubmitting(false);
                return;
              }
            }

            // فقط فیلدهای قابل تغییر را ارسال می‌کنیم (clinicId قابل تغییر نیست)
            if (values.doctorId) {
              updateData.doctorId = values.doctorId;
            } else {
              // اگر پزشک حذف شده، null ارسال می‌کنیم
              updateData.doctorId = undefined;
            }

            if (values.patientName && values.patientName.trim()) {
              updateData.patientName = values.patientName.trim();
            } else {
              updateData.patientName = undefined;
            }

            if (values.notes && values.notes.trim()) {
              updateData.notes = values.notes.trim();
            } else {
              updateData.notes = undefined;
            }

            await updateAppointment({
              id: appointment.id,
              data: updateData,
            });

            showSuccessToast("نوبت با موفقیت به‌روزرسانی شد");
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
            queryClient.invalidateQueries({
              queryKey: ["appointment", appointment.id],
            });
            queryClient.invalidateQueries({ queryKey: ["appointmentsStats"] });
            navigate("/admin/appointments-management");
          } catch (error: unknown) {
            const errorMessage =
              (error as { response?: { data?: { message?: string } } })
                ?.response?.data?.message || "خطایی در به‌روزرسانی نوبت رخ داد";
            showErrorToast(errorMessage);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => {
          const doctorOptions = getDoctorOptions(values.clinicId || null);

          return (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* اطلاعات کاربر */}
              {(appointment?.user || appointment?.patientName) && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h6 className="font-estedad-semibold text-dark mb-3">
                    {appointment?.source === "OFFLINE_SOFTWARE" 
                      ? "اطلاعات مراجع (سینک شده از نرم‌افزار آفلاین)"
                      : "اطلاعات رزرو کننده"}
                </h6>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-estedad-medium text-dark mb-2">
                      نام و نام خانوادگی
                    </label>
                    <p className="text-paragray font-estedad-light">
                        {appointment?.patientName || 
                         (appointment?.user 
                           ? `${appointment.user.firstName} ${appointment.user.lastName}`
                           : "نامشخص")}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-estedad-medium text-dark mb-2">
                      شماره تماس
                    </label>
                    <p className="text-paragray font-estedad-light">
                        {appointment?.patientPhone || 
                         appointment?.user?.phoneNumber || 
                         "نامشخص"}
                    </p>
                    </div>
                  </div>
                  {appointment?.source === "OFFLINE_SOFTWARE" && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-blue-600">
                        <i className="fas fa-info-circle ml-1"></i>
                        این نوبت از نرم‌افزار آفلاین سینک شده است
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* کلینیک */}
              <div>
                <label className="block text-sm font-estedad-medium text-dark mb-2">
                  کلینیک
                </label>
                <Select
                  options={clinicOptions}
                  value={
                    clinicOptions.find(
                      (opt) => opt.value === values.clinicId
                    ) || null
                  }
                  onChange={(option) => {
                    const selectedOption = option as OptionType | null;
                    setFieldValue("clinicId", selectedOption?.value || "");
                    setFieldValue("doctorId", null); // Reset doctor when clinic changes
                  }}
                  onBlur={() => handleBlur("clinicId")}
                  components={{ DropdownIndicator }}
                  placeholder="انتخاب کلینیک"
                  isRtl
                  className="react-select-container"
                  classNamePrefix="react-select"
                  isDisabled={isSubmitting || isEditMode}
                />
                {isEditMode && (
                  <p className="text-yellow-600 text-sm mt-1 font-estedad-light">
                    کلینیک قابل تغییر نیست
                  </p>
                )}
                {errors.clinicId && touched.clinicId && (
                  <p className="text-red-500 text-sm mt-1 font-estedad-light">
                    {errors.clinicId}
                  </p>
                )}
              </div>

              {/* پزشک */}
              <div>
                <label className="block text-sm font-estedad-medium text-dark mb-2">
                  پزشک (اختیاری)
                </label>
                <Select
                  options={doctorOptions}
                  value={
                    doctorOptions.find(
                      (opt) => opt.value === values.doctorId
                    ) || null
                  }
                  onChange={(option) => {
                    const selectedOption = option as OptionType | null;
                    setFieldValue("doctorId", selectedOption?.value || null);
                  }}
                  onBlur={() => handleBlur("doctorId")}
                  components={{ DropdownIndicator }}
                  placeholder="انتخاب پزشک (اختیاری)"
                  isRtl
                  className="react-select-container"
                  classNamePrefix="react-select"
                  isDisabled={isSubmitting || !values.clinicId}
                  isClearable
                />
                {!values.clinicId && (
                  <p className="text-yellow-600 text-sm mt-1 font-estedad-light">
                    ابتدا کلینیک را انتخاب کنید
                  </p>
                )}
                {errors.doctorId && touched.doctorId && (
                  <p className="text-red-500 text-sm mt-1 font-estedad-light">
                    {errors.doctorId}
                  </p>
                )}
              </div>

              {/* تاریخ و ساعت */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* تاریخ شمسی */}
                <div>
                  <CustomInput
                    labelText="تاریخ نوبت (شمسی)"
                    type="text"
                    name="jalaliDate"
                    value={values.jalaliDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={
                      touched.jalaliDate && errors.jalaliDate
                        ? errors.jalaliDate
                        : undefined
                    }
                    placeholder="مثال: 1403/10/15"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1 font-estedad-light">
                    فرمت: سال/ماه/روز (مثال: 1403/10/15)
                  </p>
                </div>

                {/* ساعت */}
              <div>
                <CustomInput
                    labelText="ساعت نوبت"
                    type="time"
                    name="appointmentTime"
                    value={values.appointmentTime}
                  onChange={handleChange}
                  onBlur={handleBlur}
                    errorMessage={
                      touched.appointmentTime && errors.appointmentTime
                        ? errors.appointmentTime
                        : undefined
                    }
                  required
                />
                </div>
              </div>

              {/* نام مراجع */}
              <div>
                <CustomInput
                  labelText="نام مراجع (اگر برای شخص دیگری است)"
                  type="text"
                  name="patientName"
                  value={values.patientName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={
                    touched.patientName && errors.patientName
                      ? errors.patientName
                      : undefined
                  }
                  placeholder="در صورت رزرو برای خودتان خالی بگذارید"
                />
              </div>

              {/* توضیحات */}
              <div>
                <CustomTextArea
                  labelText="توضیحات"
                  name="notes"
                  value={values.notes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errorMessage={
                    touched.notes && errors.notes ? errors.notes : undefined
                  }
                  placeholder="توضیحات اضافی..."
                  rows={4}
                />
              </div>

              {/* دکمه‌ها */}
              <div className="flex justify-between items-center mt-6 gap-4">
                {/* دکمه‌های تایید/لغو (فقط برای نوبت‌های در انتظار تایید) */}
                {isEditMode &&
                  appointment?.status === "APPROVED_BY_USER" && (
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={async () => {
                          if (!appointment?.id) return;
                          try {
                            await approveAppointment(appointment.id);
                            showSuccessToast("نوبت با موفقیت تایید شد");
                            queryClient.invalidateQueries({
                              queryKey: ["appointments"],
                            });
                            queryClient.invalidateQueries({
                              queryKey: ["appointment", appointment.id],
                            });
                            queryClient.invalidateQueries({
                              queryKey: ["appointmentsStats"],
                            });
                            // Refresh the page to show updated status
                            window.location.reload();
                          } catch (error: unknown) {
                            const errorMessage =
                              (error as { response?: { data?: { message?: string } } })
                                ?.response?.data?.message ||
                              "خطایی در تایید نوبت رخ داد";
                            showErrorToast(errorMessage);
                          }
                        }}
                        disabled={isApproving || isSubmitting}
                        className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 flex items-center gap-2 font-estedad-medium"
                      >
                        {isApproving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            <span>در حال تایید...</span>
                          </>
                        ) : (
                          <>
                            <i className="fas fa-check"></i>
                            <span>تایید نهایی</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (!appointment?.id) return;
                          if (
                            !window.confirm(
                              "آیا از لغو این نوبت اطمینان دارید؟"
                            )
                          ) {
                            return;
                          }
                          try {
                            await cancelAppointment({ id: appointment.id });
                            showSuccessToast("نوبت با موفقیت لغو شد");
                            queryClient.invalidateQueries({
                              queryKey: ["appointments"],
                            });
                            queryClient.invalidateQueries({
                              queryKey: ["appointment", appointment.id],
                            });
                            queryClient.invalidateQueries({
                              queryKey: ["appointmentsStats"],
                            });
                            // Refresh the page to show updated status
                            window.location.reload();
                          } catch (error: unknown) {
                            const errorMessage =
                              (error as { response?: { data?: { message?: string } } })
                                ?.response?.data?.message ||
                              "خطایی در لغو نوبت رخ داد";
                            showErrorToast(errorMessage);
                          }
                        }}
                        disabled={isCanceling || isSubmitting}
                        className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 flex items-center gap-2 font-estedad-medium"
                      >
                        {isCanceling ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            <span>در حال لغو...</span>
                          </>
                        ) : (
                          <>
                            <i className="fas fa-times"></i>
                            <span>لغو نوبت</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                {/* دکمه ذخیره تغییرات */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/admin/appointments-management")}
                    className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-estedad-medium"
                  >
                    <i className="fas fa-arrow-right ml-2"></i>
                    بازگشت
                  </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="purple-btn flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>در حال ذخیره...</span>
                    </>
                  ) : (
                      <>
                        <i className="fas fa-save"></i>
                    <span>ذخیره تغییرات</span>
                      </>
                  )}
                </button>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default AppointmentManagementForm;
