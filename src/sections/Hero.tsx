import type { FC, PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Target, Users, type LucideIcon } from "lucide-react";
import { APP_SIGN_IN_URL, APP_SIGN_UP_URL } from "../appLinks";
import { CtaLink } from "../components/CtaLink";
import { CONTAINER, EASE, ScribbleUnderline } from "../components/motion";
import { cn } from "../utils/cn";
import phonesImage from "../assets/images/goal.png";

/** One headline word that slides up from behind a mask. */
const Word: FC<{ index: number; children: ReactNode }> = ({ index, children }) => (
  <span className="-mb-[0.2em] inline-block overflow-hidden pb-[0.2em] align-bottom">
    <motion.span
      className="inline-block"
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.15 + index * 0.08 }}
    >
      {children}
    </motion.span>
  </span>
);

type ChipProps = {
  icon: LucideIcon;
  label: string;
  title: string;
  className: string;
  delay: number;
  floatDelay: string;
};

/** Small floating app notification placed around the hero phones. */
const Chip: FC<ChipProps> = ({ icon: Icon, label, title, className, delay, floatDelay }) => (
  <motion.div
    aria-hidden="true"
    initial={{ opacity: 0, scale: 0.8, y: 16 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay, type: "spring", stiffness: 240, damping: 20 }}
    className={cn("absolute z-20", className)}
  >
    <div
      className="flex items-center gap-2.5 rounded-2xl bg-white/90 py-2 pr-3.5 pl-2 shadow-[0_16px_40px_-12px_rgb(15_23_42/0.25)] ring-1 ring-slate-900/5 backdrop-blur motion-safe:animate-float"
      style={{ animationDelay: floatDelay }}
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple text-white sm:size-9">
        <Icon className="size-4" />
      </span>
      <span className="text-left leading-tight">
        <span className="block text-[10px] font-medium text-muted sm:text-xs">{label}</span>
        <span className="block text-xs font-semibold whitespace-nowrap text-ink sm:text-sm">{title}</span>
      </span>
    </div>
  </motion.div>
);

export const Hero: FC = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Gentle 3D tilt that follows a mouse pointer over the phones.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spring = { stiffness: 150, damping: 18 };
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [7, -7]), spring);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-9, 9]), spring);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section ref={ref} id="hero" className="relative">
      <div className={cn(CONTAINER, "grid items-center gap-12 pt-10 pb-16 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pt-20 lg:pb-28")}>
        <motion.div
          style={reduce ? undefined : { y: textY, opacity: textOpacity }}
          className="text-center lg:text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 backdrop-blur sm:text-sm"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-brand-blue opacity-60 motion-safe:animate-ping-slow" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-blue" />
            </span>
            Smart goal-matching for people with big plans
          </motion.p>

          <h1 className="text-[2.6rem] leading-[1.05] font-extrabold tracking-tight text-ink sm:text-6xl lg:text-7xl">
            <Word index={0}>Big</Word>{" "}
            <Word index={1}>
              <span className="relative inline-block">
                goals
                <ScribbleUnderline delay={0.9} className="-bottom-[0.12em] h-[0.28em]" />
              </span>
              ?
            </Word>{" "}
            <Word index={2}>You're</Word> <Word index={3}>not</Word>{" "}
            <Word index={4}>
              <span className="text-gradient motion-safe:animate-gradient-pan">alone</span>
            </Word>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0 lg:text-xl"
          >
            Find the perfect accountability buddy, track progress, and stay motivated with
            Padlupp's smart goal-matching
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
            className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start"
          >
            <CtaLink href={APP_SIGN_UP_URL} size="lg">
              Sign Up
              <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </CtaLink>
            <CtaLink href={APP_SIGN_IN_URL} size="lg" variant="secondary">
              Sign In
            </CtaLink>
          </motion.div>
        </motion.div>

        <motion.div
          style={reduce ? undefined : { y: visualY }}
          className="relative mx-auto w-full max-w-[34rem] [perspective:1200px]"
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
        >
          {/* Glow behind the phones */}
          <div aria-hidden="true" className="absolute inset-[8%] -z-10">
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_90deg,#4E92F4,#7938BE,#60a5fa,#4E92F4)] opacity-30 blur-3xl motion-safe:animate-spin-slow" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
            style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            <img
              src={phonesImage}
              alt="Padlupp app screens showing a buddy profile, a group chat and a video call"
              width={760}
              height={780}
              fetchPriority="high"
              className="relative w-full drop-shadow-[0_40px_60px_rgb(15_23_42/0.18)] select-none"
              draggable={false}
            />
          </motion.div>

          <Chip
            icon={Target}
            label="Goal set"
            title="Run a half marathon"
            className="top-[6%] -left-1 sm:-left-6"
            delay={1.1}
            floatDelay="0s"
          />
          <Chip
            icon={CheckCircle2}
            label="Just now"
            title="Jade completed her goal"
            className="top-[44%] -right-1 sm:-right-8"
            delay={1.3}
            floatDelay="-2s"
          />
          <Chip
            icon={Users}
            label="New buddy matched"
            title="Learning Python"
            className="bottom-[8%] left-0 sm:-left-4"
            delay={1.5}
            floatDelay="-4s"
          />
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.7, type: "spring", stiffness: 260, damping: 16 }}
            className="absolute top-0 right-[12%] z-20 grid size-10 place-items-center rounded-full bg-white text-brand-purple shadow-lg ring-1 ring-slate-900/5"
          >
            <Sparkles className="size-5 motion-safe:animate-pulse" />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
};
