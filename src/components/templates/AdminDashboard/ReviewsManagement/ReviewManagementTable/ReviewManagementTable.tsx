import TableContainer from "../../../../modules/TableContainer/TableContainer";
import TableSkeleton from "../../../../modules/TableSkeleton/TableSkeleton";
import { formatJalali } from "../../../../../utils/helpers";
import type { Review } from "../../../../../types/types";
import { useNavigate } from "react-router-dom";

interface ReviewManagementTableProps {
  reviews: Review[];
  isLoadingReviews: boolean;
  page: number;
  onDeleteClick: (id: string, name: string) => void;
  onRefetch?: () => void;
  isRefetching?: boolean;
}

function ReviewManagementTable({
  reviews,
  isLoadingReviews,
  page,
  onDeleteClick,
  onRefetch,
  isRefetching = false,
}: ReviewManagementTableProps) {
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
              <th>نام</th>
              <th>متن نظر</th>
              <th>امتیاز</th>
              <th>وضعیت</th>
              <th>ترتیب</th>
              <th>تاریخ ایجاد</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-main-border-color">
            {isLoadingReviews ? (
              <TableSkeleton rows={5} columns={8} />
            ) : reviews.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center p-8 font-estedad-light">
                  نظری یافت نشد
                </td>
              </tr>
            ) : (
              reviews.map((review: Review, index: number) => (
                <tr
                  key={review.id}
                  className="hover:bg-purple-400/10 text-dark *:p-4.5"
                >
                  <td className="font-estedad-light text-center">
                    {(page - 1) * 5 + index + 1}
                  </td>
                  <td className="min-w-[150px] pr-6">
                    <div className="flex items-center gap-3">
                      {review.profileImage ? (
                        <img
                          src={`http://localhost:4000${review.profileImage}`}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <i className="far fa-user text-gray-400"></i>
                        </div>
                      )}
                      <div>
                        <p className="font-estedad-light">{review.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-dark font-estedad-light min-w-[250px] pr-6">
                    <span className="line-clamp-2">
                      {review.content.length > 50
                        ? review.content.substring(0, 50) + "..."
                        : review.content}
                    </span>
                  </td>
                  <td className="text-dark font-estedad-light">
                    <div className="flex gap-1 text-secondary">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <i className="fas fa-star text-sm" key={i}></i>
                      ))}
                      {Array.from({ length: 5 - review.rating }).map((_, i) => (
                        <i
                          className="fas fa-star text-gray-300 text-sm"
                          key={i}
                        ></i>
                      ))}
                    </div>
                  </td>
                  <td className="text-dark font-estedad-light">
                    {review.published ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        منتشر شده
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                        در انتظار تایید
                      </span>
                    )}
                  </td>
                  <td className="text-dark font-estedad-light text-center">
                    {review.order}
                  </td>
                  <td className="text-dark font-estedad-light">
                    {formatJalali(new Date(review.createdAt || new Date()))}
                  </td>
                  <td className="">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          navigate(
                            `/admin/reviews-management/edit/${review.id}`
                          );
                        }}
                        className="p-1.5 rounded-full text-secondary bg-secondary/20 hover:bg-secondary hover:text-white transition"
                        title="ویرایش"
                      >
                        <i className="far fa-edit"></i>
                      </button>
                      <button
                        onClick={() => onDeleteClick(review.id, review.name)}
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

export default ReviewManagementTable;

