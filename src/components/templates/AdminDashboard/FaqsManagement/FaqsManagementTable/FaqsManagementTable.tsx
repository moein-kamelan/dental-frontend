import TableContainer from "../../../../modules/TableContainer/TableContainer";
import TableSkeleton from "../../../../modules/TableSkeleton/TableSkeleton";
import { formatJalali } from "../../../../../utils/helpers";
import { useNavigate } from "react-router-dom";

interface Faq {
  id: string;
  question: string;
  answer: string;
  order: number;
  published: boolean;
  createdAt: string;
}

interface FaqsManagementTableProps {
  faqs: Faq[];
  isLoadingFaqs: boolean;
  page: number;
  onDeleteClick: (id: string, question: string) => void;
}

function FaqsManagementTable({
  faqs,
  isLoadingFaqs,
  page,
  onDeleteClick,
}: FaqsManagementTableProps) {
  const navigate = useNavigate();
  return (
    <TableContainer withBg withMargin>
      <table className="w-full ">
        <thead className="border-b border-main-border-color ">
          <tr className="*:text-right *:p-4.5 ">
            <th>ردیف</th>
            <th>سوال</th>
            <th>پاسخ</th>
            <th>ترتیب</th>
            <th>وضعیت</th>
            <th>تاریخ ایجاد</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-main-border-color">
          {isLoadingFaqs ? (
            <TableSkeleton rows={5} columns={7} />
          ) : faqs.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center p-8 font-estedad-light">
                سوالی یافت نشد
              </td>
            </tr>
          ) : (
            faqs.map((faq: Faq, index: number) => (
              <tr
                key={faq.id}
                className="hover:bg-purple-400/10 text-dark *:p-4.5"
              >
                <td className="font-estedad-light text-center">
                  {(page - 1) * 5 + index + 1}
                </td>
                <td className="">
                  <p className="font-estedad-light line-clamp-2">
                    {faq.question}
                  </p>
                </td>
                <td className="text-dark font-estedad-light">
                  <span className="line-clamp-2">
                    {faq.answer.substring(0, 80)}
                    {faq.answer.length > 80 ? "..." : ""}
                  </span>
                </td>
                <td className="text-dark font-estedad-light text-center">
                  {faq.order}
                </td>
                <td className="text-dark font-estedad-light">
                  {faq.published ? (
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
                  {formatJalali(new Date(faq.createdAt || new Date()))}
                </td>
                <td className="">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigate(
                          `/admin-dashboard/faqs-management/edit/${faq.id}`
                        );
                      }}
                      className="p-1.5 rounded-full text-secondary bg-secondary/20 hover:bg-secondary hover:text-white transition"
                      title="ویرایش"
                    >
                      <i className="far fa-edit"></i>
                    </button>
                    <button
                      onClick={() => onDeleteClick(faq.id, faq.question)}
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

export default FaqsManagementTable;

