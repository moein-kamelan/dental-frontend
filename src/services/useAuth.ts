import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axios";
import { showErrorToast } from "../utils/toastify";
import { getErrorMessage } from "../utils/helpers";
import type { AxiosError } from "axios";

export const usePostOtpRequest = () => {
  return useMutation({
    mutationFn: async (phoneNumber: string) => {
      const response = await axiosInstance.post("/auth/request-otp", {
        phoneNumber,
      });
      return response.data;
    },

    onError: (error) => {
      console.error("OTP Request Error:", error);
      const errorMessage = getErrorMessage(error, "خطا در ارسال کد تأیید");
      showErrorToast(errorMessage);
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
      gender,
    }: {
      firstName?: string;
      lastName?: string;
      code: string;
      phoneNumber?: string;
      gender?: "MALE" | "FEMALE";
    }) => {
      if (firstName && lastName && phoneNumber && code) {
        const response = await axiosInstance.post("/auth/verify-otp", {
          firstName,
          lastName,
          code,
          phoneNumber,
          gender,
        });
        return response.data;
      }
      const response = await axiosInstance.post("/auth/verify-otp", {
        phoneNumber,
        code,
      });
      return response.data;
    },
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (error) => {
      console.error("OTP Request Error:", error);
      const errorMessage = getErrorMessage(error, "خطا در ارسال کد تأیید");
      showErrorToast(errorMessage);
    },
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (values: Record<string, unknown>) => {
      const response = await axiosInstance.patch("/auth/me", values);
      return response.data;
    },
  });
};

export const useUpdateProfileWithImage = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axiosInstance.patch("/auth/me", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onError: (error) => {
      console.error("Profile Update Error:", error);
      const errorMessage = getErrorMessage(error, "خطایی در به‌روزرسانی پروفایل رخ داد");
      showErrorToast(errorMessage);
    },
  });
};

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: async ({
      phoneNumber,
      password,
    }: {
      phoneNumber: string;
      password: string;
    }) => {
      const response = await axiosInstance.post("/auth/login", {
        phoneNumber,
        password,
      });
      return response.data;
    },
    onError: (error) => {
      console.error("OTP Request Error:", error);
      const errorMessage = getErrorMessage(error, "خطا در ارسال کد تأیید");
      showErrorToast(errorMessage);
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/auth/logout");
      return response.data;
    },
    onError: (error) => {
      console.error("Logout Error:", error);
      const errorMessage = getErrorMessage(error, "خطا در خروج از حساب کاربری");
      showErrorToast(errorMessage);
    },
    onSuccess: (res) => {
      console.log(res);
    },
  });
};
