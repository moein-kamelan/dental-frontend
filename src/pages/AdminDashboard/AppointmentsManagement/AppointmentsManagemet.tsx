import { useState, useEffect } from "react";
import { useAdminDashboardHeader } from "../../../contexts";
import { useAppSelector } from "../../../redux/typedHooks";
import {
  useGetAllAppointments,
  useApproveAppointment,
  useCancelAppointment,
  useDeleteAppointment,
} from "../../../services/useAppointments";
import { useGetAllClinics } from "../../../services/useClinics";
import { showSuccessToast, showErrorToast } from "../../../utils/toastify";
import { useQueryClient } from "@tanstack/react-query";
import AdminPagination from "../../../components/modules/AdminDashboard/AdminPagination/AdminPagination";
import AppointmentsManagementTable from "../../../components/templates/AdminDashboard/AppointmentsManagement/AppointmentsManagementTable/AppointmentsManagementTable";
import AppointmentsStats from "../../../components/templates/AdminDashboard/AppointmentsManagement/AppointmentsStats/AppointmentsStats";
import { useDebounce } from "use-debounce";
import DeleteModal from "../../../components/modules/AdminDashboard/DeleteModal/DeleteModal";
import CustomInput from "../../../components/modules/CustomInput/CustomInput";
import SectionContainer from "../../../components/modules/AdminDashboard/SectionContainer/SectionContainer";
import { combineDateAndTime } from "../../../utils/helpers";

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

function AppointmentsManagement() {
  const { setHeaderConfig } = useAdminDashboardHeader();
  const { data: user } = useAppSelector((state) => state.user);
  const isSecretary = user?.role === "SECRETARY";
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [clinicFilter, setClinicFilter] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [fromTime, setFromTime] = useState<string>("");
  const [toTime, setToTime] = useState<string>("");
  const [debouncedSearch] = useDebounce(searchInput, 500);
  const [isSearching, setIsSearching] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<{
    id: string;
    patientName: string;
  } | null>(null);
  const [appointmentToApprove, setAppointmentToApprove] = useState<{
    id: string;
    patientName: string;
  } | null>(null);
  const [appointmentToCancel, setAppointmentToCancel] = useState<{
    id: string;
    patientName: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: deleteAppointment } = useDeleteAppointment();
  const { mutateAsync: approveAppointment } = useApproveAppointment();
  const { mutateAsync: cancelAppointment } = useCancelAppointment();

  const finalFromDate = combineDateAndTime(fromDate, fromTime, false);
  const finalToDate = combineDateAndTime(toDate, toTime, true);

  // دریافت لیست کلینیک‌ها برای فیلتر (فقط برای ادمین‌ها)
  const { data: clinicsData } = useGetAllClinics(1, 100); // منشی‌ها نیازی به دریافت لیست کلینیک‌ها ندارند اما برای جلوگیری از خطا، دریافت می‌کنیم
  const clinics = clinicsData?.data?.clinics || [];

  const {
    data: appointmentsData,
    isLoading: isLoadingAppointments,
    isPending: isPendingAppointments,
    refetch: refetchAppointments,
    isFetching: isFetchingAppointments,
  } = useGetAllAppointments({
    page,
    limit: 10,
    search: debouncedSearch,
    status: statusFilter || undefined,
    clinicId: isSecretary ? undefined : clinicFilter || undefined, // منشی‌ها نمی‌توانند فیلتر کلینیک بزنند
    fromDate: finalFromDate,
    toDate: finalToDate,
  });

  useEffect(() => {
    setHeaderConfig({ title: "مدیریت نوبت‌ها" });
    return () => {
      setHeaderConfig({ title: undefined, backButton: false });
    };
  }, [setHeaderConfig]);

  // بروزرسانی خودکار داده‌ها هنگام ورود به صفحه
  useEffect(() => {
    refetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // مدیریت loading state برای جستجو
  useEffect(() => {
    if (searchInput.trim()) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [searchInput]);

  useEffect(() => {
    if (!isLoadingAppointments) {
      if (debouncedSearch === searchInput) {
        setIsSearching(false);
      }
    }
  }, [isLoadingAppointments, debouncedSearch, searchInput]);

  const handleApproveClick = (id: string, patientName: string) => {
    setAppointmentToApprove({ id, patientName });
    setApproveModalOpen(true);
  };

  const handleApproveConfirm = async () => {
    if (!appointmentToApprove) return;

    setIsApproving(true);
    try {
      await approveAppointment(appointmentToApprove.id);
      showSuccessToast("نوبت با موفقیت تأیید شد");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["appointmentsStats"] });
      setApproveModalOpen(false);
      setAppointmentToApprove(null);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در تأیید نوبت رخ داد";
      showErrorToast(errorMessage);
    } finally {
      setIsApproving(false);
    }
  };

  const handleCancelClick = (id: string, patientName: string) => {
    setAppointmentToCancel({ id, patientName });
    setCancelModalOpen(true);
  };

  const handleCancelConfirm = async () => {
    if (!appointmentToCancel) return;

    setIsCanceling(true);
    try {
      await cancelAppointment({ id: appointmentToCancel.id });
      showSuccessToast("نوبت با موفقیت لغو شد");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["appointmentsStats"] });
      setCancelModalOpen(false);
      setAppointmentToCancel(null);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در لغو نوبت رخ داد";
      showErrorToast(errorMessage);
    } finally {
      setIsCanceling(false);
    }
  };

  const handleDeleteClick = (id: string, patientName: string) => {
    setAppointmentToDelete({ id, patientName });
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!appointmentToDelete) return;

    setIsDeleting(true);
    try {
      await deleteAppointment(appointmentToDelete.id);
      showSuccessToast("نوبت با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["appointmentsStats"] });
      setDeleteModalOpen(false);
      setAppointmentToDelete(null);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در حذف نوبت رخ داد";
      showErrorToast(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    if (!isDeleting) {
      setDeleteModalOpen(false);
      setAppointmentToDelete(null);
    }
  };

  const handleApproveCancel = () => {
    if (!isApproving) {
      setApproveModalOpen(false);
      setAppointmentToApprove(null);
    }
  };

  const handleCancelCancel = () => {
    if (!isCanceling) {
      setCancelModalOpen(false);
      setAppointmentToCancel(null);
    }
  };

  // تولید لیست زمان‌های 10 دقیقه‌ای (از 00:00 تا 23:50)
  const generateTimeOptions = (): string[] => {
    const times: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 10) {
        const timeString = `${String(hour).padStart(2, "0")}:${String(
          minute
        ).padStart(2, "0")}`;
        times.push(timeString);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const appointments = appointmentsData?.data?.appointments || [];
  const meta = appointmentsData?.meta;

  return (
    <main>
      <SectionContainer>
        <h5 className="main-header">لیست نوبت‌ها</h5>

        {/* Stats Cards */}
        <AppointmentsStats />

        {/* Search and Filter */}
        <div className="mb-4 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative max-w-md flex-1">
              <CustomInput
                labelText="جستجو"
                placeholder="جستجو بر اساس نام، نام خانوادگی یا شماره تلفن..."
                className="bg-white pr-12"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setPage(1);
                }}
              />
              {isSearching && searchInput && (
                <div className="absolute left-6 top-[calc(100%-38px)] flex items-center pointer-events-none">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
                </div>
              )}
            </div>

            <div className="">
              <label className="block text-sm font-estedad-medium text-dark mb-2">
                فیلتر وضعیت
              </label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary text-dark font-estedad-light"
              >
                <option value="">همه وضعیت‌ها</option>
                <option value="PENDING">در انتظار بررسی</option>
                <option value="APPROVED_BY_USER">در انتظار تأیید منشی</option>
                <option value="FINAL_APPROVED">تأیید شده</option>
                <option value="CANCELED">لغو شده</option>
              </select>
            </div>

            {!isSecretary && (
              <div className="">
                <label className="block text-sm font-estedad-medium text-dark mb-2">
                  فیلتر کلینیک
                </label>
                <select
                  value={clinicFilter}
                  onChange={(e) => {
                    setClinicFilter(e.target.value);
                    setPage(1);
                  }}
                  className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary text-dark font-estedad-light"
                >
                  <option value="">همه کلینیک‌ها</option>
                  {clinics.map((clinic: AppointmentClinic) => (
                    <option key={clinic.id} value={clinic.id}>
                      {clinic.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Date and Time Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className=" ">
              <label className="block text-sm font-estedad-medium text-dark mb-2">
                از تاریخ
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value);
                  setPage(1);
                }}
                className="w-full h-[54px] px-4 py-2.5 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary text-dark font-estedad-light"
              />
            </div>

            <div className=" ">
              <label className="block text-sm font-estedad-medium text-dark mb-2">
                از ساعت
              </label>
              <select
                value={fromTime}
                onChange={(e) => {
                  setFromTime(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary text-dark font-estedad-light"
              >
                <option value="">انتخاب ساعت</option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div className=" ">
              <label className="block text-sm font-estedad-medium text-dark mb-2">
                تا تاریخ
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => {
                  setToDate(e.target.value);
                  setPage(1);
                }}
                className="w-full h-[54px] px-4 py-2.5 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary text-dark font-estedad-light"
              />
            </div>

            <div className=" ">
              <label className="block text-sm font-estedad-medium text-dark mb-2">
                تا ساعت
              </label>
              <select
                value={toTime}
                onChange={(e) => {
                  setToTime(e.target.value);
                  setPage(1);
                }}
                className="w-full px-4 py-2.5 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary text-dark font-estedad-light"
              >
                <option value="">انتخاب ساعت</option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {(fromDate || toDate || fromTime || toTime) && (
              <div className="flex items-end justify-end col-span-1 sm:col-span-2 lg:col-span-1  ">
                <button
                  onClick={() => {
                    setFromDate("");
                    setToDate("");
                    setFromTime("");
                    setToTime("");
                    setPage(1);
                  }}
                  className="px-4 h-[54px] py-2.5 bg-gray-200 hover:bg-gray-300 text-dark rounded-lg font-estedad-medium transition-colors text-nowrap"
                >
                  پاک کردن فیلتر تاریخ
                </button>
              </div>
            )}
          </div>
        </div>

        <AppointmentsManagementTable
          appointments={appointments}
          isLoadingAppointments={isLoadingAppointments || isPendingAppointments}
          page={page}
          onApproveClick={(id) => {
            const appointment = appointments.find(
              (a: Appointment) => a.id === id
            );
            if (appointment) {
              const patientName =
                appointment.patientName ||
                `${appointment.user.firstName} ${appointment.user.lastName}`;
              handleApproveClick(id, patientName);
            }
          }}
          onCancelClick={(id) => {
            const appointment = appointments.find(
              (a: Appointment) => a.id === id
            );
            if (appointment) {
              const patientName =
                appointment.patientName ||
                `${appointment.user.firstName} ${appointment.user.lastName}`;
              handleCancelClick(id, patientName);
            }
          }}
          onDeleteClick={(id) => {
            const appointment = appointments.find(
              (a: Appointment) => a.id === id
            );
            if (appointment) {
              const patientName =
                appointment.patientName ||
                `${appointment.user.firstName} ${appointment.user.lastName}`;
              handleDeleteClick(id, patientName);
            }
          }}
          onRefetch={refetchAppointments}
          isRefetching={isFetchingAppointments}
        />

        <div className="mb-12 mt-6">
          <AdminPagination
            meta={meta}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </SectionContainer>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="حذف نوبت"
        message={`آیا از حذف نوبت ${appointmentToDelete?.patientName} اطمینان دارید؟ این عمل غیرقابل بازگشت است.`}
        confirmText="حذف"
        cancelText="انصراف"
        isLoading={isDeleting}
      />

      {/* Approve Modal */}
      <DeleteModal
        isOpen={approveModalOpen}
        onClose={handleApproveCancel}
        onConfirm={handleApproveConfirm}
        title="تأیید نوبت"
        message={`آیا از تأیید نوبت ${appointmentToApprove?.patientName} اطمینان دارید؟`}
        confirmText="تأیید"
        cancelText="انصراف"
        isLoading={isApproving}
      />

      {/* Cancel Modal */}
      <DeleteModal
        isOpen={cancelModalOpen}
        onClose={handleCancelCancel}
        onConfirm={handleCancelConfirm}
        title="لغو نوبت"
        message={`آیا از لغو نوبت ${appointmentToCancel?.patientName} اطمینان دارید؟`}
        confirmText="لغو نوبت"
        cancelText="انصراف"
        isLoading={isCanceling}
      />
    </main>
  );
}

export default AppointmentsManagement;
