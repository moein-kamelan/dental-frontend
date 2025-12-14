import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface MainPaginationProps {
  meta?: PaginationMeta;
  onPageChange?: (page: number) => void;
}

function MainPagination({ meta, onPageChange }: MainPaginationProps) {
  const [pageInput, setPageInput] = useState("");

  // همگام‌سازی input با صفحه فعلی
  useEffect(() => {
    if (meta?.page) {
      setPageInput(meta.page.toString());
    }
  }, [meta?.page]);

  // اگر meta وجود نداشت، چیزی نمایش نده
  if (!meta) return null;

  const { hasNextPage, hasPrevPage, page, totalPages, total } = meta;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange?.(newPage);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // فقط اعداد مجاز هستند
    if (value === "" || /^\d+$/.test(value)) {
      setPageInput(value);
    }
  };

  const handleInputSubmit = (e: FormEvent) => {
    e.preventDefault();
    const pageNumber = parseInt(pageInput, 10);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      handlePageChange(pageNumber);
    } else {
      // اگر شماره صفحه نامعتبر بود، به صفحه فعلی برگرد
      setPageInput(page.toString());
    }
  };

  const handleInputBlur = () => {
    // اگر input خالی یا نامعتبر بود، به صفحه فعلی برگرد
    const pageNumber = parseInt(pageInput, 10);
    if (!pageNumber || pageNumber < 1 || pageNumber > totalPages) {
      setPageInput(page.toString());
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
      {/* اطلاعات صفحه */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>
          نمایش {(page - 1) * meta.limit + 1} تا{" "}
          {Math.min(page * meta.limit, total)} از {total} مورد
        </span>
      </div>

      {/* کنترل‌های صفحه‌بندی */}
      <div className="flex justify-center gap-2 items-center">
        {/* دکمه صفحه قبل */}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={!hasPrevPage}
          className={`px-4 py-2 rounded-lg transition-colors ${
            hasPrevPage
              ? "bg-secondary text-white hover:opacity-90"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          aria-label="صفحه قبل"
        >
          «
        </button>

        {/* دکمه صفحه قبلی (اگر وجود داشته باشد) */}
        {page > 1 && (
          <button
            onClick={() => handlePageChange(page - 1)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {page - 1}
          </button>
        )}

        {/* صفحه فعلی */}
        <button
          className="px-4 py-2 bg-primary text-white rounded-lg cursor-default"
          disabled
        >
          {page}
        </button>

        {/* دکمه صفحه بعدی (اگر وجود داشته باشد) */}
        {page < totalPages && (
          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {page + 1}
          </button>
        )}

        {/* دکمه صفحه بعد */}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={!hasNextPage}
          className={`px-4 py-2 rounded-lg transition-colors ${
            hasNextPage
              ? "bg-secondary text-white hover:opacity-90"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          aria-label="صفحه بعد"
        >
          »
        </button>

        {/* Input برای جابه‌جایی سریع */}
        <form
          onSubmit={handleInputSubmit}
          className="flex items-center gap-2 mr-4"
        >
          <span className="text-sm text-gray-600">برو به:</span>
          <input
            type="text"
            value={pageInput}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="w-16 px-2 py-1.5 text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary text-dark"
            placeholder={page.toString()}
            min="1"
            max={totalPages}
          />
          <span className="text-sm text-gray-600">از {totalPages}</span>
        </form>
      </div>
    </div>
  );
}

export default MainPagination;
