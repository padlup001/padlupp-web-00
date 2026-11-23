import type { FC } from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { BrainCircuit, HeartHandshake, Users } from "lucide-react";
import {
  CONTAINER,
  EASE,
  ScribbleUnderline,
  SectionHeading,
  SpotlightCard,
  VIEWPORT,
  stagger,
} from "../components/motion";
import { cn } from "../utils/cn";
import featuresImage from "../assets/images/right_blob.png";

const REASONS = [
  {
    icon: HeartHandshake,
    title: "Get real accountability partners",
    body: "Match with people chasing similar goals, so someone notices when you show up, and when you don't.",
  },
  {
    icon: BrainCircuit,
    title: "AI-powered goal-setting",
    body: "Turn a big ambition into clear, trackable steps with suggestions, reminders and insights from Padlupp AI.",
  },
  {
    icon: Users,
    title: "Vibes and community that keep you locked in",
    body: "Join pods and communities where progress gets celebrated and momentum is contagious.",
  },
];

export const WhyPadlupp: FC = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <section id="why-padlupp" className="relative py-20 sm:py-28">
      <div className={cn(CONTAINER, "grid items-center gap-14 lg:grid-cols-2 lg:gap-16")}>
        <div>
          <SectionHeading
            align="left"
            eyebrow="Why Padlupp"
            title={
              <>
                Why{" "}
                <span className="relative inline-block">
                  Padlupp
                  <ScribbleUnderline className="-bottom-[0.1em] h-[0.25em]" />
                </span>
                ?
              </>
            }
            sub="Goals are easier when you're not doing them alone. Padlupp brings the people, the plan and the push together."
          />

          <motion.ul
            variants={stagger(0.12, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mt-10 space-y-4"
          >
            {REASONS.map(({ icon: Icon, title, body }) => (
              <li key={title}>
                <SpotlightCard className="flex items-start gap-4 p-5 sm:gap-5 sm:p-6">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple text-white shadow-[0_8px_20px_-6px_rgb(78_146_244/0.6)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <div className="relative">
                    <h3 className="text-lg font-bold text-ink sm:text-xl">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-base">{body}</p>
                  </div>
                </SpotlightCard>
              </li>
            ))}
          </motion.ul>
        </div>

        <div ref={imageRef} className="relative mx-auto w-full max-w-xl">
          <div aria-hidden="true" className="absolute inset-[10%] -z-10 rounded-full bg-brand-blue/20 blur-3xl motion-safe:animate-blob-b" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 1, ease: EASE }}
          >
            <motion.img
              src={featuresImage}
              alt="Padlupp features: a task card, a group video call, Padlupp AI and the home feed"
              width={640}
              height={560}
              loading="lazy"
              decoding="async"
              style={reduce ? undefined : { y: imageY, rotate: imageRotate }}
              className="w-full drop-shadow-[0_30px_50px_rgb(15_23_42/0.15)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
