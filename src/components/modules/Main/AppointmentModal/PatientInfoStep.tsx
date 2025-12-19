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
  onIsForSelfChange,
  onFirstNameChange,
  onLastNameChange,
  onNationalIdChange,
  onNotesChange,
  onContinue,
}: PatientInfoStepProps) {
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
      <div className="mb-8 mt-12">
        <p className="text-lg font-estedad-semibold text-dark mb-4 text-center">
          نوبت برای چه کسی رزرو می‌شود؟
        </p>
        <div className="flex flex-row flex-wrap gap-4 justify-center">
          <button
            type="button"
            onClick={() => handleIsForSelfClick(true)}
            className={`px-4 sm:px-8 py-4 rounded-2xl  font-estedad-semibold transition-all duration-300 flex items-center justify-center gap-2  max-sm:min-w-[174px] sm:w-[236px] border-2 border-gray-300 hover:border-accent hover:shadow-md ${
              isForSelf === true
                ? "bg-accent text-white shadow-lg "
                : "bg-white text-dark "
            }`}
          >
            <i className="fas fa-user mr-2 sm:text-lg"></i>
            <span className="max-sm:text-sm text-nowrap">برای خودم</span>
          </button>
          <button
            type="button"
            onClick={() => handleIsForSelfClick(false)}
            className={`px-4 sm:px-8 py-4 rounded-2xl  font-estedad-semibold transition-all duration-300 flex items-center justify-center gap-2  max-sm:min-w-[174px] sm:w-[236px] border-2 border-gray-300 hover:border-accent hover:shadow-md ${
              isForSelf === false
                ? "bg-accent text-white shadow-lg "
                : "bg-white text-dark "
            }`}
          >
            <i className="fas fa-user-friends mr-2 sm:text-lg"></i>
            <span className="max-sm:text-sm text-nowrap">برای شخصی دیگر</span>
          </button>
        </div>
      </div>

      {/* بخش توضیحات - فقط زمانی نمایش داده می‌شود که هنوز انتخاب نشده باشد */}
      {isForSelf === null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex items-center justify-center"
        >
          <div className="w-full max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-accent/10 via-secondary/10 to-primary/10 rounded-2xl p-8 border-2 border-accent/20 shadow-lg">
              <div className="grid md:grid-cols-2 gap-6">
                {/* توضیحات گزینه برای خودم */}
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-14 h-14 rounded-full bg-secondary flex items-center justify-center shadow-md">
                    <i className="fas fa-user text-white text-xl"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-estedad-bold text-dark mb-2 text-lg">
                      رزرو برای خودم
                    </h4>
                    <p className="text-sm text-gray-700 font-estedad-medium leading-relaxed">
                      اگر خودتان قصد دریافت نوبت دارید، این گزینه را انتخاب
                      کنید. در این صورت فقط کد ملی شما نیاز است و نام و نام
                      خانوادگی از اطلاعات حساب کاربری شما استفاده می‌شود.
                    </p>
                  </div>
                </div>

                {/* توضیحات گزینه برای کسی دیگر */}
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-14 h-14 rounded-full bg-secondary flex items-center justify-center shadow-md">
                    <i className="fas fa-user-friends text-white text-xl"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-estedad-bold text-dark mb-2 text-lg">
                      رزرو برای دیگری
                    </h4>
                    <p className="text-sm text-gray-700 font-estedad-medium leading-relaxed">
                      اگر می‌خواهید برای یکی از اعضای خانواده یا آشنایان نوبت
                      رزرو کنید، این گزینه را انتخاب کنید. در این صورت باید نام،
                      نام خانوادگی و کد ملی شخص مورد نظر را وارد کنید.
                    </p>
                  </div>
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
          className="flex-1 flex flex-col gap-6"
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
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
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
                        className="text-red-500 text-xs"
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
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
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
                        className="text-red-500 text-xs"
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
              placeholder={
                isForSelf === true
                  ? "کد ملی خود را وارد کنید"
                  : isForSelf === false
                  ? "کد ملی بیمار را وارد کنید"
                  : "کد ملی را وارد کنید"
              }
              maxLength={10}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                errors.nationalId
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-accent"
              } focus:outline-none focus:ring-2 focus:ring-accent/20`}
            />
            <div className="min-h-[20px] mt-1">
              <AnimatePresence mode="wait">
                {errors.nationalId && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-red-500 text-xs"
                  >
                    {errors.nationalId}
                  </motion.p>
                )}
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
              rows={4}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all resize-none"
            />
          </div>

          {/* دکمه ادامه */}
          <div className="mt-auto">
            <button onClick={onContinue} className="main-btn w-full">
              ادامه
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
