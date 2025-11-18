import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useGetAllArticles = (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  published: boolean = true,
  categoryId: string = "",
  categorySlug: string = ""
) => {
  return useQuery({ 
    queryKey: ["articles", page, limit, search, published, categoryId, categorySlug],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search: search,
        published: published.toString(),
      });

      if (categoryId) params.append("categoryId", categoryId);
      if (categorySlug) params.append("categorySlug", categorySlug);

      const response = await axiosInstance.get(`/articles?${params.toString()}`);
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
