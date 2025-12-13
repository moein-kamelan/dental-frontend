import { useMemo } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../../../modules/CustomInput/CustomInput";
import CustomTextArea from "../../../../modules/CustomTextArea/CustomTextArea";
import Select, { components } from "react-select";
import type { DropdownIndicatorProps } from "react-select";
import { useUpdateAppointment } from "../../../../../services/useAppointments";
import { useGetAllClinics } from "../../../../../services/useClinics";
import { useGetAllDoctors } from "../../../../../services/useDoctors";
import {
  showSuccessToast,
  showErrorToast,
} from "../../../../../utils/toastify";
import type { OptionType, Clinic, Doctor } from "../../../../../types/types";
import { useQueryClient } from "@tanstack/react-query";

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
  status: string;
  notes?: string | null;
  user: AppointmentUser;
  clinic: AppointmentClinic;
  doctor?: AppointmentDoctor | null;
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

  const validationSchema = useMemo(
    () =>
      Yup.object({
        clinicId: Yup.string().required("انتخاب کلینیک الزامی است"),
        doctorId: Yup.string().nullable(),
        appointmentDate: Yup.string().required("تاریخ و ساعت نوبت الزامی است"),
        patientName: Yup.string().nullable(),
        notes: Yup.string().nullable(),
      }),
    []
  );

  const initialValues = useMemo(
    () => ({
      clinicId: appointment?.clinic?.id || "",
      doctorId: appointment?.doctor?.id || null,
      appointmentDate: appointment
        ? new Date(appointment.appointmentDate).toISOString().slice(0, 16)
        : "",
      patientName: appointment?.patientName || "",
      notes: appointment?.notes || "",
    }),
    [appointment]
  );

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

            // تبدیل تاریخ به ISO format
            if (values.appointmentDate) {
              updateData.appointmentDate = new Date(
                values.appointmentDate
              ).toISOString();
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
              <div className="bg-gray-50 p-4 rounded-lg">
                <h6 className="font-estedad-semibold text-dark mb-3">
                  اطلاعات رزرو کننده
                </h6>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-estedad-medium text-dark mb-2">
                      نام و نام خانوادگی
                    </label>
                    <p className="text-paragray font-estedad-light">
                      {appointment?.user.firstName} {appointment?.user.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-estedad-medium text-dark mb-2">
                      شماره تماس
                    </label>
                    <p className="text-paragray font-estedad-light">
                      {appointment?.user.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>

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
                    setFieldValue("clinicId", option?.value || "");
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
                    setFieldValue("doctorId", option?.value || null);
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
              <div>
                <CustomInput
                  labelText="تاریخ و ساعت نوبت"
                  type="datetime-local"
                  name="appointmentDate"
                  value={values.appointmentDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.appointmentDate}
                  touched={touched.appointmentDate}
                  required
                />
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
                  error={errors.patientName}
                  touched={touched.patientName}
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
                  error={errors.notes}
                  touched={touched.notes}
                  placeholder="توضیحات اضافی..."
                  rows={4}
                />
              </div>

              {/* دکمه‌ها */}
              <div className="flex items-center justify-end gap-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => navigate("/admin/appointments-management")}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-dark rounded-lg font-estedad-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg font-estedad-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="btn-loader"></div>
                      <span>در حال ذخیره...</span>
                    </>
                  ) : (
                    <>
                      <i className="far fa-save"></i>
                      <span>ذخیره تغییرات</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default AppointmentManagementForm;
