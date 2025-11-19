/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useCreateContactMessage = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.post("/contact", data);
      return response.data;
    },
  });
};