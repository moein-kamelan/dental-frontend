import React from "react";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

function TableSkeleton({ rows = 5, columns = 8 }: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="hover:bg-[#d4af370f] *:p-4.5">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="font-estedad-light">
              {colIndex === 1 ? (
                // ستون پزشک - با تصویر و متن
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
                  </div>
                </div>
              ) : colIndex === 4 || colIndex === 5 ? (
                // ستون‌های کلینیک‌ها و تخصص‌ها - با تگ‌ها
                <div className="flex flex-wrap gap-1">
                  <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
                  <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20"></div>
                  {rowIndex % 2 === 0 && (
                    <div className="h-6 bg-gray-200 rounded-full animate-pulse w-12"></div>
                  )}
                </div>
              ) : colIndex === 7 ? (
                // ستون عملیات - با دکمه‌ها
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                </div>
              ) : (
                // سایر ستون‌ها - متن ساده
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default TableSkeleton;

