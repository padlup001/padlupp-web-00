import type { FC } from "react";
import { motion } from "framer-motion";
import {
  BellRing,
  CalendarDays,
  FileText,
  ListChecks,
  MessageCircle,
  Sparkles,
  Timer,
  Video,
} from "lucide-react";
import { CONTAINER, SectionHeading, SpotlightCard, VIEWPORT, stagger } from "../components/motion";
import { cn } from "../utils/cn";

const TOOLS = [
  { icon: ListChecks, name: "Tasks", body: "Break goals into steps" },
  { icon: MessageCircle, name: "Chat", body: "Talk with your buddies" },
  { icon: Sparkles, name: "AI", body: "Suggestions that keep you moving" },
  { icon: Timer, name: "Time tracking", body: "See where your hours go" },
  { icon: FileText, name: "Doc sharing", body: "Keep resources in one place" },
  { icon: CalendarDays, name: "Calendar", body: "Plan sessions together" },
  { icon: Video, name: "Group call", body: "Voice and video, built in" },
  { icon: BellRing, name: "Reminder", body: "Never miss a check-in" },
];

export const Tools: FC = () => (
  <section id="tools" className="relative py-20 sm:py-28">
    <div aria-hidden="true" className="absolute top-1/3 left-1/2 -z-10 h-[28rem] w-[min(60rem,100%)] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-blue/15 to-brand-purple/15 blur-3xl" />
    <div className={CONTAINER}>
      <SectionHeading
        eyebrow="Tools"
        title="All the tools that you need"
        sub="Collaborating with like-minded buddies made easy"
      />

      <motion.ul
        variants={stagger(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-5 lg:grid-cols-4"
      >
        {TOOLS.map(({ icon: Icon, name, body }) => (
          <li key={name}>
            <SpotlightCard className="h-full p-4 sm:p-6">
              <span
                className={cn(
                  "grid size-11 place-items-center rounded-xl bg-blue-50 text-brand-blue ring-1 ring-blue-100 transition-all duration-500 sm:size-12",
                  "group-hover:bg-gradient-to-br group-hover:from-brand-blue group-hover:to-brand-purple group-hover:text-white group-hover:ring-transparent group-hover:-rotate-6"
                )}
              >
                <Icon className="size-5 sm:size-6" aria-hidden="true" />
              </span>
              <h3 className="relative mt-4 text-base font-bold text-ink sm:mt-5 sm:text-lg">{name}</h3>
              <p className="relative mt-1 text-sm leading-snug text-muted">{body}</p>
            </SpotlightCard>
          </li>
        ))}
      </motion.ul>
    </div>
  </section>
);
