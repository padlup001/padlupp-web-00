import type { FC } from "react";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { APP_SIGN_IN_URL, APP_SIGN_UP_URL } from "../appLinks";
import { cn } from "../utils/cn";
import { CtaLink } from "./CtaLink";
import { EASE } from "./motion";
import logoImage from "../assets/images/logo.png";

export const SECTION_LINKS = [
  { label: "Why Padlupp", href: "#why-padlupp" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Tools", href: "#tools" },
  { label: "Community", href: "#community" },
  { label: "Stories", href: "#testimonials" },
];

export const Header: FC = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled || menuOpen
          ? "bg-white/80 shadow-[0_1px_0_rgb(15_23_42/0.06),0_10px_30px_-12px_rgb(15_23_42/0.12)] backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <a href="/" className="flex shrink-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue">
          <img src={logoImage} alt="Padlupp Logo" width={180} height={60} className="h-7 w-auto sm:h-10" />
        </a>

        <nav aria-label="Sections" className="hidden lg:block" onMouseLeave={() => setHovered(null)}>
          <ul className="flex items-center gap-1">
            {SECTION_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onMouseEnter={() => setHovered(link.href)}
                  onFocus={() => setHovered(link.href)}
                  className="relative isolate block rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-brand-blue"
                >
                  {hovered === link.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-slate-900/5"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <nav aria-label="Account" className="flex items-center gap-1 sm:gap-3">
            <a
              href={APP_SIGN_IN_URL}
              className="whitespace-nowrap rounded-lg px-2 py-2 text-sm font-semibold text-slate-700 no-underline transition-colors hover:text-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:px-3 sm:text-base"
            >
              Sign In
            </a>
            <CtaLink href={APP_SIGN_UP_URL} size="sm" className="sm:text-base">
              Sign Up
            </CtaLink>
          </nav>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-9 place-items-center rounded-lg text-slate-700 transition-colors hover:bg-slate-900/5 focus-visible:outline-2 focus-visible:outline-brand-blue lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Sections (mobile)"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
              className="mx-auto flex max-w-7xl flex-col gap-1 px-4 pb-4 sm:px-6"
            >
              {SECTION_LINKS.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-900/5 hover:text-ink"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-brand-blue to-brand-purple"
      />
    </motion.header>
  );
};
