import TableContainer from "../../../../modules/TableContainer/TableContainer";
import TableSkeleton from "../../../../modules/TableSkeleton/TableSkeleton";
import { formatJalali } from "../../../../../utils/helpers";
import type { ArticleCategory } from "../../../../../types/types";
import { useNavigate } from "react-router-dom";

interface ArticlesCategoryManagementTableProps {
  categories: ArticleCategory[];
  isLoadingCategories: boolean;
  onDeleteClick: (id: string, name: string) => void;
  onRefetch?: () => void;
  isRefetching?: boolean;
}

function ArticlesCategoryManagementTable({
  categories,
  isLoadingCategories,
  onDeleteClick,
  onRefetch,
  isRefetching = false,
}: ArticlesCategoryManagementTableProps) {
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
              <th>نام دسته‌بندی</th>
              <th>توضیحات</th>
              <th>ترتیب نمایش</th>
              <th>تعداد مقالات</th>
              <th>وضعیت</th>
              <th>تاریخ ایجاد</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-main-border-color">
            {isLoadingCategories ? (
              <TableSkeleton rows={5} columns={8} />
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center p-8 font-estedad-light">
                  دسته‌بندی‌ای یافت نشد
                </td>
              </tr>
            ) : (
              categories.map((category: ArticleCategory, index: number) => (
                <tr
                  key={category.id}
                  className="hover:bg-purple-400/10 text-dark *:p-4.5"
                >
                  <td className="font-estedad-light text-center">
                    {index + 1}
                  </td>
                  <td className="">
                    <div>
                      <p className="font-estedad-light">{category.name}</p>
                      <span className="text-xs font-estedad-light text-paragray line-clamp-1">
                        {category.slug}
                      </span>
                    </div>
                  </td>
                  <td className="text-dark font-estedad-light">
                    {category.description ? (
                      <span className="line-clamp-2">
                        {category.description.substring(0, 50)}
                        {category.description.length > 50 ? "..." : ""}
                      </span>
                    ) : (
                      <span className="text-paragray">-</span>
                    )}
                  </td>
                  <td className="text-dark font-estedad-light text-center">
                    {category.order ?? 0}
                  </td>
                  <td className="text-dark font-estedad-light text-center">
                    {category._count?.articles ?? 0}
                  </td>
                  <td className="text-dark font-estedad-light">
                    {category.published ? (
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
                    {category.createdAt
                      ? formatJalali(new Date(category.createdAt))
                      : "-"}
                  </td>
                  <td className="">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          navigate(
                            `/admin-dashboard/articles-category-management/edit/${category.id}`
                          );
                        }}
                        className="p-1.5 rounded-full text-secondary bg-secondary/20 hover:bg-secondary hover:text-white transition"
                        title="ویرایش"
                      >
                        <i className="far fa-edit"></i>
                      </button>
                      <button
                        onClick={() =>
                          onDeleteClick(category.id, category.name)
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

export default ArticlesCategoryManagementTable;
