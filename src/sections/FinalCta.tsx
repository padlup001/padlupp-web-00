import type { FC } from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { APP_SIGN_UP_URL } from "../appLinks";
import { CtaLink } from "../components/CtaLink";
import { EASE, VIEWPORT, fadeUp, stagger } from "../components/motion";
import cardLeftImage from "../assets/images/card_left.png";
import cardRightImage from "../assets/images/card_right.png";

export const FinalCta: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const leftY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section id="join" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-b from-white via-blue-50 to-blue-100 px-6 py-24 text-center ring-1 ring-blue-100 sm:rounded-[2.5rem] sm:py-32"
      >
        <motion.img
          src={cardLeftImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          style={reduce ? undefined : { y: leftY }}
          className="pointer-events-none absolute top-0 left-0 -z-10 h-full w-[45%] object-cover object-left opacity-40 sm:opacity-90"
        />
        <motion.img
          src={cardRightImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          style={reduce ? undefined : { y: rightY }}
          className="pointer-events-none absolute top-0 right-0 -z-10 h-full w-[45%] object-cover object-right opacity-40 sm:opacity-90"
        />
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,white_35%,transparent_70%)]" />

        <motion.div
          variants={stagger(0.12, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="relative mx-auto max-w-xl"
        >
          <motion.h2 variants={fadeUp} className="text-[2rem] leading-tight font-extrabold tracking-tight text-ink sm:text-5xl">
            Join the <span className="text-gradient motion-safe:animate-gradient-pan">Movement</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-base text-muted sm:text-xl">
            Ready to stay accountable and achieve more?
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9">
            <CtaLink href={APP_SIGN_UP_URL} size="lg">
              Sign Up
              <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </CtaLink>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
