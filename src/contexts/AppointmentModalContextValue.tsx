import { createContext } from "react";

interface AppointmentModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const AppointmentModalContext = createContext<
  AppointmentModalContextType | undefined
>(undefined);

AppointmentModalContext.displayName = "AppointmentModalContext";
