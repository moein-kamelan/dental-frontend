import React, { useEffect, useState } from "react";
import { useAppointmentModal } from "../../../../contexts/useAppointmentModal";
import { AnimatePresence, motion } from "motion/react";
import { useGetAllClinics } from "../../../../services/useClinics";
import { useGetDoctorsByClinic } from "../../../../services/useDoctors";
import type { Clinic, Doctor } from "../../../../types/types";
import { getImageUrl } from "../../../../utils/helpers";

type Step = "clinic" | "doctor";

function AppointmentModal() {
  const { isOpen, closeModal } = useAppointmentModal();
  const [currentStep, setCurrentStep] = useState<Step>("clinic");
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const { data: clinicsData, isLoading: isClinicsLoading } = useGetAllClinics(
    1,
    100
  );
  const { data: doctorsData, isLoading: isDoctorsLoading } =
    useGetDoctorsByClinic(selectedClinic?.id || null);

  const clinics: Clinic[] = clinicsData?.data?.clinics || [];
  const doctors: Doctor[] = doctorsData?.data?.doctors || [];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
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
  }, [isOpen, closeModal]);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setCurrentStep("clinic");
      setSelectedClinic(null);
      setSelectedDoctor(null);
    }
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    closeModal();
  };

  const handleBack = () => {
    if (currentStep === "doctor") {
      setCurrentStep("clinic");
      setSelectedDoctor(null);
    } else {
      handleClose();
    }
  };

  const handleClinicSelect = (clinic: Clinic) => {
    setSelectedClinic(clinic);
    setCurrentStep("doctor");
  };

  const handleDoctorSelect = (doctor: Doctor | null) => {
    setSelectedDoctor(doctor);
    // در اینجا می‌توانیم به مرحله بعدی برویم (که فعلاً پیاده‌سازی نشده)
    // برای حالا فقط می‌بندیم یا می‌مانیم
  };

  const handleContinue = () => {
    // در مرحله بعدی اینجا به مرحله تعیین تاریخ و زمان می‌رویم
    // فعلاً فقط می‌بندیم
    handleClose();
  };

  return (
    <AnimatePresence mode="sync">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.15,
            ease: "easeOut",
          }}
        >
          {/* Overlay با backdrop blur */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.15,
              ease: "easeOut",
            }}
          />

          {/* مدال */}
          <motion.div
            className="relative z-10 w-full max-w-md bg-gray-100 ring-2 border-dark rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto auth-modal-scrollbar scroll-smooth"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 0.8,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* دکمه بستن */}
            <motion.button
              onClick={handleClose}
              className="absolute top-4 right-6 z-20 flex items-center justify-center rounded-full size-10 bg-accent hover:bg-secondary transition-colors"
              aria-label="بستن"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
            >
              <i className="fas fa-times text-2xl text-white"></i>
            </motion.button>

            {/* محتوای مدال */}
            <div className="p-6 pt-16">
              {/* دکمه بازگشت */}
              {currentStep !== "clinic" && (
                <button
                  onClick={handleBack}
                  className="mb-4 flex items-center gap-2 text-dark hover:text-accent transition-colors"
                >
                  <i className="fas fa-arrow-right"></i>
                  <span>بازگشت</span>
                </button>
              )}

              {/* مرحله انتخاب کلینیک */}
              {currentStep === "clinic" && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <h2 className="text-2xl font-iran-sans-bold text-dark mb-6 text-center">
                    انتخاب کلینیک
                  </h2>

                  {isClinicsLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-20 bg-gray-200 animate-pulse rounded-lg"
                        />
                      ))}
                    </div>
                  ) : clinics.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      کلینیکی یافت نشد
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {clinics.map((clinic) => (
                        <button
                          key={clinic.id}
                          onClick={() => handleClinicSelect(clinic)}
                          className="w-full p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-accent transition-all text-right hover:shadow-md active:scale-[0.98]"
                        >
                          <h3 className="font-iran-sans-bold text-dark text-lg mb-1">
                            {clinic.name}
                          </h3>
                          {clinic.address && (
                            <p className="text-sm text-gray-600 mb-1">
                              <i className="fas fa-map-marker-alt ml-1"></i>
                              {clinic.address}
                            </p>
                          )}
                          {clinic.phoneNumber && (
                            <p className="text-sm text-gray-600">
                              <i className="fas fa-phone ml-1"></i>
                              {clinic.phoneNumber}
                            </p>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* مرحله انتخاب پزشک */}
              {currentStep === "doctor" && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <h2 className="text-2xl font-iran-sans-bold text-dark mb-2 text-center">
                    انتخاب پزشک
                  </h2>
                  {selectedClinic && (
                    <p className="text-sm text-gray-600 mb-6 text-center">
                      کلینیک: {selectedClinic.name}
                    </p>
                  )}

                  <div className="mb-4">
                    <button
                      onClick={() => handleDoctorSelect(null)}
                      className={`w-full p-4 bg-white rounded-lg border-2 transition-all text-right hover:shadow-md active:scale-[0.98] ${
                        selectedDoctor === null
                          ? "border-accent bg-accent/10"
                          : "border-gray-200 hover:border-accent"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-iran-sans-bold text-dark text-lg">
                            هر پزشکی
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            انتخاب نکنید تا تمام زمان‌های کلینیک را ببینید
                          </p>
                        </div>
                        {selectedDoctor === null && (
                          <i className="fas fa-check-circle text-accent text-xl"></i>
                        )}
                      </div>
                    </button>
                  </div>

                  {isDoctorsLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-24 bg-gray-200 animate-pulse rounded-lg"
                        />
                      ))}
                    </div>
                  ) : doctors.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      پزشکی در این کلینیک یافت نشد
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {doctors.map((doctor) => (
                        <button
                          key={doctor.id}
                          onClick={() => handleDoctorSelect(doctor)}
                          className={`w-full p-4 bg-white rounded-lg border-2 transition-all text-right hover:shadow-md active:scale-[0.98] ${
                            selectedDoctor?.id === doctor.id
                              ? "border-accent bg-accent/10"
                              : "border-gray-200 hover:border-accent"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <h3 className="font-iran-sans-bold text-dark text-lg mb-1">
                                دکتر {doctor.firstName} {doctor.lastName}
                              </h3>
                              {doctor.shortDescription && (
                                <p className="text-sm text-gray-600">
                                  {doctor.shortDescription}
                                </p>
                              )}
                            </div>
                            {doctor.profileImage && (
                              <img
                                src={getImageUrl(doctor.profileImage)}
                                alt={`${doctor.firstName} ${doctor.lastName}`}
                                className="w-16 h-16 rounded-full object-cover shrink-0"
                              />
                            )}
                            {selectedDoctor?.id === doctor.id && (
                              <i className="fas fa-check-circle text-accent text-xl shrink-0"></i>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* دکمه ادامه */}
                  <div className="mt-6">
                    <button
                      onClick={handleContinue}
                      className="main-btn w-full"
                    >
                      ادامه
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AppointmentModal;
