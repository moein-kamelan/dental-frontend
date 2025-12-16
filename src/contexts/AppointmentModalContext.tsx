import { useState, type ReactNode } from "react";
import { AppointmentModalContext } from "./AppointmentModalContextValue";

export function AppointmentModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
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
