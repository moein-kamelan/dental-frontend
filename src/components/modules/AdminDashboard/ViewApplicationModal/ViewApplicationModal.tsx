import React, { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { formatJalali } from "../../../../utils/helpers";
import { backendBaseUrl } from "../../../../utils/axios";
import type { DoctorApplication } from "../../../../types/types";

interface ViewApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: DoctorApplication | null;
}

function ViewApplicationModal({
  isOpen,
  onClose,
  application,
}: ViewApplicationModalProps) {
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

  // Parse documents if they exist
  let documentPaths: string[] = [];
  if (application?.documents) {
    try {
      documentPaths = JSON.parse(application.documents);
    } catch (error) {
      console.error("Error parsing documents:", error);
    }
  }

  const baseURL = backendBaseUrl;

  const buildDocumentUrl = (path: string) => {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;

    if (baseURL) {
      const normalizedPath = path.startsWith("/") ? path : `/${path}`;
      return `${baseURL}${normalizedPath}`;
    }

    return path;
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && application && (
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
                <i className="far fa-user-md text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-estedad-semibold text-white">
                مشاهده درخواست همکاری
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
            {/* نام و نام خانوادگی */}
            <div className="border-b border-gray-200 pb-3">
              <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                نام و نام خانوادگی
              </label>
              <p className="text-dark font-estedad-light text-base">
                {application.firstName} {application.lastName}
              </p>
            </div>

            {/* ایمیل */}
            {application.email && (
              <div className="border-b border-gray-200 pb-3">
                <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                  ایمیل
                </label>
                <p className="text-dark font-estedad-light text-base">
                  {application.email}
                </p>
              </div>
            )}

            {/* شماره تماس */}
            <div className="border-b border-gray-200 pb-3">
              <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                شماره تماس
              </label>
              <p className="text-dark font-estedad-light text-base">
                {application.phoneNumber}
              </p>
            </div>

            {/* کلینیک */}
            {application.clinic && (
              <div className="border-b border-gray-200 pb-3">
                <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                  کلینیک
                </label>
                <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary inline-block">
                  {application.clinic.name}
                </span>
              </div>
            )}

            {/* اطلاعات متقاضی */}
            <div className="border-b border-gray-200 pb-3">
              <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                اطلاعات متقاضی
              </label>
              <p className="text-dark font-estedad-light text-base leading-7 whitespace-pre-wrap">
                {application.doctorInfo}
              </p>
            </div>

            {/* مدارک */}
            {documentPaths.length > 0 && (
              <div className="border-b border-gray-200 pb-3">
                <label className="text-sm font-estedad-semibold text-gray-500 block mb-2">
                  مدارک ارسال شده
                </label>
                <div className="flex flex-wrap gap-2">
                  {documentPaths.map((docPath, index) => {
                    const fullUrl = buildDocumentUrl(docPath);
                    const fileName = docPath.split("/").pop() || `مدرک ${index + 1}`;
                    const isImage = /\.(jpg|jpeg|png|gif)$/i.test(docPath);
                    const isPdf = /\.pdf$/i.test(docPath);

                    return (
                      <a
                        key={index}
                        href={fullUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
                      >
                        {isImage ? (
                          <i className="far fa-image"></i>
                        ) : isPdf ? (
                          <i className="far fa-file-pdf"></i>
                        ) : (
                          <i className="far fa-file"></i>
                        )}
                        <span className="text-sm">{fileName}</span>
                        <i className="far fa-external-link-alt text-xs"></i>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* تاریخ */}
            <div className="border-b border-gray-200 pb-3">
              <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                تاریخ ارسال
              </label>
              <p className="text-dark font-estedad-light text-base">
                {formatJalali(new Date(application.createdAt))}
              </p>
            </div>

            {/* وضعیت */}
            <div>
              <label className="text-sm font-estedad-semibold text-gray-500 block mb-1">
                وضعیت
              </label>
              {application.read ? (
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

export default ViewApplicationModal;

