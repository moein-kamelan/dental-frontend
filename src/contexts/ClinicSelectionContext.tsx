import {
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { Clinic } from "../types/types";
import {
  ClinicSelectionContext,
  type ClinicSelectionContextValue,
} from "./ClinicSelectionContextValue";
import { useGetCurrentClinic } from "../services/useClinics";

const STORAGE_KEY = "selectedClinic";
const DISMISS_KEY = "clinicSelectionDismissed";

export function ClinicSelectionProvider({ children }: PropsWithChildren) {
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: currentClinicResponse } = useGetCurrentClinic();
  const domainClinic = currentClinicResponse?.data?.clinic as Clinic | undefined;

  useEffect(() => {
    if (domainClinic) {
      setSelectedClinic(domainClinic);
      setIsModalOpen(false);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [domainClinic]);

  useEffect(() => {
    try {
      const storedClinic = localStorage.getItem(STORAGE_KEY);
      if (storedClinic) {
        const parsed = JSON.parse(storedClinic) as Partial<Clinic>;
        if (parsed && typeof parsed.id === "string") {
          setSelectedClinic(parsed as Clinic);
        }
      } else if (!domainClinic && !sessionStorage.getItem(DISMISS_KEY)) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Failed to read stored clinic selection", error);
    }
  }, [domainClinic]);

  useEffect(() => {
    if (selectedClinic || domainClinic) return;
    try {
      if (!sessionStorage.getItem(DISMISS_KEY)) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Failed to check clinic selection dismissal", error);
    }
  }, [selectedClinic, domainClinic]);

  const selectClinic = (clinic: Clinic) => {
    if (domainClinic && clinic.id !== domainClinic.id) return;
    setSelectedClinic(clinic);
    setIsModalOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clinic));
      sessionStorage.removeItem(DISMISS_KEY);
    } catch (error) {
      console.error("Failed to persist clinic selection", error);
    }
  };

  const clearSelection = () => {
    if (domainClinic) return;
    setSelectedClinic(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear clinic selection", error);
    }
    setIsModalOpen(true);
  };

  const openModal = () => {
    if (domainClinic) return;
    setIsModalOpen(true);
    try {
      sessionStorage.removeItem(DISMISS_KEY);
    } catch (error) {
      console.error("Failed to reset clinic modal dismissal", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "true");
    } catch (error) {
      console.error("Failed to persist clinic modal dismissal", error);
    }
  };

  const value: ClinicSelectionContextValue = useMemo(
    () => ({
      selectedClinic,
      isModalOpen,
      openModal,
      closeModal,
      selectClinic,
      clearSelection,
    }),
    [selectedClinic, isModalOpen]
  );

  return (
    <ClinicSelectionContext.Provider value={value}>
      {children}
    </ClinicSelectionContext.Provider>
  );
}
