import type { ButtonHTMLAttributes, FC } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[#4E92F4] text-white hover:bg-[#4182E4] shadow-lg hover:shadow-xl",
        outline:
          "border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900",
        text: "text-gray-700 hover:text-gray-900 hover:bg-gray-100",
        google:
          "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm",
      },
      size: {
        sm: "h-10 px-4 text-base",
        md: "h-12 px-6 text-lg",
        lg: "h-14 px-8 text-xl",
        xl: "h-16 px-10 text-2xl",
        icon: "h-12 w-12 p-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: FC;
}

export const Button: FC<ButtonProps> = ({
  className,
  variant,
  size,
  icon: Icon,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {Icon && <Icon />}
      {Icon && children && <span className="ml-2">{children}</span>}
      {!Icon && children}
    </button>
  );
};
