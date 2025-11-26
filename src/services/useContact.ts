/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useCreateContactMessage = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.post("/contact", data);
      return response.data;
    },
  });
};

export const useGetAllContactMessages = (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  read?: boolean
) => {
  return useQuery({
    queryKey: ["contactMessages", page, limit, search, read],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) params.append("search", search);
      if (read !== undefined) params.append("read", read.toString());

      const response = await axiosInstance.get(`/contact?${params.toString()}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useGetContactMessage = (id: string) => {
  return useQuery({
    queryKey: ["contactMessage", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/contact/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useMarkAsRead = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.patch(`/contact/${id}/read`);
      return response.data;
    },
  });
};

export const useMarkAsUnread = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.patch(`/contact/${id}/unread`);
      return response.data;
    },
  });
};

export const useDeleteContactMessage = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/contact/${id}`);
      return response.data;
    },
  });
};

export const useGetContactMessagesStats = () => {
  return useQuery({
    queryKey: ["contactMessagesStats"],
    queryFn: async () => {
      const response = await axiosInstance.get("/contact/stats");
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
