import TableContainer from "../../../../../components/modules/TableContainer/TableContainer";
import TableSkeleton from "../../../../../components/modules/TableSkeleton/TableSkeleton";
import { formatJalali } from "../../../../../utils/helpers";
import type { Comment } from "../../../../../types/types";

interface CommentsManagementTableProps {
  comments: Comment[];
  isLoadingComments: boolean;
  page: number;
  onDeleteClick: (id: string, content: string) => void;
}

function CommentsManagementTable({
  comments,
  isLoadingComments,
  page,
  onDeleteClick,
}: CommentsManagementTableProps) {
  const getCommentType = (comment: Comment) => {
    if (comment.doctorId) return "پزشک";
    if (comment.articleId) return "مقاله";
    if (comment.serviceId) return "خدمت";
    return "-";
  };

  const getCommentTarget = (comment: Comment) => {
    if (comment.doctor) {
      return `دکتر ${comment.doctor.firstName} ${comment.doctor.lastName}`;
    }
    if (comment.article) {
      return comment.article.title;
    }
    if (comment.service) {
      return comment.service.title;
    }
    return "-";
  };

  const renderStars = (rating: number | null | undefined) => {
    if (!rating) return <span className="text-paragray">-</span>;
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <i
            key={index}
            className={`far ${
              index < rating ? "fa-star text-yellow-400" : "fa-star text-gray-300"
            }`}
          ></i>
        ))}
        <span className="mr-1 text-sm text-paragray">({rating})</span>
      </div>
    );
  };

  return (
    <TableContainer withBg withMargin>
      <table className="w-full ">
        <thead className="border-b border-main-border-color ">
          <tr className="*:text-right *:p-4.5 ">
            <th>ردیف</th>
            <th>کاربر</th>
            <th>نوع</th>
            <th>مربوط به</th>
            <th>متن نظر</th>
            <th>امتیاز</th>
            <th>تاریخ ایجاد</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-main-border-color">
          {isLoadingComments ? (
            <TableSkeleton rows={5} columns={8} />
          ) : comments.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center p-8 font-estedad-light">
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
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <i className="far fa-user text-primary"></i>
                    </div>
                    <div>
                      <p className="font-estedad-light">
                        {comment.user.firstName} {comment.user.lastName}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-dark font-estedad-light">
                  <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                    {getCommentType(comment)}
                  </span>
                </td>
                <td className="text-dark font-estedad-light">
                  <span className="line-clamp-1 max-w-[200px]">
                    {getCommentTarget(comment)}
                  </span>
                </td>
                <td className="text-dark font-estedad-light">
                  <span className="line-clamp-2 max-w-[300px]">
                    {comment.content}
                  </span>
                </td>
                <td className="text-dark font-estedad-light">
                  {renderStars(comment.rating)}
                </td>
                <td className="text-dark font-estedad-light text-nowrap">
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
  );
}

export default CommentsManagementTable;

