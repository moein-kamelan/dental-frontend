import React from "react";
import { motion } from "motion/react";
import type { Clinic, Doctor } from "../../../../types/types";
import { getImageUrl } from "../../../../utils/helpers";

interface DoctorSelectionStepProps {
  selectedClinic: Clinic | null;
  doctors: Doctor[];
  isLoading: boolean;
  wantsSpecificDoctor: "yes" | "no" | null;
  selectedDoctor: Doctor | null;
  onWantsSpecificDoctorChange: (value: "yes" | "no" | null) => void;
  onSelectDoctor: (doctor: Doctor | null) => void;
  onContinue: () => void;
}

export function DoctorSelectionStep({
  selectedClinic,
  doctors,
  isLoading,
  wantsSpecificDoctor,
  selectedDoctor,
  onWantsSpecificDoctorChange,
  onSelectDoctor,
  onContinue,
}: DoctorSelectionStepProps) {
  const handleNoClick = () => {
    onWantsSpecificDoctorChange("no");
    onSelectDoctor(null);
    onContinue();
  };

  return (
    <motion.div
      className="flex h-full flex-col"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-iran-sans-bold text-dark mb-2 text-center">
        انتخاب پزشک
      </h2>
      {selectedClinic && (
        <p className="mb-6 text-center text-sm text-gray-600">
          کلینیک: {selectedClinic.name}
        </p>
      )}

      {/* سوال: آیا برای پزشک خاصی نوبت می‌خواهید؟ */}
      <div className="mb-6 flex flex-col items-center gap-6">
        <p className="text-3xl font-estedad-medium text-dark text-center">
          آیا برای پزشک خاصی نوبت می‌خواهید؟
        </p>

        {/* دکمه‌ها */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* گزینه بله */}
          <button
            type="button"
            onClick={() => onWantsSpecificDoctorChange("yes")}
            className={`px-8 py-3 rounded-full text-lg font-estedad-medium transition-all duration-300 flex items-center gap-2 ${
              wantsSpecificDoctor === "yes"
                ? "bg-accent text-white shadow-md"
                : "bg-white text-dark border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            <i className="fas fa-user-md text-lg"></i>
            <span>بله</span>
            {wantsSpecificDoctor === "yes" && (
              <motion.i
                className="fas fa-check-circle"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                }}
              />
            )}
          </button>

          {/* گزینه خیر - طراحی ساده‌تر */}
          <button
            type="button"
            onClick={handleNoClick}
            className={`px-8 py-3 rounded-full text-lg font-estedad-medium transition-all duration-300 ${
              wantsSpecificDoctor === "no"
                ? "bg-accent text-white shadow-md"
                : "bg-white text-dark border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            خیر
          </button>
        </div>

        {/* بخش توضیحات - فقط زمانی نمایش داده می‌شود که هیچ گزینه‌ای انتخاب نشده باشد */}
        {wantsSpecificDoctor === null && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-accent/10 via-secondary/10 to-primary/10 rounded-2xl p-6 border-2 border-accent/20 shadow-lg">
              <div className="grid md:grid-cols-2 gap-6">
                {/* توضیحات دکمه بله */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-md">
                    <i className="fas fa-user-md text-white text-lg"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-estedad-bold text-dark mb-2 text-lg">
                      انتخاب پزشک خاص
                    </h4>
                    <p className="text-sm text-gray-700 font-estedad-medium leading-relaxed">
                      با انتخاب گزینه بله ، دندانپزشکان کلینیک به شما نمایش داده
                      می‌شود و می‌توانید پزشک مد نظر خود را انتخاب کنید
                    </p>
                  </div>
                </div>

                {/* توضیحات دکمه خیر */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-md">
                    <i className="fas fa-calendar-check text-white text-lg"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-estedad-bold text-dark mb-2 text-lg">
                      انتخاب خودکار
                    </h4>
                    <p className="text-sm text-gray-700 font-estedad-medium leading-relaxed">
                      با انتخاب گزینه خیر ، تمام نوبت‌های خالی به شما نمایش داده
                      می‌شود و یکی از پزشکان مجرب کلینیک برای شما انتخاب می‌شود
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* در صورت انتخاب بله، نمایش لیست پزشکان کلینیک */}
      {wantsSpecificDoctor === "yes" && (
        <>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="h-80 rounded-2xl bg-gray-200/70 animate-pulse"
                />
              ))}
            </div>
          ) : doctors.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              پزشکی در این کلینیک یافت نشد
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {doctors.map((doctor) => (
                <button
                  key={doctor.id}
                  onClick={() => onSelectDoctor(doctor)}
                  className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border-2 text-right shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 active:scale-[0.98] ${
                    selectedDoctor?.id === doctor.id
                      ? "border-accent bg-white/90"
                      : "border-gray-200 bg-white/90 hover:border-accent"
                  }`}
                >
                  {/* تصویر پزشک */}
                  <div className="relative h-64 w-full overflow-hidden">
                    {doctor.profileImage ? (
                      <>
                        <img
                          src={getImageUrl(doctor.profileImage)}
                          alt={`دکتر ${doctor.firstName} ${doctor.lastName}`}
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                        <div
                          className={`absolute inset-0 transition-opacity duration-300 ${
                            selectedDoctor?.id === doctor.id
                              ? "bg-accent/40 opacity-100 mix-blend-multiply"
                              : "bg-accent/40 opacity-0 mix-blend-multiply group-hover:opacity-100"
                          }`}
                        />
                      </>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/10 via-secondary/10 to-primary/10 text-accent">
                        <i className="fas fa-user-md text-4xl" />
                      </div>
                    )}

                    {/* نام پزشک در پایین تصویر */}
                    <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2">
                      <div className="max-w-[85%]">
                        <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-white shadow-lg shadow-black/40">
                          <i className="fas fa-user-md text-sm" />
                          <span className="max-w-[120px] truncate font-estedad-medium text-sm">
                            دکتر {doctor.firstName} {doctor.lastName}
                          </span>
                        </div>
                      </div>
                      {selectedDoctor?.id === doctor.id && (
                        <span className="inline-flex items-center justify-center rounded-full bg-white/90 p-1.5 shadow-sm">
                          <i className="fas fa-check-circle text-accent text-lg" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* اطلاعات پزشک */}
                  <div className="flex flex-1 flex-col gap-1 bg-gradient-to-b from-accent/10 via-accent/5 to-accent/10 px-4 py-3 text-dark transition-colors duration-300 group-hover:from-accent/20 group-hover:via-accent/10 group-hover:to-accent/20">
                    {doctor.shortDescription && (
                      <p className="line-clamp-2 leading-relaxed text-gray-700 font-iran-sans-bold text-sm">
                        {doctor.shortDescription}
                      </p>
                    )}
                    {!doctor.shortDescription && (
                      <p className="text-sm text-gray-500 font-estedad-medium">
                        متخصص دندانپزشکی
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
