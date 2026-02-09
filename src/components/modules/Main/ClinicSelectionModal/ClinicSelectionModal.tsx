import React, { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useGetAllClinics } from "../../../../services/useClinics";
import { ClinicSelectionStep } from "../AppointmentModal/ClinicSelectionStep";
import { useClinicSelection } from "../../../../contexts/useClinicSelection";
import type { Clinic } from "../../../../types/types";

function ClinicSelectionModal() {
  const { isModalOpen, closeModal, selectClinic, selectedClinic } =
    useClinicSelection();
  const { data: clinicsData, isLoading } = useGetAllClinics(1, 100);
  const clinics: Clinic[] = clinicsData?.data?.clinics || [];

  useEffect(() => {
    if (!isModalOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen, closeModal]);

  const handleSelectClinic = (clinic: Clinic) => {
    selectClinic(clinic);
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-4 bg-gradient-to-r from-primary/10 via-white to-accent/10">
              <div>
                <p className="text-sm text-gray-500">انتخاب کلینیک</p>
                <h2 className="text-xl font-iran-sans-bold text-dark">
                  لطفاً کلینیک مدنظر خود را انتخاب کنید
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {selectedClinic && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-sm text-accent border border-accent/20">
                    <i className="fas fa-check-circle" />
                    <span>کلینیک فعلی: {selectedClinic.name}</span>
                  </span>
                )}
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-dark transition"
                  aria-label="بستن"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <ClinicSelectionStep
                clinics={clinics}
                isLoading={isLoading}
                onSelectClinic={handleSelectClinic}
              />

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <i className="fas fa-info-circle text-accent" />
                  <span>
                    با انتخاب کلینیک، پزشکان و نوبت‌ها بر اساس همان کلینیک نمایش داده می‌شود.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-sm font-estedad-semibold text-gray-600 hover:text-dark transition"
                >
                  بعداً انتخاب می‌کنم
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ClinicSelectionModal;
