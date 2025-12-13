import TableContainer from "../../../../modules/TableContainer/TableContainer";
import TableSkeleton from "../../../../modules/TableSkeleton/TableSkeleton";
import { formatJalali } from "../../../../../utils/helpers";
import { useNavigate } from "react-router-dom";

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
  status: "PENDING" | "APPROVED_BY_USER" | "FINAL_APPROVED" | "CANCELED";
  notes?: string | null;
  createdAt: string;
  user: AppointmentUser;
  clinic: AppointmentClinic;
  doctor?: AppointmentDoctor | null;
}

interface AppointmentsManagementTableProps {
  appointments: Appointment[];
  isLoadingAppointments: boolean;
  page: number;
  onApproveClick?: (id: string) => void;
  onCancelClick?: (id: string) => void;
  onDeleteClick?: (id: string) => void;
  onRefetch?: () => void;
  isRefetching?: boolean;
}

const statusConfig = {
  PENDING: {
    label: "در انتظار بررسی",
    className: "bg-gray-100 text-gray-700",
    rowBg: "bg-gray-50/30 hover:bg-gray-100/50",
  },
  APPROVED_BY_USER: {
    label: "در انتظار تأیید منشی",
    className: "bg-yellow-100 text-yellow-700",
    rowBg: "bg-yellow-50/40 hover:bg-yellow-100/60",
  },
  FINAL_APPROVED: {
    label: "تأیید شده",
    className: "bg-green-100 text-green-700",
    rowBg: "bg-green-50/40 hover:bg-green-100/60",
  },
  CANCELED: {
    label: "لغو شده",
    className: "bg-red-100 text-red-700",
    rowBg: "bg-red-50/30 hover:bg-red-100/50",
  },
};

function AppointmentsManagementTable({
  appointments,
  isLoadingAppointments,
  page,
  onApproveClick,
  onCancelClick,
  onDeleteClick,
  onRefetch,
  isRefetching = false,
}: AppointmentsManagementTableProps) {
  const navigate = useNavigate();

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const time = date.toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateFormatted = formatJalali(date);
    return { date: dateFormatted, time };
  };

  return (
    <>
      {onRefetch && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={onRefetch}
            disabled={isRefetching}
            className="px-4 py-2 rounded-lg text-sm font-estedad-medium bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            title="بروزرسانی لیست"
          >
            {isRefetching ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
            ) : (
              <i className="fas fa-sync-alt"></i>
            )}
            بروزرسانی
          </button>
        </div>
      )}
      <TableContainer withBg withMargin>
        <table className="w-full">
          <thead className="border-b border-main-border-color">
            <tr className="*:text-right *:p-4.5 *:text-nowrap">
              <th>ردیف</th>
              <th>مراجع</th>
              <th>کلینیک</th>
              <th>پزشک</th>
              <th>تاریخ و ساعت</th>
              <th>وضعیت</th>
              <th>تاریخ ثبت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-main-border-color">
            {isLoadingAppointments ? (
              <TableSkeleton rows={5} columns={8} />
            ) : appointments.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center p-8 font-estedad-light">
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
                const patientName =
                  appointment.patientName ||
                  `${appointment.user.firstName} ${appointment.user.lastName}`;

                return (
                  <tr
                    key={appointment.id}
                    className={`${statusInfo.rowBg} text-dark *:p-4.5 transition-colors`}
                  >
                    <td className="font-estedad-light text-center">
                      {(page - 1) * 10 + index + 1}
                    </td>
                    <td className="">
                      <div className="min-w-[180px]">
                        <p className="font-estedad-light">{patientName}</p>
                        {appointment.patientName && (
                          <p className="text-xs text-paragray">
                            رزرو کننده: {appointment.user.firstName}{" "}
                            {appointment.user.lastName}
                          </p>
                        )}
                        <p className="text-xs text-paragray mt-1">
                          <i className="fas fa-phone ml-1"></i>
                          {appointment.user.phoneNumber}
                        </p>
                      </div>
                    </td>
                    <td className="text-dark font-estedad-light">
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                        {appointment.clinic.name}
                      </span>
                    </td>
                    <td className="text-dark font-estedad-light">
                      {appointment.doctor ? (
                        <span>
                          دکتر {appointment.doctor.firstName}{" "}
                          {appointment.doctor.lastName}
                        </span>
                      ) : (
                        <span className="text-paragray">-</span>
                      )}
                    </td>
                    <td className="text-dark font-estedad-light">
                      <p className="font-estedad-light">{date}</p>
                      <span className="text-xs text-accent">{time}</span>
                    </td>
                    <td className="text-dark font-estedad-light">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${statusInfo.className} text-nowrap`}
                      >
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="text-dark font-estedad-light text-nowrap">
                      {formatJalali(new Date(appointment.createdAt))}
                    </td>
                    <td className="">
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => {
                            navigate(
                              `/admin/appointments-management/edit/${appointment.id}`
                            );
                          }}
                          className="p-1.5 rounded-full text-secondary bg-secondary/20 hover:bg-secondary hover:text-white transition"
                          title="ویرایش"
                        >
                          <i className="far fa-edit"></i>
                        </button>
                        {appointment.status === "APPROVED_BY_USER" &&
                          onApproveClick && (
                            <button
                              onClick={() => onApproveClick(appointment.id)}
                              className="p-1.5 rounded-full text-green-600 bg-green-100 hover:bg-green-600 hover:text-white transition"
                              title="تأیید نوبت"
                            >
                              <i className="fas fa-check"></i>
                            </button>
                          )}
                        {appointment.status !== "CANCELED" && onCancelClick && (
                          <button
                            onClick={() => onCancelClick(appointment.id)}
                            className="p-1.5 rounded-full text-orange-600 bg-orange-100 hover:bg-orange-600 hover:text-white transition"
                            title="لغو نوبت"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        )}
                        {onDeleteClick && (
                          <button
                            onClick={() => onDeleteClick(appointment.id)}
                            className="p-1.5 rounded-full text-red-500 bg-red-500/20 hover:bg-red-500 hover:text-white transition"
                            title="حذف"
                          >
                            <i className="far fa-trash-alt"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </TableContainer>
    </>
  );
}

export default AppointmentsManagementTable;
