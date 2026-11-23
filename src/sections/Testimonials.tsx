import type { FC, KeyboardEvent } from "react";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play, Quote } from "lucide-react";
import { CONTAINER, EASE, Reveal, SectionHeading } from "../components/motion";
import { cn } from "../utils/cn";

const TESTIMONIALS = [
  {
    text: "This app has been great for staying organized and focused on my goals. As someone new to the UK and juggling multiple responsibilities, I truly appreciate the supportive community aspect, intuitive goal-tracking tools, and the valuable AI-driven insights that simplify my studies. It's exactly what I needed to stay motivated and organised!",
    name: "Olawale Semiu",
    role: "Student",
  },
  {
    text: "For someone who finds it hard to connect with people on the exact journey as mine, people who understand where I am coming from and the level I am without feeling like I'm struggling to fit in a group. This App made it easier to connect with likeminded individuals as mine.",
    name: "Tayo A.",
    role: "Financial Counselor",
  },
  {
    text: "I procrastinate a lot and struggle to meet up certain goals I set within a supposed timeline, this platform has made me more accountability in completely my set goals",
    name: "Hellena John",
    role: "Psychology Student",
  },
  {
    text: "Padlupp helped me find collaborators for my research project and kept me motivated throughout the journey. The platform's reminders and insights are truly valuable.",
    name: "Chris Mensah",
    role: "Research Lead",
  },
];

const COUNT = TESTIMONIALS.length;

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const slide: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 60, filter: "blur(6px)" }),
  center: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE } },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -60,
    filter: "blur(6px)",
    transition: { duration: 0.35, ease: EASE },
  }),
};

const controlButton =
  "grid size-11 place-items-center rounded-full bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:text-brand-blue hover:shadow-md hover:ring-brand-blue/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";

export const Testimonials: FC = () => {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [userPaused, setUserPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const reduce = useReducedMotion();

  // Autoplay is off for reduced motion and when the reader pauses it.
  const autoplay = !reduce && !userPaused;
  const running = autoplay && inView && !interacting;

  const goTo = (next: number, dir: number) => setSlide([(next + COUNT) % COUNT, dir]);
  const next = () => goTo(index + 1, 1);
  const prev = () => goTo(index - 1, -1);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  const current = TESTIMONIALS[index];

  return (
    <section ref={sectionRef} id="testimonials" className="relative overflow-hidden py-20 sm:py-28">
      <div className={CONTAINER}>
        <SectionHeading eyebrow="Stories" title="What everyone says" />

        <Reveal className="mx-auto mt-12 max-w-3xl sm:mt-16" delay={0.1}>
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Testimonials"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setInteracting(true)}
            onMouseLeave={() => setInteracting(false)}
            onFocus={() => setInteracting(true)}
            onBlur={() => setInteracting(false)}
            className="rounded-[2rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
          >
            <div className="relative">
              {/* Stacked cards behind the active one for depth */}
              <div aria-hidden="true" className="absolute inset-x-6 -bottom-3 h-full rounded-[2rem] bg-white/70 ring-1 ring-slate-200/70" />
              <div aria-hidden="true" className="absolute inset-x-12 -bottom-6 h-full rounded-[2rem] bg-white/50 ring-1 ring-slate-200/50" />

              <div
                aria-live={running ? "off" : "polite"}
                className="relative grid min-h-[24rem] overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_60px_-24px_rgb(15_23_42/0.25)] ring-1 ring-slate-200 sm:min-h-[19rem]"
              >
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.figure
                    key={index}
                    custom={direction}
                    variants={slide}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragStart={() => setInteracting(true)}
                    onDragEnd={(_, info) => {
                      setInteracting(false);
                      if (info.offset.x < -60 || info.velocity.x < -400) next();
                      else if (info.offset.x > 60 || info.velocity.x > 400) prev();
                    }}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${COUNT}`}
                    className="flex cursor-grab touch-pan-y flex-col p-7 select-none active:cursor-grabbing sm:p-10"
                  >
                    <Quote className="size-9 text-brand-blue/30 sm:size-10" aria-hidden="true" />
                    <blockquote className="mt-4 flex-1 text-base leading-relaxed text-slate-700 sm:text-xl sm:leading-relaxed">
                      “{current.text}”
                    </blockquote>
                    <figcaption className="mt-8 flex items-center gap-4">
                      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-purple font-bold text-white">
                        {initials(current.name)}
                      </span>
                      <span>
                        <span className="block font-bold text-ink sm:text-lg">{current.name}</span>
                        <span className="block text-sm text-slate-500">{current.role}</span>
                      </span>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-12 flex items-center justify-center gap-3 sm:gap-4">
              <button type="button" onClick={prev} aria-label="Previous testimonial" className={controlButton}>
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((t, i) => {
                  const active = i === index;
                  return (
                    <button
                      key={t.name}
                      type="button"
                      aria-label={`Show testimonial ${i + 1}: ${t.name}`}
                      aria-current={active ? "true" : undefined}
                      onClick={() => goTo(i, i > index ? 1 : -1)}
                      className={cn(
                        "relative h-2.5 overflow-hidden rounded-full bg-slate-200 transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue",
                        active ? "w-10" : "w-2.5 hover:bg-slate-300"
                      )}
                    >
                      {active &&
                        (autoplay ? (
                          <span
                            key={index}
                            onAnimationEnd={next}
                            style={{ animationPlayState: running ? "running" : "paused" }}
                            className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-brand-blue to-brand-purple animate-progress"
                          />
                        ) : (
                          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple" />
                        ))}
                    </button>
                  );
                })}
              </div>

              <button type="button" onClick={next} aria-label="Next testimonial" className={controlButton}>
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>

              {!reduce && (
                <button
                  type="button"
                  onClick={() => setUserPaused((p) => !p)}
                  aria-label={userPaused ? "Play testimonials" : "Pause testimonials"}
                  className={cn(controlButton, "size-9")}
                >
                  {userPaused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
