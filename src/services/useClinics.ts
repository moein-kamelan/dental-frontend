import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useGetAllClinics = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["clinics", page, limit],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await axiosInstance.get(`/clinics?${params.toString()}`);
      // #region agent log
      fetch(
        "http://127.0.0.1:7242/ingest/c5282bb0-1a44-499c-bce8-9a51f667292e",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: "useClinics.ts:14",
            message: "useGetAllClinics queryFn executed",
            data: {
              page,
              limit,
              clinicsCount: response.data?.data?.clinics?.length || 0,
              clinicsWithImages:
                response.data?.data?.clinics?.filter((c: any) => c.image)
                  .length || 0,
              clinicsWithoutImages:
                response.data?.data?.clinics?.filter((c: any) => !c.image)
                  .length || 0,
              firstClinicImage:
                response.data?.data?.clinics?.[0]?.image || null,
            },
            timestamp: Date.now(),
            sessionId: "debug-session",
            runId: "run1",
            hypothesisId: "E",
          }),
        }
      ).catch(() => {});
      // #endregion
      return response.data;
    },
    staleTime: 0,
    refetchOnMount: "always",
  });
};

export const useGetClinicById = (id: string) => {
  return useQuery({
    queryKey: ["clinic", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/clinics/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateClinic = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axiosInstance.post("/clinics", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  });
};

export const useUpdateClinic = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const response = await axiosInstance.patch(`/clinics/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  });
};

export const useDeleteClinic = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/clinics/${id}`);
      return response.data;
    },
  });
};
