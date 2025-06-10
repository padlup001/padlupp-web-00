import type { AnchorHTMLAttributes, FC } from "react";
import { cn } from "../utils/cn";

export const Link: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <a
      className={cn(
        "text-blue-600 hover:text-blue-800 underline underline-offset-4",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
};
