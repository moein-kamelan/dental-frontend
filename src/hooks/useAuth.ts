import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";

export const usePostOtpRequest = () => {
  return useMutation({
    mutationFn: async (phoneNumber: string) => {
      const response = await axiosInstance.post("/auth/request-otp", {
        phoneNumber,
      });
      return response.data;
    },
  });
};
export const usePostOtpVerify = () => {
  return useMutation({
    mutationFn: async ({
      firstName,
      lastName,
      code,
      phoneNumber,
    }: {
      firstName?: string;
      lastName?: string;
      code: string;
      phoneNumber?: string;
    }) => {
        if(firstName && lastName && phoneNumber && code) {

            const response = await axiosInstance.post("/auth/verify-otp", {
              firstName,
              lastName,
              code,
              phoneNumber,
            }
            
          );
          return response.data;
        }
         const response = await axiosInstance.post("/auth/verify-otp", {
            phoneNumber,
              code
            }
            
          );
          return response.data;
        
      
    },
    onSuccess : (res) => {
        console.log(res);
        
    }
  });
};
