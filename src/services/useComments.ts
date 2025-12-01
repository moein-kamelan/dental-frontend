import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useGetAllComments = (
  page: number = 1,
  limit: number = 10,
  search: string = "",
  type: "doctor" | "article" | "service" | "" = ""
) => {
  return useQuery({
    queryKey: ["comments", page, limit, search, type],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) params.append("search", search);

      // Use the correct endpoint based on type
      let endpoint = "/comments";
      if (type === "doctor") {
        endpoint = "/comments/all/doctors";
      } else if (type === "article") {
        endpoint = "/comments/all/articles";
      } else if (type === "service") {
        endpoint = "/comments/all/services";
      }

      const response = await axiosInstance.get(
        `${endpoint}?${params.toString()}`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      comment,
      type,
      id,
    }: {
      comment: { content: string; rating: number };
      type: "doctor" | "article" | "service";
      id: string;
    }) => {
      const response = await axiosInstance.post(`/comments/${type}/${id}`, {
        content: comment.content,
        rating: comment.rating,
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Invalidate infinite query
      queryClient.invalidateQueries({
        queryKey: ["comments-infinite", variables.id, variables.type],
      });

      // Also invalidate old query key for backward compatibility
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.id, variables.type],
      });
    },
  });
};

export const useUpdateComment = () => {
  return useMutation({
    mutationFn: async ({
      id,
      content,
      rating,
      published,
    }: {
      id: string;
      content?: string;
      rating?: number | null;
      published?: boolean;
    }) => {
      const response = await axiosInstance.patch(`/comments/${id}`, {
        ...(content !== undefined && { content }),
        ...(rating !== undefined && { rating }),
        ...(published !== undefined && { published }),
      });
      return response.data;
    },
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`/comments/${id}`);
      return response.data;
    },
  });
};

export const useGetCommentsById = (
  id: string,
  type: "doctor" | "article" | "service"
) => {
  return useQuery({
    queryKey: ["comments", id, type],
    queryFn: async () => {
      const response = await axiosInstance.get(`/comments/${type}/${id}`);
      return response.data;
    },
    enabled: !!id && !!type,
  });
};

export const useGetCommentsByIdInfinite = (
  id: string,
  type: "doctor" | "article" | "service",
  limit: number = 5
) => {
  return useInfiniteQuery({
    queryKey: ["comments-infinite", id, type, limit],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        page: pageParam.toString(),
        limit: limit.toString(),
      });
      const response = await axiosInstance.get(
        `/comments/${type}/${id}?${params.toString()}`
      );
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      
      const meta = lastPage?.meta;
      if (meta?.hasNextPage) {
        return meta.page + 1;
      }
      return undefined;
    },
    enabled: !!id && !!type,
    initialPageParam: 1,
  });
};

export const useReplyToComment = () => {
  return useMutation({
    mutationFn: async ({
      commentId,
      content,
    }: {
      commentId: string;
      content: string;
    }) => {
      const response = await axiosInstance.post(
        `/comments/${commentId}/reply`,
        {
          content,
        }
      );
      return response.data;
    },
  });
};

export const useToggleCommentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.patch(`/comments/${id}/toggle-status`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};
