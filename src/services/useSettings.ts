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

