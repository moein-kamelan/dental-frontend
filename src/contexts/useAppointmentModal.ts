import { useContext } from "react";
import { AppointmentModalContext } from "./AppointmentModalContextValue";

export function useAppointmentModal() {
  const context = useContext(AppointmentModalContext);
  if (context === undefined) {
    throw new Error(
      "useAppointmentModal must be used within an AppointmentModalProvider"
    );
  }
  return context;
}
