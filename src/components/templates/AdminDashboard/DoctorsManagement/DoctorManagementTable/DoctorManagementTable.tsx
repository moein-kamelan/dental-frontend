import TableContainer from "../../../../modules/TableContainer/TableContainer";
import TableSkeleton from "../../../../modules/TableSkeleton/TableSkeleton";
import { formatJalali } from "../../../../../utils/helpers";
import type { Doctor } from "../../../../../types/types";
import { useNavigate } from "react-router-dom";

interface DoctorManagementTableProps {
  doctors: Doctor[];
  isLoadingDoctors: boolean;
  page: number;
  onDeleteClick: (id: string, firstName: string, lastName: string) => void;
  onRefetch?: () => void;
  isRefetching?: boolean;
}

function DoctorsManagementTable({
  doctors,
  isLoadingDoctors,
  page,
  onDeleteClick,
  onRefetch,
  isRefetching = false,
}: DoctorManagementTableProps) {
  const navigate = useNavigate();
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
              <th>پزشک</th>
              <th>دانشگاه</th>
              <th>شماره نظام پزشکی</th>
              <th>کلینیک‌ ها</th>
              <th>تخصص‌ ها</th>
              <th>تاریخ ایجاد</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-main-border-color">
            {isLoadingDoctors ? (
              <TableSkeleton rows={5} columns={8} />
            ) : doctors.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center p-8 font-estedad-light">
                  پزشکی یافت نشد
                </td>
              </tr>
            ) : (
              doctors.map((doctor: Doctor, index: number) => (
                <tr
                  key={doctor.id}
                  className="hover:bg-purple-400/10 text-dark *:p-4.5"
                >
                  <td className="font-estedad-light text-center">
                    {(page - 1) * 5 + index + 1}
                  </td>
                  <td className="">
                    <div className="flex items-center gap-3 max-w-[220px]">
                      {doctor.profileImage ? (
                        <img
                          src={`http://localhost:4000${doctor.profileImage}`}
                          alt={`${doctor.firstName} ${doctor.lastName}`}
                          className="w-12 h-12 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                          <i className="far fa-user text-gray-400"></i>
                        </div>
                      )}
                      <div>
                        <p className="font-estedad-light line-clamp-2  ">
                          دکتر {doctor.firstName} {doctor.lastName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="text-dark font-estedad-light">
                    <div className="line-clamp-2 overflow-hidden max-w-[200px]">
                      {doctor.university}
                    </div>
                  </td>
                  <td className="text-dark font-estedad-light">
                    {doctor.medicalLicenseNo}
                  </td>
                  <td className="text-dark font-estedad-light max-w-[260px]">
                    {doctor.clinics && doctor.clinics.length > 0 ? (
                      <div className="flex justify-center items-start flex-wrap gap-1  overflow-hidden">
                        {doctor.clinics.slice(0, 2).map((dc) => (
                          <span
                            key={dc.clinic.id}
                            className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary text-center"
                          >
                            {dc.clinic.name}
                          </span>
                        ))}
                        {doctor.clinics.length > 2 && (
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                            +{doctor.clinics.length - 2}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-paragray">-</span>
                    )}
                  </td>
                  <td className="text-dark font-estedad-light">
                    {doctor.skills && doctor.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {doctor.skills.slice(0, 2).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs rounded-full bg-secondary/10 text-secondary"
                          >
                            {skill}
                          </span>
                        ))}
                        {doctor.skills.length > 2 && (
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                            +{doctor.skills.length - 2}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-paragray">-</span>
                    )}
                  </td>
                  <td className="text-dark font-estedad-light">
                    {formatJalali(new Date(doctor.createdAt || new Date()))}
                  </td>
                  <td className="">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          navigate(
                            `/admin/doctors-management/edit/${doctor.id}`
                          );
                        }}
                        className="p-1.5 rounded-full text-secondary bg-secondary/20 hover:bg-secondary hover:text-white transition"
                        title="ویرایش"
                      >
                        <i className="far fa-edit"></i>
                      </button>
                      <button
                        onClick={() =>
                          onDeleteClick(
                            doctor.id,
                            doctor.firstName,
                            doctor.lastName
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
    </>
  );
}

export default DoctorsManagementTable;
