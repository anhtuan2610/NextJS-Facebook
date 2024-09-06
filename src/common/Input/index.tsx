import { cva } from "class-variance-authority";
import { ComponentProps, forwardRef, useMemo } from "react";

type InputProps = ComponentProps<"input"> & {
  scale?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "tertiary";
};

const inputVariants = cva(
  [
    "w-full",
    "h-14",
    "border",
    "rounded-lg",
    "focus:border-[#1877F2] outline-none",
    "block",
  ],
  {
    variants: {
      scale: {
        small: "text-sm py-1 px-2",
        medium: "text-base px-4",
        large: "text-lg py-3 px-4",
      },
      variant: {
        primary: "border-gray-300",
        secondary: "border-gray-500",
        tertiary: "border-green-500",
      },
    },
    defaultVariants: {
      scale: "medium",
      variant: "primary",
    },
  }
);

const Input = forwardRef<HTMLInputElement, InputProps>(({ scale, variant, ...rest }, ref) => {
  const className = useMemo(() => {
    return inputVariants({ scale, variant });
  }, [scale, variant]);

  return <input {...rest} className={className} ref={ref} />;
});

export default Input;