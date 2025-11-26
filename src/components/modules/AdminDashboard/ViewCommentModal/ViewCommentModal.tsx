import React, { useEffect } from "react";
import { formatJalali } from "../../../../utils/helpers";
import type { Comment } from "../../../../types/types";

interface ViewCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  comment: Comment | null;
  commentType: "doctor" | "article" | "service";
}

function ViewCommentModal({
  isOpen,
  onClose,
  comment,
  commentType,
}: ViewCommentModalProps) {
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

  if (!isOpen || !comment) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderStars = (rating: number | null | undefined) => {
    if (!rating) return <span className="text-paragray">-</span>;
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <i
            key={index}
            className={`fas ${
              index < rating
                ? "fa-star text-yellow-400"
                : "fa-star text-gray-300"
            }`}
          ></i>
        ))}
      </div>
    );
  };

  const getCommentTypeLabel = () => {
    switch (commentType) {
      case "doctor":
        return "نظر پزشک";
      case "article":
        return "نظر مقاله";
      case "service":
        return "نظر خدمت";
      default:
        return "نظر";
    }
  };

  const getCommentTypeIcon = () => {
    switch (commentType) {
      case "doctor":
        return "fa-user-md";
      case "article":
        return "fa-newspaper";
      case "service":
        return "fa-handshake";
      default:
        return "fa-comment";
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      {/* Overlay با backdrop blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300" />

      {/* مدال */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-xl shadow-2xl transform transition-all duration-300 scale-100 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <i
                  className={`far ${getCommentTypeIcon()} text-white text-xl`}
                ></i>
              </div>
              <h3 className="text-xl font-estedad-semibold text-white">
                مشاهده {getCommentTypeLabel()}
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
        <div className="px-6 py-6 overflow-y-auto flex-1">
          <div className="space-y-4">
            {/* کاربر */}
            <div className="border-b border-gray-200 pb-3">
              <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                کاربر
              </label>
              <p className="text-dark font-estedad-light text-base">
                {comment.user.firstName} {comment.user.lastName}
              </p>
            </div>

            {/* پزشک / مقاله / خدمت */}
            {commentType === "doctor" && comment.doctor && (
              <div className="border-b border-gray-200 pb-3">
                <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                  پزشک
                </label>
                <p className="text-dark font-estedad-light text-base">
                  دکتر {comment.doctor.firstName} {comment.doctor.lastName}
                </p>
              </div>
            )}

            {commentType === "article" && comment.article && (
              <div className="border-b border-gray-200 pb-3">
                <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                  مقاله
                </label>
                <p className="text-dark font-estedad-light text-base">
                  {comment.article.title}
                </p>
              </div>
            )}

            {commentType === "service" && comment.service && (
              <div className="border-b border-gray-200 pb-3">
                <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                  خدمت
                </label>
                <p className="text-dark font-estedad-light text-base">
                  {comment.service.title}
                </p>
              </div>
            )}

            {/* متن نظر */}
            <div className="border-b border-gray-200 pb-3">
              <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                متن نظر
              </label>
              <p className="text-dark font-estedad-light text-base leading-7 whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>

            {/* امتیاز */}
            {comment.rating && (
              <div className="border-b border-gray-200 pb-3">
                <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                  امتیاز
                </label>
                <div>{renderStars(comment.rating)}</div>
              </div>
            )}

            {/* تاریخ ایجاد */}
            <div className="border-b border-gray-200 pb-3">
              <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                تاریخ ایجاد
              </label>
              <p className="text-dark font-estedad-light text-base">
                {formatJalali(new Date(comment.createdAt))}
              </p>
            </div>

            {/* تاریخ به‌روزرسانی */}
            {comment.updatedAt && comment.updatedAt !== comment.createdAt && (
              <div>
                <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                  تاریخ به‌روزرسانی
                </label>
                <p className="text-dark font-estedad-light text-base">
                  {formatJalali(new Date(comment.updatedAt))}
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
      </div>
    </div>
  );
}

export default ViewCommentModal;
