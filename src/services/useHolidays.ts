import { useQuery } from "@tanstack/react-query";

interface HolidayEvent {
  description: string;
  additional_description: string;
  is_holiday: boolean;
  is_religious: boolean;
}

interface HolidayResponse {
  is_holiday: boolean;
  events: HolidayEvent[];
}

/**
 * بررسی تعطیل بودن یک تاریخ شمسی
 * @param year سال شمسی (مثلاً 1403)
 * @param month ماه شمسی (1-12)
 * @param day روز شمسی (1-31)
 */
export const useCheckHoliday = (year: number, month: number, day: number) => {
  return useQuery<HolidayResponse>({
    queryKey: ["holiday", year, month, day],
    queryFn: async () => {
      const response = await fetch(
        `https://holidayapi.ir/jalali/${year}/${month}/${day}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch holiday data");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
    retry: 2,
  });
};

/**
 * بررسی تعطیل بودن چند تاریخ به صورت batch
 */
export const useCheckMultipleHolidays = (
  dates: Array<{ year: number; month: number; day: number }>
) => {
  return useQuery({
    queryKey: ["holidays", dates],
    queryFn: async () => {
      const results = await Promise.all(
        dates.map(async (date) => {
          try {
            const response = await fetch(
              `https://holidayapi.ir/jalali/${date.year}/${date.month}/${date.day}`
            );
            if (!response.ok) {
              return { date, is_holiday: false };
            }
            const data: HolidayResponse = await response.json();
            return {
              date,
              is_holiday: data.is_holiday,
            };
          } catch (error) {
            console.error(`Error checking holiday for ${date.year}/${date.month}/${date.day}:`, error);
            return { date, is_holiday: false };
          }
        })
      );
      return results;
    },
    staleTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
    retry: 2,
  });
};

