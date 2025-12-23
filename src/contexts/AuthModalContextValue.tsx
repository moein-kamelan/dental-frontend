import { createContext } from "react";

interface AuthModalContextType {
  isOpen: boolean;
  openModal: (shouldOpenAppointmentAfterLogin?: boolean, preselectedDoctorId?: string) => void;
  closeModal: () => void;
  shouldOpenAppointmentAfterLogin: boolean;
  preselectedDoctorId: string | null;
}

export const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined
);

AuthModalContext.displayName = "AuthModalContext";
