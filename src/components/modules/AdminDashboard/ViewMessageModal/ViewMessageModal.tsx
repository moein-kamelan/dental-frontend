import React, { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { formatJalali } from "../../../../utils/helpers";
import type { ContactMessage } from "../../../../types/types";

interface ViewMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: ContactMessage | null;
}

function ViewMessageModal({ isOpen, onClose, message }: ViewMessageModalProps) {
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

  return (
    <AnimatePresence mode="wait">
      {isOpen && message && (
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
            <div className="bg-linear-to-r from-purple-400 via-purple-500 to-purple-600 px-6 py-4 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <i className="far fa-envelope text-white text-xl"></i>
                  </div>
                  <h3 className="text-xl font-estedad-semibold text-white">
                    مشاهده پیام
                  </h3>
                </div>
                <motion.button
                  onClick={onClose}
                  className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 hover:border-white/40 flex items-center justify-center transition-all duration-200 group"
                  aria-label="بستن"
                >
                  <i className="fa fa-times text-sm text-white/90 group-hover:text-white transition-colors"></i>
                </motion.button>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="px-6 py-6 overflow-y-auto flex-1 admin-modal-scrollbar">
              <div className="space-y-4">
                {/* نام */}
                <div className="border-b border-gray-200 pb-3">
                  <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                    نام فرستنده
                  </label>
                  <p className="text-dark font-estedad-light text-base">
                    {message.name}
                  </p>
                </div>

                {/* ایمیل */}
                {message.email && (
                  <div className="border-b border-gray-200 pb-3">
                    <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                      ایمیل
                    </label>
                    <p className="text-dark font-estedad-light text-base">
                      {message.email}
                    </p>
                  </div>
                )}

                {/* شماره تماس */}
                {message.phoneNumber && (
                  <div className="border-b border-gray-200 pb-3">
                    <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                      شماره تماس
                    </label>
                    <p className="text-dark font-estedad-light text-base">
                      {message.phoneNumber}
                    </p>
                  </div>
                )}

                {/* کلینیک */}
                {message.clinic && (
                  <div className="border-b border-gray-200 pb-3">
                    <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                      کلینیک
                    </label>
                    <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary inline-block">
                      {message.clinic.name}
                    </span>
                  </div>
                )}

                {/* موضوع */}
                {message.subject && (
                  <div className="border-b border-gray-200 pb-3">
                    <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                      موضوع
                    </label>
                    <p className="text-dark font-estedad-light text-base">
                      {message.subject}
                    </p>
                  </div>
                )}

                {/* پیام */}
                <div className="border-b border-gray-200 pb-3">
                  <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                    پیام
                  </label>
                  <p className="text-dark font-estedad-light text-base leading-7 whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>

                {/* تاریخ */}
                <div className="border-b border-gray-200 pb-3">
                  <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                    تاریخ ارسال
                  </label>
                  <p className="text-dark font-estedad-light text-base">
                    {formatJalali(new Date(message.createdAt))}
                  </p>
                </div>

                {/* وضعیت */}
                <div>
                  <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                    وضعیت
                  </label>
                  {message.read ? (
                    <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 inline-block">
                      خوانده شده
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 inline-block">
                      خوانده نشده
                    </span>
                  )}
                </div>
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

export default ViewMessageModal;
