import TableContainer from "../../../../../components/modules/TableContainer/TableContainer";
import TableSkeleton from "../../../../../components/modules/TableSkeleton/TableSkeleton";
import { formatJalali } from "../../../../../utils/helpers";
import type { Comment } from "../../../../../types/types";

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
              <th>تاریخ ایجاد</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-main-border-color">
            {isLoadingComments ? (
              <TableSkeleton rows={5} columns={7} />
            ) : comments.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-8 font-estedad-light">
                  نظری یافت نشد
                </td>
              </tr>
            ) : (
              comments.map((comment: Comment, index: number) => (
                <tr
                  key={comment.id}
                  className="hover:bg-purple-400/10 text-dark *:p-4.5"
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
                    {formatJalali(new Date(comment.createdAt))}
                  </td>
                  <td className="">
                    <div className="flex items-center gap-2">
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
