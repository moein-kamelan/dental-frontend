import React, { useState } from "react";
import TableContainer from "../../../../components/modules/TableContainer/TableContainer";
import TableSkeleton from "../../../../components/modules/TableSkeleton/TableSkeleton";
import MainPagination from "../../../../components/modules/MainPagination/MainPagination";
import {
  useGetMyAppointments,
  useCancelAppointment,
} from "../../../../services/useAppointments";
import { formatJalali } from "../../../../utils/helpers";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

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
  },
  APPROVED_BY_USER: {
    label: "در انتظار تأیید منشی",
    className: "bg-yellow-100 text-yellow-700",
  },
  FINAL_APPROVED: {
    label: "تأیید شده",
    className: "bg-green-100 text-green-700",
  },
  CANCELED: {
    label: "لغو شده",
    className: "bg-red-100 text-red-700",
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
  console.log("meta =>", meta);

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
        alert("نوبت با موفقیت لغو شد");
      } catch (error) {
        const err = error as AxiosError<{ message?: string }>;
        const errorMessage = err.response?.data?.message || "خطا در لغو نوبت";
        alert(errorMessage);
      }
    }
  };

  return (
    <>
      <h5 className="main-header">تاریخچه نوبت‌ها</h5>

      <TableContainer>
        <table className="w-full ">
          <thead className="border-b border-main-border-color ">
            <tr className="*:text-right *:p-4.5 ">
              <th>ردیف</th>
              <th>دکتر</th>
              <th>تاریخ</th>
              <th>کلینیک</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-main-border-color">
            {isLoading ? (
              <TableSkeleton rows={5} columns={6} />
            ) : isError ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-8 font-estedad-light text-red-500"
                >
                  خطا در دریافت اطلاعات. لطفاً دوباره تلاش کنید.
                </td>
              </tr>
            ) : appointments.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-8 font-estedad-light">
                  نوبتی یافت نشد
                </td>
              </tr>
            ) : (
              appointments.map((appointment: Appointment, index: number) => {
                const { date, time } = formatDateTime(
                  appointment.appointmentDate
                );
                const statusInfo =
                  statusConfig[appointment.status] || statusConfig.PENDING;

                return (
                  <tr
                    key={appointment.id}
                    className="hover:bg-[#d4af370f] text-dark *:p-4.5 *:whitespace-nowrap"
                  >
                    <td className="font-estedad-light">
                      {(page - 1) * 10 + index + 1}
                    </td>
                    <td className="">
                      {appointment.doctor ? (
                        <>
                          <p className="font-estedad-light">
                            دکتر {appointment.doctor.firstName}{" "}
                            {appointment.doctor.lastName}
                          </p>
                          <span className="text-sm font-estedad-light text-paragray">
                            دندانپزشک
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-estedad-light text-paragray">
                          پزشک مشخص نشده
                        </span>
                      )}
                    </td>
                    <td className="">
                      <p className="font-estedad-light text-dark">{date}</p>
                      <span className="text-xs text-accent">{time}</span>
                    </td>
                    <td className="text-dark font-estedad-light">
                      {appointment.clinic.name}
                    </td>
                    <td className="">
                      <span
                        className={`p-1.5 rounded-full text-xs ${statusInfo.className}`}
                      >
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="">
                      {appointment.status !== "CANCELED" && (
                        <button
                          onClick={() => handleCancel(appointment.id)}
                          disabled={cancelAppointmentMutation.isPending}
                          className="p-1.5 rounded-full text-red-600 bg-red-100 hover:bg-red-600 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                          title="لغو نوبت"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </TableContainer>

      {meta && (
        <div className="mb-12 mt-6">
          <MainPagination
            meta={meta}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </>
  );
}

export default Turns;
