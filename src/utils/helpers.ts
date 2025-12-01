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

export function formatPersianNameForGreeting(firstName: string | null | undefined): string {
  if (!firstName || typeof firstName !== 'string') {
    return '';
  }

  const trimmedName = firstName.trim();
  
  if (trimmedName.length === 0) {
    return '';
  }

  const lastChar = trimmedName[trimmedName.length - 1];
  const lastCharCode = lastChar.charCodeAt(0);
  
  if (lastCharCode === 0x0627) {
    return trimmedName + 'ی';
  }
  
  return trimmedName;
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

/**
 * حذف تگ‌های HTML از متن و تبدیل به متن خالص
 * @param html - متن HTML
 * @returns متن خالص بدون تگ‌های HTML
 */
export function stripHtmlTags(html: string): string {
  if (!html) return "";

  // استفاده از DOMParser برای امن‌تر بودن
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || doc.body.innerText || "";
}
