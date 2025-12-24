import TableContainer from "../../../../../components/modules/TableContainer/TableContainer";
import TableSkeleton from "../../../../../components/modules/TableSkeleton/TableSkeleton";
import { formatJalali } from "../../../../../utils/helpers";
import type { DoctorApplication } from "../../../../../types/types";

interface DoctorApplicationsManagementTableProps {
  applications: DoctorApplication[];
  isLoadingApplications: boolean;
  page: number;
  onDeleteClick: (id: string, name: string) => void;
  onMarkAsRead: (id: string) => void;
  onMarkAsUnread: (id: string) => void;
  onApplicationClick: (application: DoctorApplication) => void;
  onRefetch?: () => void;
  isRefetching?: boolean;
}

function DoctorApplicationsManagementTable({
  applications,
  isLoadingApplications,
  page,
  onDeleteClick,
  onMarkAsRead,
  onMarkAsUnread,
  onApplicationClick,
  onRefetch,
  isRefetching = false,
}: DoctorApplicationsManagementTableProps) {
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
        <table className="w-full ">
          <thead className="border-b border-main-border-color ">
            <tr className="*:text-right *:p-4.5 *:text-nowrap">
              <th>ردیف</th>
              <th>نام و نام خانوادگی</th>
              <th>نوع درخواست</th>
              <th>ایمیل</th>
              <th>شماره تماس</th>
              <th>اطلاعات متقاضی</th>
              <th>کلینیک</th>
              <th>وضعیت</th>
              <th>تاریخ ایجاد</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-main-border-color">
            {isLoadingApplications ? (
              <TableSkeleton rows={5} columns={10} />
            ) : applications.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center p-8 font-estedad-light">
                  درخواستی یافت نشد
                </td>
              </tr>
            ) : (
              applications.map(
                (application: DoctorApplication, index: number) => (
                  <tr
                    key={application.id}
                    className={`text-dark *:p-4.5 ${
                      !application.read
                        ? "bg-blue-100 hover:bg-blue-200"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <td className="font-estedad-light text-center">
                      {(page - 1) * 5 + index + 1}
                    </td>
                    <td className="">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <i className="far fa-user text-primary"></i>
                        </div>
                        <div>
                          <p className="font-estedad-light line-clamp-2 max-w-[300px] min-w-[220px]">
                            {application.firstName} {application.lastName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="text-dark font-estedad-light">
                      {application.applicationType === "DENTIST" ? (
                        <span className="px-3 py-1.5 text-xs rounded-lg bg-blue-100 text-blue-700 font-estedad-semibold flex items-center gap-1.5 w-fit">
                          <i className="fas fa-user-md"></i>
                          دندانپزشک
                        </span>
                      ) : (
                        <span className="px-3 py-1.5 text-xs rounded-lg bg-purple-100 text-purple-700 font-estedad-semibold flex items-center gap-1.5 w-fit">
                          <i className="fas fa-user-nurse"></i>
                          نرس
                        </span>
                      )}
                    </td>
                    <td className="text-dark font-estedad-light">
                      {application.email || (
                        <span className="text-paragray">-</span>
                      )}
                    </td>
                    <td className="text-dark font-estedad-light">
                      {application.phoneNumber}
                    </td>
                    <td className="text-dark font-estedad-light">
                      <button
                        onClick={() => onApplicationClick(application)}
                        className="line-clamp-2 max-w-[260px] min-w-[200px] text-right hover:text-primary transition-colors cursor-pointer"
                        title="کلیک برای مشاهده کامل اطلاعات"
                      >
                        {application.doctorInfo}
                      </button>
                    </td>
                    <td className="text-dark font-estedad-light">
                      {application.clinic ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary text-nowrap">
                          {application.clinic.name}
                        </span>
                      ) : (
                        <span className="text-paragray ">-</span>
                      )}
                    </td>
                    <td className="text-dark font-estedad-light">
                      {application.read ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 text-nowrap">
                          خوانده شده
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 text-nowrap">
                          خوانده نشده
                        </span>
                      )}
                    </td>
                    <td className="text-dark font-estedad-light text-nowrap">
                      {formatJalali(new Date(application.createdAt))}
                    </td>
                    <td className="">
                      <div className="flex items-center justify-center gap-2">
                        {application.read ? (
                          <button
                            onClick={() => onMarkAsUnread(application.id)}
                            className="p-1.5 rounded-full text-blue-500 bg-blue-500/20 hover:bg-blue-500 hover:text-white transition"
                            title="علامت‌گذاری به عنوان خوانده نشده"
                          >
                            <i className="far fa-envelope"></i>
                          </button>
                        ) : (
                          <button
                            onClick={() => onMarkAsRead(application.id)}
                            className="p-1.5 rounded-full text-green-500 bg-green-500/20 hover:bg-green-500 hover:text-white transition"
                            title="علامت‌گذاری به عنوان خوانده شده"
                          >
                            <i className="far fa-envelope-open"></i>
                          </button>
                        )}
                        <button
                          onClick={() =>
                            onDeleteClick(
                              application.id,
                              `${application.firstName} ${application.lastName}`
                            )
                          }
                          className="p-1.5 rounded-full text-red-500 bg-red-500/20 hover:bg-red-500 hover:text-white transition"
                          title="حذف"
                        >
                          <i className="far fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </TableContainer>
    </>
  );
}

export default DoctorApplicationsManagementTable;
