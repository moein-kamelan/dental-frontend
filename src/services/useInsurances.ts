import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useGetAllInsurances = (
  page: number = 1,
  limit: number = 10,
  published?: string | boolean
) => {
  return useQuery({
    queryKey: ["insurances", page, limit, published],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (published !== undefined) {
        params.append("published", published.toString());
      }

      const response = await axiosInstance.get(`/insurance?${params.toString()}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetInsuranceById = (id: string) => {
  return useQuery({
    queryKey: ["insurance", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/insurance/${id}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};

export const useCreateInsurance = () => {
  return useMutation({
    mutationFn: async (data: {
      name: string;
      description?: string;
      website?: string;
      phoneNumber?: string;
      email?: string;
      logo?: string;
      published?: boolean;
      order?: number;
    }) => {
      const response = await axiosInstance.post("/insurance", data);
      return response.data;
    },
  });
};

export const useUpdateInsurance = () => {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: {
        name?: string;
        description?: string;
        website?: string;
        phoneNumber?: string;
        email?: string;
        logo?: string;
        published?: boolean;
        order?: number;
      };
    }) => {
      const response = await axiosInstance.patch(`/insurance/${id}`, data);
      return response.data;
    },
  });
};

export const useDeleteInsurance = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/insurance/${id}`);
      return response.data;
    },
  });
};

export const useToggleInsuranceStatus = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.patch(`/insurance/${id}/toggle-status`);
      return response.data;
    },
  });
};

