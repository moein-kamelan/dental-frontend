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
      <div className="flex flex-wrap items-center justify-center gap-2 my-6">
        <h2 className="text-2xl font-iran-sans-bold text-dark  text-center">
          انتخاب پزشک
        </h2>
        {selectedClinic && (
          <p className=" text-center text-sm text-gray-600">
            ( کلینیک: {selectedClinic.name} )
          </p>
        )}
      </div>

      {/* سوال: آیا برای پزشک خاصی نوبت می‌خواهید؟ */}
      <div className="mb-6 flex flex-col items-center gap-4">
        <p className="text-2xl font-estedad-medium text-dark text-center leading-relaxed">
          لطفا نوع نوبت را مشخص کنید
        </p>

        {/* دکمه‌ها */}
        <div className="flex max-sm:gap-6 gap-4 max-md:justify-between items-center flex-wrap max-sm:w-full ">
          {/* گزینه بله */}
          <button
            type="button"
            onClick={() => onWantsSpecificDoctorChange("yes")}
            className={`px-4 sm:px-8 py-3 rounded-full text-sm sm:text-lg font-estedad-medium transition-all duration-300 flex items-center gap-2 grow justify-center ${
              wantsSpecificDoctor === "yes"
                ? "bg-accent text-white shadow-md"
                : "bg-white text-dark border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            <i className="fas fa-user-md text-lg"></i>
            <span>معاینه تخصصی</span>
            {wantsSpecificDoctor === "yes" && (
              <motion.i
                className="fas fa-check-circle text-sm sm:text-lg"
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
            className={`px-4 sm:px-8 py-3 rounded-full text-sm sm:text-lg font-estedad-medium transition-all duration-300 grow ${
              wantsSpecificDoctor === "no"
                ? "bg-accent text-white shadow-md"
                : "bg-white text-dark border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            چکاپ عمومی
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
                      معاینه تخصصی
                    </h4>
                    <p className="text-sm text-gray-700 font-estedad-medium leading-relaxed">
                      با انتخاب گزینه معاینه تخصصی ، دندانپزشکان کلینیک به شما نمایش داده
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
                      چکاپ عمومی
                    </h4>
                    <p className="text-sm text-gray-700 font-estedad-medium leading-relaxed">
                      با انتخاب گزینه چکاپ عمومی ، تمام نوبت‌های خالی به شما نمایش داده
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-36 rounded-xl bg-gray-200/70 animate-pulse"
                />
              ))}
            </div>
          ) : doctors.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              پزشکی در این کلینیک یافت نشد
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {doctors.map((doctor) => (
                <button
                  key={doctor.id}
                  onClick={() => onSelectDoctor(doctor)}
                  className={`group relative flex flex-row h-36 w-full overflow-hidden rounded-xl border-2 text-right shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 active:scale-[0.98] ${
                    selectedDoctor?.id === doctor.id
                      ? "border-accent bg-white/90"
                      : "border-gray-200 bg-white/90 hover:border-accent"
                  }`}
                >
                  {/* بخش چپ: نام دکتر و تخصص */}
                  <div className="flex flex-1 flex-col">
                    {/* نام دکتر در بالا */}
                    <div className="relative flex items-center justify-between gap-2 bg-gradient-to-r from-secondary/20 via-secondary/15 to-secondary/10 px-4 py-2.5 border-b border-secondary/20">
                      <h3 className="font-estedad-bold text-base text-dark">
                        دکتر {doctor.firstName} {doctor.lastName}
                      </h3>
                      {selectedDoctor?.id === doctor.id && (
                        <span className="inline-flex items-center justify-center">
                          <i className="fas fa-check-circle text-accent text-lg" />
                        </span>
                      )}
                    </div>

                    {/* اطلاعات تخصص */}
                    <div className="relative flex flex-1 flex-col justify-center gap-1 px-4 py-2.5 overflow-hidden">
                      {/* انیمیشن hover از چپ به راست */}
                      <div className="absolute inset-0 bg-primary transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />

                      <div className="relative z-10">
                        {doctor.shortDescription ? (
                          <p className="line-clamp-2 leading-relaxed text-gray-700 font-iran-sans-medium text-sm group-hover:text-white transition-colors duration-500">
                            {doctor.shortDescription}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-500 font-estedad-medium group-hover:text-white transition-colors duration-500">
                            متخصص دندانپزشکی
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* تصویر پزشک - کل ارتفاع */}
                  <div className="relative h-full w-32 flex-shrink-0 overflow-hidden">
                    {doctor.profileImage ? (
                      <>
                        <img
                          src={getImageUrl(doctor.profileImage)}
                          alt={`دکتر ${doctor.firstName} ${doctor.lastName}`}
                          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/20 to-transparent" />
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
                        <i className="fas fa-user-md text-3xl" />
                      </div>
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
