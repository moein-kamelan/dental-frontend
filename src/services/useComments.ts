import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useGetAllComments = (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  type: "doctor" | "article" | "service" | "" = ""
) => {
  return useQuery({
    queryKey: ["comments", page, limit, search, type],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) params.append("search", search);
      if (type) params.append("type", type);

      const response = await axiosInstance.get(`/comments?${params.toString()}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/comments/${id}`);
      return response.data;
    },
  });
};

