import type { FC } from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { APP_SIGN_UP_URL } from "../appLinks";
import { CtaLink } from "../components/CtaLink";
import { CONTAINER, EASE, SectionHeading, VIEWPORT, fadeUp, stagger } from "../components/motion";
import { cn } from "../utils/cn";
import communityImage from "../assets/images/community_image.png";

const POINTS = [
  "Seamless chat, calls and video",
  "Track progress together",
  "Connect globally with like-minded people",
];

export const Community: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="community" className="relative py-20 sm:py-28">
      <div className={cn(CONTAINER, "grid items-center gap-12 lg:grid-cols-2 lg:gap-16")}>
        <div ref={ref} className="relative order-last mx-auto w-full max-w-xl lg:order-first">
          <div aria-hidden="true" className="absolute inset-[6%] -z-10 rounded-full bg-gradient-to-tr from-brand-purple/25 to-brand-blue/25 blur-3xl motion-safe:animate-blob-a" />
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(14% 14% 14% 14% round 40px)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 0px)" }}
            viewport={VIEWPORT}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <motion.img
              src={communityImage}
              alt="A collage of students and professionals studying, working and learning"
              width={646}
              height={660}
              loading="lazy"
              decoding="async"
              style={reduce ? undefined : { y: imageY }}
              className="w-full"
            />
          </motion.div>
        </div>

        <div className="text-center lg:text-left">
          <SectionHeading
            align="left"
            eyebrow="Community"
            title={
              <>
                Your Goals. Your People. One Powerful Community<span className="text-brand-blue">.</span>
              </>
            }
            sub="Find the perfect accountability partner, track progress together, and stay motivated with seamless chat, calls, and video. Connect globally with like-minded individuals who push you toward success."
          />

          <motion.ul
            variants={stagger(0.1, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mx-auto mt-8 inline-flex flex-col gap-3 text-left lg:mx-0"
          >
            {POINTS.map((point) => (
              <motion.li key={point} variants={fadeUp} className="flex items-center gap-3 font-medium text-slate-700">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-purple text-white">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                {point}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
            className="mt-10"
          >
            <CtaLink href={APP_SIGN_UP_URL} size="lg">
              Sign Up
              <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </CtaLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
