import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useGetAllArticles = (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  published: boolean | string = "",
  categoryId: string = "",
  categorySlug: string = ""
) => {
  return useQuery({
    queryKey: [
      "articles",
      page,
      limit,
      search,
      published,
      categoryId,
      categorySlug,
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search && search.trim()) {
        params.append("search", search.trim());
      }

      if (published !== "") {
        params.append("published", published.toString());
      }

      if (categoryId) params.append("categoryId", categoryId);
      if (categorySlug) params.append("categorySlug", categorySlug);

      const response = await axiosInstance.get(
        `/articles?${params.toString()}`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetArticleBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      const response = await axiosInstance.get(`/articles/${slug}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetArticleByIdentifier = (identifier: string) => {
  return useQuery({
    queryKey: ["article", identifier],
    queryFn: async () => {
      const response = await axiosInstance.get(`/articles/${identifier}`);
      return response.data;
    },
    enabled: !!identifier,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateArticle = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axiosInstance.post("/articles", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  });
};

export const useUpdateArticle = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const response = await axiosInstance.patch(`/articles/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  });
};

export const useDeleteArticle = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/articles/${id}`);
      return response.data;
    },
  });
};
