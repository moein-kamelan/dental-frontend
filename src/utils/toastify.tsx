import { toast } from "react-toastify";
import WarnToast from "../components/modules/Toasts/WarnToast/WarnToast";
import ErrorToast from "../components/modules/Toasts/ErrorToast/ErrorToast";
import SuccessToast from "../components/modules/Toasts/SuccessToast/SuccessToast";

export const showErrorToast = (text: string) => {
  toast(<ErrorToast  message={text}  /> , {
    progressClassName : "error-progress-bar"
  });
};
export const showWarnToast = (text: string) => {
  toast(<WarnToast  message={text}  /> , {
  });
};
export const showSuccessToast = (text: string) => {
  toast(<SuccessToast  message={text}  /> , {
    progressClassName : "sussecc-progress-bar"

  });
};
