import TableContainer from "../../../../modules/TableContainer/TableContainer";
import TableSkeleton from "../../../../modules/TableSkeleton/TableSkeleton";
import { formatJalali } from "../../../../../utils/helpers";
import type { Article } from "../../../../../types/types";
import { useNavigate } from "react-router-dom";

interface ArticleManagementTableProps {
  articles: Article[];
  isLoadingArticles: boolean;
  page: number;
  onDeleteClick: (id: string, title: string) => void;
}

function ArticleManagementTable({
  articles,
  isLoadingArticles,
  page,
  onDeleteClick,
}: ArticleManagementTableProps) {
  const navigate = useNavigate();
  return (
    <TableContainer withBg withMargin>
      <table className="w-full ">
        <thead className="border-b border-main-border-color ">
          <tr className="*:text-right *:p-4.5 ">
            <th>ردیف</th>
            <th>مقاله</th>
            <th>خلاصه</th>
            <th>دسته‌بندی‌ها</th>
            <th>وضعیت</th>
            <th>تاریخ ایجاد</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-main-border-color">
          {isLoadingArticles ? (
            <TableSkeleton rows={5} columns={7} />
          ) : articles.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center p-8 font-estedad-light">
                مقاله‌ای یافت نشد
              </td>
            </tr>
          ) : (
            articles.map((article: Article, index: number) => (
              <tr
                key={article.id}
                className="hover:bg-purple-400/10 text-dark *:p-4.5"
              >
                <td className="font-estedad-light text-center">
                  {(page - 1) * 5 + index + 1}
                </td>
                <td className="">
                  <div className="flex items-center gap-3">
                    {article.coverImage ? (
                      <img
                        src={`http://localhost:4000${article.coverImage}`}
                        alt={article.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                        <i className="far fa-file-alt text-gray-400"></i>
                      </div>
                    )}
                    <div>
                      <p className="font-estedad-light">{article.title}</p>
                      <span className="text-xs font-estedad-light text-paragray line-clamp-1">
                        {article.slug}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="text-dark font-estedad-light">
                  {article.excerpt ? (
                    <span className="line-clamp-2">
                      {article.excerpt.substring(0, 50)}
                      {article.excerpt.length > 50 ? "..." : ""}
                    </span>
                  ) : (
                    <span className="text-paragray">-</span>
                  )}
                </td>
                <td className="text-dark font-estedad-light">
                  {article.categories && article.categories.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {article.categories.slice(0, 2).map((category) => (
                        <span
                          key={category.id}
                          className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                        >
                          {category.name}
                        </span>
                      ))}
                      {article.categories.length > 2 && (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                          +{article.categories.length - 2}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-paragray">-</span>
                  )}
                </td>
                <td className="text-dark font-estedad-light">
                  {article.published ? (
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
                  {formatJalali(new Date(article.createdAt || new Date()))}
                </td>
                <td className="">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigate(
                          `/admin-dashboard/articles-management/edit/${article.id}`
                        );
                      }}
                      className="p-1.5 rounded-full text-secondary bg-secondary/20 hover:bg-secondary hover:text-white transition"
                      title="ویرایش"
                    >
                      <i className="far fa-edit"></i>
                    </button>
                    <button
                      onClick={() => onDeleteClick(article.id, article.title)}
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

export default ArticleManagementTable;

