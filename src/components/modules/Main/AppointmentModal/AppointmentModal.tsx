import React, { useEffect, useState } from "react";
import { useAppointmentModal } from "../../../../contexts/useAppointmentModal";
import { AnimatePresence, motion } from "motion/react";
import { useGetAllClinics } from "../../../../services/useClinics";
import { useGetDoctorsByClinic } from "../../../../services/useDoctors";
import type { Clinic, Doctor } from "../../../../types/types";
import { AppointmentStepper } from "./AppointmentStepper";
import { ClinicSelectionStep } from "./ClinicSelectionStep";
import { DoctorSelectionStep } from "./DoctorSelectionStep";
import { PatientInfoStep } from "./PatientInfoStep";
import { DateTimeSelectionStep } from "./DateTimeSelectionStep";

type Step = "clinic" | "doctor" | "patient-info" | "datetime";

function AppointmentModal() {
  const { isOpen, closeModal } = useAppointmentModal();
  const [currentStep, setCurrentStep] = useState<Step>("clinic");
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [wantsSpecificDoctor, setWantsSpecificDoctor] = useState<
    "yes" | "no" | null
  >(null);

  // State برای اطلاعات بیمار
  const [isForSelf, setIsForSelf] = useState<boolean | null>(null);
  const [patientFirstName, setPatientFirstName] = useState<string>("");
  const [patientLastName, setPatientLastName] = useState<string>("");
  const [patientNationalId, setPatientNationalId] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    nationalId?: string;
  }>({});

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
      setWantsSpecificDoctor(null);
      setIsForSelf(null);
      setPatientFirstName("");
      setPatientLastName("");
      setPatientNationalId("");
      setNotes("");
      setErrors({});
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
    if (currentStep === "datetime") {
      setCurrentStep("patient-info");
    } else if (currentStep === "patient-info") {
      setCurrentStep("doctor");
      // Reset تمام state های مربوط به مرحله patient-info
      setIsForSelf(null);
      setPatientFirstName("");
      setPatientLastName("");
      setPatientNationalId("");
      setNotes("");
      setErrors({});
      // Reset انتخاب پزشک و گزینه wantsSpecificDoctor
      setSelectedDoctor(null);
      setWantsSpecificDoctor(null);
    } else if (currentStep === "doctor") {
      setCurrentStep("clinic");
      // Reset تمام state های مربوط به مرحله doctor
      setSelectedDoctor(null);
      setWantsSpecificDoctor(null);
      // Reset انتخاب کلینیک
      setSelectedClinic(null);
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
    // بعد از انتخاب پزشک، بلافاصله به مرحله بعد برو
    if (doctor) {
      setCurrentStep("patient-info");
    }
  };

  const validatePatientInfo = (): boolean => {
    const newErrors: {
      firstName?: string;
      lastName?: string;
      nationalId?: string;
    } = {};

    // کد ملی همیشه اجباری است
    if (!patientNationalId.trim()) {
      newErrors.nationalId = "کد ملی الزامی است";
    } else if (patientNationalId.trim().length !== 10) {
      newErrors.nationalId = "کد ملی باید 10 رقم باشد";
    }

    // اگر برای کسی دیگر است، نام و نام خانوادگی اجباری است
    if (isForSelf === false) {
      if (!patientFirstName.trim()) {
        newErrors.firstName = "نام الزامی است";
      }
      if (!patientLastName.trim()) {
        newErrors.lastName = "نام خانوادگی الزامی است";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (currentStep === "doctor") {
      // از مرحله انتخاب پزشک به مرحله مشخصات بیمار می‌رویم
      setCurrentStep("patient-info");
    } else if (currentStep === "patient-info") {
      // اعتبارسنجی اطلاعات بیمار
      if (validatePatientInfo()) {
        // در اینجا به مرحله بعدی می‌رویم (تاریخ و زمان)
        setCurrentStep("datetime");
      }
    } else if (currentStep === "datetime") {
      // در اینجا به مرحله بعدی می‌رویم (تایید نهایی)
      // فعلاً فقط می‌بندیم
      handleClose();
    } else {
      handleClose();
    }
  };

  const handleFirstNameChange = (value: string) => {
    setPatientFirstName(value);
    if (errors.firstName) {
      setErrors({
        ...errors,
        firstName: undefined,
      });
    }
  };

  const handleLastNameChange = (value: string) => {
    setPatientLastName(value);
    if (errors.lastName) {
      setErrors({
        ...errors,
        lastName: undefined,
      });
    }
  };

  const handleNationalIdChange = (value: string) => {
    setPatientNationalId(value);
    if (errors.nationalId) {
      setErrors({
        ...errors,
        nationalId: undefined,
      });
    }
  };

  const handleIsForSelfChange = (value: boolean | null) => {
    setIsForSelf(value);
    setErrors({});
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
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
            className="relative z-10 w-full max-w-6xl ring-2 border-dark rounded-3xl shadow-2xl h-[94vh] overflow-y-auto auth-modal-scrollbar scroll-smooth bg-white"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              duration: 0.8,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Soft Yellow Glow */}
            <div
              className="absolute inset-0 z-0 rounded-3xl"
              style={{
                backgroundImage: `radial-gradient(circle at center, #FFF991 0%, transparent 70%)`,
                opacity: 0.6,
                mixBlendMode: "multiply",
              }}
            />
            {/* دکمه بستن */}
            <motion.button
              onClick={handleClose}
              className="absolute top-4 left-6 z-20 flex items-center justify-center rounded-full size-10 bg-accent hover:bg-secondary transition-colors"
              aria-label="بستن"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
            >
              <i className="fas fa-times text-2xl text-white"></i>
            </motion.button>

            {/* محتوای مدال */}
            <div className="relative z-10 flex  flex-col p-6 pt-16 ">
              {/* دکمه بازگشت */}
              {currentStep !== "clinic" && (
                <div className="absolute top-4 right-6 flex items-center gap-3">
                  <button
                    onClick={handleBack}
                    className="flex items-center justify-center rounded-full p-5 bg-accent hover:bg-secondary"
                  >
                    <i className="fas fa-arrow-right text-2xl text-white absolute"></i>
                  </button>
                  <span className="text-sm font-estedad-medium text-dark">
                    مرحله قبلی
                  </span>
                </div>
              )}

              <AppointmentStepper currentStep={currentStep} />

              <div className="mt-1 flex-1">
                {/* مرحله انتخاب کلینیک */}
                {currentStep === "clinic" && (
                  <ClinicSelectionStep
                    clinics={clinics}
                    isLoading={isClinicsLoading}
                    onSelectClinic={handleClinicSelect}
                  />
                )}

                {/* مرحله انتخاب پزشک */}
                {currentStep === "doctor" && (
                  <DoctorSelectionStep
                    selectedClinic={selectedClinic}
                    doctors={doctors}
                    isLoading={isDoctorsLoading}
                    wantsSpecificDoctor={wantsSpecificDoctor}
                    selectedDoctor={selectedDoctor}
                    onWantsSpecificDoctorChange={setWantsSpecificDoctor}
                    onSelectDoctor={handleDoctorSelect}
                    onContinue={handleContinue}
                  />
                )}

                {/* مرحله مشخصات مراجعه‌کننده */}
                {currentStep === "patient-info" && (
                  <PatientInfoStep
                    isForSelf={isForSelf}
                    patientFirstName={patientFirstName}
                    patientLastName={patientLastName}
                    patientNationalId={patientNationalId}
                    notes={notes}
                    errors={errors}
                    onIsForSelfChange={handleIsForSelfChange}
                    onFirstNameChange={handleFirstNameChange}
                    onLastNameChange={handleLastNameChange}
                    onNationalIdChange={handleNationalIdChange}
                    onNotesChange={handleNotesChange}
                    onContinue={handleContinue}
                  />
                )}

                {/* مرحله انتخاب تاریخ و زمان */}
                {currentStep === "datetime" && (
                  <DateTimeSelectionStep onContinue={handleContinue} />
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
