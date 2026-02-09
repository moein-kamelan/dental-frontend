import { useContext } from "react";
import { ClinicSelectionContext } from "./ClinicSelectionContextValue";

export function useClinicSelection() {
  const context = useContext(ClinicSelectionContext);
  if (context === undefined) {
    throw new Error(
      "useClinicSelection must be used within a ClinicSelectionProvider"
    );
  }
  return context;
}
