import TableContainer from "../../../../modules/TableContainer/TableContainer";
import TableSkeleton from "../../../../modules/TableSkeleton/TableSkeleton";
import { formatJalali } from "../../../../../utils/helpers";
import type { Clinic } from "../../../../../types/types";
import { useNavigate } from "react-router-dom";

interface ClinicManagementTableProps {
  clinics: Clinic[];
  isLoadingClinics: boolean;
  page: number;
  onDeleteClick: (id: string, name: string) => void;
  onRefetch?: () => void;
  isRefetching?: boolean;
}

function ClinicManagementTable({
  clinics,
  isLoadingClinics,
  page,
  onDeleteClick,
  onRefetch,
  isRefetching = false,
}: ClinicManagementTableProps) {
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
            <tr className="*:text-right *:p-4.5 ">
              <th>ردیف</th>
              <th>نام کلینیک</th>
              <th>آدرس</th>
              <th>شماره تماس</th>
              <th>تعداد پزشکان</th>
              <th>تاریخ ایجاد</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-main-border-color">
            {isLoadingClinics ? (
              <TableSkeleton rows={5} columns={7} />
            ) : clinics.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-8 font-estedad-light">
                  کلینیکی یافت نشد
                </td>
              </tr>
            ) : (
              clinics.map((clinic: Clinic, index: number) => (
                <tr
                  key={clinic.id}
                  className="hover:bg-purple-400/10 text-dark *:p-4.5"
                >
                  <td className="font-estedad-light text-center">
                    {(page - 1) * 5 + index + 1}
                  </td>
                  <td className="">
                    <div>
                      <p className="font-estedad-light">{clinic.name}</p>
                      {clinic.description && (
                        <span className="text-xs font-estedad-light text-paragray line-clamp-1">
                          {clinic.description.substring(0, 30)}...
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="text-dark font-estedad-light">
                    {clinic.address}
                  </td>
                  <td className="text-dark font-estedad-light">
                    {clinic.phoneNumber || "-"}
                  </td>
                  <td className="text-dark font-estedad-light">
                    {clinic._count?.doctors || 0}
                  </td>
                  <td className="text-dark font-estedad-light">
                    {clinic.createdAt
                      ? formatJalali(new Date(clinic.createdAt))
                      : "-"}
                  </td>
                  <td className="">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          navigate(
                            `/admin-dashboard/clinics-management/edit/${clinic.id}`
                          );
                        }}
                        className="p-1.5 rounded-full text-secondary bg-secondary/20 hover:bg-secondary hover:text-white transition"
                        title="ویرایش"
                      >
                        <i className="far fa-edit"></i>
                      </button>
                      <button
                        onClick={() => onDeleteClick(clinic.id, clinic.name)}
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

export default ClinicManagementTable;
