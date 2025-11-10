import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const useCreateDoctorApplication = ()  => {
  return useMutation({
    mutationFn: async (data: FormData) => {
  
      const response = await axiosInstance.post("/doctor-applications", data);
      return response.data;
      
    },
  });
};
