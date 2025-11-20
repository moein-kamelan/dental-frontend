import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useGetArticleCategories = (published?: boolean) => {
  return useQuery({
    queryKey: ["articleCategories", published],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (published !== undefined) {
        params.append("published", published.toString());
      }
      const response = await axiosInstance.get(
        `/categories/articles${
          params.toString() ? `?${params.toString()}` : ""
        }`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetArticleCategoryByIdentifier = (identifier: string) => {
  return useQuery({
    queryKey: ["articleCategory", identifier],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/categories/articles/${identifier}`
      );
      return response.data;
    },
    enabled: !!identifier,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateArticleCategory = () => {
  return useMutation({
    mutationFn: async (data: {
      name: string;
      description?: string;
      order?: number;
      published?: boolean;
    }) => {
      const response = await axiosInstance.post("/categories/articles", data);
      return response.data;
    },
  });
};

export const useUpdateArticleCategory = () => {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: {
        name?: string;
        description?: string;
        order?: number;
        published?: boolean;
      };
    }) => {
      const response = await axiosInstance.patch(
        `/categories/articles/${id}`,
        data
      );
      return response.data;
    },
  });
};

export const useDeleteArticleCategory = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/categories/articles/${id}`);
      return response.data;
    },
  });
};

export const useGetServiceCategories = (published?: boolean) => {
  return useQuery({
    queryKey: ["serviceCategories", published],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (published !== undefined) {
        params.append("published", published.toString());
      }
      const response = await axiosInstance.get(
        `/categories/services${
          params.toString() ? `?${params.toString()}` : ""
        }`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetServiceCategoryByIdentifier = (identifier: string) => {
  return useQuery({
    queryKey: ["serviceCategory", identifier],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/categories/services/${identifier}`
      );
      return response.data;
    },
    enabled: !!identifier,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateServiceCategory = () => {
  return useMutation({
    mutationFn: async (data: {
      name: string;
      description?: string;
      order?: number;
      published?: boolean;
    }) => {
      const response = await axiosInstance.post("/categories/services", data);
      return response.data;
    },
  });
};

export const useUpdateServiceCategory = () => {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: {
        name?: string;
        description?: string;
        order?: number;
        published?: boolean;
      };
    }) => {
      const response = await axiosInstance.patch(
        `/categories/services/${id}`,
        data
      );
      return response.data;
    },
  });
};

export const useDeleteServiceCategory = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/categories/services/${id}`);
      return response.data;
    },
  });
};
