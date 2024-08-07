import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  errorMessage?: string;
  label: string;
}

export default function Input(props: InputProps) {
  const { errorMessage, label, ...rest } = props;

  const inputClass = errorMessage
    ? "block w-full [transition:box-shadow_0.3s,_border_0.3s] rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
    : "block w-full [transition:box-shadow_0.3s,_border_0.3s] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#171717] sm:text-sm sm:leading-6";

  return (
    <div>
      <label
        className={`block text-sm font-medium leading-6 ${
          errorMessage ? "text-red-600" : "text-gray-900"
        }`}
      >
        {label}
        <div className="relative mt-2 rounded-md shadow-sm">
          <input className={inputClass} {...rest} />
          {errorMessage && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </label>

      {errorMessage && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
