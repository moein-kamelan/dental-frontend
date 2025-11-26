import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";
import type { Comment } from "../types/types";

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

      // Use the correct endpoint based on type
      let endpoint = "/comments";
      if (type === "doctor") {
        endpoint = "/comments/all/doctors";
      } else if (type === "article") {
        endpoint = "/comments/all/articles";
      } else if (type === "service") {
        endpoint = "/comments/all/services";
      }

      const response = await axiosInstance.get(
        `${endpoint}?${params.toString()}`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateComment = () => {
  return useMutation({
    mutationFn: async ({
      comment,
      type,
      id,
    }: {
      comment: { content: string; rating: number };
      type: "doctor" | "article" | "service";
      id: string;
    }) => {
      const response = await axiosInstance.post(`/comments/${type}/${id}`, {
        content: comment.content,
        rating: comment.rating,
      });
      return response.data;
    },
  });
};

export const useUpdateComment = () => {
  return useMutation({
    mutationFn: async (comment: Comment) => {
      const response = await axiosInstance.put(
        `/comments/${comment.id}`,
        comment
      );
      return response.data;
    },
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

export const useGetCommentsById = (
  id: string,
  type: "doctor" | "article" | "service"
) => {
  return useQuery({
    queryKey: ["comments", id, type],
    queryFn: async () => {
      const response = await axiosInstance.get(`/comments/${type}/${id}`);
      return response.data;
    },
    enabled: !!id && !!type,
  });
};
