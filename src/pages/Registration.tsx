import { useRef } from "react";
import FirstStep from "../components/pages/registration/FirstStep";
import FourthStep from "../components/pages/registration/FourthStep";
import SecondStep from "../components/pages/registration/SecondStep";
import StepCounter from "../components/pages/registration/StepCounter";
import Thanks from "../components/pages/registration/Thanks";
import ThirdStep from "../components/pages/registration/ThirdStep";
import { useStepForm } from "../hooks/useStepForm";
import { RegistrationFormContext } from "../utils/contexts";
import { RegistrationFormValues } from "../utils/types";

const FORM_COMPONENTS = [
  <FirstStep />,
  <SecondStep />,
  <ThirdStep />,
  <FourthStep />,
  <Thanks />,
];

export default function Registration() {
  const { Step, currentStep, nextStep, previousStep } =
    useStepForm(FORM_COMPONENTS);

  const data = useRef<Partial<RegistrationFormValues>>({});

  return (
    <div className="w-screen h-screen bg-[#ffffff]  sm:p-10 sm:bg-[#0a0a0a]">
      <div className="mx-auto max-w-xl bg-[#ffffff] p-10 sm:max-w-xl sm:p-10 sm:[box-shadow:0px_0px_10px_0px_rgba(230,230,230,1)]">
        <RegistrationFormContext.Provider
          value={{
            data,
            currentStep,
            nextStep,
            previousStep,
          }}
        >
          <StepCounter total={FORM_COMPONENTS.length - 1} />
          {Step}
        </RegistrationFormContext.Provider>
      </div>
    </div>
  );
}
