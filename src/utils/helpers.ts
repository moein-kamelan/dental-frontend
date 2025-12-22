// @ts-expect-error - moment-jalaali doesn't have types
import moment from "moment-jalaali";

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

export function formatPersianNameForGreeting(
  firstName: string | null | undefined
): string {
  if (!firstName || typeof firstName !== "string") {
    return "";
  }

  const trimmedName = firstName.trim();

  if (trimmedName.length === 0) {
    return "";
  }

  const lastChar = trimmedName[trimmedName.length - 1];
  const lastCharCode = lastChar.charCodeAt(0);

  if (lastCharCode === 0x0627) {
    return trimmedName + "ی";
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

// تابع برای ترکیب تاریخ و زمان
export const combineDateAndTime = (
  date: string,
  time: string,
  isEndDate: boolean = false
): string | undefined => {
  if (!date) return undefined;
  if (!time) {
    if (isEndDate) {
      // برای تاریخ پایان، اگر زمان مشخص نشده، از پایان روز استفاده می‌کنیم
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      return endOfDay.toISOString();
    } else {
      // برای تاریخ شروع، اگر زمان مشخص نشده، از ابتدای روز استفاده می‌کنیم
      return new Date(date).toISOString();
    }
  }
  const dateTime = new Date(`${date}T${time}`);
  return dateTime.toISOString();
};

/**
 * ساخت URL کامل برای تصاویر و فایل‌ها بر اساس محیط (development/production)
 * @param path - مسیر نسبی یا کامل فایل
 * @returns URL کامل برای استفاده در src یا href
 */
export function getImageUrl(path: string | null | undefined): string {
  if (!path) return "";

  // اگر URL کامل است (شروع با http:// یا https://)، آن را برگردان
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  // دریافت backendBaseUrl از environment variable
  const rawBackendBase =
    import.meta.env.VITE_BACKEND_URL ||
    (import.meta.env.DEV ? "http://localhost:4000" : "");

  const backendBaseUrl = rawBackendBase.replace(/\/$/, "");

  // اگر backendBaseUrl وجود دارد، مسیر را با آن ترکیب کن
  if (backendBaseUrl) {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${backendBaseUrl}${normalizedPath}`;
  }

  // در غیر این صورت، مسیر نسبی را برگردان
  return path;
}

/**
 * ساخت URL کامل برای API endpoints بر اساس محیط (development/production)
 * @param endpoint - endpoint نسبی (مثل /api/upload)
 * @returns URL کامل برای استفاده در fetch یا axios
 */
export function getApiUrl(endpoint: string): string {
  if (!endpoint) return "";

  // اگر URL کامل است، آن را برگردان
  if (/^https?:\/\//i.test(endpoint)) {
    return endpoint;
  }

  // دریافت backendBaseUrl از environment variable
  const rawBackendBase =
    import.meta.env.VITE_BACKEND_URL ||
    (import.meta.env.DEV ? "http://localhost:4000" : "");

  const backendBaseUrl = rawBackendBase.replace(/\/$/, "");

  // اگر backendBaseUrl وجود دارد، endpoint را با آن ترکیب کن
  if (backendBaseUrl) {
    const normalizedEndpoint = endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;
    return `${backendBaseUrl}${normalizedEndpoint}`;
  }

  // در غیر این صورت، endpoint نسبی را برگردان
  return endpoint;
}

/**
 * تبدیل تاریخ شمسی به میلادی
 * @param jalaliDate - تاریخ شمسی به فرمت YYYY/MM/DD
 * @returns تاریخ میلادی به فرمت YYYY-MM-DD
 */
export function jalaliToGregorian(jalaliDate: string): string {
  if (!jalaliDate) return "";
  
  const parts = jalaliDate.split("/");
  if (parts.length !== 3) return "";
  
  const [year, month, day] = parts.map(Number);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return "";
  
  const jMoment = moment(`${year}/${month}/${day}`, "jYYYY/jMM/jDD");
  return jMoment.format("YYYY-MM-DD");
}

/**
 * تبدیل تاریخ میلادی به شمسی
 * @param gregorianDate - تاریخ میلادی به فرمت YYYY-MM-DD
 * @returns تاریخ شمسی به فرمت YYYY/MM/DD
 */
export function gregorianToJalali(gregorianDate: string): string {
  if (!gregorianDate) return "";
  
  const date = new Date(gregorianDate);
  const jMoment = moment(date);
  return jMoment.format("jYYYY/jMM/jDD");
}
