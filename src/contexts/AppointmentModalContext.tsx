import { useState, type ReactNode } from "react";
import { useAppSelector } from "../redux/typedHooks";
import { useAuthModal } from "./useAuthModal";
import { showErrorToast } from "../utils/toastify";
import { AppointmentModalContext } from "./AppointmentModalContextValue";

export function AppointmentModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user.data);
  const { openModal: openAuthModal } = useAuthModal();

  const openModal = () => {
    // اگر کاربر لاگین نشده باشد، مودال لاگین را باز کن
    if (!user) {
      openAuthModal();
      showErrorToast("لطفا ابتدا وارد شوید");
      return;
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <AppointmentModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </AppointmentModalContext.Provider>
  );
}
