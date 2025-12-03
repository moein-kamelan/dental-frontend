import TableContainer from "../../../../../components/modules/TableContainer/TableContainer";
import TableSkeleton from "../../../../../components/modules/TableSkeleton/TableSkeleton";
import { formatJalali } from "../../../../../utils/helpers";
import type { ContactMessage } from "../../../../../types/types";

interface ContactUsManagementTableProps {
  messages: ContactMessage[];
  isLoadingMessages: boolean;
  page: number;
  onDeleteClick: (id: string, name: string) => void;
  onMarkAsRead: (id: string) => void;
  onMarkAsUnread: (id: string) => void;
  onMessageClick: (message: ContactMessage) => void;
  onRefetch?: () => void;
  isRefetching?: boolean;
}

function ContactUsManagementTable({
  messages,
  isLoadingMessages,
  page,
  onDeleteClick,
  onMarkAsRead,
  onMarkAsUnread,
  onMessageClick,
  onRefetch,
  isRefetching = false,
}: ContactUsManagementTableProps) {
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
              <th>نام</th>
              <th>ایمیل</th>
              <th>شماره تماس</th>
              <th>موضوع</th>
              <th>پیام</th>
              <th>کلینیک</th>
              <th>وضعیت</th>
              <th>تاریخ ایجاد</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-main-border-color">
            {isLoadingMessages ? (
              <TableSkeleton rows={5} columns={10} />
            ) : messages.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center p-8 font-estedad-light">
                  پیامی یافت نشد
                </td>
              </tr>
            ) : (
              messages.map((message: ContactMessage, index: number) => (
                <tr
                  key={message.id}
                  className={`text-dark *:p-4.5 ${
                    !message.read
                      ? "bg-blue-100 hover:bg-blue-200"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <td className="font-estedad-light text-center">
                    {(page - 1) * 5 + index + 1}
                  </td>
                  <td className="">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <i className="far fa-user text-primary"></i>
                      </div>
                      <div>
                        <p className="font-estedad-light line-clamp-2 max-w-[300px] min-w-[220px]">{message.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-dark font-estedad-light">
                    {message.email || <span className="text-paragray">-</span>}
                  </td>
                  <td className="text-dark font-estedad-light">
                    {message.phoneNumber || (
                      <span className="text-paragray">-</span>
                    )}
                  </td>
                  <td className="text-dark font-estedad-light">
                    {message.subject ? (
                      <span className="line-clamp-2 max-w-[200px] min-w-[200px]">
                        {message.subject}
                      </span>
                    ) : (
                      <span className="text-paragray">-</span>
                    )}
                  </td>
                  <td className="text-dark font-estedad-light">
                    <button
                      onClick={() => onMessageClick(message)}
                      className="line-clamp-2 max-w-[200px] text-right hover:text-primary transition-colors cursor-pointer"
                      title="کلیک برای مشاهده کامل پیام"
                    >
                      {message.message}
                    </button>
                  </td>
                  <td className="text-dark font-estedad-light">
                    {message.clinic ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                        {message.clinic.name}
                      </span>
                    ) : (
                      <span className="text-paragray">-</span>
                    )}
                  </td>
                  <td className="text-dark font-estedad-light">
                    {message.read ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 text-nowrap">
                        خوانده شده
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 text-nowrap">
                        خوانده نشده
                      </span>
                    )}
                  </td>
                  <td className="text-dark font-estedad-light">
                    {formatJalali(new Date(message.createdAt))}
                  </td>
                  <td className="">
                    <div className="flex items-center  gap-2">
                      {message.read ? (
                        <button
                          onClick={() => onMarkAsUnread(message.id)}
                          className="p-1.5 rounded-full text-blue-500 bg-blue-500/20 hover:bg-blue-500 hover:text-white transition"
                          title="علامت‌گذاری به عنوان خوانده نشده"
                        >
                          <i className="far fa-envelope"></i>
                        </button>
                      ) : (
                        <button
                          onClick={() => onMarkAsRead(message.id)}
                          className="p-1.5 rounded-full text-green-500 bg-green-500/20 hover:bg-green-500 hover:text-white transition"
                          title="علامت‌گذاری به عنوان خوانده شده"
                        >
                          <i className="far fa-envelope-open"></i>
                        </button>
                      )}
                      <button
                        onClick={() => onDeleteClick(message.id, message.name)}
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

export default ContactUsManagementTable;
