import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useGetAllDoctors = (
  page: number = 1,
  limit: number = 10,
  search: string = ""
) => {
  return useQuery({
    queryKey: ["doctors", page, limit, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) params.append("search", search);

      const response = await axiosInstance.get(`/doctors?${params.toString()}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetDoctorsByClinic = (clinicId: string | null) => {
  return useQuery({
    queryKey: ["doctors", "clinic", clinicId],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (clinicId) {
        params.append("clinicId", clinicId);
      }
      const response = await axiosInstance.get(`/doctors?${params.toString()}`);
      return response.data;
    },
    enabled: !!clinicId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetDoctorByIdentifier = (identifier: string, enabled: boolean = true) => {
  // Ensure identifier is a string to avoid cyclic object issues
  const safeIdentifier = typeof identifier === "string" ? identifier : "";
  
  return useQuery({
    queryKey: ["doctor", safeIdentifier],
    queryFn: async () => {
      if (!safeIdentifier) {
        throw new Error("Doctor identifier is required");
      }
      const response = await axiosInstance.get(`/doctors/${safeIdentifier}`);
      return response.data;
    },
    enabled: enabled && !!safeIdentifier,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateDoctor = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axiosInstance.post("/doctors", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  });
};

export const useUpdateDoctor = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const response = await axiosInstance.patch(`/doctors/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  });
};

export const useDeleteDoctor = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/doctors/${id}`);
      return response.data;
    },
  });
};
