import { createContext } from "react";
import type { Clinic } from "../types/types";

export interface ClinicSelectionContextValue {
  selectedClinic: Clinic | null;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  selectClinic: (clinic: Clinic) => void;
  clearSelection: () => void;
}

export const ClinicSelectionContext = createContext<
  ClinicSelectionContextValue | undefined
>(undefined);

ClinicSelectionContext.displayName = "ClinicSelectionContext";
