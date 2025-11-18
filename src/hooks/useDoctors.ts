import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useGetAllDoctors = (
  page: number = 1,
  limit: number = 10,
  search: string = ""
) => {
  return useQuery({
    queryKey: ["doctors", page, limit, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) params.append("search", search);

      const response = await axiosInstance.get(`/doctors?${params.toString()}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetDoctorByIdentifier = (identifier: string) => {
  return useQuery({
    queryKey: ["doctor", identifier],
    queryFn: async () => {
      const response = await axiosInstance.get(`/doctors/${identifier}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
