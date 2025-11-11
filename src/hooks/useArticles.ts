import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useGetAllArticles = (page?: number, limit?: number , published?: boolean, search?: string, categoryId?: string, categorySlug?: string) => {
    return useQuery({
        queryKey: ['articles', page, limit, published, search, categoryId, categorySlug],
        queryFn: async () => {
            const response = await axiosInstance.get(`/articles?page=${page || 1}&limit=${limit || 10}&published=${published || true}&search=${search || ''}&categoryId=${categoryId || ''}&categorySlug=${categorySlug || ''}`);
            return response.data;
        },

        staleTime: 1000 * 60 * 5,
    });
};
