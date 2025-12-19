import React, { useMemo } from "react";
import { motion } from "motion/react";

interface DateTimeSelectionStepProps {
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
  onContinue: () => void;
}

interface AvailableDate {
  date: Date;
  jalaliDate: string;
  dayName: string;
  dayNumber: string;
  monthName: string;
  isToday: boolean;
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
  onDateSelect,
  onContinue,
}: DateTimeSelectionStepProps) {
  // تولید لیست روزهای قابل انتخاب (امروز تا 3 روز بعد، به جز جمعه)
  const availableDates = useMemo<AvailableDate[]>(() => {
    const dates: AvailableDate[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // تنظیم ساعت به ابتدای روز
    let currentDate = new Date(today);

    // اگر امروز جمعه است، از فردا شروع می‌کنیم
    if (getJalaliDayOfWeek(currentDate) === 6) {
      // 6 = جمعه
      currentDate = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // تا زمانی که 4 روز غیر جمعه پیدا کنیم
    while (dates.length < 4) {
      const dayOfWeek = getJalaliDayOfWeek(currentDate);

      // اگر جمعه نیست، به لیست اضافه می‌کنیم
      if (dayOfWeek !== 6) {
        const isToday = isSameDay(currentDate, today);
        const jalaliDate = formatJalaliDate(currentDate);

        dates.push({
          date: new Date(currentDate),
          jalaliDate: `${jalaliDate.year}/${jalaliDate.month}/${jalaliDate.day}`,
          dayName: getDayName(dayOfWeek),
          dayNumber: jalaliDate.day,
          monthName: jalaliDate.month,
          isToday,
        });
      }

      // رفتن به روز بعد
      currentDate = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }, []);

  const handleDateClick = (date: Date) => {
    const dateString = formatDateToString(date);
    onDateSelect(dateString);
    // بلافاصله بعد از انتخاب تاریخ به مرحله بعد می‌رویم
    setTimeout(() => {
      onContinue();
    }, 200); // یک تاخیر کوتاه برای نمایش انیمیشن انتخاب
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

        <div className="md:mt-8 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
          {availableDates.map((availableDate, index) => {
            const dateString = formatDateToString(availableDate.date);
            const isSelected = selectedDate === dateString;

            return (
              <motion.button
                key={index}
                type="button"
                onClick={() => handleDateClick(availableDate.date)}
                className={`group relative flex flex-col items-center justify-center gap-4 p-8 min-h-[180px] rounded-3xl border-2 overflow-hidden transition-all duration-300 ${
                  isSelected
                    ? "bg-gradient-to-br from-accent via-accent to-secondary text-white border-accent shadow-2xl shadow-accent/50"
                    : "bg-white text-dark border-gray-200 hover:bg-gradient-to-br hover:from-accent hover:via-accent hover:to-secondary hover:text-white hover:border-accent hover:shadow-2xl hover:shadow-accent/50"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  },
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* افکت درخشان برای حالت انتخاب شده و هاور */}
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

                {/* برچسب امروز */}
                {availableDate.isToday && (
                  <motion.span
                    className="absolute top-3 left-3 text-xs font-estedad-bold bg-gradient-to-r from-secondary to-primary text-white px-3 py-1.5 rounded-full shadow-md z-10"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      delay: index * 0.1 + 0.2,
                    }}
                  >
                    <i className="fas fa-circle-dot ml-1 text-[8px]"></i>
                    امروز
                  </motion.span>
                )}

                {/* آیکون تیک برای حالت انتخاب شده و هاور */}
                <motion.div
                  className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={isSelected ? { scale: 0, rotate: -180 } : false}
                  animate={isSelected ? { scale: 1, rotate: 0 } : {}}
                  transition={
                    isSelected
                      ? {
                          type: "spring",
                          stiffness: 500,
                          damping: 15,
                        }
                      : {}
                  }
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/30 rounded-full blur-md animate-pulse" />
                    <i className="fas fa-check-circle text-2xl text-white relative z-10 drop-shadow-lg" />
                  </div>
                </motion.div>

                {/* محتوای کارت */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  {/* نام روز */}
                  <motion.span
                    className={`text-base font-estedad-semibold tracking-wide transition-colors duration-300 ${
                      isSelected
                        ? "text-white/95"
                        : "text-gray-500 group-hover:text-white/95"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {availableDate.dayName}
                  </motion.span>

                  {/* شماره روز */}
                  <motion.div
                    className={`relative transition-colors duration-300 ${
                      isSelected
                        ? "text-white"
                        : "text-dark group-hover:text-white"
                    }`}
                    whileHover={{ scale: 1.15 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1.2 }}
                    />
                    <span className="relative text-5xl font-estedad-bold leading-none">
                      {availableDate.dayNumber}
                    </span>
                  </motion.div>

                  {/* نام ماه */}
                  <motion.span
                    className={`text-base font-estedad-medium transition-colors duration-300 ${
                      isSelected
                        ? "text-white/90"
                        : "text-gray-600 group-hover:text-white/90"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {availableDate.monthName}
                  </motion.span>
                </div>

                {/* خط تزئینی پایین برای حالت انتخاب شده و هاور */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={isSelected ? { scaleX: 0 } : false}
                  animate={isSelected ? { scaleX: 1 } : {}}
                  transition={isSelected ? { duration: 0.5 } : {}}
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
