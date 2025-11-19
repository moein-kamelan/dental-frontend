import React, { useEffect } from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "حذف آیتم",
  message = "آیا از حذف این آیتم اطمینان دارید؟ این عمل غیرقابل بازگشت است.",
  confirmText = "حذف",
  cancelText = "انصراف",
  isLoading = false,
}: DeleteModalProps) {
  // بستن با کلید Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // جلوگیری از اسکرول body وقتی مدال باز است
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, isLoading]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (!isLoading) {
      onConfirm();
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
      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-2xl transform transition-all duration-300 scale-100">
        {/* Header با gradient purple */}
        <div className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 px-6 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <i className="fa fa-exclamation-triangle text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-estedad-semibold text-white">
                {title}
              </h3>
            </div>
            {!isLoading && (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                aria-label="بستن"
              >
                <i className="fa fa-times text-white"></i>
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <p className="text-dark font-estedad-light text-base leading-7 mb-6">
            {message}
          </p>

          {/* دکمه‌ها */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-dark rounded-lg font-estedad-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-estedad-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="btn-loader"></div>
                  <span>در حال حذف...</span>
                </>
              ) : (
                <>
                  <i className="far fa-trash-alt"></i>
                  <span>{confirmText}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
