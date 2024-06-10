import { createContext } from "react";
import { RegistrationFormValues } from "./types";

interface RegistrationFormContextType {
  nextStep: () => void;
  previousStep: () => void;
  data: React.MutableRefObject<Partial<RegistrationFormValues>>;
  currentStep: number;
}

export const RegistrationFormContext = createContext(
  {} as RegistrationFormContextType
);
