import React, { useState, useEffect } from "react";

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface AdminPaginationProps {
  meta?: PaginationMeta;
  onPageChange?: (page: number) => void;
}

function AdminPagination({ meta, onPageChange }: AdminPaginationProps) {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // فقط اعداد مجاز هستند
    if (value === "" || /^\d+$/.test(value)) {
      setPageInput(value);
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
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
    <div className="flex flex-col sm:flex-row justify-center w-fit mx-auto items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-purple-200">
      {/* اطلاعات صفحه */}
      <div className="flex items-center gap-2 text-sm font-estedad-light text-dark">
        <span>
          نمایش {((page - 1) * meta.limit) + 1} تا{" "}
          {Math.min(page * meta.limit, total)} از {total} مورد
        </span>
      </div>

      {/* کنترل‌های صفحه‌بندی */}
      <div className="flex items-center flex-wrap justify-center gap-x-2 gap-y-4">
        {/* دکمه صفحه قبل */}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={!hasPrevPage}
          className={`px-3 py-2 rounded-lg transition-colors font-estedad-light ${
            hasPrevPage
              ? "bg-purple-500 text-white hover:bg-purple-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          aria-label="صفحه قبل"
        >
          <i className="fa fa-chevron-right"></i>
        </button>

        {/* دکمه صفحه قبلی (اگر وجود داشته باشد) */}
        {page > 1 && (
          <button
            onClick={() => handlePageChange(page - 1)}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-estedad-light text-dark"
          >
            {page - 1}
          </button>
        )}

        {/* صفحه فعلی */}
        <button
          className="px-3 py-2 bg-purple-500 text-white rounded-lg cursor-default font-estedad-light"
          disabled
        >
          {page}
        </button>

        {/* دکمه صفحه بعدی (اگر وجود داشته باشد) */}
        {page < totalPages && (
          <button
            onClick={() => handlePageChange(page + 1)}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-estedad-light text-dark"
          >
            {page + 1}
          </button>
        )}

        {/* دکمه صفحه بعد */}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={!hasNextPage}
          className={`px-3 py-2 rounded-lg transition-colors font-estedad-light ${
            hasNextPage
              ? "bg-purple-500 text-white hover:bg-purple-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          aria-label="صفحه بعد"
        >
          <i className="fa fa-chevron-left"></i>
        </button>

        {/* Input برای جابه‌جایی سریع */}
        <form onSubmit={handleInputSubmit} className="flex items-center gap-2 mr-2">
          <span className="text-sm font-estedad-light text-dark">برو به:</span>
          <input
            type="text"
            value={pageInput}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="w-16 px-2 py-1.5 text-center border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500 font-estedad-light text-dark"
            placeholder={page.toString()}
            min="1"
            max={totalPages}
          />
          <span className="text-sm font-estedad-light text-gray-500">
            از {totalPages}
          </span>
        </form>
      </div>
    </div>
  );
}

export default AdminPagination;

