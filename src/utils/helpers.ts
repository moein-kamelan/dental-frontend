export function formatJalali(dateString: Date) {
  const date = new Date(dateString);

  const parts = new Intl.DateTimeFormat("fa-IR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(date);

  const day = parts.find((p) => p.type === "day")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const year = parts.find((p) => p.type === "year")?.value;

  return `${day} ${month} ${year}`;
}

/**
 * تبدیل نام روزهای هفته از انگلیسی به فارسی
 * @param dayName - نام روز به انگلیسی (مثل: saturday, sunday, ...)
 * @returns نام روز به فارسی
 */
export function translateDayName(dayName: string): string {
  const dayMap: Record<string, string> = {
    saturday: "شنبه",
    sunday: "یکشنبه",
    monday: "دوشنبه",
    tuesday: "سه‌شنبه",
    wednesday: "چهارشنبه",
    thursday: "پنج‌شنبه",
    friday: "جمعه",
  };

  return dayMap[dayName.toLowerCase()] || dayName;
}
