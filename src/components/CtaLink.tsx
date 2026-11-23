import type { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl font-semibold no-underline whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";

const variants = {
  primary: cn(
    "btn-shine text-white hover:text-white",
    "bg-gradient-to-r from-brand-blue via-brand-purple to-brand-blue bg-[length:200%_100%] bg-[position:0%_0%] hover:bg-[position:100%_0%]",
    "shadow-[0_10px_30px_-10px_rgb(121_56_190/0.6)] hover:shadow-[0_18px_40px_-12px_rgb(121_56_190/0.7)]",
    "transition-[background-position,box-shadow] duration-500"
  ),
  secondary:
    "bg-white/80 text-ink hover:text-ink ring-1 ring-slate-200 hover:ring-slate-300 backdrop-blur shadow-sm hover:shadow-md transition-shadow duration-300",
};

const sizes = {
  sm: "px-3 py-2 text-sm sm:px-4",
  md: "px-6 py-3 text-base",
  lg: "px-7 py-3.5 text-base sm:px-8 sm:py-4 sm:text-lg",
};

export const CtaLink: FC<CtaLinkProps> = ({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}) => (
  <motion.a
    href={href}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.97 }}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
    className={cn(base, variants[variant], sizes[size], className)}
  >
    <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
  </motion.a>
);
