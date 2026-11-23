import type { FC } from "react";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ChevronUp } from "lucide-react";

/** Floating button that appears after scrolling, with a ring showing page progress. */
export const BackToTop: FC = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 600));

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          className="fixed right-4 bottom-4 z-50 grid size-12 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-purple text-white shadow-[0_12px_30px_-8px_rgb(121_56_190/0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:right-6 sm:bottom-6"
        >
          <svg aria-hidden="true" viewBox="0 0 48 48" className="absolute inset-0 -rotate-90">
            <circle cx="24" cy="24" r="22" fill="none" stroke="rgb(255 255 255 / 0.25)" strokeWidth="2" />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <ChevronUp className="relative size-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
