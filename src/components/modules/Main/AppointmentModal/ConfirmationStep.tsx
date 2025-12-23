import React, { useState } from "react";
import { motion } from "motion/react";
import type { Clinic, Doctor } from "../../../../types/types";
import { useCreateAppointment } from "../../../../services/useAppointments";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";

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
  const user = useSelector((state: RootState) => state.user.data);

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
      <div className="flex items-center justify-center gap-2 mb-3">
        <h2 className="text-2xl font-iran-sans-bold text-dark text-center">
          تایید نهایی نوبت
        </h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-3 overflow-y-auto px-2">
        {submitStatus === "idle" && (
          <>
            <p className="text-base font-estedad-medium text-gray-600 text-center mb-2">
              لطفاً اطلاعات زیر را بررسی کنید و در صورت صحت، تایید کنید
            </p>

            {/* اطلاعات نوبت */}
            <div className="w-full max-w-xl bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md border border-gray-100 overflow-hidden">
              {/* هدر با گرادیانت */}
              <div className="bg-gradient-to-r from-accent via-accent to-secondary p-3 text-center">
                <h3 className="text-white font-estedad-semibold text-lg flex items-center justify-center gap-2">
                  <i className="fas fa-clipboard-check"></i>
                  خلاصه اطلاعات نوبت
                </h3>
              </div>

              <div className="p-4 space-y-2.5">
                {/* کلینیک */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-2.5 bg-white rounded-lg p-2.5 shadow-sm"
                >
                  <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-hospital text-accent"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-estedad-medium text-gray-400 mb-1">
                      کلینیک
                    </p>
                    <p className="text-base font-estedad-semibold text-dark truncate">
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
                    className="flex items-center gap-2.5 bg-white rounded-lg p-2.5 shadow-sm"
                  >
                    <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-blue-500/20 to-blue-400/10 rounded-lg flex items-center justify-center">
                      <i className="fas fa-user-md text-blue-500"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-estedad-medium text-gray-400 mb-1">
                        پزشک
                      </p>
                      <p className="text-base font-estedad-semibold text-dark truncate">
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
                  className="flex items-center gap-2.5 bg-white rounded-lg p-2.5 shadow-sm"
                >
                  <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-purple-500/20 to-purple-400/10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-calendar-alt text-purple-500"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-estedad-medium text-gray-400 mb-1">
                      تاریخ و زمان
                    </p>
                    <p className="text-base font-estedad-semibold text-dark">
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
                  className="flex items-center gap-2.5 bg-white rounded-lg p-2.5 shadow-sm"
                >
                  <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-green-500/20 to-green-400/10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-user text-green-500"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-estedad-medium text-gray-400 mb-1">
                      {isForSelf === false ? "مراجع" : "بیمار"}
                    </p>
                    <p className="text-base font-estedad-semibold text-dark truncate">
                      {isForSelf === false &&
                      patientFirstName &&
                      patientLastName
                        ? `${patientFirstName} ${patientLastName}`
                        : user?.firstName && user?.lastName
                        ? `${user.firstName} ${user.lastName}`
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
                    className="flex items-start gap-2.5 bg-white rounded-lg p-2.5 shadow-sm"
                  >
                    <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-amber-500/20 to-amber-400/10 rounded-lg flex items-center justify-center mt-0.5">
                      <i className="fas fa-note-sticky text-amber-500"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-estedad-medium text-gray-400 mb-1">
                        توضیحات
                      </p>
                      <p className="text-sm font-estedad-medium text-dark leading-relaxed line-clamp-2">
                        {notes}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* دکمه‌های اقدام */}
            <div className="flex items-center justify-center gap-3 w-full max-w-xl mt-2">
              <motion.button
                onClick={onBack}
                disabled={isSubmitting}
                className="px-4 py-2.5 rounded-lg bg-white/80 backdrop-blur-md border border-gray-200/50 text-gray-700 text-sm font-estedad-semibold hover:bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 group"
              >
                <i className="fas fa-arrow-right text-xs group-hover:translate-x-0.5 transition-transform"></i>
                <span>بازگشت</span>
              </motion.button>
              <motion.button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-primary via-primary/95 to-accent text-white text-sm font-estedad-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin text-xs"></i>
                    <span>در حال ثبت...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-check-circle text-xs"></i>
                    <span>تایید و ثبت نوبت</span>
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
            className="w-full max-w-xl bg-green-50 border border-green-200 rounded-xl p-5 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
              className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3"
            >
              <i className="fas fa-check text-white text-xl"></i>
            </motion.div>
            <h3 className="text-lg font-estedad-bold text-green-800 mb-2">
              نوبت با موفقیت ثبت شد!
            </h3>
            <p className="text-sm font-estedad-medium text-green-700 mb-4">
              نوبت شما در سیستم ثبت شد و در دست بررسی می‌باشد. لطفاً تا تأیید
              نهایی صبر کنید.
            </p>
            <motion.button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-green-500 text-white text-sm font-estedad-semibold hover:bg-green-600 transition-colors"
            >
              بستن
            </motion.button>
          </motion.div>
        )}

        {/* پیام خطا */}
        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl bg-red-50 border border-red-200 rounded-xl p-5 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
              className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3"
            >
              <i className="fas fa-times text-white text-xl"></i>
            </motion.div>
            <h3 className="text-lg font-estedad-bold text-red-800 mb-2">
              خطا در ثبت نوبت
            </h3>
            <p className="text-sm font-estedad-medium text-red-700 mb-4">
              {errorMessage}
            </p>
            <motion.button
              onClick={() => {
                setSubmitStatus("idle");
                setErrorMessage("");
              }}
              className="px-5 py-2 rounded-lg bg-red-500 text-white text-sm font-estedad-semibold hover:bg-red-600 transition-colors"
            >
              تلاش مجدد
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
