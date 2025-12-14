import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

interface GetAppointmentsParams {
  page?: number;
  limit?: number;
  status?: string;
  clinicId?: string;
  doctorId?: string;
  fromDate?: string;
  toDate?: string;
  search?: string;
}

export const useGetAllAppointments = (params: GetAppointmentsParams = {}) => {
  const {
    page = 1,
    limit = 10,
    status,
    clinicId,
    doctorId,
    fromDate,
    toDate,
    search,
  } = params;

  return useQuery({
    queryKey: [
      "appointments",
      page,
      limit,
      status,
      clinicId,
      doctorId,
      fromDate,
      toDate,
      search,
    ],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (status) queryParams.append("status", status);
      if (clinicId) queryParams.append("clinicId", clinicId);
      if (doctorId) queryParams.append("doctorId", doctorId);
      if (fromDate) queryParams.append("fromDate", fromDate);
      if (toDate) queryParams.append("toDate", toDate);
      if (search) queryParams.append("search", search);

      const response = await axiosInstance.get(
        `/appointments?${queryParams.toString()}`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnMount: "always", // همیشه هنگام mount شدن کامپوننت داده‌ها را بروزرسانی کن
  });
};

export const useGetAppointmentById = (id: string) => {
  return useQuery({
    queryKey: ["appointment", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/appointments/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useApproveAppointment = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.patch(`/appointments/${id}/approve`);
      return response.data;
    },
  });
};

export const useCancelAppointment = () => {
  return useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason?: string }) => {
      const response = await axiosInstance.patch(`/appointments/${id}/cancel`, {
        reason,
      });
      return response.data;
    },
  });
};

export const useUpdateAppointment = () => {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: {
        appointmentDate?: string;
        doctorId?: string;
        patientName?: string;
        notes?: string;
      };
    }) => {
      const response = await axiosInstance.patch(`/appointments/${id}`, data);
      return response.data;
    },
  });
};

export const useDeleteAppointment = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/appointments/${id}`);
      return response.data;
    },
  });
};

export const useGetAppointmentsStats = () => {
  return useQuery({
    queryKey: ["appointmentsStats"],
    queryFn: async () => {
      const response = await axiosInstance.get("/appointments/stats");
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnMount: "always", // همیشه هنگام mount شدن کامپوننت داده‌ها را بروزرسانی کن
  });
};

interface GetMyAppointmentsParams {
  page?: number;
  limit?: number;
  status?: string;
}

export const useGetMyAppointments = (params: GetMyAppointmentsParams = {}) => {
  const { page = 1, limit = 10, status } = params;

  return useQuery({
    queryKey: ["myAppointments", page, limit, status],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (status) queryParams.append("status", status);

      const response = await axiosInstance.get(
        `/appointments/my?${queryParams.toString()}`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnMount: "always",
  });
};
