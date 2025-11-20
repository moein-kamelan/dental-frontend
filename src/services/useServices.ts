import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useGetAllServices = (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  categoryId: string = "",
  categorySlug: string = ""
) => {
  return useQuery({
    queryKey: ["services", page, limit, search, categoryId, categorySlug],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) params.append("search", search);
      if (categoryId) params.append("categoryId", categoryId);
      if (categorySlug) params.append("categorySlug", categorySlug);

      const response = await axiosInstance.get(
        `/services?${params.toString()}`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useGetServiceByIdentifier = (identifier: string) => {
  return useQuery({
    queryKey: ["service", identifier],
    queryFn: async () => {
      const response = await axiosInstance.get(`/services/${identifier}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateService = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axiosInstance.post("/services", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  });
};

export const useUpdateService = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const response = await axiosInstance.patch(`/services/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  });
};

export const useDeleteService = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/services/${id}`);
      return response.data;
    },
  });
};
