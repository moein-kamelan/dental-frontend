import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";
export const useGetAllServices = (page: number, limit: number, search?: string, categoryId?: string, categorySlug?: string) => {
    return useQuery({
        queryKey: ['services', page, limit, search, categoryId, categorySlug],
        queryFn: async () => {
            const response = await axiosInstance.get(`/services?page=${page}&limit=${limit}&search=${search || ''}&categoryId=${categoryId || ''}&categorySlug=${categorySlug || ''}`);
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}


