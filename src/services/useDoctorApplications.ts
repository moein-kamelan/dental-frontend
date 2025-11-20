import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useCreateDoctorApplication = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axiosInstance.post("/doctor-applications", data);
      return response.data;
    },
  });
};

export const useGetAllDoctorApplications = (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  read?: boolean
) => {
  return useQuery({
    queryKey: ["doctorApplications", page, limit, search, read],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) params.append("search", search);
      if (read !== undefined) params.append("read", read.toString());

      const response = await axiosInstance.get(
        `/doctor-applications?${params.toString()}`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useGetDoctorApplication = (id: string) => {
  return useQuery({
    queryKey: ["doctorApplication", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/doctor-applications/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useMarkAsRead = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.patch(
        `/doctor-applications/${id}/read`
      );
      return response.data;
    },
  });
};

export const useMarkAsUnread = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.patch(
        `/doctor-applications/${id}/unread`
      );
      return response.data;
    },
  });
};

export const useDeleteDoctorApplication = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/doctor-applications/${id}`);
      return response.data;
    },
  });
};

export const useGetDoctorApplicationsStats = () => {
  return useQuery({
    queryKey: ["doctorApplicationsStats"],
    queryFn: async () => {
      const response = await axiosInstance.get("/doctor-applications/stats");
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
