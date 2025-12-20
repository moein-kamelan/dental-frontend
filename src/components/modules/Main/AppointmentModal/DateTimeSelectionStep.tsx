import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import type { Clinic } from "../../../../types/types";

interface DateTimeSelectionStepProps {
  selectedDate: string | null;
  selectedClinic: Clinic | null;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
  onContinue: () => void;
}

interface AvailableDate {
  date: Date;
  jalaliDate: string;
  dayName: string;
  dayNumber: string;
  monthName: string;
  isToday: boolean;
  isTomorrow: boolean;
  isDayAfterTomorrow: boolean;
  isFriday: boolean;
}

// تابع کمکی برای گرفتن روز هفته شمسی (0 = شنبه، 6 = جمعه)
function getJalaliDayOfWeek(date: Date): number {
  const gregorianDay = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  // تبدیل به شمسی: شنبه=0 (Saturday), یکشنبه=1 (Sunday), ..., جمعه=6 (Friday)
  // Mapping: Saturday(6)->0, Sunday(0)->1, Monday(1)->2, Tuesday(2)->3, Wednesday(3)->4, Thursday(4)->5, Friday(5)->6
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

// تابع کمکی برای فرمت تاریخ شمسی
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

// تابع کمکی برای گرفتن نام روز هفته
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

// تابع کمکی برای تبدیل روز هفته شمسی به کلید انگلیسی
function getEnglishDayKey(dayOfWeek: number): string {
  const dayKeys: Record<number, string> = {
    0: "saturday",
    1: "sunday",
    2: "monday",
    3: "tuesday",
    4: "wednesday",
    5: "thursday",
    6: "friday",
  };
  return dayKeys[dayOfWeek] || "";
}

// تابع کمکی برای فرمت تاریخ به YYYY-MM-DD
function formatDateToString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// تابع کمکی برای بررسی اینکه آیا دو تاریخ در یک روز هستند
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function DateTimeSelectionStep({
  selectedDate,
  selectedClinic,
  onDateSelect,
  onTimeSelect,
}: Omit<DateTimeSelectionStepProps, "onContinue">) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  // تولید لیست روزهای قابل انتخاب (امروز تا 3 روز بعد، شامل جمعه)
  const availableDates = useMemo<AvailableDate[]>(() => {
    const dates: AvailableDate[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // تنظیم ساعت به ابتدای روز
    let currentDate = new Date(today);

    // تا زمانی که 4 روز پیدا کنیم (شامل جمعه)
    while (dates.length < 4) {
      const dayOfWeek = getJalaliDayOfWeek(currentDate);
      const isFriday = dayOfWeek === 6;

      const isToday = isSameDay(currentDate, today);
      // بررسی اینکه آیا فردا است
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const isTomorrow = isSameDay(currentDate, tomorrow);
      // بررسی اینکه آیا پسفردا است
      const dayAfterTomorrow = new Date(today);
      dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
      const isDayAfterTomorrow = isSameDay(currentDate, dayAfterTomorrow);
      const jalaliDate = formatJalaliDate(currentDate);

      dates.push({
        date: new Date(currentDate),
        jalaliDate: `${jalaliDate.year}/${jalaliDate.month}/${jalaliDate.day}`,
        dayName: getDayName(dayOfWeek),
        dayNumber: jalaliDate.day,
        monthName: jalaliDate.month,
        isToday,
        isTomorrow,
        isDayAfterTomorrow,
        isFriday,
      });

      // رفتن به روز بعد
      currentDate = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }, []);

  const handleDateClick = (date: Date) => {
    const dateString = formatDateToString(date);
    onDateSelect(dateString);
    setSelectedTime(null); // Reset زمان انتخاب شده هنگام تغییر تاریخ
  };

  // تولید زمان‌های رزرو (10 دقیقه‌ای)
  const availableTimes = useMemo(() => {
    if (!selectedDate || !selectedClinic) return [];

    const times: string[] = [];
    const selectedDateObj = new Date(selectedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isToday = isSameDay(selectedDateObj, today);

    // دریافت روز هفته شمسی
    const jalaliDayOfWeek = getJalaliDayOfWeek(selectedDateObj);
    const englishDayKey = getEnglishDayKey(jalaliDayOfWeek);

    // دریافت ساعت کاری کلینیک برای این روز
    if (
      !selectedClinic?.workingHours ||
      !selectedClinic.workingHours[englishDayKey]
    ) {
      return []; // اگر کلینیک در این روز ساعت کاری ندارد، هیچ زمانی نمایش نمی‌دهیم
    }

    const workingHoursString = selectedClinic.workingHours[englishDayKey];
    if (!workingHoursString || typeof workingHoursString !== "string") {
      return [];
    }

    // تقسیم بازه‌های زمانی با & (ممکن است چند بازه داشته باشد)
    const timeRanges = workingHoursString
      .split("&")
      .map((range) => range.trim());

    // پردازش هر بازه زمانی
    for (const timeRange of timeRanges) {
      if (!timeRange.includes("-")) continue;

      const [start, end] = timeRange.split("-").map((t) => t.trim());
      const [startHour, startMin] = start.split(":").map(Number);
      const [endHour, endMin] = end.split(":").map(Number);

      // بررسی صحت مقادیر
      if (
        isNaN(startHour) ||
        isNaN(startMin) ||
        isNaN(endHour) ||
        isNaN(endMin)
      ) {
        continue;
      }

      let rangeStartHour = startHour;
      let rangeStartMinute = startMin;

      // اگر امروز است، از یک ساعت بعد یا ساعت شروع کاری (هر کدام بزرگتر است) شروع می‌کنیم
      if (isToday) {
        const now = new Date();
        const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000); // یک ساعت بعد
        const laterHour = oneHourLater.getHours();
        const laterMinute = Math.ceil(oneHourLater.getMinutes() / 10) * 10; // گرد کردن به بالا به مضرب 10

        // اگر زمان یک ساعت بعد، بعد از ساعت شروع کاری است، از همان استفاده می‌کنیم
        if (
          laterHour > rangeStartHour ||
          (laterHour === rangeStartHour && laterMinute >= rangeStartMinute)
        ) {
          rangeStartHour = laterHour;
          rangeStartMinute = laterMinute;

          // اگر دقیقه 60 شد، ساعت را افزایش می‌دهیم
          if (rangeStartMinute >= 60) {
            rangeStartHour += 1;
            rangeStartMinute = 0;
          }
        }
      }

      // اگر ساعت شروع بعد از ساعت پایان است، این بازه را نادیده می‌گیریم
      if (
        rangeStartHour > endHour ||
        (rangeStartHour === endHour && rangeStartMinute >= endMin)
      ) {
        continue; // به بازه بعدی برو
      }

      // تولید زمان‌ها از ساعت شروع تا ساعت پایان این بازه
      let currentHour = rangeStartHour;
      let currentMinute = rangeStartMinute;

      while (
        currentHour < endHour ||
        (currentHour === endHour && currentMinute <= endMin)
      ) {
        const timeString = `${String(currentHour).padStart(2, "0")}:${String(
          currentMinute
        ).padStart(2, "0")}`;
        times.push(timeString);

        // افزایش 10 دقیقه
        currentMinute += 10;
        if (currentMinute >= 60) {
          currentHour += 1;
          currentMinute = 0;
        }

        // اگر از ساعت پایان گذشته‌ایم، متوقف می‌شویم
        if (
          currentHour > endHour ||
          (currentHour === endHour && currentMinute > endMin)
        ) {
          break;
        }
      }
    }

    // حذف زمان‌های تکراری و مرتب‌سازی
    return Array.from(new Set(times)).sort();
  }, [selectedDate, selectedClinic]);

  // فرمت زمان برای نمایش (تبدیل به فارسی)
  const formatTimeForDisplay = (time: string): string => {
    // تبدیل اعداد انگلیسی به فارسی
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return time.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    onTimeSelect(time);
  };

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
          انتخاب تاریخ نوبت
        </h2>
      </div>

      {/* لیست روزهای قابل انتخاب */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <p className="text-lg font-estedad-semibold text-dark text-center">
          لطفاً تاریخ مورد نظر خود را انتخاب کنید
        </p>

        <div className="md:mt-8 lg:mt-20 grid grid-cols-2 min-[360px]:grid-cols-4 gap-2 sm:gap-3 md:gap-4 w-full max-w-5xl">
          {availableDates.map((availableDate, index) => {
            const dateString = formatDateToString(availableDate.date);
            const isSelected = selectedDate === dateString;
            const isDisabled = availableDate.isFriday;

            return (
              <motion.button
                key={index}
                type="button"
                onClick={() =>
                  !isDisabled && handleDateClick(availableDate.date)
                }
                disabled={isDisabled}
                className={`group relative  flex flex-col items-center justify-center gap-1 sm:gap-2   px-2 py-8 sm:py-10 md:py-8 sm:px-3 md:px-4  min-h-[90px] sm:min-h-[100px] md:min-h-[110px] rounded-xl sm:rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                  isDisabled
                    ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed opacity-60"
                    : isSelected
                    ? "bg-gradient-to-br from-accent via-accent to-secondary text-white border-accent shadow-xl shadow-accent/50"
                    : "bg-white text-dark border-gray-200 hover:bg-gradient-to-br hover:from-accent hover:via-accent hover:to-secondary hover:text-white hover:border-accent hover:shadow-xl hover:shadow-accent/50"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={
                  !isDisabled
                    ? {
                        scale: 1.03,
                        y: -4,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        },
                      }
                    : {}
                }
                whileTap={!isDisabled ? { scale: 0.95 } : {}}
              >
                {/* افکت درخشان برای حالت انتخاب شده و هاور - فقط برای روزهای غیر جمعه */}
                {!isDisabled && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={
                      isSelected
                        ? {
                            backgroundPosition: ["0% 0%", "100% 100%"],
                          }
                        : {}
                    }
                    transition={
                      isSelected
                        ? {
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }
                        : { duration: 0.3 }
                    }
                  />
                )}

                {/* برچسب امروز */}
                {availableDate.isToday && (
                  <motion.span
                    className="absolute top-1 right-1 sm:top-2 sm:right-2 text-[9px] sm:text-xs font-estedad-bold bg-secondary text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full shadow-md z-10"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      delay: index * 0.1 + 0.2,
                    }}
                  >
                    امروز
                  </motion.span>
                )}

                {/* برچسب فردا */}
                {availableDate.isTomorrow && (
                  <motion.span
                    className="absolute top-1 right-1 sm:top-2 sm:right-2 text-[9px] sm:text-xs font-estedad-bold bg-secondary text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full shadow-md z-10"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      delay: index * 0.1 + 0.2,
                    }}
                  >
                    فردا
                  </motion.span>
                )}

                {/* برچسب پسفردا */}
                {availableDate.isDayAfterTomorrow && (
                  <motion.span
                    className="absolute top-1 right-1 sm:top-2 sm:right-2 text-[9px] sm:text-xs font-estedad-bold bg-secondary text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full shadow-md z-10"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      delay: index * 0.1 + 0.2,
                    }}
                  >
                    پسفردا
                  </motion.span>
                )}

                {/* آیکون تیک برای حالت انتخاب شده - فقط برای روزهای غیر تعطیل */}
                {!isDisabled && isSelected && (
                  <motion.div
                    className="absolute top-1.5 left-1.5 sm:top-2 md:top-3 sm:left-2 md:left-3 z-10 opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 15,
                    }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/30 rounded-full blur-md animate-pulse" />
                      <i className="fas fa-check-circle text-lg sm:text-xl md:text-2xl text-white relative z-10 drop-shadow-lg" />
                    </div>
                  </motion.div>
                )}

                {/* پیام تعطیل بودن کلینیک - همیشه نمایش داده می‌شود برای روزهای تعطیل در پایین کارت */}
                {isDisabled && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 z-20 w-full opacity-100"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-red-500 text-white px-1.5 py-0.5 sm:px-2 md:px-3 sm:py-1 md:py-1.5 rounded-b-xl sm:rounded-b-2xl shadow-lg text-[8px] sm:text-[9px] md:text-[10px] font-estedad-semibold text-center w-full">
                      <i className="fas fa-exclamation-circle ml-0.5 sm:ml-1 text-[8px] sm:text-[9px] md:text-[10px]"></i>
                      کلینیک تعطیل می‌باشد
                    </div>
                  </motion.div>
                )}

                {/* محتوای کارت */}
                <div className="relative z-10 flex flex-col items-center gap-1.5">
                  {/* نام روز */}
                  <motion.span
                    className={`text-xs sm:text-sm font-estedad-semibold tracking-wide transition-colors duration-300 ${
                      isDisabled
                        ? "text-gray-400"
                        : isSelected
                        ? "text-white/95"
                        : "text-gray-500 group-hover:text-white/95"
                    }`}
                    whileHover={!isDisabled ? { scale: 1.1 } : {}}
                  >
                    {availableDate.dayName}
                  </motion.span>

                  {/* شماره روز */}
                  <motion.div
                    className={`relative transition-colors duration-300 ${
                      isDisabled
                        ? "text-gray-400"
                        : isSelected
                        ? "text-white"
                        : "text-dark group-hover:text-white"
                    }`}
                    whileHover={!isDisabled ? { scale: 1.15 } : {}}
                  >
                    {!isDisabled && (
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1.2 }}
                      />
                    )}
                    <span className="relative text-xl sm:text-2xl md:text-3xl font-estedad-bold leading-none">
                      {availableDate.dayNumber}
                    </span>
                  </motion.div>

                  {/* نام ماه */}
                  <motion.span
                    className={`text-xs md:text-sm font-estedad-medium transition-colors duration-300 ${
                      isDisabled
                        ? "text-gray-400"
                        : isSelected
                        ? "text-white/90"
                        : "text-gray-600 group-hover:text-white/90"
                    }`}
                    whileHover={!isDisabled ? { scale: 1.05 } : {}}
                  >
                    {availableDate.monthName}
                  </motion.span>
                </div>

                {/* خط تزئینی پایین برای حالت انتخاب شده و هاور - فقط برای روزهای غیر جمعه */}
                {!isDisabled && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={isSelected ? { scaleX: 0 } : false}
                    animate={isSelected ? { scaleX: 1 } : {}}
                    transition={isSelected ? { duration: 0.5 } : {}}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* بخش انتخاب زمان - همیشه نمایش داده می‌شود */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-5xl mt-8"
        >
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
            <h3 className="text-lg font-estedad-semibold text-dark mb-4 text-center">
              انتخاب زمان نوبت
            </h3>
            {selectedDate ? (
              <>
                {availableTimes.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 mt-4">
                    {availableTimes.map((time, index) => {
                      const isSelected = selectedTime === time;
                      return (
                        <motion.button
                          key={index}
                          type="button"
                          onClick={() => handleTimeClick(time)}
                          className={`group relative px-4 py-3 rounded-xl border-2 transition-all duration-300 text-center ${
                            isSelected
                              ? "bg-accent text-white border-accent shadow-lg"
                              : "bg-white text-dark border-green-500 hover:border-accent hover:shadow-md"
                          }`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.2,
                            delay: index * 0.02,
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {isSelected && (
                            <motion.i
                              className="fas fa-check-circle absolute top-1 right-1 text-sm"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                              }}
                            />
                          )}
                          <span className="text-sm font-estedad-semibold">
                            {formatTimeForDisplay(time)}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center mt-4">
                    برای این تاریخ زمانی در دسترس نیست
                  </p>
                )}
              </>
            ) : (
              <p className="text-sm text-gray-500 text-center">
                لطفاً ابتدا تاریخ مورد نظر خود را انتخاب کنید
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
