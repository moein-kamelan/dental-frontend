/**
 * Validates email format
 * @param email - Email string to validate
 * @returns true if email is valid, throws error otherwise
 */
export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== "string") {
    throw new Error("ایمیل نامعتبر است");
  }

  // Trim whitespace
  const trimmedEmail = email.trim();

  // Basic email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if email matches the pattern
  if (!emailRegex.test(trimmedEmail)) {
    throw new Error("فرمت ایمیل نامعتبر است");
  }

  // Additional validation: check for common invalid patterns
  if (trimmedEmail.startsWith(".") || trimmedEmail.startsWith("@")) {
    throw new Error("ایمیل نمی‌تواند با نقطه یا @ شروع شود");
  }

  if (trimmedEmail.includes("..")) {
    throw new Error("ایمیل نمی‌تواند شامل دو نقطه متوالی باشد");
  }

  // Check domain has at least one dot
  const domainPart = trimmedEmail.split("@")[1];
  if (!domainPart || !domainPart.includes(".")) {
    throw new Error("دامنه ایمیل نامعتبر است");
  }

  // Check domain extension is at least 2 characters
  const domainParts = domainPart.split(".");
  const extension = domainParts[domainParts.length - 1];
  if (!extension || extension.length < 2) {
    throw new Error("پسوند دامنه ایمیل نامعتبر است");
  }

  return true;
};
