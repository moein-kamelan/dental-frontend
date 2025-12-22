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
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | null>(null);
  const user = useAppSelector((state) => state.user.data);
  const { openModal: openAuthModal } = useAuthModal();

  const openModal = (doctorId?: string) => {
    // اگر کاربر لاگین نشده باشد، مودال لاگین را باز کن
    if (!user) {
      openAuthModal();
      showErrorToast("لطفا ابتدا وارد شوید");
      return;
    }
    setPreselectedDoctorId(doctorId || null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setPreselectedDoctorId(null);
  };

  return (
    <AppointmentModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        preselectedDoctorId,
      }}
    >
      {children}
    </AppointmentModalContext.Provider>
  );
}
