import React, { useState } from "react";
import { motion } from "motion/react";
import MainPagination from "../../../../components/modules/MainPagination/MainPagination";
import {
  useGetMyAppointments,
  useCancelAppointment,
} from "../../../../services/useAppointments";
import { formatJalali } from "../../../../utils/helpers";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { showSuccessToast, showErrorToast } from "../../../../utils/toastify";

interface AppointmentClinic {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
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
  status: "PENDING" | "APPROVED_BY_USER" | "FINAL_APPROVED" | "CANCELED";
  notes?: string | null;
  clinic: AppointmentClinic;
  doctor?: AppointmentDoctor | null;
}

const statusConfig = {
  PENDING: {
    label: "در انتظار بررسی",
    className: "bg-gray-100 text-gray-700",
    icon: "far fa-clock",
    iconBg: "bg-gray-200",
    iconColor: "text-gray-600",
  },
  APPROVED_BY_USER: {
    label: "در انتظار تأیید منشی",
    className: "bg-yellow-100 text-yellow-700",
    icon: "fa fa-hourglass-half",
    iconBg: "bg-yellow-200",
    iconColor: "text-yellow-600",
  },
  FINAL_APPROVED: {
    label: "تأیید شده",
    className: "bg-green-100 text-green-700",
    icon: "far fa-check-circle",
    iconBg: "bg-green-200",
    iconColor: "text-green-600",
  },
  CANCELED: {
    label: "لغو شده",
    className: "bg-red-100 text-red-700",
    icon: "far fa-times-circle",
    iconBg: "bg-red-200",
    iconColor: "text-red-600",
  },
};

function Turns() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useGetMyAppointments({
    page,
    limit: 10,
  });
  const cancelAppointmentMutation = useCancelAppointment();

  const appointments: Appointment[] = data?.data?.appointments || [];
  const meta = data?.meta;

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const time = date.toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateFormatted = formatJalali(date);
    return { date: dateFormatted, time };
  };

  const handleCancel = async (id: string) => {
    if (window.confirm("آیا از لغو این نوبت اطمینان دارید؟")) {
      try {
        await cancelAppointmentMutation.mutateAsync({ id });
        queryClient.invalidateQueries({ queryKey: ["myAppointments"] });
        showSuccessToast("نوبت با موفقیت لغو شد");
      } catch (error) {
        const err = error as AxiosError<{ message?: string }>;
        const errorMessage = err.response?.data?.message || "خطا در لغو نوبت";
        showErrorToast(errorMessage);
      }
    }
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-base font-bold text-dark mb-2" style={{ fontFamily: 'var(--font-vazir)' }}>
          تاریخچه نوبت‌ها
        </h2>
      </motion.div>

      {/* Loading State */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"
            >
              <div className="animate-pulse space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : isError ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
            </div>
            <p className="text-red-500 font-semibold" style={{ fontFamily: 'var(--font-vazir)' }}>
              خطا در دریافت اطلاعات. لطفاً دوباره تلاش کنید.
            </p>
          </div>
        </motion.div>
      ) : appointments.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <i className="fas fa-calendar-times text-gray-400 text-2xl"></i>
            </div>
            <p className="text-gray-500 font-semibold" style={{ fontFamily: 'var(--font-vazir)' }}>
              نوبتی یافت نشد
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {appointments.map((appointment: Appointment, index: number) => {
            const { date, time } = formatDateTime(appointment.appointmentDate);
            const statusInfo = statusConfig[appointment.status] || statusConfig.PENDING;

            return (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <div className="flex flex-col gap-3">
                    {/* Doctor Info */}
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg shrink-0">
                        <i className="fas fa-user-md text-accent text-sm"></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 mb-0.5" style={{ fontFamily: 'var(--font-vazir)' }}>
                          پزشک
                        </p>
                        <p className="text-sm font-semibold text-dark" style={{ fontFamily: 'var(--font-vazir)' }}>
                          {appointment.doctor ? (
                            <>دکتر {appointment.doctor.firstName} {appointment.doctor.lastName}</>
                          ) : (
                            <span className="text-gray-400 font-normal">پزشک مشخص نشده</span>
                          )}
                        </p>
                      </div>
                      {/* Status - Right side */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className={`flex items-center justify-center w-8 h-8 ${statusInfo.iconBg} rounded-lg`}>
                          <i className={`${statusInfo.icon} ${statusInfo.iconColor} text-xs`}></i>
                        </div>
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusInfo.className}`} style={{ fontFamily: 'var(--font-vazir)' }}>
                          {statusInfo.label}
                        </span>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg shrink-0">
                        <i className="fas fa-calendar-alt text-primary text-sm"></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 mb-0.5" style={{ fontFamily: 'var(--font-vazir)' }}>
                          تاریخ و زمان
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-dark" style={{ fontFamily: 'var(--font-vazir)' }}>
                            {date}
                          </p>
                          <span className="text-xs text-accent font-medium">{time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Clinic */}
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg shrink-0">
                        <i className="fas fa-hospital text-secondary text-sm"></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 mb-0.5" style={{ fontFamily: 'var(--font-vazir)' }}>
                          کلینیک
                        </p>
                        <p className="text-sm font-semibold text-dark" style={{ fontFamily: 'var(--font-vazir)' }}>
                          {appointment.clinic.name}
                        </p>
                      </div>
                      {/* Cancel Button - Right side */}
                      {appointment.status !== "CANCELED" && (
                        <div className="shrink-0">
                          <button
                            onClick={() => handleCancel(appointment.id)}
                            disabled={cancelAppointmentMutation.isPending}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs font-semibold"
                            style={{ fontFamily: 'var(--font-vazir)' }}
                            title="لغو نوبت"
                          >
                            <i className="fas fa-times text-xs"></i>
                            <span>لغو نوبت</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {meta && (
        <div className="mt-6">
          <MainPagination
            meta={meta}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </div>
  );
}

export default Turns;








