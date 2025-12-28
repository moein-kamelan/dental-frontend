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

  let backendBaseUrl = rawBackendBase.replace(/\/$/, "");

  // در حالت combined (production)، اگر VITE_BACKEND_URL به localhost اشاره می‌کند
  // یا اگر origin فعلی با backend URL متفاوت است، از relative path استفاده می‌کنیم
  if (typeof window !== "undefined") {
    const currentOrigin = window.location.origin;
    
    // در development، همیشه از backendBaseUrl استفاده می‌کنیم (حتی اگر با origin متفاوت باشد)
    if (import.meta.env.DEV) {
      // در development، از backendBaseUrl استفاده می‌کنیم
      // اگر backendBaseUrl تنظیم نشده، از localhost:4000 استفاده می‌کنیم
      if (!backendBaseUrl) {
        backendBaseUrl = "http://localhost:4000";
      }
    } else {
      // در production
      // اگر در production هستیم و VITE_BACKEND_URL به localhost اشاره می‌کند
      if (backendBaseUrl.includes("localhost")) {
        backendBaseUrl = ""; // استفاده از relative path
      }
      // اگر backendBaseUrl تنظیم شده اما با origin فعلی متفاوت است
      else if (backendBaseUrl && !backendBaseUrl.startsWith(currentOrigin)) {
        // اگر backendBaseUrl یک URL کامل است و با origin فعلی متفاوت است
        // در حالت combined باید از relative path استفاده کنیم
        if (backendBaseUrl.startsWith("http://") || backendBaseUrl.startsWith("https://")) {
          backendBaseUrl = ""; // استفاده از relative path
        }
      }
    }
  }

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

  let backendBaseUrl = rawBackendBase.replace(/\/$/, "");

  // در حالت combined (production)، اگر VITE_BACKEND_URL به localhost اشاره می‌کند
  // یا اگر origin فعلی با backend URL متفاوت است، از relative path استفاده می‌کنیم
  if (typeof window !== "undefined") {
    const currentOrigin = window.location.origin;
    
    // فقط در production این منطق را اعمال می‌کنیم
    // در development همیشه از backendBaseUrl کامل استفاده می‌کنیم
    if (!import.meta.env.DEV) {
      // اگر در production هستیم و VITE_BACKEND_URL به localhost اشاره می‌کند
      if (backendBaseUrl.includes("localhost")) {
        backendBaseUrl = ""; // استفاده از relative path
      }
      // اگر backendBaseUrl تنظیم شده اما با origin فعلی متفاوت است
      else if (backendBaseUrl && !backendBaseUrl.startsWith(currentOrigin)) {
        // اگر backendBaseUrl یک URL کامل است و با origin فعلی متفاوت است
        // در حالت combined باید از relative path استفاده کنیم
        if (backendBaseUrl.startsWith("http://") || backendBaseUrl.startsWith("https://")) {
          backendBaseUrl = ""; // استفاده از relative path
        }
      }
    }
    // در development، backendBaseUrl را بدون تغییر نگه می‌داریم
  }

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

/**
 * تولید عنوان پیش‌فرض بر اساس تاریخ و ساعت فعلی
 * @returns عنوان به فرمت "آپلود شده در [تاریخ]، ساعت [ساعت]"
 */
export function generateDefaultGalleryTitle(): string {
  const now = new Date();
  
  // Format date in Persian
  const dateParts = new Intl.DateTimeFormat("fa-IR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(now);
  
  const day = dateParts.find((p) => p.type === "day")?.value;
  const month = dateParts.find((p) => p.type === "month")?.value;
  const year = dateParts.find((p) => p.type === "year")?.value;
  const dateStr = `${day} ${month} ${year}`;
  
  // Format time in Persian
  const timeParts = new Intl.DateTimeFormat("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  
  const hour = timeParts.find((p) => p.type === "hour")?.value;
  const minute = timeParts.find((p) => p.type === "minute")?.value;
  const timeStr = `${hour}:${minute}`;
  
  return `آپلود شده در ${dateStr}، ساعت ${timeStr}`;
}

/**
 * استخراج پیام خطا از Axios error
 * این function هم network errors و هم response errors را handle می‌کند
 * @param error - Axios error object
 * @param defaultMessage - پیام پیش‌فرض در صورت عدم وجود پیام خطا
 * @returns پیام خطا برای نمایش به کاربر
 */
export function getErrorMessage(
  error: unknown,
  defaultMessage: string = "خطای ناشناخته رخ داده است"
): string {
  // لاگ کردن خطا برای دیباگ (فقط در development)
  if (import.meta.env.DEV && error) {
    const hasResponse = error && typeof error === "object" && "response" in error;
    const responseStatus = hasResponse
      ? (error as { response?: { status?: number } }).response?.status
      : undefined;
    const errorCode = error && typeof error === "object" && "code" in error
      ? (error as { code?: string }).code
      : undefined;
    const errorMessage = error && typeof error === "object" && "message" in error
      ? (error as { message?: string }).message
      : undefined;

    console.error("Error details:", {
      hasResponse,
      responseStatus,
      errorCode,
      errorMessage,
      error: error && typeof error === "object" ? {
        ...(error as object),
        // فقط بخش‌های مهم را نمایش بده
        response: hasResponse ? {
          status: responseStatus,
          statusText: (error as { response?: { statusText?: string } }).response?.statusText,
          data: (error as { response?: { data?: unknown } }).response?.data,
        } : undefined,
      } : error,
    });
  }

  // اول بررسی می‌کنیم که آیا response وجود دارد یا نه
  // اگر response وجود دارد، این یک response error است نه network error
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as { 
      response?: { 
        data?: unknown;
        status?: number;
        statusText?: string;
      } 
    };
    
    // اگر response وجود دارد، از data استفاده می‌کنیم
    // مهم: اگر response وجود دارد، این یک response error است و نباید به network error برود
    if (axiosError.response) {
      const data = axiosError.response.data;
      const status = axiosError.response.status;

      // اول بررسی status code های خاص (فقط اگر status وجود داشته باشد)
      if (status !== undefined) {
        if (status === 401) {
          return "لطفاً دوباره وارد شوید";
        }
        if (status === 403) {
          return "شما دسترسی به این عملیات را ندارید";
        }
        if (status === 404) {
          return "منبع مورد نظر یافت نشد";
        }
        if (status === 429) {
          return "تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً کمی صبر کنید";
        }
        if (status >= 500) {
          return "خطای سرور. لطفاً بعداً تلاش کنید";
        }
        // برای سایر status code ها (400, 422, etc) از data استفاده می‌کنیم
      }

      // اگر data یک string است، آن را برگردان
      if (typeof data === "string" && data.trim()) {
        return data;
      }

      // اگر data یک object با property message است
      if (data && typeof data === "object" && "message" in data) {
        const message = (data as { message?: unknown }).message;
        if (typeof message === "string" && message.trim()) {
          return message;
        }
      }

      // اگر statusText وجود دارد
      if (axiosError.response.statusText) {
        return axiosError.response.statusText;
      }

      // اگر response وجود دارد اما هیچ پیامی پیدا نکردیم،
      // از status code برای ساخت پیام استفاده می‌کنیم
      if (status !== undefined) {
        return `خطا در درخواست (کد خطا: ${status})`;
      }

      // اگر response وجود دارد اما هیچ اطلاعاتی نداریم، پیام پیش‌فرض
      return "خطا در دریافت پاسخ از سرور";
    }
  }

  // فقط اگر response وجود نداشته باشد، network error را بررسی می‌کنیم
  // مهم: فقط اگر واقعاً response وجود نداشته باشد
  if (error && typeof error === "object") {
    const err = error as { message?: string; code?: string };
    
    // بررسی کدهای خطای شبکه
    if (err.code === "ECONNABORTED" || err.code === "ETIMEDOUT") {
      return "زمان درخواست به پایان رسید. لطفاً دوباره تلاش کنید.";
    }
    
    // فقط برای کدهای واقعی network error
    if (err.code === "ERR_NETWORK" || err.code === "ECONNREFUSED") {
      return "خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید.";
    }

    // بررسی message فقط برای network errors واقعی
    if (err.message && typeof err.message === "string") {
      // فقط اگر واقعاً network error باشد
      if (
        err.message === "Network Error" ||
        err.message.includes("timeout of") ||
        err.code === "ERR_NETWORK"
      ) {
        return "خطا در اتصال به سرور. لطفاً دوباره تلاش کنید.";
      }
    }
  }

  // اگر به اینجا رسیدیم و response وجود داشت اما پیامی پیدا نکردیم،
  // از defaultMessage استفاده می‌کنیم
  // اما اگر response وجود نداشت و کد network error هم نبود، باز هم defaultMessage
  return defaultMessage;
}
