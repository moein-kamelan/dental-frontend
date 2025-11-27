import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useGetAllUsers = (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  role?: string,
  clinicId?: string
) => {
  return useQuery({
    queryKey: ["users", page, limit, search, role, clinicId],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) params.append("search", search);
      if (role) params.append("role", role);
      if (clinicId) params.append("clinicId", clinicId);

      const response = await axiosInstance.get(`/users?${params.toString()}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/users/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axiosInstance.post("/users", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const response = await axiosInstance.patch(`/users/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  });
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/users/${id}`);
      return response.data;
    },
  });
};
