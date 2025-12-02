import TableContainer from "../../../../../components/modules/TableContainer/TableContainer";
import TableSkeleton from "../../../../../components/modules/TableSkeleton/TableSkeleton";
import { formatJalali } from "../../../../../utils/helpers";
import type { Comment } from "../../../../../types/types";
import {
  useToggleCommentStatus,
  useToggleCommentReadStatus,
} from "../../../../../services/useComments";
import { showSuccessToast, showErrorToast } from "../../../../../utils/toastify";
import { useState } from "react";

interface ArticleCommentsTableProps {
  comments: Comment[];
  isLoadingComments: boolean;
  page: number;
  onDeleteClick: (id: string, content: string) => void;
  onCommentClick?: (comment: Comment) => void;
  onRefetch?: () => void;
  isRefetching?: boolean;
}

function ArticleCommentsTable({
  comments,
  isLoadingComments,
  page,
  onDeleteClick,
  onCommentClick,
  onRefetch,
  isRefetching = false,
}: ArticleCommentsTableProps) {
  const { mutateAsync: toggleCommentStatus } = useToggleCommentStatus();
  const { mutateAsync: toggleCommentReadStatus } =
    useToggleCommentReadStatus();
  const [togglingIds, setTogglingIds] = useState<Set<string>>(new Set());
  const [togglingReadIds, setTogglingReadIds] = useState<Set<string>>(
    new Set()
  );

  const handleToggleStatus = async (id: string) => {
    setTogglingIds((prev) => new Set(prev).add(id));
    try {
      await toggleCommentStatus(id);
      showSuccessToast("وضعیت انتشار با موفقیت تغییر کرد");
      onRefetch?.();
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در تغییر وضعیت انتشار رخ داد";
      showErrorToast(errorMessage);
    } finally {
      setTogglingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleToggleReadStatus = async (id: string) => {
    setTogglingReadIds((prev) => new Set(prev).add(id));
    try {
      await toggleCommentReadStatus(id);
      showSuccessToast("وضعیت خوانده شده با موفقیت تغییر کرد");
      onRefetch?.();
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطایی در تغییر وضعیت خوانده شده رخ داد";
      showErrorToast(errorMessage);
    } finally {
      setTogglingReadIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const renderStars = (rating: number | null | undefined) => {
    if (!rating) return <span className="text-paragray">-</span>;
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <i
            key={index}
            className={`fas ${
              index < rating
                ? "fa-star text-yellow-400"
                : "fa-star text-gray-300"
            }`}
          ></i>
        ))}
      </div>
    );
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
        <table className="w-full ">
          <thead className="border-b border-main-border-color ">
            <tr className="*:text-right *:p-4.5 ">
              <th>ردیف</th>
              <th>کاربر</th>
              <th>مقاله</th>
              <th>متن نظر</th>
              <th>امتیاز</th>
              <th>وضعیت انتشار</th>
              <th>وضعیت خوانده شده</th>
              <th>تاریخ ایجاد</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-main-border-color">
            {isLoadingComments ? (
              <TableSkeleton rows={5} columns={9} />
            ) : comments.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center p-8 font-estedad-light">
                  نظری یافت نشد
                </td>
              </tr>
            ) : (
              comments.map((comment: Comment, index: number) => (
                <tr
                  key={comment.id}
                  className={`text-dark *:p-4.5 ${
                    !comment.read 
                      ? "bg-blue-100 hover:bg-blue-200" 
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <td className="font-estedad-light text-center">
                    {(page - 1) * 5 + index + 1}
                  </td>
                  <td className="">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-estedad-light">
                          {comment.user.firstName} {comment.user.lastName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="text-dark font-estedad-light">
                    {comment.article ? (
                      <span className="line-clamp-1 max-w-[200px]">
                        {comment.article.title}
                      </span>
                    ) : (
                      <span className="text-paragray">-</span>
                    )}
                  </td>
                  <td className="text-dark font-estedad-light">
                    <span
                      className={`line-clamp-2 max-w-[300px] ${
                        onCommentClick
                          ? "cursor-pointer hover:text-primary transition-colors"
                          : ""
                      }`}
                      onClick={() => onCommentClick?.(comment)}
                      title={onCommentClick ? "کلیک برای مشاهده جزئیات" : ""}
                    >
                      {comment.content}
                    </span>
                  </td>
                  <td className="text-dark font-estedad-light">
                    {renderStars(comment.rating)}
                  </td>
                  <td className="text-dark font-estedad-light">
                    <div className="flex items-center gap-2">
                      {comment.published ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                          منتشر شده
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                          پنهان
                        </span>
                      )}
                      <button
                        onClick={() => handleToggleStatus(comment.id)}
                        disabled={togglingIds.has(comment.id)}
                        className="p-1.5 rounded-full text-primary bg-primary/20 hover:bg-primary hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                        title={comment.published ? "پنهان کردن" : "انتشار"}
                      >
                        {togglingIds.has(comment.id) ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                        ) : (
                          <i
                            className={`fas ${
                              comment.published
                                ? "fa-eye"
                                : "fa-eye-slash"
                            }`}
                          ></i>
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="text-dark font-estedad-light">
                    <div className="flex items-center gap-2">
                      {comment.read ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                          خوانده شده
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                          خوانده نشده
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="text-dark font-estedad-light">
                    {formatJalali(new Date(comment.createdAt))}
                  </td>
                  <td className="">
                    <div className="flex items-center gap-2">
                      {comment.read ? (
                        <button
                          onClick={() => handleToggleReadStatus(comment.id)}
                          disabled={togglingReadIds.has(comment.id)}
                          className="p-1.5 rounded-full text-blue-500 bg-blue-500/20 hover:bg-blue-500 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                          title="علامت‌گذاری به عنوان خوانده نشده"
                        >
                          {togglingReadIds.has(comment.id) ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                          ) : (
                            <i className="far fa-envelope"></i>
                          )}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleToggleReadStatus(comment.id)}
                          disabled={togglingReadIds.has(comment.id)}
                          className="p-1.5 rounded-full text-green-500 bg-green-500/20 hover:bg-green-500 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                          title="علامت‌گذاری به عنوان خوانده شده"
                        >
                          {togglingReadIds.has(comment.id) ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-500 border-t-transparent"></div>
                          ) : (
                            <i className="far fa-envelope-open"></i>
                          )}
                        </button>
                      )}
                      <button
                        onClick={() =>
                          onDeleteClick(
                            comment.id,
                            comment.content.substring(0, 30) + "..."
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

export default ArticleCommentsTable;
