import { createContext } from "react";

interface AppointmentModalContextType {
  isOpen: boolean;
  openModal: (doctorId?: string) => void;
  closeModal: () => void;
  preselectedDoctorId?: string | null;
}

export const AppointmentModalContext = createContext<
  AppointmentModalContextType | undefined
>(undefined);

AppointmentModalContext.displayName = "AppointmentModalContext";
