import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useGetAllReviews = (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  published?: boolean
) => {
  return useQuery({
    queryKey: ["reviews", page, limit, search, published],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) params.append("search", search);
      if (published !== undefined) params.append("published", published.toString());

      const response = await axiosInstance.get(
        `/reviews?${params.toString()}`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useGetPublishedReviews = (limit: number = 10) => {
  return useQuery({
    queryKey: ["reviews", "published", limit],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: "1",
        limit: limit.toString(),
        published: "true",
      });

      const response = await axiosInstance.get(
        `/reviews?${params.toString()}`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetReviewById = (id: string) => {
  return useQuery({
    queryKey: ["review", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/reviews/${id}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};

export const useCreateReview = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axiosInstance.post("/reviews", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  });
};

export const useUpdateReview = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const response = await axiosInstance.patch(`/reviews/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  });
};

export const useDeleteReview = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/reviews/${id}`);
      return response.data;
    },
  });
};

