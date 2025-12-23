import { useState, type ReactNode } from "react";
import { AuthModalContext } from "./AuthModalContextValue";

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [shouldOpenAppointmentAfterLogin, setShouldOpenAppointmentAfterLogin] = useState<boolean>(false);
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | null>(null);

  const openModal = (shouldOpenAppointmentAfterLogin: boolean = false, preselectedDoctorId?: string) => {
    setIsOpen(true);
    setShouldOpenAppointmentAfterLogin(shouldOpenAppointmentAfterLogin);
    setPreselectedDoctorId(preselectedDoctorId || null);
  };

  const closeModal = () => {
    setIsOpen(false);
    setShouldOpenAppointmentAfterLogin(false);
    setPreselectedDoctorId(null);
  };

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        shouldOpenAppointmentAfterLogin,
        preselectedDoctorId,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}
