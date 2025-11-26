import TableContainer from "../../../../modules/TableContainer/TableContainer";
import TableSkeleton from "../../../../modules/TableSkeleton/TableSkeleton";
import { formatJalali } from "../../../../../utils/helpers";
import { useNavigate } from "react-router-dom";

interface Insurance {
  id: string;
  name: string;
  description?: string;
  website?: string;
  phoneNumber?: string;
  email?: string;
  logo?: string;
  published: boolean;
  order: number;
  createdAt: string;
}

interface InsuranceManagementTableProps {
  insurances: Insurance[];
  isLoadingInsurances: boolean;
  page: number;
  onDeleteClick: (id: string, name: string) => void;
  onRefetch?: () => void;
  isRefetching?: boolean;
}

function InsuranceManagementTable({
  insurances,
  isLoadingInsurances,
  page,
  onDeleteClick,
  onRefetch,
  isRefetching = false,
}: InsuranceManagementTableProps) {
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
              <th>نام سازمان</th>
              <th>توضیحات</th>
              <th>وب‌سایت</th>
              <th>تماس</th>
              <th>ترتیب</th>
              <th>وضعیت</th>
              <th>تاریخ ایجاد</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-main-border-color">
            {isLoadingInsurances ? (
              <TableSkeleton rows={5} columns={9} />
            ) : insurances.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center p-8 font-estedad-light">
                  سازمان بیمه‌ای یافت نشد
                </td>
              </tr>
            ) : (
              insurances.map((insurance: Insurance, index: number) => (
                <tr
                  key={insurance.id}
                  className="hover:bg-purple-400/10 text-dark *:p-4.5"
                >
                  <td className="font-estedad-light text-center">
                    {(page - 1) * 5 + index + 1}
                  </td>
                  <td className="">
                    <div className="flex items-center gap-3">
                      {insurance.logo ? (
                        <img
                          src={`http://localhost:4000${insurance.logo}`}
                          alt={insurance.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <i className="far fa-building text-gray-400"></i>
                        </div>
                      )}
                      <p className="font-estedad-light">{insurance.name}</p>
                    </div>
                  </td>
                  <td className="text-dark font-estedad-light">
                    {insurance.description ? (
                      <span className="line-clamp-2">
                        {insurance.description.substring(0, 50)}
                        {insurance.description.length > 50 ? "..." : ""}
                      </span>
                    ) : (
                      <span className="text-paragray">-</span>
                    )}
                  </td>
                  <td className="text-dark font-estedad-light">
                    {insurance.website ? (
                      <a
                        href={insurance.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {insurance.website.length > 30
                          ? `${insurance.website.substring(0, 30)}...`
                          : insurance.website}
                      </a>
                    ) : (
                      <span className="text-paragray">-</span>
                    )}
                  </td>
                  <td className="text-dark font-estedad-light">
                    <div className="space-y-1">
                      {insurance.phoneNumber && (
                        <div className="text-sm">
                          <i className="far fa-phone text-paragray ml-1"></i>
                          {insurance.phoneNumber}
                        </div>
                      )}
                      {insurance.email && (
                        <div className="text-sm">
                          <i className="far fa-envelope text-paragray ml-1"></i>
                          {insurance.email.length > 20
                            ? `${insurance.email.substring(0, 20)}...`
                            : insurance.email}
                        </div>
                      )}
                      {!insurance.phoneNumber && !insurance.email && (
                        <span className="text-paragray">-</span>
                      )}
                    </div>
                  </td>
                  <td className="text-dark font-estedad-light text-center">
                    {insurance.order}
                  </td>
                  <td className="text-dark font-estedad-light">
                    {insurance.published ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        منتشر شده
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                        پیش‌نویس
                      </span>
                    )}
                  </td>
                  <td className="text-dark font-estedad-light">
                    {formatJalali(new Date(insurance.createdAt || new Date()))}
                  </td>
                  <td className="">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          navigate(
                            `/admin-dashboard/insurances-management/edit/${insurance.id}`
                          );
                        }}
                        className="p-1.5 rounded-full text-secondary bg-secondary/20 hover:bg-secondary hover:text-white transition"
                        title="ویرایش"
                      >
                        <i className="far fa-edit"></i>
                      </button>
                      <button
                        onClick={() =>
                          onDeleteClick(insurance.id, insurance.name)
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

export default InsuranceManagementTable;
