import React from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persianCalendar from "react-date-object/calendars/persian";
import persianLocale from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/colors/teal.css";

interface JalaliDatePickerProps {
  value?: string; // فرمت: YYYY/MM/DD (شمسی)
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  minDate?: string; // فرمت: YYYY/MM/DD (شمسی)
  maxDate?: string; // فرمت: YYYY/MM/DD (شمسی)
  required?: boolean;
  name?: string;
}

const JalaliDatePicker: React.FC<JalaliDatePickerProps> = ({
  value,
  onChange,
  onBlur,
  placeholder = "تاریخ را انتخاب کنید",
  className = "",
  disabled = false,
  minDate,
  maxDate,
  required = false,
  name,
}) => {
  // تبدیل رشته تاریخ شمسی به DateObject
  const parseJalaliDate = (dateString?: string): DateObject | undefined => {
    if (!dateString) return undefined;
    const parts = dateString.split("/");
    if (parts.length !== 3) return undefined;
    const [year, month, day] = parts.map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return undefined;
    return new DateObject({
      calendar: persianCalendar,
      locale: persianLocale,
    })
      .setYear(year)
      .setMonth(month)
      .setDay(day);
  };

  // تبدیل DateObject به رشته تاریخ شمسی
  const formatJalaliDate = (date: DateObject | null): string => {
    if (!date) return "";
    return `${date.year}/${String(date.month.number).padStart(2, "0")}/${String(date.day).padStart(2, "0")}`;
  };

  const handleChange = (date: DateObject | DateObject[] | null) => {
    if (onChange) {
      if (Array.isArray(date)) {
        // اگر چند تاریخ انتخاب شده، فقط اولی را برمی‌گردانیم
        onChange(formatJalaliDate(date[0] || null));
      } else {
        onChange(formatJalaliDate(date));
      }
    }
    if (onBlur) {
      onBlur();
    }
  };

  const minDateObj = minDate ? parseJalaliDate(minDate) : undefined;
  const maxDateObj = maxDate ? parseJalaliDate(maxDate) : undefined;

  return (
    <DatePicker
      value={parseJalaliDate(value)}
      onChange={handleChange}
      calendar={persianCalendar}
      locale={persianLocale}
      format="YYYY/MM/DD"
      placeholder={placeholder}
      disabled={disabled}
      minDate={minDateObj}
      maxDate={maxDateObj}
      required={required}
      name={name}
      containerClassName={`w-full ${className}`}
      inputClass={`w-full h-[54px] px-4 py-2.5 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary text-dark font-estedad-light text-right ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      calendarPosition="bottom-center"
      fixMainPosition
      fixRelativePosition
    />
  );
};

export default JalaliDatePicker;

