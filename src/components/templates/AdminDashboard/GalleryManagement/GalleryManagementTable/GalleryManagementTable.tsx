import TableContainer from "../../../../modules/TableContainer/TableContainer";
import TableSkeleton from "../../../../modules/TableSkeleton/TableSkeleton";
import { formatJalali } from "../../../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import type { Gallery } from "../../../../../types/types";

interface GalleryManagementTableProps {
  images: Gallery[];
  isLoadingImages: boolean;
  page: number;
  onDeleteClick: (id: string, title: string) => void;
}

function GalleryManagementTable({
  images,
  isLoadingImages,
  page,
  onDeleteClick,
}: GalleryManagementTableProps) {
  const navigate = useNavigate();
  return (
    <TableContainer withBg withMargin>
      <table className="w-full ">
        <thead className="border-b border-main-border-color ">
          <tr className="*:text-right *:p-4.5 ">
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
                  <div className="flex items-center justify-center">
                    {image.image ? (
                      <img
                        src={`http://localhost:4000${image.image}`}
                        alt={image.title || "تصویر گالری"}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                        <i className="far fa-image text-gray-400 text-2xl"></i>
                      </div>
                    )}
                  </div>
                </td>
                <td className="">
                  <p className="font-estedad-light">
                    {image.title || "-"}
                  </p>
                </td>
                <td className="text-dark font-estedad-light">
                  {image.description ? (
                    <span className="line-clamp-2">
                      {image.description.substring(0, 50)}
                      {image.description.length > 50 ? "..." : ""}
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
                  {formatJalali(new Date(image.createdAt || new Date()))}
                </td>
                <td className="">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigate(
                          `/admin-dashboard/gallery-management/edit/${image.id}`
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
  );
}

export default GalleryManagementTable;

