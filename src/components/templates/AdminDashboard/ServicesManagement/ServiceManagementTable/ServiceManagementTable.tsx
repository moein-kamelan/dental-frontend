import TableContainer from "../../../../modules/TableContainer/TableContainer";
import TableSkeleton from "../../../../modules/TableSkeleton/TableSkeleton";
import { formatJalali } from "../../../../../utils/helpers";
import type { Service } from "../../../../../types/types";
import { useNavigate } from "react-router-dom";

interface ServiceManagementTableProps {
  services: Service[];
  isLoadingServices: boolean;
  page: number;
  onDeleteClick: (id: string, title: string) => void;
}

function ServiceManagementTable({
  services,
  isLoadingServices,
  page,
  onDeleteClick,
}: ServiceManagementTableProps) {
  const navigate = useNavigate();
  return (
    <TableContainer withBg withMargin>
      <table className="w-full ">
        <thead className="border-b border-main-border-color ">
          <tr className="*:text-right *:p-4.5 ">
            <th>ردیف</th>
            <th>خدمت</th>
            <th>توضیحات</th>
            <th>دسته‌بندی‌ها</th>
            <th>قیمت</th>
            <th>مدت زمان</th>
            <th>تاریخ ایجاد</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-main-border-color">
          {isLoadingServices ? (
            <TableSkeleton rows={5} columns={8} />
          ) : services.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center p-8 font-estedad-light">
                خدمتی یافت نشد
              </td>
            </tr>
          ) : (
            services.map((service: Service, index: number) => (
              <tr
                key={service.id}
                className="hover:bg-purple-400/10 text-dark *:p-4.5"
              >
                <td className="font-estedad-light text-center">
                  {(page - 1) * 5 + index + 1}
                </td>
                <td className="">
                  <div className="flex items-center gap-3">
                    {service.coverImage ? (
                      <img
                        src={`http://localhost:4000${service.coverImage}`}
                        alt={service.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                        <i className="far fa-file-alt text-gray-400"></i>
                      </div>
                    )}
                    <div>
                      <p className="font-estedad-light">{service.title}</p>
                      <span className="text-xs font-estedad-light text-paragray line-clamp-1">
                        {service.slug}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="text-dark font-estedad-light">
                  {service.description ? (
                    <span className="line-clamp-2">
                      {service.description.substring(0, 50)}
                      {service.description.length > 50 ? "..." : ""}
                    </span>
                  ) : (
                    <span className="text-paragray">-</span>
                  )}
                </td>
                <td className="text-dark font-estedad-light">
                  {service.categories && service.categories.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {service.categories.slice(0, 2).map((category) => (
                        <span
                          key={category.id}
                          className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                        >
                          {category.name}
                        </span>
                      ))}
                      {service.categories.length > 2 && (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                          +{service.categories.length - 2}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-paragray">-</span>
                  )}
                </td>
                <td className="text-dark font-estedad-light">
                  {service.price ? (
                    <span>
                      {new Intl.NumberFormat("fa-IR").format(service.price)}{" "}
                      تومان
                    </span>
                  ) : (
                    <span className="text-paragray">-</span>
                  )}
                </td>
                <td className="text-dark font-estedad-light">
                  {service.durationMinutes ? (
                    <span>{service.durationMinutes} دقیقه</span>
                  ) : (
                    <span className="text-paragray">-</span>
                  )}
                </td>
                <td className="text-dark font-estedad-light">
                  {formatJalali(new Date(service.createdAt || new Date()))}
                </td>
                <td className="">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigate(
                          `/admin-dashboard/services-management/edit/${service.id}`
                        );
                      }}
                      className="p-1.5 rounded-full text-secondary bg-secondary/20 hover:bg-secondary hover:text-white transition"
                      title="ویرایش"
                    >
                      <i className="far fa-edit"></i>
                    </button>
                    <button
                      onClick={() => onDeleteClick(service.id, service.title)}
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

export default ServiceManagementTable;
