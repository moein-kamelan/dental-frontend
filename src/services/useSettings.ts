import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export interface Settings {
  siteName?: string;
  siteTitle?: string;
  description?: string;
  logo?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  instagram?: string;
  telegram?: string;
  whatsapp?: string;
  twitter?: string;
  linkedin?: string;
  facebook?: string;
  youtube?: string;
  workingHours?: string;
  aboutUsImage?: string | null;
  aboutUsVideo?: string | null;
  aboutUsContent?: string;
  contactUsImage?: string | null;
  contactUsVideo?: string | null;
  becomeDoctorContent?: string;
}

export interface SettingsResponse {
  success: boolean;
  data: {
    settings: Settings;
  };
}

export const useGetSettings = () => {
  return useQuery<SettingsResponse>({
    queryKey: ["settings"],
    queryFn: async () => {
      const response = await axiosInstance.get("/settings");
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateSettings = () => {
  return useMutation({
    mutationFn: async (data: FormData | Partial<Settings>) => {
      const response = await axiosInstance.patch("/settings", data, {
        headers: data instanceof FormData ? {
          'Content-Type': 'multipart/form-data',
        } : undefined,
      });
      return response.data;
    },
  });
};

// Notification Settings
export interface NotificationSettings {
  method: "SMS" | "EITAA" | "BOTH";
  hasEitaaToken: boolean;
}

export interface NotificationSettingsResponse {
  success: boolean;
  data: {
    notificationSettings: NotificationSettings;
  };
}

export const useGetNotificationSettings = () => {
  return useQuery<NotificationSettingsResponse>({
    queryKey: ["notificationSettings"],
    queryFn: async () => {
      const response = await axiosInstance.get("/settings/notifications");
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateNotificationSettings = () => {
  return useMutation({
    mutationFn: async (data: { method: "SMS" | "EITAA" | "BOTH"; eitaaApiToken?: string | null }) => {
      const response = await axiosInstance.patch("/settings/notifications", data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate query to refetch
    },
  });
};

export const useTestEitaaConnection = () => {
  return useMutation({
    mutationFn: async (data: { token: string; chatId: string }) => {
      const response = await axiosInstance.post("/settings/notifications/test-eitaa", data);
      return response.data;
    },
  });
};

// Appointment Settings
export interface Clinic {
  id: string;
  name: string;
}

export interface SyncApiKey {
  id: string;
  name: string;
  apiKey?: string;
  clinicId: string | null;
  clinic: Clinic | null;
  isActive: boolean;
  lastUsedAt: string | null;
  createdAt: string;
}

export interface AppointmentSettings {
  mode: "SIMPLE" | "ADVANCED";
  maxAppointmentsPerHour: number;
  syncApiKeys: SyncApiKey[];
}

export interface AppointmentSettingsResponse {
  success: boolean;
  data: {
    appointmentSettings: AppointmentSettings;
  };
}

export const useGetAppointmentSettings = () => {
  return useQuery<AppointmentSettingsResponse>({
    queryKey: ["appointmentSettings"],
    queryFn: async () => {
      const response = await axiosInstance.get("/settings/appointments");
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateAppointmentSettings = () => {
  return useMutation({
    mutationFn: async (data: { appointmentMode: "SIMPLE" | "ADVANCED"; maxAppointmentsPerHour: number }) => {
      const response = await axiosInstance.patch("/settings/appointments", data);
      return response.data;
    },
  });
};

export const useCreateSyncApiKey = () => {
  return useMutation({
    mutationFn: async (data: { name: string; clinicId?: string | null }) => {
      const response = await axiosInstance.post("/settings/appointments/api-keys", data);
      return response.data;
    },
  });
};

export const useDeleteSyncApiKey = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/settings/appointments/api-keys/${id}`);
      return response.data;
    },
  });
};

export const useToggleSyncApiKey = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.patch(`/settings/appointments/api-keys/${id}/toggle`);
      return response.data;
    },
  });
};

