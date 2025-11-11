import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useGetAllServices = (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  categoryId: string = "",
  categorySlug: string = ""
) => {
  return useQuery({
    queryKey: ["services", page, limit, search, categoryId, categorySlug],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) params.append("search", search);
      if (categoryId) params.append("categoryId", categoryId);
      if (categorySlug) params.append("categorySlug", categorySlug);

      const response = await axiosInstance.get(
        `/services?${params.toString()}`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
