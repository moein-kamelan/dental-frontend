import TableContainer from "../../../../modules/TableContainer/TableContainer";
import TableSkeleton from "../../../../modules/TableSkeleton/TableSkeleton";
import { formatJalali, getImageUrl } from "../../../../../utils/helpers";
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
            <tr className="*:text-right *:p-4.5 *:text-nowrap">
              <th>ردیف</th>
              <th>تصویر</th>
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
              <TableSkeleton rows={5} columns={8} />
            ) : clinics.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center p-8 font-estedad-light">
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
                  <td>
                    {/* #region agent log */}
                    {(() => {
                      fetch(
                        "http://127.0.0.1:7242/ingest/c5282bb0-1a44-499c-bce8-9a51f667292e",
                        {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            location: "ClinicManagementTable.tsx:77",
                            message: "Rendering clinic image",
                            data: {
                              clinicId: clinic.id,
                              clinicName: clinic.name,
                              clinicImage: clinic.image,
                              clinicImageNull: clinic.image === null,
                              clinicImageUndefined: clinic.image === undefined,
                              clinicImageTruthy: !!clinic.image,
                            },
                            timestamp: Date.now(),
                            sessionId: "debug-session",
                            runId: "run1",
                            hypothesisId: "E",
                          }),
                        }
                      ).catch(() => {});
                      return null;
                    })()}
                    {/* #endregion */}
                    {clinic.image ? (
                      <img
                        key={`${clinic.id}-${clinic.image || "no-image"}`}
                        src={getImageUrl(clinic.image)}
                        alt={clinic.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                        <i className="fas fa-image text-gray-400"></i>
                      </div>
                    )}
                  </td>
                  <td className="min-w-[200px]">
                    <div>
                      <p className="font-estedad-light line-clamp-2">
                        {clinic.name}
                      </p>
                      {clinic.description && (
                        <span className="text-xs font-estedad-light text-paragray line-clamp-2">
                          {clinic.description.substring(0, 30)}...
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="text-dark font-estedad-light min-w-[260px] max-w-[260px]">
                    <span className="line-clamp-2">{clinic.address}</span>
                  </td>
                  <td className="text-dark font-estedad-light">
                    {(() => {
                      const phones = Array.isArray(clinic.phoneNumber) 
                        ? clinic.phoneNumber 
                        : (clinic.phoneNumber ? [clinic.phoneNumber] : []);
                      return phones.length > 0 ? (
                        <div className="flex flex-col gap-1">
                          {phones.map((phone, idx) => (
                            <span key={idx} dir="ltr" className="text-nowrap">
                              {phone}
                            </span>
                          ))}
                        </div>
                      ) : "-";
                    })()}
                  </td>
                  <td className="text-dark font-estedad-light text-center">
                    {clinic._count?.doctors || 0}
                  </td>
                  <td className="text-dark font-estedad-light text-nowrap">
                    {clinic.createdAt
                      ? formatJalali(new Date(clinic.createdAt))
                      : "-"}
                  </td>
                  <td className="">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          navigate(
                            `/admin/clinics-management/edit/${clinic.id}`
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
