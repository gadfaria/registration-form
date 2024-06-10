import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface RadioGroupsProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  errorMessage?: string;
  options: { id: string; title: string }[];
}

export default function RadioGroups(props: RadioGroupsProps) {
  const { options, errorMessage, defaultValue, ...rest } = props;

  return (
    <fieldset>
      <div className="space-y-6 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
        {options.map((o) => (
          <div key={o.id} className="flex items-center">
            <input
              id={o.id}
              value={o.id}
              type="radio"
              defaultChecked={o.id === defaultValue}
              className="h-4 w-4 border-gray-300 text-[#171717] focus:ring-##171717]"
              {...rest}
            />
            <label
              htmlFor={o.id}
              className="ml-3 block text-sm font-medium leading-6 text-gray-900"
            >
              {o.title}
            </label>
          </div>
        ))}
      </div>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errorMessage}
        </p>
      )}
    </fieldset>
  );
}
