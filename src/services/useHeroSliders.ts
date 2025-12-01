import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useGetAllHeroSliders = (
  page: number = 1,
  limit: number = 10,
  published?: string
) => {
  return useQuery({
    queryKey: ["heroSliders", page, limit, published],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (published !== undefined) {
        params.append("published", published);
      }

      const response = await axiosInstance.get(
        `/hero-sliders?${params.toString()}`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetHeroSliderById = (id: string) => {
  return useQuery({
    queryKey: ["heroSlider", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/hero-sliders/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateHeroSlider = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axiosInstance.post("/hero-sliders", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  });
};

export const useUpdateHeroSlider = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const response = await axiosInstance.patch(`/hero-sliders/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  });
};

export const useDeleteHeroSlider = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/hero-sliders/${id}`);
      return response.data;
    },
  });
};
