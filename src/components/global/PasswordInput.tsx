import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  LegacyRef,
  forwardRef,
  useState,
} from "react";

interface PasswordInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  errorMessage?: string;
  label: string;
}

function PasswordInput(
  props: PasswordInputProps,
  ref: LegacyRef<HTMLInputElement>
) {
  const { errorMessage, label, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);

  const inputClass = errorMessage
    ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
    : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#171717] sm:text-sm sm:leading-6";

  return (
    <div>
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            className={inputClass}
            ref={ref}
            {...rest}
            type={showPassword ? "text" : "password"}
          />
          <button
            type="button"
            className="absolute top-0 end-0 p-2 rounded-e-md"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeSlashIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            )}
          </button>
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

export default forwardRef<HTMLInputElement, PasswordInputProps>(PasswordInput);
