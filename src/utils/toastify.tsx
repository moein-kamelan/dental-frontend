import { toast } from "react-toastify";
import WarnToast from "../components/modules/Toasts/WarnToast/WarnToast";
import ErrorToast from "../components/modules/Toasts/ErrorToast/ErrorToast";
import SuccessToast from "../components/modules/Toasts/SuccessToast/SuccessToast";

export const showErrorToast = (text: string) => {
  toast(<ErrorToast message={text} />, {
    progressClassName: "toast-progress-bar toast-progress-error",
  });
};
export const showWarnToast = (text: string) => {
  toast(<WarnToast message={text} />, {
    progressClassName: "toast-progress-bar toast-progress-warn",
  });
};
export const showSuccessToast = (text: string) => {
  toast(<SuccessToast message={text} />, {
    progressClassName: "toast-progress-bar toast-progress-success",
  });
};
