import { createContext } from "react";

interface AuthModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined
);

AuthModalContext.displayName = "AuthModalContext";
