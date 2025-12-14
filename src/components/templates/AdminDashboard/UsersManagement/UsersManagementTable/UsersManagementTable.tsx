import TableContainer from "../../../../modules/TableContainer/TableContainer";
import TableSkeleton from "../../../../modules/TableSkeleton/TableSkeleton";
import { formatJalali, getImageUrl } from "../../../../../utils/helpers";
import type { User } from "../../../../../types/types";
import { useNavigate } from "react-router-dom";

interface UsersManagementTableProps {
  users: User[];
  isLoadingUsers: boolean;
  page: number;
  onDeleteClick: (id: string, firstName: string, lastName: string) => void;
  onRefetch?: () => void;
  isRefetching?: boolean;
}

const roleLabels: Record<string, string> = {
  ADMIN: "مدیر",
  SECRETARY: "منشی",
  PATIENT: "بیمار",
};

const genderLabels: Record<string, string> = {
  MALE: "مرد",
  FEMALE: "زن",
  OTHER: "سایر",
};

function UsersManagementTable({
  users,
  isLoadingUsers,
  page,
  onDeleteClick,
  onRefetch,
  isRefetching = false,
}: UsersManagementTableProps) {
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
              <th>کاربر</th>
              <th>شماره تماس</th>
              <th>نقش</th>
              <th>کد ملی</th>
              <th>جنسیت</th>
              <th>کلینیک</th>
              <th>تاریخ ایجاد</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-main-border-color">
            {isLoadingUsers ? (
              <TableSkeleton rows={5} columns={9} />
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center p-8 font-estedad-light">
                  کاربری یافت نشد
                </td>
              </tr>
            ) : (
              users.map((user: User, index: number) => (
                <tr
                  key={user.id}
                  className="hover:bg-purple-400/10 text-dark *:p-4.5"
                >
                  <td className="font-estedad-light text-center">
                    {(page - 1) * 5 + index + 1}
                  </td>
                  <td className="">
                    <div className="flex items-center gap-3">
                      {user.profileImage ? (
                        <img
                          src={getImageUrl(user.profileImage)}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="w-12 h-12 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                          <i className="far fa-user text-gray-400"></i>
                        </div>
                      )}
                      <div>
                        <p className="font-estedad-light line-clamp-2">
                          {user.firstName} {user.lastName}
                        </p>
                        {user.address && (
                          <span className="text-xs font-estedad-light text-paragray line-clamp-1">
                            {user.address.substring(0, 30)}...
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="text-dark font-estedad-light">
                    {user.phoneNumber}
                  </td>
                  <td className="text-dark font-estedad-light">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.role === "ADMIN"
                          ? "bg-red-100 text-red-600"
                          : user.role === "SECRETARY"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {roleLabels[user.role] || user.role}
                    </span>
                  </td>
                  <td className="text-dark font-estedad-light">
                    {user.nationalCode || "-"}
                  </td>
                  <td className="text-dark font-estedad-light">
                    {user.gender
                      ? genderLabels[user.gender] || user.gender
                      : "-"}
                  </td>
                  <td className="text-dark font-estedad-light">
                    {user.clinic ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                        {user.clinic.name}
                      </span>
                    ) : (
                      <span className="text-paragray">-</span>
                    )}
                  </td>
                  <td className="text-dark font-estedad-light text-nowrap">
                    {user.createdAt
                      ? formatJalali(new Date(user.createdAt))
                      : "-"}
                  </td>
                  <td className="">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          navigate(`/admin/users-management/edit/${user.id}`);
                        }}
                        className="p-1.5 rounded-full text-secondary bg-secondary/20 hover:bg-secondary hover:text-white transition"
                        title="ویرایش"
                      >
                        <i className="far fa-edit"></i>
                      </button>
                      <button
                        onClick={() =>
                          onDeleteClick(user.id, user.firstName, user.lastName)
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

export default UsersManagementTable;
