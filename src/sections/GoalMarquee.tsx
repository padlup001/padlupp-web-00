import type { FC } from "react";
import { Sparkle } from "lucide-react";
import { Reveal } from "../components/motion";
import { cn } from "../utils/cn";

const ROW_ONE = [
  "Learning Python",
  "Half marathon training",
  "TSA Academic Test",
  "Research project",
  "Launching a side hustle",
  "Daily reading habit",
];

const ROW_TWO = [
  "Learning French",
  "Building a portfolio",
  "Exam prep",
  "Fitness journey",
  "Writing a novel",
  "Saving for a goal",
];

/** An endlessly scrolling row. The list is rendered twice so the loop is seamless. */
const Row: FC<{ items: string[]; reverse?: boolean }> = ({ items, reverse }) => (
  <div className="mask-fade-x flex overflow-hidden motion-reduce:justify-center">
    <ul
      className={cn(
        "flex w-max shrink-0 py-1.5 hover:[animation-play-state:paused]",
        reverse ? "motion-safe:animate-marquee-reverse" : "motion-safe:animate-marquee",
        "motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-3"
      )}
    >
      {[...items, ...items].map((goal, i) => (
        <li
          key={`${goal}-${i}`}
          aria-hidden={i >= items.length ? true : undefined}
          className={cn(
            "mx-1.5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-slate-700 shadow-sm ring-1 ring-slate-200 sm:mx-2 sm:px-5 sm:py-2.5 sm:text-base",
            i >= items.length && "motion-reduce:hidden"
          )}
        >
          <Sparkle className="size-3.5 text-brand-purple" aria-hidden="true" />
          {goal}
        </li>
      ))}
    </ul>
  </div>
);

export const GoalMarquee: FC = () => (
  <section aria-label="Goals people work on" className="relative py-10 sm:py-14">
    <Reveal y={16}>
      <p className="mb-6 px-4 text-center text-sm font-semibold tracking-[0.14em] text-slate-500 uppercase">
        Whatever you're chasing, chase it together
      </p>
      <div className="space-y-3">
        <Row items={ROW_ONE} />
        <Row items={ROW_TWO} reverse />
      </div>
    </Reveal>
  </section>
);
