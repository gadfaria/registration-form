import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
  forwardRef,
} from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  secondary?: boolean;
}

function Button(props: PropsWithChildren<ButtonProps>) {
  const { children, secondary, className, ...rest } = props;

  const buttonClass = secondary
    ? "w-full rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-[#171717] hover:bg-gray-50"
    : "w-full rounded-md bg-[#171717] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171717]";

  return (
    <button {...rest} className={`${buttonClass} ${className}`}>
      {children}
    </button>
  );
}

export default forwardRef<HTMLButtonElement, ButtonProps>(Button);
