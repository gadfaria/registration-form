import { useMemo, useState } from "react";

export function useStepForm(steps: JSX.Element[]) {
  const [currentStep, setCurrentStep] = useState(0);

  function nextStep() {
    if (currentStep === steps.length - 1) return;
    setCurrentStep(currentStep + 1);
  }

  function previousStep() {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
  }

  const Step = useMemo(() => {
    return steps[currentStep];
    // return React.cloneElement(steps[currentStep], {
    //   nextStep,
    //   previousStep,
    // });
  }, [currentStep]);

  return {
    currentStep,
    Step,
    nextStep,
    previousStep,
  };
}
