import TableContainer from "../../../../modules/TableContainer/TableContainer";
import TableSkeleton from "../../../../modules/TableSkeleton/TableSkeleton";
import { formatJalali, stripHtmlTags } from "../../../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import type { Gallery } from "../../../../../types/types";

interface GalleryManagementTableProps {
  images: Gallery[];
  isLoadingImages: boolean;
  page: number;
  onDeleteClick: (id: string, title: string) => void;
  onRefetch?: () => void;
  isRefetching?: boolean;
}

function GalleryManagementTable({
  images,
  isLoadingImages,
  page,
  onDeleteClick,
  onRefetch,
  isRefetching = false,
}: GalleryManagementTableProps) {
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
              <th>عنوان</th>
              <th>توضیحات</th>
              <th>ترتیب</th>
              <th>وضعیت</th>
              <th>تاریخ ایجاد</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-main-border-color">
            {isLoadingImages ? (
              <TableSkeleton rows={5} columns={8} />
            ) : images.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center p-8 font-estedad-light">
                  تصویری یافت نشد
                </td>
              </tr>
            ) : (
              images.map((image: Gallery, index: number) => (
                <tr
                  key={image.id}
                  className="hover:bg-purple-400/10 text-dark *:p-4.5"
                >
                  <td className="font-estedad-light text-center">
                    {(page - 1) * 5 + index + 1}
                  </td>
                  <td className="">
                    <div className="flex items-center ">
                      {image.image ? (
                        <img
                          src={`${image.image}`}
                          alt={image.title || "تصویر گالری"}
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center shrink-0">
                          <i className="far fa-image text-gray-400 text-2xl"></i>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="">
                    <p className="font-estedad-light line-clamp-2 max-w-[300px] min-w-[220px]">{image.title || "-"}</p>
                  </td>
                  <td className="text-dark font-estedad-light">
                    {image.description ? (
                      <span className="line-clamp-2 max-w-[300px] min-w-[220px]">
                    {stripHtmlTags(image.description)}
                      </span>
                    ) : (
                      <span className="text-paragray">-</span>
                    )}
                  </td>
                  <td className="text-dark font-estedad-light text-center">
                    {image.order}
                  </td>
                  <td className="text-dark font-estedad-light">
                    {image.published ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 text-nowrap">
                        منتشر شده
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 text-nowrap">
                        پیش‌نویس
                      </span>
                    )}
                  </td>
                  <td className="text-dark font-estedad-light text-nowrap">
                    {formatJalali(new Date(image.createdAt || new Date()))}
                  </td>
                  <td className="">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          navigate(
                            `/admin/gallery-management/edit/${image.id}`
                          );
                        }}
                        className="p-1.5 rounded-full text-secondary bg-secondary/20 hover:bg-secondary hover:text-white transition"
                        title="ویرایش"
                      >
                        <i className="far fa-edit"></i>
                      </button>
                      <button
                        onClick={() =>
                          onDeleteClick(
                            image.id,
                            image.title || "تصویر بدون عنوان"
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

export default GalleryManagementTable;
