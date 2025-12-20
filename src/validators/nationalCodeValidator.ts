// Convert Persian and Arabic digits to English digits
const convertToEnglishDigits = (str: string): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  let result = str;

  // Convert Persian digits
  persianDigits.forEach((digit, index) => {
    result = result.replace(new RegExp(digit, "g"), englishDigits[index]);
  });

  // Convert Arabic digits
  arabicDigits.forEach((digit, index) => {
    result = result.replace(new RegExp(digit, "g"), englishDigits[index]);
  });

  return result;
};

/**
 * اعتبارسنجی کد ملی ایرانی بر اساس فرمول ریاضی رسمی
 * 
 * الگوریتم:
 * 1. کد ملی باید 10 رقم باشد
 * 2. همه ارقام نباید یکسان باشند (مثل 1111111111)
 * 3. محاسبه چک دیجیت:
 *    - هر رقم را در وزن مربوطه ضرب می‌کنیم (10, 9, 8, 7, 6, 5, 4, 3, 2)
 *    - مجموع را بر 11 تقسیم می‌کنیم
 *    - اگر باقی‌مانده کمتر از 2 باشد: رقم کنترل = باقی‌مانده
 *    - در غیر این صورت: رقم کنترل = 11 - باقی‌مانده
 *    - رقم کنترل باید با رقم آخر کد ملی برابر باشد
 */
export const validateNationalCode = (nationalCode: string | undefined | null): boolean => {
  if (!nationalCode || typeof nationalCode !== "string") {
    return false;
  }

  // Convert Persian and Arabic digits to English
  const converted = convertToEnglishDigits(nationalCode);

  // Remove all non-digit characters
  const cleaned = converted.replace(/\D/g, "");

  // Must be exactly 10 digits
  if (cleaned.length !== 10) {
    return false;
  }

  // Check for invalid patterns (all same digits)
  const invalidPatterns = [
    "0000000000",
    "1111111111",
    "2222222222",
    "3333333333",
    "4444444444",
    "5555555555",
    "6666666666",
    "7777777777",
    "8888888888",
    "9999999999",
  ];

  if (invalidPatterns.includes(cleaned)) {
    return false;
  }

  // Calculate check digit using the official formula
  const digits = cleaned.split("").map(Number);
  
  // Calculate weighted sum (weights: 10, 9, 8, 7, 6, 5, 4, 3, 2)
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * (10 - i);
  }

  // Calculate remainder
  const remainder = sum % 11;

  // Calculate expected check digit
  const expectedCheckDigit = remainder < 2 ? remainder : 11 - remainder;

  // Compare with actual check digit (last digit)
  const actualCheckDigit = digits[9];

  return expectedCheckDigit === actualCheckDigit;
};

/**
 * اعتبارسنجی و فرمت کردن کد ملی
 * در صورت نامعتبر بودن، خطا پرتاب می‌کند
 */
export const formatNationalCode = (nationalCode: string | undefined | null): string => {
  if (!nationalCode || typeof nationalCode !== "string") {
    throw new Error("کد ملی الزامی است");
  }

  // Convert Persian and Arabic digits to English
  const converted = convertToEnglishDigits(nationalCode);

  // Remove all non-digit characters
  const cleaned = converted.replace(/\D/g, "");

  // Must be exactly 10 digits
  if (cleaned.length !== 10) {
    throw new Error("کد ملی باید 10 رقم باشد");
  }

  if (!validateNationalCode(cleaned)) {
    throw new Error("کد ملی نامعتبر است");
  }

  return cleaned;
};

/**
 * پاک‌سازی کد ملی (فقط اعداد)
 */
export const cleanNationalCode = (nationalCode: string): string => {
  const converted = convertToEnglishDigits(nationalCode);
  return converted.replace(/\D/g, "");
};

