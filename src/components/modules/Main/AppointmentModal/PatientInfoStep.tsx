import React from "react";
import { AnimatePresence, motion } from "motion/react";

interface PatientInfoStepProps {
  isForSelf: boolean | null;
  patientFirstName: string;
  patientLastName: string;
  patientNationalId: string;
  notes: string;
  errors: {
    firstName?: string;
    lastName?: string;
    nationalId?: string;
  };
  userHasNationalCode?: boolean;
  onIsForSelfChange: (value: boolean | null) => void;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onNationalIdChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onContinue: () => void;
}

export function PatientInfoStep({
  isForSelf,
  patientFirstName,
  patientLastName,
  patientNationalId,
  notes,
  errors,
  userHasNationalCode = false,
  onIsForSelfChange,
  onFirstNameChange,
  onLastNameChange,
  onNationalIdChange,
  onNotesChange,
  onContinue,
}: PatientInfoStepProps) {
  // آیا فیلد کد ملی باید غیرفعال باشد (وقتی "برای خودم" و کاربر کد ملی دارد)
  const isNationalIdDisabled = isForSelf === true && userHasNationalCode;
  const handleIsForSelfClick = (value: boolean) => {
    onIsForSelfChange(value);
    if (value === true) {
      onFirstNameChange("");
      onLastNameChange("");
    }
  };

  return (
    <motion.div
      className="flex h-full flex-col"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      {/* گزینه انتخاب: برای خودم یا برای کسی دیگر */}
      <div className="mb-6 flex flex-col items-center gap-4">
        <p className="text-2xl font-estedad-medium text-dark text-center leading-relaxed">
          نوبت برای چه کسی رزرو می‌شود؟
        </p>
        <div className="flex max-sm:gap-6 gap-4 max-md:justify-between items-center flex-wrap max-sm:w-full">
          <button
            type="button"
            onClick={() => handleIsForSelfClick(true)}
            className={`px-4 sm:px-8 py-3 rounded-full text-sm sm:text-lg font-estedad-medium transition-all duration-300 flex items-center gap-2 grow justify-center ${
              isForSelf === true
                ? "bg-accent text-white shadow-md"
                : "bg-white text-dark border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            <i className="fas fa-user text-lg"></i>
            <span>برای خودم</span>
            {isForSelf === true && (
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
          <button
            type="button"
            onClick={() => handleIsForSelfClick(false)}
            className={`px-4 sm:px-8 py-3 rounded-full text-sm sm:text-lg font-estedad-medium transition-all duration-300 flex items-center gap-2 grow justify-center ${
              isForSelf === false
                ? "bg-accent text-white shadow-md"
                : "bg-white text-dark border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            <i className="fas fa-user-friends text-lg"></i>
            <span>برای شخصی دیگر</span>
            {isForSelf === false && (
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
        </div>
      </div>

      {/* بخش توضیحات - فقط زمانی نمایش داده می‌شود که هنوز انتخاب نشده باشد */}
      {isForSelf === null && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-accent/10 via-secondary/10 to-primary/10 rounded-2xl p-6 border-2 border-accent/20 shadow-lg">
            <div className="grid md:grid-cols-2 gap-6">
              {/* توضیحات گزینه برای خودم */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-md">
                  <i className="fas fa-user text-white text-lg"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-estedad-bold text-dark mb-2 text-lg">
                    رزرو برای خودم
                  </h4>
                  <p className="text-sm text-gray-700 font-estedad-medium leading-relaxed">
                    اگر خودتان قصد دریافت نوبت دارید، این گزینه را انتخاب کنید. فقط کد ملی شما نیاز است.
                  </p>
                </div>
              </div>

              {/* توضیحات گزینه برای کسی دیگر */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-md">
                  <i className="fas fa-user-friends text-white text-lg"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-estedad-bold text-dark mb-2 text-lg">
                    رزرو برای دیگری
                  </h4>
                  <p className="text-sm text-gray-700 font-estedad-medium leading-relaxed">
                    اگر می‌خواهید برای دیگری نوبت رزرو کنید، این گزینه را انتخاب کنید. نام، نام خانوادگی و کد ملی نیاز است.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* فرم اطلاعات بیمار */}
      {isForSelf !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col gap-4"
        >
          {/* نام و نام خانوادگی - فقط برای کسی دیگر */}
          {isForSelf === false && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-estedad-semibold text-dark mb-2">
                  نام <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={patientFirstName}
                  onChange={(e) => onFirstNameChange(e.target.value)}
                  placeholder="نام بیمار را وارد کنید"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all text-base ${
                    errors.firstName
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-accent"
                  } focus:outline-none focus:ring-2 focus:ring-accent/20`}
                />
                <div className="min-h-[20px] mt-1">
                  <AnimatePresence mode="wait">
                    {errors.firstName && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="text-red-500 text-sm"
                      >
                        {errors.firstName}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div>
                <label className="block text-sm font-estedad-semibold text-dark mb-2">
                  نام خانوادگی <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={patientLastName}
                  onChange={(e) => onLastNameChange(e.target.value)}
                  placeholder="نام خانوادگی بیمار را وارد کنید"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all text-base ${
                    errors.lastName
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-accent"
                  } focus:outline-none focus:ring-2 focus:ring-accent/20`}
                />
                <div className="min-h-[20px] mt-1">
                  <AnimatePresence mode="wait">
                    {errors.lastName && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="text-red-500 text-sm"
                      >
                        {errors.lastName}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}

          {/* کد ملی - همیشه نمایش داده می‌شود */}
          <div>
            <label className="block text-sm font-estedad-semibold text-dark mb-2">
              کد ملی <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={patientNationalId}
              onChange={(e) => {
                // فقط اعداد مجاز
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) {
                  onNationalIdChange(value);
                }
              }}
              disabled={isNationalIdDisabled}
              placeholder={
                isForSelf === true
                  ? "کد ملی خود را وارد کنید"
                  : isForSelf === false
                  ? "کد ملی بیمار را وارد کنید"
                  : "کد ملی را وارد کنید"
              }
              maxLength={10}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all text-base ${
                errors.nationalId
                  ? "border-red-500 focus:border-red-500"
                  : isNationalIdDisabled
                  ? "border-green-400 bg-green-50 text-gray-700 cursor-not-allowed"
                  : "border-gray-300 focus:border-accent"
              } focus:outline-none focus:ring-2 focus:ring-accent/20`}
            />
            <div className="min-h-[20px] mt-1">
              <AnimatePresence mode="wait">
                {isNationalIdDisabled ? (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-green-600 text-sm flex items-center gap-1"
                  >
                    <i className="fas fa-check-circle"></i>
                    کد ملی از پروفایل شما دریافت شد
                  </motion.p>
                ) : errors.nationalId ? (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.nationalId}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          </div>

          {/* فیلد یادداشت (اختیاری) */}
          <div>
            <label className="block text-sm font-estedad-semibold text-dark mb-2">
              یادداشت (اختیاری)
            </label>
            <textarea
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
              placeholder="توضیحات اضافی یا یادداشت را وارد کنید..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all resize-none text-base"
            />
          </div>

          {/* دکمه ادامه */}
          <div className="mt-auto pt-2">
            <button onClick={onContinue} className="main-btn w-full text-base py-3.5">
              ادامه
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
