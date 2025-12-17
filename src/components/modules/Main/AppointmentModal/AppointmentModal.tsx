import React, { useEffect, useState } from "react";
import { useAppointmentModal } from "../../../../contexts/useAppointmentModal";
import { AnimatePresence, motion } from "motion/react";
import { useGetAllClinics } from "../../../../services/useClinics";
import { useGetDoctorsByClinic } from "../../../../services/useDoctors";
import type { Clinic, Doctor } from "../../../../types/types";
import { getImageUrl } from "../../../../utils/helpers";

type Step = "clinic" | "doctor";

type StepperStepId =
  | "clinic"
  | "doctor"
  | "patient-info"
  | "datetime"
  | "confirm";

const APPOINTMENT_STEPS: { id: StepperStepId; label: string; icon: string }[] =
  [
    { id: "clinic", label: "انتخاب کلینیک", icon: "fas fa-clinic-medical" },
    { id: "doctor", label: "انتخاب پزشک", icon: "fas fa-user-md" },
    {
      id: "patient-info",
      label: "مشخصات مراجعه‌کننده",
      icon: "fas fa-id-card",
    },
    {
      id: "datetime",
      label: "تاریخ و ساعت نوبت",
      icon: "fas fa-calendar-check",
    },
    { id: "confirm", label: "تایید نهایی", icon: "fas fa-check-circle" },
  ];

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

  const currentStepIndex = Math.max(
    APPOINTMENT_STEPS.findIndex((step) => step.id === currentStep),
    0
  );

  const currentStepData =
    APPOINTMENT_STEPS[currentStepIndex] ?? APPOINTMENT_STEPS[0];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {/* Overlay با backdrop blur */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
          />

          {/* مدال */}
          <motion.div
            className="relative z-10 w-full max-w-6xl bg-gray-100 ring-2 border-dark rounded-3xl shadow-2xl h-[94vh] overflow-y-auto auth-modal-scrollbar scroll-smooth"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.3,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* دکمه بستن */}
            <motion.button
              onClick={handleClose}
              className="absolute top-4 right-6 z-20 flex items-center justify-center rounded-full size-10 bg-accent hover:bg-secondary transition-colors"
              aria-label="بستن"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <i className="fas fa-times text-2xl text-white"></i>
            </motion.button>

            {/* محتوای مدال */}
            <div className="flex h-full flex-col p-6 pt-16">
              {/* دکمه بازگشت */}
              {currentStep !== "clinic" && (
                <button
                  onClick={handleBack}
                  className="absolute top-4 left-6 flex items-center justify-center rounded-full p-5 bg-accent hover:bg-secondary"
                >
                  <i className="fas fa-arrow-left text-2xl text-white absolute"></i>
                </button>
              )}

              {/* استپر مراحل رزرو نوبت - دسکتاپ / تبلت */}
              <div className="mb-4 mt-2 hidden md:block">
                <div className="mx-auto flex max-w-4xl items-center justify-between gap-1">
                  {APPOINTMENT_STEPS.map((step, index) => {
                    const isCompleted = index < currentStepIndex;
                    const isActive = index === currentStepIndex;

                    return (
                      <div
                        key={step.id}
                        className="flex flex-1 items-center last:flex-none"
                      >
                        <div className="flex w-30 flex-col items-center gap-2">
                          <div
                            className={`flex size-10 items-center justify-center rounded-full border-2 shadow-sm transition-colors duration-200 ${
                              isCompleted
                                ? "bg-accent border-accent text-white"
                                : isActive
                                ? "bg-white border-accent text-accent"
                                : "bg-gray-200/70 border-gray-200 text-gray-400"
                            }`}
                          >
                            <i className={`${step.icon} text-sm`} />
                          </div>
                          <span
                            className={`text-[12px] font-estedad-medium ${
                              isActive ? "text-accent" : "text-gray-500"
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>

                        {index < APPOINTMENT_STEPS.length - 1 && (
                          <div
                            className={`mx-2 h-0.5 flex-1 rounded-full ${
                              isCompleted ? "bg-accent" : "bg-gray-300"
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* استپر مراحل رزرو نوبت - موبایل */}
              <div className="mb-4 mt-10 md:hidden">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-accent text-white shadow-sm">
                      <i className={`${currentStepData.icon} text-sm`} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-gray-500">
                        مرحله {currentStepIndex + 1} از{" "}
                        {APPOINTMENT_STEPS.length}
                      </span>
                      <span className="text-sm font-estedad-medium text-dark">
                        {currentStepData.label}
                      </span>
                    </div>
                  </div>
                  <div className="ml-2 flex-1 h-1 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full bg-accent transition-all duration-300"
                      style={{
                        width: `${
                          ((currentStepIndex + 1) / APPOINTMENT_STEPS.length) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-1 flex-1">
                {/* مرحله انتخاب کلینیک */}
                {currentStep === "clinic" && (
                  <motion.div
                    className="flex h-full flex-col"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="mb-5 text-center text-xl font-iran-sans-bold text-dark">
                      انتخاب کلینیک
                    </h2>

                    {isClinicsLoading ? (
                      <div className="grid h-full grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="h-40 rounded-2xl bg-gray-200/70 animate-pulse"
                          />
                        ))}
                      </div>
                    ) : clinics.length === 0 ? (
                      <div className="flex h-full items-center justify-center text-gray-500">
                        کلینیکی یافت نشد
                      </div>
                    ) : (
                      <div className="grid h-full grid-cols-1 sm:grid-cols-2 gap-4">
                        {clinics.map((clinic) => (
                          <button
                            key={clinic.id}
                            onClick={() => handleClinicSelect(clinic)}
                            className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border-2 border-gray-200 bg-white/90 text-right shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 active:scale-[0.98]"
                          >
                            {/* تصویر کلینیک */}
                            <div className="relative h-60 w-full overflow-hidden">
                              {clinic.image ? (
                                <>
                                  <img
                                    src={getImageUrl(clinic.image)}
                                    alt={clinic.name}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                  <div className="absolute inset-0 bg-accent/40 opacity-0 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-100" />
                                </>
                              ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/10 via-secondary/10 to-primary/10 text-accent">
                                  <i className="fas fa-clinic-medical text-3xl" />
                                </div>
                              )}

                              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
                                <div className="max-w-[70%]">
                                  <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-l from-accent via-secondary to-primary px-3 py-1  text-white shadow-lg shadow-black/40">
                                    <i className="fas fa-clinic-medical " />
                                    <span className="max-w-[150px] truncate font-estedad-medium">
                                      {clinic.name}
                                    </span>
                                  </div>
                                </div>
                                {clinic._count?.doctors ? (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-gray-700 shadow-sm">
                                    <i className="fas fa-user-md text-[10px] text-accent" />
                                    <span>{clinic._count.doctors} پزشک</span>
                                  </span>
                                ) : null}
                              </div>
                            </div>

                            {/* اطلاعات کلینیک */}
                            <div className="flex flex-1 flex-col gap-1 bg-gradient-to-b from-accent/10 via-accent/5 to-accent/10 px-4 py-3 text-dark transition-colors duration-300 group-hover:from-accent/20 group-hover:via-accent/10 group-hover:to-accent/20 ">
                              {clinic.description && (
                                <p className="line-clamp-2  leading-relaxed text-gray-700 font-iran-sans-bold text-sm">
                                  {clinic.description}
                                </p>
                              )}

                              <div className="mt-1 space-y-2  text-gray-700">
                                {clinic.address && (
                                  <div className="flex items-center gap-1.5">
                                    <span className="mt-0.5 inline-flex size-5 items-center justify-center rounded-full bg-white/40  text-accent">
                                      <i className="fas fa-map-marker-alt" />
                                    </span>
                                    <span className="line-clamp-2 font-estedad-light text-[12px]  ">
                                      {clinic.address}
                                    </span>
                                  </div>
                                )}
                                {clinic.phoneNumber && (
                                  <div className="flex items-center gap-1.5">
                                    <span className="inline-flex size-5 items-center justify-center rounded-full bg-white/40  text-accent">
                                      <i className="fas fa-phone" />
                                    </span>
                                    <span
                                      dir="ltr"
                                      className="font-estedad-light tracking-wide text-[12px]  "
                                    >
                                      {clinic.phoneNumber}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* مرحله انتخاب پزشک */}
                {currentStep === "doctor" && (
                  <motion.div
                    className="flex h-full flex-col"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-iran-sans-bold text-dark mb-2 text-center">
                      انتخاب پزشک
                    </h2>
                    {selectedClinic && (
                      <p className="mb-6 text-center text-sm text-gray-600">
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AppointmentModal;
