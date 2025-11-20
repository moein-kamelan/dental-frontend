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
}

function DoctorApplicationsManagementTable({
  applications,
  isLoadingApplications,
  page,
  onDeleteClick,
  onMarkAsRead,
  onMarkAsUnread,
  onApplicationClick,
}: DoctorApplicationsManagementTableProps) {
  return (
    <TableContainer withBg withMargin>
      <table className="w-full ">
        <thead className="border-b border-main-border-color ">
          <tr className="*:text-right *:p-4.5 ">
            <th>ردیف</th>
            <th>نام و نام خانوادگی</th>
            <th>ایمیل</th>
            <th>شماره تماس</th>
            <th>اطلاعات پزشک</th>
            <th>کلینیک</th>
            <th>وضعیت</th>
            <th>تاریخ ایجاد</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-main-border-color">
          {isLoadingApplications ? (
            <TableSkeleton rows={5} columns={9} />
          ) : applications.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center p-8 font-estedad-light">
                درخواستی یافت نشد
              </td>
            </tr>
          ) : (
            applications.map((application: DoctorApplication, index: number) => (
              <tr
                key={application.id}
                className={`hover:bg-purple-400/10 text-dark *:p-4.5 ${
                  !application.read ? "bg-blue-50/50" : ""
                }`}
              >
                <td className="font-estedad-light text-center">
                  {(page - 1) * 5 + index + 1}
                </td>
                <td className="">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <i className="far fa-user-md text-primary"></i>
                    </div>
                    <div>
                      <p className="font-estedad-light">
                        {application.firstName} {application.lastName}
                      </p>
                    </div>
                  </div>
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
                    className="line-clamp-2 max-w-[200px] text-right hover:text-primary transition-colors cursor-pointer"
                    title="کلیک برای مشاهده کامل اطلاعات"
                  >
                    {application.doctorInfo}
                  </button>
                </td>
                <td className="text-dark font-estedad-light">
                  {application.clinic ? (
                    <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {application.clinic.name}
                    </span>
                  ) : (
                    <span className="text-paragray">-</span>
                  )}
                </td>
                <td className="text-dark font-estedad-light">
                  {application.read ? (
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      خوانده شده
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                      خوانده نشده
                    </span>
                  )}
                </td>
                <td className="text-dark font-estedad-light">
                  {formatJalali(new Date(application.createdAt))}
                </td>
                <td className="">
                  <div className="flex items-center gap-2">
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
            ))
          )}
        </tbody>
      </table>
    </TableContainer>
  );
}

export default DoctorApplicationsManagementTable;

