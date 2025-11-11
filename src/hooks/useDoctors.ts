import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useGetAllDoctors = (page?: number, limit?: number, clinicId?: string | null, search?: string | null) => {
    return useQuery({
        queryKey: ['doctors', page, limit, clinicId, search],
        queryFn: async () => {
            const response = await axiosInstance.get(`/doctors?page=${page || 1}&limit=${limit || 10}${clinicId ? `&clinicId=${clinicId}` : ''}${search ? `&search=${search}` : ''}`);
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
    });
};
