import React, { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

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

  // تعیین آیکون و رنگ بر اساس نوع عملیات
  const getActionConfig = () => {
    const confirmLower = confirmText.toLowerCase();

    if (confirmLower.includes("حذف") || confirmLower.includes("delete")) {
      return {
        icon: "fa-trash",
        bgColor: "bg-red-500",
        hoverColor: "hover:bg-red-600",
        loadingText: "در حال حذف...",
      };
    } else if (
      confirmLower.includes("تایید") ||
      confirmLower.includes("confirm") ||
      confirmLower.includes("accept")
    ) {
      return {
        icon: "fa-check",
        bgColor: "bg-green-500",
        hoverColor: "hover:bg-green-600",
        loadingText: "در حال تایید...",
      };
    } else if (
      confirmLower.includes("لغو") ||
      confirmLower.includes("cancel")
    ) {
      return {
        icon: "fa-times",
        bgColor: "bg-gray-500",
        hoverColor: "hover:bg-gray-600",
        loadingText: "در حال لغو...",
      };
    }
    // پیش‌فرض برای سایر موارد
    return {
      icon: "fa-check",
      bgColor: "bg-primary",
      hoverColor: "hover:bg-primary/90",
      loadingText: "در حال پردازش...",
    };
  };

  const actionConfig = getActionConfig();

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
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
            className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-2xl"
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
                  <motion.button
                    onClick={onClose}
                    className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 hover:border-white/40 flex items-center justify-center transition-all duration-200 group"
                    aria-label="بستن"
                  >
                    <i className="fa fa-times text-sm text-white/90 group-hover:text-white transition-colors"></i>
                  </motion.button>
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
                  className={`px-6 py-2.5 ${actionConfig.bgColor} ${actionConfig.hoverColor} text-white rounded-lg font-estedad-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
                >
                  {isLoading ? (
                    <>
                      <div className="btn-loader"></div>
                      <span>{actionConfig.loadingText}</span>
                    </>
                  ) : (
                    <>
                      <i className={`fa ${actionConfig.icon}`}></i>
                      <span>{confirmText}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DeleteModal;
