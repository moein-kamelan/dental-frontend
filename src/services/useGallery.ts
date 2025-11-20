import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useGetAllGallery = (
  page: number = 1,
  limit: number = 10,
  published?: string | boolean
) => {
  return useQuery({
    queryKey: ["gallery", page, limit, published],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (published !== undefined) {
        params.append("published", published.toString());
      }

      const response = await axiosInstance.get(`/gallery?${params.toString()}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetGalleryById = (id: string) => {
  return useQuery({
    queryKey: ["gallery", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/gallery/${id}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};

export const useCreateGallery = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axiosInstance.post("/gallery", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  });
};

export const useUpdateGallery = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const response = await axiosInstance.patch(`/gallery/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  });
};

export const useDeleteGallery = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/gallery/${id}`);
      return response.data;
    },
  });
};

export const useReorderGallery = () => {
  return useMutation({
    mutationFn: async (images: { id: string; order: number }[]) => {
      const response = await axiosInstance.post("/gallery/reorder", { images });
      return response.data;
    },
  });
};

