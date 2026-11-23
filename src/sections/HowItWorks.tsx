import type { FC } from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { APP_SIGN_UP_URL } from "../appLinks";
import { CtaLink } from "../components/CtaLink";
import { CONTAINER, Reveal, SectionHeading, VIEWPORT, fadeUp, stagger } from "../components/motion";
import { cn } from "../utils/cn";

const STEPS = [
  {
    title: "Set your goal",
    body: "Tell Padlupp what you're working towards. AI helps you shape it into clear, trackable steps.",
  },
  {
    title: "Get matched",
    body: "Smart goal-matching pairs you with accountability buddies on the same journey as you.",
  },
  {
    title: "Grow together",
    body: "Chat, call, share docs and check in on each other's progress until the goal is done.",
  },
];

export const HowItWorks: FC = () => {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 85%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-slate-50/70 py-20 sm:py-28">
      <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className={cn(CONTAINER, "relative")}>
        <SectionHeading
          eyebrow="How it works"
          title="From big goal to done, together"
          sub="Three steps between you and the people who'll keep you on track."
        />

        <motion.ol
          ref={listRef}
          variants={stagger(0.18)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="relative mx-auto mt-14 grid max-w-5xl gap-10 md:mt-20 md:grid-cols-3 md:gap-8"
        >
          {/* Track and the gradient line that fills it as you scroll */}
          <div aria-hidden="true" className="absolute top-6 bottom-6 left-6 w-0.5 bg-slate-200 md:hidden" />
          <motion.div
            aria-hidden="true"
            style={reduce ? undefined : { scaleY: progress }}
            className="absolute top-6 bottom-6 left-6 w-0.5 origin-top bg-gradient-to-b from-brand-blue to-brand-purple md:hidden"
          />
          <div aria-hidden="true" className="absolute top-6 right-[16.66%] left-[16.66%] hidden h-0.5 bg-slate-200 md:block" />
          <motion.div
            aria-hidden="true"
            style={reduce ? undefined : { scaleX: progress }}
            className="absolute top-6 right-[16.66%] left-[16.66%] hidden h-0.5 origin-left bg-gradient-to-r from-brand-blue to-brand-purple md:block"
          />

          {STEPS.map((step, i) => (
            <motion.li
              key={step.title}
              variants={fadeUp}
              className="relative flex gap-5 md:flex-col md:items-center md:text-center"
            >
              <motion.span
                variants={{
                  hidden: { scale: 0.4, opacity: 0 },
                  show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 18 } },
                }}
                className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-purple text-lg font-bold text-white shadow-[0_0_0_6px_white,0_10px_24px_-6px_rgb(121_56_190/0.5)]"
              >
                {i + 1}
              </motion.span>
              <div className="pt-1 md:pt-6">
                <h3 className="text-xl font-bold text-ink">{step.title}</h3>
                <p className="mt-2 max-w-xs leading-relaxed text-muted">{step.body}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>

        <Reveal className="mt-14 flex justify-center" delay={0.2}>
          <CtaLink href={APP_SIGN_UP_URL}>
            Sign Up
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </CtaLink>
        </Reveal>
      </div>
    </section>
  );
};
