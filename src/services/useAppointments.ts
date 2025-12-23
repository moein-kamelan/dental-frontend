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

export const useGetMyAppointmentsStats = () => {
  return useQuery({
    queryKey: ["myAppointmentsStats"],
    queryFn: async () => {
      const response = await axiosInstance.get("/appointments/my/stats");
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnMount: "always",
  });
};

interface CreateAppointmentData {
  clinicId: string;
  doctorId?: string | null;
  appointmentDate: string; // ISO DateTime string
  patientName?: string | null;
  nationalCode?: string | null;
  notes?: string | null;
}

export const useCreateAppointment = () => {
  return useMutation({
    mutationFn: async (data: CreateAppointmentData) => {
      const response = await axiosInstance.post("/appointments", data);
      return response.data;
    },
  });
};

// ==================== Appointment Settings ====================

interface AppointmentSettingsResponse {
  success: boolean;
  data: {
    mode: "SIMPLE" | "ADVANCED";
    maxAppointmentsPerHour: number;
  };
}

export const useGetAppointmentSettings = () => {
  return useQuery({
    queryKey: ["appointmentSettings"],
    queryFn: async (): Promise<AppointmentSettingsResponse> => {
      const response = await axiosInstance.get("/appointments/settings");
      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

interface OccupiedSlot {
  startTime: string;
  endTime: string;
  startHour: number;
  startMinute: number;
  durationMinutes: number;
  type: "CONSULTATION" | "OPERATION";
  doctorId: string | null;
}

interface OccupiedSlotsResponse {
  success: boolean;
  data: {
    mode: "SIMPLE" | "ADVANCED";
    occupiedSlots: OccupiedSlot[];
    hourlyNoDoctorCounts: {
      counts: Record<number, number>;
      maxPerHour: number;
    };
  };
}

export const useGetOccupiedSlots = (
  clinicId: string | undefined,
  doctorId: string | null | undefined,
  date: string | null
) => {
  return useQuery({
    queryKey: ["occupiedSlots", clinicId, doctorId, date],
    queryFn: async (): Promise<OccupiedSlotsResponse> => {
      const params = new URLSearchParams();
      if (clinicId) params.append("clinicId", clinicId);
      if (doctorId) params.append("doctorId", doctorId);
      if (date) params.append("date", date);

      const response = await axiosInstance.get(
        `/appointments/occupied-slots?${params.toString()}`
      );
      return response.data;
    },
    enabled: !!clinicId && !!date,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};
