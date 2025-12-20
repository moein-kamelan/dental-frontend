import React, { useState } from "react";
import { motion } from "motion/react";
import type { Clinic, Doctor } from "../../../../types/types";
import { useCreateAppointment } from "../../../../services/useAppointments";

interface ConfirmationStepProps {
  selectedClinic: Clinic | null;
  selectedDoctor: Doctor | null;
  selectedDate: string | null;
  selectedTime: string | null;
  isForSelf: boolean | null;
  patientFirstName: string;
  patientLastName: string;
  patientNationalId: string;
  notes: string;
  onBack: () => void;
  onClose: () => void;
}

// تابع برای فرمت تاریخ شمسی
function formatJalaliDate(date: Date): {
  day: string;
  month: string;
  year: string;
} {
  const formatter = new Intl.DateTimeFormat("fa-IR", {
    calendar: "persian",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const parts = formatter.formatToParts(date);
  const day = parts.find((p) => p.type === "day")?.value || "";
  const month = parts.find((p) => p.type === "month")?.value || "";
  const year = parts.find((p) => p.type === "year")?.value || "";

  return { day, month, year };
}

// تابع برای گرفتن نام روز هفته
function getJalaliDayOfWeek(date: Date): number {
  const gregorianDay = date.getDay();
  const jalaliDayMap: Record<number, number> = {
    6: 0, // Saturday -> شنبه
    0: 1, // Sunday -> یکشنبه
    1: 2, // Monday -> دوشنبه
    2: 3, // Tuesday -> سه‌شنبه
    3: 4, // Wednesday -> چهارشنبه
    4: 5, // Thursday -> پنج‌شنبه
    5: 6, // Friday -> جمعه
  };
  return jalaliDayMap[gregorianDay] ?? 0;
}

function getDayName(dayOfWeek: number): string {
  const dayNames: Record<number, string> = {
    0: "شنبه",
    1: "یکشنبه",
    2: "دوشنبه",
    3: "سه‌شنبه",
    4: "چهارشنبه",
    5: "پنج‌شنبه",
    6: "جمعه",
  };
  return dayNames[dayOfWeek] || "";
}

// فرمت زمان برای نمایش (تبدیل به فارسی)
const formatTimeForDisplay = (time: string): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return time.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

export function ConfirmationStep({
  selectedClinic,
  selectedDoctor,
  selectedDate,
  selectedTime,
  isForSelf,
  patientFirstName,
  patientLastName,
  patientNationalId,
  notes,
  onBack,
  onClose,
}: ConfirmationStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { mutateAsync: createAppointment } = useCreateAppointment();

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime || !selectedClinic || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      // ترکیب تاریخ و زمان برای ایجاد appointmentDate
      const [hour, minute] = selectedTime.split(":").map(Number);
      const selectedDateObj = new Date(selectedDate);
      selectedDateObj.setHours(hour, minute, 0, 0);

      // ساخت نام بیمار
      const patientName =
        isForSelf === false && patientFirstName && patientLastName
          ? `${patientFirstName} ${patientLastName}`
          : null;

      // آماده‌سازی داده‌های درخواست
      const appointmentData = {
        clinicId: selectedClinic.id,
        doctorId: selectedDoctor?.id || null,
        appointmentDate: selectedDateObj.toISOString(),
        patientName,
        nationalCode: patientNationalId || null,
        notes: notes || null,
      };

      await createAppointment(appointmentData);

      // در صورت موفقیت
      setSubmitStatus("success");
      setIsSubmitting(false);

      // بعد از 2 ثانیه modal را ببند
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error: unknown) {
      console.error("خطا در ثبت نوبت:", error);
      setSubmitStatus("error");
      setIsSubmitting(false);
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "خطا در ثبت نوبت. لطفاً دوباره تلاش کنید.";
      setErrorMessage(errorMessage);
    }
  };

  // محاسبه اطلاعات نمایشی
  const displayDate = selectedDate
    ? (() => {
        const dateObj = new Date(selectedDate);
        const jalaliDate = formatJalaliDate(dateObj);
        const dayOfWeek = getJalaliDayOfWeek(dateObj);
        const dayName = getDayName(dayOfWeek);
        return `${dayName} ${jalaliDate.day} ${jalaliDate.month} ${jalaliDate.year}`;
      })()
    : "";

  const displayTime = selectedTime ? formatTimeForDisplay(selectedTime) : "";

  return (
    <motion.div
      className="flex h-full flex-col"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      <div className="flex items-center justify-center gap-2 my-4">
        <h2 className="text-2xl font-iran-sans-bold text-dark text-center">
          تایید نهایی نوبت
        </h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 overflow-y-auto">
        {submitStatus === "idle" && (
          <>
            <p className="text-lg font-estedad-semibold text-dark text-center">
              لطفاً اطلاعات زیر را بررسی کنید و در صورت صحت، تایید کنید
            </p>

            {/* اطلاعات نوبت */}
            <div className="w-full max-w-2xl bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {/* هدر با گرادیانت */}
              <div className="bg-gradient-to-r from-accent via-accent to-secondary p-4 text-center">
                <h3 className="text-white font-estedad-bold text-xl flex items-center justify-center gap-2">
                  <i className="fas fa-clipboard-check"></i>
                  خلاصه اطلاعات نوبت
                </h3>
              </div>

              <div className="p-5 space-y-3">
                {/* کلینیک */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-hospital text-accent text-lg"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-estedad-medium text-gray-400 mb-0.5">
                      کلینیک
                    </p>
                    <p className="text-base font-estedad-bold text-dark truncate">
                      {selectedClinic?.name || "-"}
                    </p>
                  </div>
                </motion.div>

                {/* پزشک */}
                {selectedDoctor && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-400/10 rounded-lg flex items-center justify-center">
                      <i className="fas fa-user-doctor text-blue-500 text-lg"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-estedad-medium text-gray-400 mb-0.5">
                        پزشک
                      </p>
                      <p className="text-base font-estedad-bold text-dark truncate">
                        دکتر {selectedDoctor.firstName}{" "}
                        {selectedDoctor.lastName}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* تاریخ و زمان */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500/20 to-purple-400/10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-calendar-clock text-purple-500 text-lg"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-estedad-medium text-gray-400 mb-0.5">
                      تاریخ و زمان
                    </p>
                    <p className="text-base font-estedad-bold text-dark">
                      {displayDate}{" "}
                      <span className="text-accent">ساعت {displayTime}</span>
                    </p>
                  </div>
                </motion.div>

                {/* اطلاعات بیمار */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500/20 to-green-400/10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-user text-green-500 text-lg"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-estedad-medium text-gray-400 mb-0.5">
                      {isForSelf === false ? "مراجع" : "بیمار"}
                    </p>
                    <p className="text-base font-estedad-bold text-dark truncate">
                      {isForSelf === false &&
                      patientFirstName &&
                      patientLastName
                        ? `${patientFirstName} ${patientLastName}`
                        : "خودم"}
                    </p>
                    {patientNationalId && (
                      <p className="text-xs font-estedad-medium text-gray-500 mt-1">
                        کد ملی: {patientNationalId}
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* توضیحات */}
                {notes && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-start gap-3 bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-500/20 to-amber-400/10 rounded-lg flex items-center justify-center mt-0.5">
                      <i className="fas fa-note-sticky text-amber-500 text-lg"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-estedad-medium text-gray-400 mb-1">
                        توضیحات
                      </p>
                      <p className="text-sm font-estedad-medium text-dark leading-relaxed">
                        {notes}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* دکمه‌های اقدام */}
            <div className="flex items-center justify-center gap-4 w-full max-w-2xl">
              <motion.button
                onClick={onBack}
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl border-2 border-gray-300 text-dark font-estedad-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              >
                بازگشت
              </motion.button>
              <motion.button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="px-8 py-3 rounded-xl bg-gradient-to-br from-accent via-accent to-secondary text-white font-estedad-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    در حال ثبت...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check-circle"></i>
                    تایید و ثبت نوبت
                  </>
                )}
              </motion.button>
            </div>
          </>
        )}

        {/* پیام موفقیت */}
        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <i className="fas fa-check text-white text-3xl"></i>
            </motion.div>
            <h3 className="text-2xl font-estedad-bold text-green-800 mb-2">
              نوبت با موفقیت ثبت شد!
            </h3>
            <p className="text-base font-estedad-medium text-green-700">
              نوبت شما در سیستم ثبت شد و در دست بررسی می‌باشد. لطفاً تا تأیید
              نهایی صبر کنید.
            </p>
          </motion.div>
        )}

        {/* پیام خطا */}
        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
              className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <i className="fas fa-times text-white text-3xl"></i>
            </motion.div>
            <h3 className="text-2xl font-estedad-bold text-red-800 mb-2">
              خطا در ثبت نوبت
            </h3>
            <p className="text-base font-estedad-medium text-red-700 mb-4">
              {errorMessage}
            </p>
            <motion.button
              onClick={() => {
                setSubmitStatus("idle");
                setErrorMessage("");
              }}
              className="px-6 py-3 rounded-xl bg-red-500 text-white font-estedad-semibold hover:bg-red-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              تلاش مجدد
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
