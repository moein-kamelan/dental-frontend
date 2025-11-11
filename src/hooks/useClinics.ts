import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useGetAllClinics = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["clinics", page, limit],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await axiosInstance.get(`/clinics?${params.toString()}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
