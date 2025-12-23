import React, { useEffect, useState } from "react";
import { useAppointmentModal } from "../../../../contexts/useAppointmentModal";
import { AnimatePresence, motion } from "motion/react";
import { useGetAllClinics } from "../../../../services/useClinics";
import { useGetDoctorsByClinic, useGetDoctorByIdentifier } from "../../../../services/useDoctors";
import type { Clinic, Doctor } from "../../../../types/types";
import { AppointmentStepper } from "./AppointmentStepper";
import { ClinicSelectionStep } from "./ClinicSelectionStep";
import { DoctorSelectionStep } from "./DoctorSelectionStep";
import { PatientInfoStep } from "./PatientInfoStep";
import { DateTimeSelectionStep } from "./DateTimeSelectionStep";
import { ConfirmationStep } from "./ConfirmationStep";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";
import { validateNationalCode } from "../../../../validators/nationalCodeValidator";

type Step = "clinic" | "doctor" | "patient-info" | "datetime" | "confirmation";

function AppointmentModal() {
  const { isOpen, closeModal, preselectedDoctorId } = useAppointmentModal();
  const user = useSelector((state: RootState) => state.user.data);
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
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    nationalId?: string;
  }>({});

  // کد ملی کاربر از قبل ثبت شده باشد
  const userHasNationalCode = Boolean(user?.nationalCode);

  const { data: clinicsData, isLoading: isClinicsLoading } = useGetAllClinics(
    1,
    100
  );
  const { data: doctorsData, isLoading: isDoctorsLoading } =
    useGetDoctorsByClinic(selectedClinic?.id || null);
  
  // Fetch preselected doctor if doctorId is provided
  const { data: preselectedDoctorData, isLoading: isPreselectedDoctorLoading } =
    useGetDoctorByIdentifier(
      preselectedDoctorId && typeof preselectedDoctorId === "string" ? preselectedDoctorId : "",
      !!preselectedDoctorId && typeof preselectedDoctorId === "string"
    );

  const clinics: Clinic[] = clinicsData?.data?.clinics || [];
  const doctors: Doctor[] = doctorsData?.data?.doctors || [];
  const preselectedDoctor: Doctor | null = preselectedDoctorData?.data?.doctor || null;

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
      setSelectedDate(null);
      setSelectedTime(null);
      setErrors({});
    } else if (isOpen && preselectedDoctorId) {
      // اگر preselectedDoctorId وجود دارد، ابتدا به مرحله clinic برو
      setCurrentStep("clinic");
    }
  }, [isOpen, preselectedDoctorId]);


  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    closeModal();
  };

  const handleBack = () => {
    if (currentStep === "confirmation") {
      setCurrentStep("datetime");
    } else if (currentStep === "datetime") {
      setCurrentStep("patient-info");
    } else if (currentStep === "patient-info") {
      // اگر preselectedDoctorId وجود دارد، به clinic برگرد (doctor step را اسکیپ کن)
      if (preselectedDoctorId) {
        setCurrentStep("clinic");
      } else {
        setCurrentStep("doctor");
      }
      // Reset تمام state های مربوط به مرحله patient-info
      setIsForSelf(null);
      setPatientFirstName("");
      setPatientLastName("");
      setPatientNationalId("");
      setNotes("");
      setSelectedDate(null);
      setSelectedTime(null);
      setErrors({});
      // اگر preselectedDoctorId وجود ندارد، انتخاب پزشک را reset کن
      if (!preselectedDoctorId) {
        setSelectedDoctor(null);
        setWantsSpecificDoctor(null);
      }
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
    // اگر preselectedDoctorId وجود دارد، مرحله doctor را اسکیپ کن و مستقیماً به patient-info برو
    if (preselectedDoctorId && preselectedDoctorData?.data?.doctor) {
      const doctor = preselectedDoctorData.data.doctor;
      // بررسی کن که آیا این پزشک در کلینیک انتخاب شده کار می‌کند
      const doctorWorksInClinic = doctor.clinics?.some(
        (dc) => dc.clinic.id === clinic.id
      );

      if (doctorWorksInClinic) {
        setSelectedDoctor(doctor);
        setWantsSpecificDoctor("yes");
        setCurrentStep("patient-info");
      } else {
        // اگر پزشک در این کلینیک کار نمی‌کند، به مرحله doctor برو
        setCurrentStep("doctor");
      }
    } else {
      setCurrentStep("doctor");
    }
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
    } else if (!validateNationalCode(patientNationalId.trim())) {
      newErrors.nationalId = "کد ملی نامعتبر است";
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

  const handleContinue = (time?: string) => {
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
      // از مرحله datetime به مرحله confirmation می‌رویم
      // اگر time به عنوان پارامتر آمده است، آن را set می‌کنیم
      if (time) {
        setSelectedTime(time);
      }
      if (selectedDate && (selectedTime || time)) {
        setCurrentStep("confirmation");
      }
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
    // اگر "برای خودم" انتخاب شد و کاربر کد ملی ثبت شده دارد، آن را پر کن
    if (value === true && user?.nationalCode) {
      setPatientNationalId(user.nationalCode);
    } else if (value === false) {
      // اگر "برای شخصی دیگر" انتخاب شد، کد ملی را پاک کن
      setPatientNationalId("");
    }
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset زمان هنگام تغییر تاریخ
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
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
            className="relative z-10 w-full max-w-6xl rounded-3xl shadow-2xl h-[94vh] overflow-y-auto auth-modal-scrollbar scroll-smooth bg-white"
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
                backgroundImage: `radial-gradient(circle at top center, #FFF991 0%, transparent 95%)`,
                opacity: 0.6,
                mixBlendMode: "multiply",
              }}
            />
            {/* دکمه بستن */}
            <motion.button
              onClick={handleClose}
              className="absolute top-5 left-5 z-20 flex items-center justify-center w-9 h-9 rounded-lg bg-white/80 backdrop-blur-md border border-gray-200/50 hover:bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-200 group"
              aria-label="بستن"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <i className="fas fa-times text-sm text-gray-600 group-hover:text-gray-800 transition-colors"></i>
            </motion.button>

            {/* محتوای مدال */}
            <div className="relative z-10 flex  flex-col p-6 pt-16 ">
              {/* دکمه بازگشت */}
              {currentStep !== "clinic" && (
                <motion.button
                    onClick={handleBack}
                  className="absolute top-5 right-5 z-20 flex items-center justify-center gap-2 w-auto h-9 px-4 rounded-lg bg-white/80 backdrop-blur-md border border-gray-200/50 hover:bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-200 group"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  >
                  <i className="fas fa-arrow-right text-xs text-gray-600 group-hover:text-gray-800 transition-colors"></i>
                  <span className="text-xs font-estedad-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                    بازگشت
                  </span>
                </motion.button>
              )}

              <AppointmentStepper currentStep={currentStep} />

              <div className="mt-1 flex-1">
                {/* مرحله انتخاب کلینیک */}
                {currentStep === "clinic" && (
                  <ClinicSelectionStep
                    clinics={clinics}
                    isLoading={isClinicsLoading}
                    onSelectClinic={handleClinicSelect}
                    preselectedDoctor={preselectedDoctor}
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
                    userHasNationalCode={userHasNationalCode}
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
                  <DateTimeSelectionStep
                    selectedDate={selectedDate}
                    selectedClinic={selectedClinic}
                    selectedDoctor={selectedDoctor}
                    isForSelf={isForSelf}
                    patientFirstName={patientFirstName}
                    patientLastName={patientLastName}
                    patientNationalId={patientNationalId}
                    notes={notes}
                    onDateSelect={handleDateSelect}
                    onTimeSelect={handleTimeSelect}
                    onContinue={handleContinue}
                  />
                )}

                {/* مرحله تایید نهایی */}
                {currentStep === "confirmation" && (
                  <ConfirmationStep
                    selectedClinic={selectedClinic}
                    selectedDoctor={selectedDoctor}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    isForSelf={isForSelf}
                    patientFirstName={patientFirstName}
                    patientLastName={patientLastName}
                    patientNationalId={patientNationalId}
                    notes={notes}
                    onBack={handleBack}
                    onClose={handleClose}
                  />
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
