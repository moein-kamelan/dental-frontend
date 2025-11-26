import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useGetAllFaqs = (
  page: number = 1,
  limit: number = 10,
  published?: string | boolean
) => {
  return useQuery({
    queryKey: ["faqs", page, limit, published],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (published !== undefined) {
        params.append("published", published.toString());
      }

      const response = await axiosInstance.get(`/faqs?${params.toString()}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetFaqById = (id: string) => {
  return useQuery({
    queryKey: ["faq", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/faqs/${id}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};

export const useCreateFaq = () => {
  return useMutation({
    mutationFn: async (data: {
      question: string;
      answer: string;
      order?: number;
      published?: boolean;
    }) => {
      const response = await axiosInstance.post("/faqs", data);
      return response.data;
    },
  });
};

export const useUpdateFaq = () => {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: {
        question?: string;
        answer?: string;
        order?: number;
        published?: boolean;
      };
    }) => {
      const response = await axiosInstance.patch(`/faqs/${id}`, data);
      return response.data;
    },
  });
};

export const useDeleteFaq = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/faqs/${id}`);
      return response.data;
    },
  });
};
