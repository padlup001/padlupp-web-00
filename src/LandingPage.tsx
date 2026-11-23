import type { FC } from "react";
import { MotionConfig } from "framer-motion";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BackToTop } from "./components/BackToTop";
import { Hero } from "./sections/Hero";
import { GoalMarquee } from "./sections/GoalMarquee";
import { WhyPadlupp } from "./sections/WhyPadlupp";
import { HowItWorks } from "./sections/HowItWorks";
import { Tools } from "./sections/Tools";
import { Community } from "./sections/Community";
import { Testimonials } from "./sections/Testimonials";
import { FinalCta } from "./sections/FinalCta";

/** Animated blobs and grid behind the header and hero. */
const PageBackdrop: FC = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[64rem] overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white to-white" />
    <div className="absolute -top-40 -left-32 size-[30rem] rounded-full bg-brand-blue/25 blur-3xl motion-safe:animate-blob-a sm:size-[38rem]" />
    <div className="absolute top-10 -right-40 size-[32rem] rounded-full bg-brand-purple/20 blur-3xl motion-safe:animate-blob-b sm:size-[40rem]" />
    <div className="absolute top-[30rem] left-1/3 size-[22rem] rounded-full bg-sky-300/25 blur-3xl motion-safe:animate-blob-a" />
    <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_30%,black,transparent)]" />
  </div>
);

export const LandingPage: FC = () => (
  <MotionConfig reducedMotion="user">
    <div className="relative isolate min-h-screen overflow-x-clip bg-white text-ink">
      <PageBackdrop />
      <Header />
      <main>
        <Hero />
        <GoalMarquee />
        <WhyPadlupp />
        <HowItWorks />
        <Tools />
        <Community />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
      <BackToTop />
    </div>
  </MotionConfig>
);
