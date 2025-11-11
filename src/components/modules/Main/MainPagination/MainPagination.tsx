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
  // اگر meta وجود نداشت، چیزی نمایش نده
  if (!meta) return null;

  const { hasNextPage, hasPrevPage, page, totalPages } = meta;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange?.(newPage);
    }
  };

  return (
    <div className="flex justify-center mt-12 gap-2 items-center">
      {/* دکمه صفحه قبل */}
      {hasPrevPage && (
        <button
          onClick={() => handlePageChange(page - 1)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-deepblue transition-colors"
          aria-label="صفحه قبل"
        >
          «
        </button>
      )}

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
      {hasNextPage && (
        <button
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-deepblue transition-colors"
          aria-label="صفحه بعد"
        >
          »
        </button>
      )}

      {/* نمایش اطلاعات صفحه */}
      <span className="mr-4 text-sm text-gray-600">
        صفحه {page} از {totalPages}
      </span>
    </div>
  );
}

export default MainPagination;
