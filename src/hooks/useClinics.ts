import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export  const useGetAllClinics = (page: number, limit: number) => {
 return useQuery({
        queryKey: ['clinics', page, limit],
        queryFn: async () => {
            const response = await axiosInstance.get(`/clinics?page=${page}&limit=${limit}`)
      return response.data;
    },
  });
};
