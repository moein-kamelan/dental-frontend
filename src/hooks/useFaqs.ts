import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useGetAllFaqs = (
  page: number = 1,
  limit: number = 10,
  published: boolean = true
) => {
  return useQuery({
    queryKey: ["faqs", page, limit, published],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        published: published.toString(),
      });

      const response = await axiosInstance.get(`/faqs?${params.toString()}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
