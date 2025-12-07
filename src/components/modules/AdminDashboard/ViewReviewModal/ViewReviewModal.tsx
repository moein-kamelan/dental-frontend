import React, { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { formatJalali } from "../../../../utils/helpers";
import type { Review } from "../../../../types/types";

interface ViewReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: Review | null;
}

function ViewReviewModal({
  isOpen,
  onClose,
  review,
}: ViewReviewModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <i className="fas fa-star text-yellow-400" key={i}></i>
        ))}
        {Array.from({ length: 5 - rating }).map((_, i) => (
          <i className="fas fa-star text-gray-300" key={i}></i>
        ))}
      </div>
    );
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && review && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Overlay با backdrop blur */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* مدال */}
          <motion.div
            className="relative z-10 w-full max-w-2xl bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.3,
            }}
          >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <i className="fas fa-star text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-estedad-semibold text-white">
                مشاهده نظر
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="بستن"
            >
              <i className="fa fa-times text-white"></i>
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="px-6 py-6 overflow-y-auto flex-1 admin-modal-scrollbar">
          <div className="space-y-4">
            {/* نام و تصویر پروفایل */}
            <div className="border-b border-gray-200 pb-3">
              <label className="text-sm font-estedad-semibold text-gray-500 block mb-2">
                نام
              </label>
              <div className="flex items-center gap-3">
                {review.profileImage ? (
                  <img
                    src={`${review.profileImage}`}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <i className="far fa-user text-gray-400 text-2xl"></i>
                  </div>
                )}
                <p className="text-dark font-estedad-light text-base">
                  {review.name}
                </p>
              </div>
            </div>

            {/* متن نظر */}
            <div className="border-b border-gray-200 pb-3">
              <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                متن نظر
              </label>
              <p className="text-dark font-estedad-light text-base leading-7 whitespace-pre-wrap">
                {review.content}
              </p>
            </div>

            {/* امتیاز */}
            <div className="border-b border-gray-200 pb-3">
              <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                امتیاز
              </label>
              <div>{renderStars(review.rating)}</div>
            </div>

            {/* وضعیت */}
            <div className="border-b border-gray-200 pb-3">
              <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                وضعیت
              </label>
              {review.published ? (
                <span className="px-3 py-1.5 text-sm rounded-full bg-green-100 text-green-700 font-estedad-medium">
                  منتشر شده
                </span>
              ) : (
                <span className="px-3 py-1.5 text-sm rounded-full bg-yellow-100 text-yellow-700 font-estedad-medium">
                  در انتظار تایید
                </span>
              )}
            </div>

            {/* ترتیب */}
            <div className="border-b border-gray-200 pb-3">
              <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                ترتیب
              </label>
              <p className="text-dark font-estedad-light text-base">
                {review.order}
              </p>
            </div>

            {/* تاریخ ایجاد */}
            <div className="border-b border-gray-200 pb-3">
              <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                تاریخ ایجاد
              </label>
              <p className="text-dark font-estedad-light text-base">
                {formatJalali(new Date(review.createdAt))}
              </p>
            </div>

            {/* تاریخ به‌روزرسانی */}
            {review.updatedAt &&
              review.updatedAt !== review.createdAt && (
                <div className="border-b border-gray-200 pb-3">
                  <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                    تاریخ به‌روزرسانی
                  </label>
                  <p className="text-dark font-estedad-light text-base">
                    {formatJalali(new Date(review.updatedAt))}
                  </p>
                </div>
              )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <div className="flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-estedad-semibold transition-colors"
            >
              بستن
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ViewReviewModal;

