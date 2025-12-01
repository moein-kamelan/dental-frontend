import TableContainer from "../../../../modules/TableContainer/TableContainer";
import TableSkeleton from "../../../../modules/TableSkeleton/TableSkeleton";
import { formatJalali } from "../../../../../utils/helpers";
import type { HeroSlider } from "../../../../../types/types";
import { useNavigate } from "react-router-dom";

interface BannerManagementTableProps {
  banners: HeroSlider[];
  isLoadingBanners: boolean;
  page: number;
  onDeleteClick: (id: string, title: string) => void;
  onRefetch?: () => void;
  isRefetching?: boolean;
}

function BannerManagementTable({
  banners,
  isLoadingBanners,
  page,
  onDeleteClick,
  onRefetch,
  isRefetching = false,
}: BannerManagementTableProps) {
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
              <th>تصویر</th>
              <th>عنوان</th>
              <th>توضیحات</th>
              <th>دکمه</th>
              <th>ترتیب</th>
              <th>وضعیت</th>
              <th>تاریخ ایجاد</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-main-border-color">
            {isLoadingBanners ? (
              <TableSkeleton rows={5} columns={9} />
            ) : banners.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center p-8 font-estedad-light">
                  بنری یافت نشد
                </td>
              </tr>
            ) : (
              banners.map((banner: HeroSlider, index: number) => (
                <tr
                  key={banner.id}
                  className="hover:bg-purple-400/10 text-dark *:p-4.5"
                >
                  <td className="font-estedad-light text-center">
                    {(page - 1) * 5 + index + 1}
                  </td>
                  <td className="">
                    {banner.image ? (
                      <img
                        src={`http://localhost:4000${banner.image}`}
                        alt={banner.title || "Banner"}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                        <i className="far fa-image text-gray-400"></i>
                      </div>
                    )}
                  </td>
                  <td className="text-dark font-estedad-light">
                    {banner.title || "-"}
                  </td>
                  <td className="text-dark font-estedad-light">
                    <div className="max-w-xs truncate">
                      {banner.description || "-"}
                    </div>
                  </td>
                  <td className="text-dark font-estedad-light">
                    {banner.buttonText ? (
                      <div className="flex flex-col gap-1">
                        <span className="text-xs">{banner.buttonText}</span>
                        {banner.buttonLink && (
                          <span className="text-xs text-paragray truncate max-w-[150px]">
                            {banner.buttonLink}
                          </span>
                        )}
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="text-dark font-estedad-light text-center">
                    {banner.order}
                  </td>
                  <td className="text-dark font-estedad-light">
                    {banner.published ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        منتشر شده
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                        منتشر نشده
                      </span>
                    )}
                  </td>
                  <td className="text-dark font-estedad-light">
                    {banner.createdAt
                      ? formatJalali(new Date(banner.createdAt))
                      : "-"}
                  </td>
                  <td className="">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          navigate(
                            `/admin/banner-management/edit/${banner.id}`
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
                            banner.id,
                            banner.title || "بنر بدون عنوان"
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

export default BannerManagementTable;
