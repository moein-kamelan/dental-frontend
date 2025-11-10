import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useGetAllFaqs = (
  page: number,
  limit: number,
  published: boolean
) => {
  return useQuery({
    queryKey: ["faqs", page, limit, published],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/faqs?page=${page}&limit=${limit}&published=${published}`
      );
      return response.data;
    },
  });
};
