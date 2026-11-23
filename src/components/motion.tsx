import type { FC, PointerEvent, ReactNode } from "react";
import { useId } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "../utils/cn";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const VIEWPORT = { once: true, amount: 0.2 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export const stagger = (each = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren } },
});

export const CONTAINER = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** Fades and lifts its children into place the first time they scroll into view. */
export const Reveal: FC<RevealProps> = ({ children, className, delay = 0, y = 32 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={VIEWPORT}
    transition={{ duration: 0.8, ease: EASE, delay }}
  >
    {children}
  </motion.div>
);

/** Hand-drawn underline that draws itself in. Sits under an inline-block parent. */
export const ScribbleUnderline: FC<{ delay?: number; className?: string }> = ({
  delay = 0.3,
  className,
}) => {
  const id = `scribble-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 16"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute left-0 w-full", className)}
    >
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#4E92F4" />
          <stop offset="1" stopColor="#7938BE" />
        </linearGradient>
      </defs>
      <motion.path
        d="M4 11 C 45 3, 110 2, 196 8"
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth={5}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      />
    </svg>
  );
};

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
  className?: string;
};

export const SectionHeading: FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  sub,
  align = "center",
  className,
}) => (
  <motion.div
    variants={stagger(0.1)}
    initial="hidden"
    whileInView="show"
    viewport={VIEWPORT}
    className={cn(
      "max-w-2xl",
      align === "center" ? "mx-auto text-center" : "mx-auto text-center lg:mx-0 lg:text-left",
      className
    )}
  >
    {eyebrow && (
      <motion.p
        variants={fadeUp}
        className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue ring-1 ring-blue-100"
      >
        <span className="size-1.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple" />
        {eyebrow}
      </motion.p>
    )}
    <motion.h2
      variants={fadeUp}
      className="text-[2rem] leading-[1.15] font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl"
    >
      {title}
    </motion.h2>
    {sub && (
      <motion.p variants={fadeUp} className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
        {sub}
      </motion.p>
    )}
  </motion.div>
);

/** Card that lifts on hover and carries a soft glow that follows the cursor. */
export const SpotlightCard: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onPointerMove={handleMove}
      className={cn(
        "spotlight group relative overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200/80",
        "shadow-[0_1px_2px_rgb(15_23_42/0.04),0_12px_32px_-12px_rgb(15_23_42/0.12)]",
        "transition-shadow duration-300 hover:shadow-[0_1px_2px_rgb(15_23_42/0.04),0_24px_48px_-16px_rgb(78_146_244/0.35)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
