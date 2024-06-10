import { useContext } from "react";

import { CheckIcon } from "@heroicons/react/20/solid";
import { RegistrationFormContext } from "../../../utils/contexts";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface StepCounterProps {
  total: number;
}

export default function StepCounter(props: StepCounterProps) {
  const { total } = props;
  const { currentStep } = useContext(RegistrationFormContext);

  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center justify-center mb-5">
        {Array.from({ length: total }, (_, i) => (
          <li
            key={i}
            className={classNames(
              i !== total - 1 ? "pr-8 sm:pr-20" : "",
              "relative"
            )}
          >
            {i < currentStep ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-[#171717]" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#171717]">
                  <CheckIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </div>
              </>
            ) : i === currentStep ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#171717] bg-white"
                  aria-current="step"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-[#171717]"
                    aria-hidden="true"
                  />
                </div>
              </>
            ) : (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-transparent"
                    aria-hidden="true"
                  />
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
