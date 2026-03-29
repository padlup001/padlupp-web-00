import type { FC, CSSProperties } from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "./components/Button";

import { Image } from "./components/Image";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { WaitlistForm } from "./components/WaitlistForm";
//import { ExpandableCard } from "./components/ExpandableCard";
//import whyImage from "./assets/images/why.png";
import toolsImage from "./assets/images/tools.png";
import communityImage from "./assets/images/community_image.png";
import cardLeftImage from "./assets/images/card_left.png";
import cardRightImage from "./assets/images/card_right.png";
import underlineImage from "./assets/images/underline.png";
import rightBlobImage from "./assets/images/right_blob.png";
import astronautImage from "./assets/images/astronaut.png";
import cloudImage from "./assets/images/cloud.png";
import goalImage from "./assets/images/goal.png";
import logoImage from "./assets/images/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Removed legacy FlipUnit in favor of CountdownGrid
// import blobGroupImage from "./assets/images/Blob Group.png";
// import blobGroup1Image from "./assets/images/Blob Group-1.png";
// import macbookImage from "./assets/images/MacBook Pro 14_ - 12.png";

export const LandingPage: FC = () => {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [currentTestimonialCardIndex, setCurrentTestimonialCardIndex] =
    useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedTestimonials, setExpandedTestimonials] = useState<number[]>(
    []
  );
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const pageRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useRef<boolean>(false);
  const footerRef = useRef<HTMLDivElement>(null);
  // TODO: Replace with your actual Telegram group/channel link
  const telegramLink = "https://t.me/+ijvNLk3ifQlmOTZk";
  // Move this here so it's at the top level and always called
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);
  const testimonialContainerDesktopRef = useRef<HTMLDivElement | null>(null);
  const testimonialContainerMobileRef = useRef<HTMLDivElement | null>(null);
  const autoScrollIntervalRef = useRef<number | null>(null);
  const startTimeoutRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const stopwatchStart = useRef<Date>(new Date("2026-03-01T00:00:00Z"));
  const stopwatchStartLabel = "Started 1st of March 2026";

  // Move this here, top level (not inside if/blocks)
  const handleScrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const updateStopwatch = () => {
      const now = new Date().getTime();
      const start = stopwatchStart.current.getTime();
      const diff = Math.max(0, now - start);
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setDaysLeft(d);
      setHoursLeft(h);
      setMinutesLeft(m);
      setSecondsLeft(s);
    };
    updateStopwatch();
    const id = window.setInterval(updateStopwatch, 1000);
    return () => window.clearInterval(id);
  }, []);

  const MotionNumber: FC<{ value: number; label: string }> = ({ value, label }) => (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={value}
        className="inline-block"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        aria-live="polite"
        aria-label={label}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );

  const CountdownGrid: FC<{ days: number; hours: number; minutes: number; seconds: number }> = ({ days, hours, minutes, seconds }) => {
    const box = "bg-gradient-to-b from-[#4E92F4] to-[#7938BE] text-white rounded-2xl shadow-[0_10px_20px_rgba(73,110,200,0.25)] ring-1 ring-white/10";
    const unit = (val: number, label: string) => (
      <div className={`flex flex-col items-center justify-center px-4 py-3 ${box}`}>
        <span className="countdown font-mono text-4xl md:text-5xl leading-none">
          {/* DaisyUI uses --value; we keep it for compatibility while animating content with Framer Motion */}
          <span style={{ "--value": val } as CSSProperties}>
            <MotionNumber value={val} label={label} />
          </span>
        </span>
        <span className="mt-1 text-xs md:text-sm tracking-widest opacity-90">{label.toUpperCase()}</span>
      </div>
    );
    return (
      <div className="grid grid-cols-2 sm:grid-cols-none sm:grid-flow-col gap-3 md:gap-5 text-center auto-cols-max">
        {unit(days, "days")}
        {unit(hours, "hours")}
        {unit(minutes, "min")}
        {unit(seconds, "sec")}
      </div>
    );
  };

  useEffect(() => {
    reduceMotion.current = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean };
        
        gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((el) => {
          gsap.set(el, { willChange: "opacity, transform" });
          
          if (isMobile) {
            gsap.from(el, {
              opacity: 0,
              y: 20,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                 trigger: el,
                 start: 'top 110%', // Trigger slightly before it enters viewport
                 toggleActions: 'play none none none',
                 once: true
               }
            });
          } else {
            gsap.from(el, {
              opacity: 0,
              y: 30,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            });
          }
        });
      },
      pageRef
    );

    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (reduceMotion.current) return;
    const ctx = gsap.context(() => {
      gsap.to('.astronaut-float', {
        y: 8,
        rotate: 0.5,
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onSubscribed = () => {
      setShowSuccessOverlay(true);
    };
    window.addEventListener("waitlist:subscribed", onSubscribed as EventListener);
    return () => window.removeEventListener("waitlist:subscribed", onSubscribed as EventListener);
  }, []);

  useEffect(() => {
    if (!showSuccessOverlay) return;
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);
    const colors = ["#4E92F4", "#7938BE", "#8FB8FF", "#FFFFFF"];
    const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string; life: number }[] = [];
    for (let i = 0; i < 140; i++) {
      particles.push({
        x: Math.random() * w,
        y: -20 - Math.random() * 100,
        vx: (Math.random() - 0.5) * 2,
        vy: 2 + Math.random() * 3,
        size: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 180 + Math.random() * 120,
      });
    }
    let raf: number | null = null;
    const step = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03;
        p.life -= 1;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      if (particles.some((p) => p.life > 0 && p.y < h + 20)) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    const timeout = window.setTimeout(() => {
      setShowSuccessOverlay(false);
    }, 300000);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(timeout);
      ctx.clearRect(0, 0, w, h);
    };
  }, [showSuccessOverlay]);

  const testimonialsContent = [
    {
      text: "This app has been great for staying organized and focused on my goals. As someone new to the UK and juggling multiple responsibilities, I truly appreciate the supportive community aspect, intuitive goal-tracking tools, and the valuable AI-driven insights that simplify my studies. It's exactly what I needed to stay motivated and organised!",
      shortText:
        "This app has been great for staying organized and focused on my goals.",
      name: "Olawale Semiu",
      role: "Student",
    },
    {
      text: "For someone who finds it hard to connect with people on the exact journey as mine, people who understand where I am coming from and the level I am without feeling like I'm struggling to fit in a group. This App made it easier to connect with likeminded individuals as mine.",
      shortText:
        "For someone who finds it hard to connect with people on the exact journey as mine.",
      name: "Tayo A.",
      role: "Financial Counselor",
    },
    {
      text: "I procrastinate a lot and struggle to meet up certain goals I set within a supposed timeline, this platform has made me more accountability in completely my set goals",
      shortText:
        "I procrastinate a lot and struggle to meet up certain goals I set within a supposed timeline.",
      name: "Hellena John",
      role: "Psychology Student",
    },
    {
      text: "Padlupp helped me find collaborators for my research project and kept me motivated throughout the journey. The platform's reminders and insights are truly valuable.",
      shortText:
        "Padlupp helped me find collaborators for my research project and kept me motivated.",
      name: "Chris Mensah",
      role: "Research Lead",
    },
  ];

  const handlePreviousTestimonialCard = () => {
    setCurrentTestimonialCardIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsContent.length - 1 : prevIndex - 1
    );
  };

  const handleNextTestimonialCard = () => {
    setCurrentTestimonialCardIndex(
      (prevIndex) => (prevIndex + 1) % testimonialsContent.length
    );
  };

  const startAutoScroll = () => {
    if (autoScrollIntervalRef.current) return;
    autoScrollIntervalRef.current = window.setInterval(() => {
      if (pausedRef.current) return;
      setCurrentTestimonialCardIndex((prev) => (prev + 1) % testimonialsContent.length);
    }, 2500);
  };

  useEffect(() => {
    startTimeoutRef.current = window.setTimeout(() => {
      if (!pausedRef.current) startAutoScroll();
    }, 3000);
    return () => {
      if (startTimeoutRef.current) window.clearTimeout(startTimeoutRef.current);
      if (autoScrollIntervalRef.current) window.clearInterval(autoScrollIntervalRef.current);
      if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const handleHoverStart = () => {
    pausedRef.current = true;
    if (autoScrollIntervalRef.current) {
      window.clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
    if (startTimeoutRef.current) {
      window.clearTimeout(startTimeoutRef.current);
      startTimeoutRef.current = null;
    }
    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };

  const handleHoverEnd = () => {
    pausedRef.current = false;
    if (resumeTimeoutRef.current) window.clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = window.setTimeout(() => {
      startAutoScroll();
    }, 3000);
  };

  const handleJoinWaitlist = () => {
    setShowWaitlist(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWaitlistSubmit = (email: string) => {
    console.log("Email submitted:", email);
  };

  const toggleTestimonialExpansion = (index: number) => {
    setExpandedTestimonials((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (showWaitlist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F8FF] via-[#F0F5FF] to-[#E8F0FF]">
        <Header hideNavigation onContactClick={handleScrollToFooter} />
        <Button
          aria-label="Back to top"
          className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl"
          onClick={handleScrollToTop}
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
        <AnimatePresence>
          {showSuccessOverlay && (
            <motion.div role="dialog" aria-modal="true" className="fixed inset-0 z-[60] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div className="absolute inset-0 bg-black/30" onClick={() => setShowSuccessOverlay(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                className="relative z-[61] w-full max-w-[571px] bg-white rounded-[12px] px-5 py-5 sm:px-8 sm:py-6 shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                tabIndex={-1}
                onKeyDown={(e) => { if (e.key === 'Escape') setShowSuccessOverlay(false); }}
              >
                <div className="flex flex-col items-center text-center">
                  <Image src={logoImage} alt="Padlupp"  className=" mb-[12px]" />
                  <h3 className="text-[#0F172A] text-xl sm:text-[22px] font-semibold mb-[8px]">You have been added to waitlist!</h3>
                  <p className="text-[#475569] text-sm sm:text-[16px] leading-6 mb-[16px]">
                    Further updates will be shared with you via the email you registered with.
                  </p>
                  {telegramLink && (
                    <div className="w-full mb-[16px]">
                      <a
                        href={telegramLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-[#0088cc] hover:bg-[#0077b3] text-white rounded-[10px] px-[18px] py-[10px] transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.098.155.23.171.324.016.094.037.308.021.475z"/>
                        </svg>
                        Join our Telegram Community
                      </a>
                    </div>
                  )}
                  <Button onClick={() => setShowSuccessOverlay(false)} className="bg-gradient-to-r from-[#4E92F4] to-[#7938BE] text-white rounded-[10px] px-[18px] py-[10px]">
                    Back to screen
                  </Button>
                </div>
              </motion.div>
              <canvas ref={confettiCanvasRef} className="absolute inset-0 z-[62] pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Your Goals. Your People. One Powerful Community.
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              We&apos;ve launched our MVP in a closed beta with early waitlist
              users. We&apos;re building iteratively based on feedback before
              opening the next phase. Join the waitlist to follow our progress
              and be notified when we launch.
            </p>
          </div>

          <WaitlistForm
            onSubmit={handleWaitlistSubmit}
            onBack={() => setShowWaitlist(false)}
          />

          <section className="mt-16">
            <div className="rounded-2xl p-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  All the tools that you need
                </h2>
                <p className="text-gray-600">
                  Collaborating with like-minded buddies made easy
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src={toolsImage}
                  alt="Padlupp Tools"
                  width={800}
                  height={400}
                  className="w-full rounded-xl shadow-lg"
                />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  // Mobile version
  if (isMobile) {
    return (
      <div className="min-h-screen bg-white relative">
        {/* Fixed Contact Us button always shown on mobile */}
        <Button
          className="fixed top-3 right-3 z-50 bg-blue-500 text-white px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 md:hidden"
          onClick={handleScrollToFooter}
          style={{ minWidth: 0, minHeight: 0 }}
        >
          Contact Us
        </Button>
        <Button
          aria-label="Back to top"
          className="fixed bottom-4 right-3 z-50 bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl"
          onClick={handleScrollToTop}
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
        <Header onJoinWaitlistClick={handleJoinWaitlist} />

        <section className="relative w-full px-4 pt-6 reveal-section">
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 leading-tight">Launch Day</h1>
            </div>
            <div className="flex items-end">
              <CountdownGrid days={daysLeft} hours={hoursLeft} minutes={minutesLeft} seconds={secondsLeft} />
            </div>
            <p className="mt-2 text-sm text-gray-600">{stopwatchStartLabel}</p>
          </div>
          <Image src={astronautImage} alt="Astronaut" className="astronaut-float absolute left-3 -top-4 w-20 opacity-90" style={{ willChange: 'transform' }} />
          <Image src={cloudImage} alt="Clouds" className="absolute left-0 bottom-[-24px] w-full opacity-60" />
        </section>

        {/* Mobile Hero Section */}
        <section id="hero" className="w-full px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Big{" "}
            <span className="relative inline-block">
              goals
              <Image
                src={underlineImage}
                alt="Custom underline"
                className="absolute -bottom-2 left-0 w-full h-2 object-contain"
              />
            </span>
            ? You're not alone
          </h1>
          <p className="text-base text-gray-600 mb-8">
            Find the perfect accountability buddy, track progress, and stay
            motivated with Padlupp's smart goal-matching
          </p>
          <Button
            onClick={handleJoinWaitlist}
            className="bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white px-4 py-2 text-base rounded-lg shadow-lg hover:shadow-xl transition-all w-full"
            style={{ maxWidth: "100%" }}
          >
            Join the Waitlist
          </Button>
        </section>

        {/* Mobile Why Padlupp Section */}
        <section id="why-padlupp" className="w-full px-4 py-12">
          <div className="space-y-8">
            {/* Text content */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
                Why{" "}
                <span className="relative inline-block">
                  Padlupp
                  <Image
                    src={underlineImage}
                    alt="Custom underline"
                    className="absolute -bottom-1 left-0 w-full h-2 object-contain"
                  />
                </span>
                ?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Get real accountability partners
                    </h3>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      AI-powered goal-setting
                    </h3>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Vibes and community that keep you locked in
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Blob image */}
            <div className="flex justify-end">
              <Image
                src={rightBlobImage}
                alt="Padlupp Features"
                width={400}
                height={400}
                className="w-5/6 h-64 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Mobile Tools Section */}
        <section id="tools" className="w-full px-4 py-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              All the tools that you need
            </h2>
            <p className="text-gray-600">
              Collaborating with like-minded buddies made easy
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <Image
              src={toolsImage}
              alt="Padlupp Tools"
              width={400}
              height={200}
              className="w-full rounded-xl"
            />
          </div>
        </section>

        {/* Mobile Community Section */}
        <section id="community" className="w-full px-4 py-12">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <Image
                src={communityImage}
                alt="Padlupp Community"
                width={400}
                height={300}
                className="rounded-xl w-full"
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your Goals. Your People. One Powerful Community
                <span className="text-blue-600">.</span>
              </h2>
              <p className="text-gray-600 mb-6">
                Find the perfect accountability partner, track progress
                together, and stay motivated with seamless chat, calls, and
                video.
              </p>
              <Button
                onClick={handleJoinWaitlist}
                className="bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all w-full max-w-sm"
              >
                Join the Waitlist
              </Button>
            </div>
          </div>
        </section>

        {/* Mobile Goal Promo Section */}
        <section id="goal-promo" className="w-full px-4 py-10 reveal-section" aria-label="Goal highlight (mobile)">
          <div className="space-y-6">
            <div className="flex justify-center">
              <Image
                src={goalImage}
                alt="Goal features preview"
                width={400}
                height={260}
                loading="lazy"
                decoding="async"
                className="w-full max-w-[420px] h-auto object-contain"
              />
            </div>
            <div className="text-center">
              <h2 className="text-[32px] leading-[40px] font-extrabold text-[#0F172A]">
                Your Goals. Your People. One Powerful Community <span className="text-blue-600">.</span>
              </h2>
              <p className="mt-3 text-[#475569] text-[16px] leading-[26px]">
                Find the perfect accountability partner, track progress together, and stay motivated with seamless chat, calls, and video.
              </p>
              <Button
                onClick={handleJoinWaitlist}
                className="mt-5 bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white px-5 py-3 rounded-[12px] shadow-lg hover:shadow-xl transition-all"
              >
                Join the Waitlist
              </Button>
            </div>
          </div>
        </section>

        {/* Mobile Testimonials Section */}
        <section className="w-full px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              What everyone says
            </h2>
            <div className="flex space-x-2">
              <Button
                onClick={handlePreviousTestimonialCard}
                variant="outline"
                size="icon"
                className="rounded-full bg-white hover:bg-gray-50 border-2 border-gray-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleNextTestimonialCard}
                variant="outline"
                size="icon"
                className="rounded-full bg-white hover:bg-gray-50 border-2 border-gray-200"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div
            ref={testimonialContainerMobileRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Testimonials"
            aria-live="polite"
            tabIndex={0}
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
            onTouchStart={handleHoverStart}
            onTouchEnd={handleHoverEnd}
            onFocus={handleHoverStart}
            onBlur={handleHoverEnd}
            className="flex space-x-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-4 justify-center items-center"
          >
            {getCircularMobileTestimonials(
              currentTestimonialCardIndex,
              testimonialsContent,
              3
            ).map((testimonial, idx) => {
              const highlight = idx === 1; // middle card
              const tIdx = testimonial._tIdx;
              return (
                <div
                  key={tIdx}
                  ref={(el) => {
                    testimonialRefs.current[tIdx] = el;
                  }}
                  className={`flex-shrink-0 w-72 bg-white rounded-2xl shadow-lg p-6 transition-all duration-500 cursor-pointer border-2 snap-center ${
                    highlight ? "border-blue-500" : "border-gray-300"
                  }`}
                  style={{
                    zIndex: highlight ? 10 : 1,
                    scale: highlight ? 1.06 : 1,
                    boxSizing: "border-box",
                  }}
                  onClick={() => toggleTestimonialExpansion(tIdx)}
                >
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    "
                    {expandedTestimonials.includes(tIdx)
                      ? testimonial.text
                      : testimonial.shortText}
                    "
                  </p>
                  {!expandedTestimonials.includes(tIdx) && (
                    <p className="text-blue-600 text-xs mb-4">
                      Tap to read more...
                    </p>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonialsContent.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonialCardIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentTestimonialCardIndex
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Mobile Join the Movement Section */}
        <section className="relative w-full py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-100"></div>

          <div className="relative h-52">
            {/* Left background image */}
            <div className="absolute left-0 top-10 w-1/2 h-full z-1">
              <Image
                src={cardLeftImage}
                alt="Avatar"
                className="w-full h-full object-cover object-left"
              />
            </div>

            {/* Right background image */}
            <div className="absolute right-0 top-10 w-1/2 h-full z-1">
              <Image
                src={cardRightImage}
                alt="Avatar"
                className="w-full h-full object-cover object-right"
              />
            </div>

            {/* Center content overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-2">
              <div className="text-center px-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Join the Movement
                </h2>
                <p className="text-base text-gray-600 mb-6">
                  Ready to stay accountable and achieve more?
                </p>
                <Button
                  onClick={handleJoinWaitlist}
                  className="bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white px-6 py-3 text-base rounded-lg shadow-lg hover:shadow-xl transition-all w-full max-w-sm"
                >
                  Join the Waitlist
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div ref={footerRef}>
          <Footer />
        </div>
      </div>
    );
  }

  // Desktop version
  // Helper: circular slice for testimonials
  function getCircularTestimonials(centerIdx: number, list: any[], amount = 3) {
    const len = list.length;
    if (len <= amount) return list.map((v, i) => ({ ...v, _tIdx: i })); // only highlight
    let indices = [
      (centerIdx - 1 + len) % len,
      centerIdx,
      (centerIdx + 1) % len,
    ];
    return indices.map((i) => ({ ...list[i], _tIdx: i }));
  }

  // Mobile: show 3 carousel cards, center highlighted, use same circular logic as desktop
  function getCircularMobileTestimonials(
    centerIdx: number,
    list: any[],
    amount = 3
  ) {
    const len = list.length;
    if (len <= amount) return list.map((v, i) => ({ ...v, _tIdx: i }));
    let indices = [
      (centerIdx - 1 + len) % len,
      centerIdx,
      (centerIdx + 1) % len,
    ];
    return indices.map((i) => ({ ...list[i], _tIdx: i }));
  }


  return (
    <div ref={pageRef} className="min-h-screen bg-white">
      <Header onJoinWaitlistClick={handleJoinWaitlist} />
      <Button
        aria-label="Back to top"
        className="fixed bottom-5 right-5 z-50 bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl"
        onClick={handleScrollToTop}
      >
        <ChevronUp className="w-5 h-5" />
      </Button>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-10 lg:pt-12 reveal-section">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 md:gap-10 lg:gap-12">
          <div className="flex-1">
            <div className="mb-2 text-sm font-semibold tracking-[0.25em] text-gray-600">{""}</div>
            <div className="mb-6 text-xs text-gray-400">{""}</div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">Launch<br/>Day</motion.h1>
          </div>

          <div className="flex-1">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }} className="flex flex-col items-center lg:items-start">
              <CountdownGrid days={daysLeft} hours={hoursLeft} minutes={minutesLeft} seconds={secondsLeft} />
              <p className="mt-2 text-sm text-gray-600">{stopwatchStartLabel}</p>
            </motion.div>
          </div>
        </div>

        <div className="pointer-events-none">
          <Image src={astronautImage} alt="Astronaut" className="astronaut-float absolute left-20 -top-2 w-24 md:w-32 opacity-90" style={{ willChange: 'transform' }} />
          <Image src={cloudImage} alt="Clouds" className="absolute left-0 bottom-[-40px] w-full max-w-[900px] opacity-60" />
        </div>
      </section>

      {/* Hero Section */}
      <section id="hero" className="max-w-7xl mx-auto px-4 py-16 text-center reveal-section">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Big{" "}
          <span className="relative inline-block">
            goals
            <Image
              src={underlineImage}
              alt="Custom underline"
              className="absolute -bottom-2 left-0 w-full h-3 object-contain"
            />
          </span>
          ? You're not alone
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Find the perfect accountability buddy, track progress, and stay
          motivated with Padlupp's smart goal-matching
        </p>
        <Button
          onClick={handleJoinWaitlist}
          className="bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          Join the Waitlist
        </Button>
      </section>

      {/* Why Padlupp Section */}
      <section id="why-padlupp" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16 reveal-section">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-12">
          {/* Left side - Text content */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Why{" "}
              <span className="relative inline-block">
                Padlupp
                <Image
                  src={underlineImage}
                  alt="Custom underline"
                  className="absolute -bottom-1 left-0 w-full h-2 object-contain"
                />
              </span>
              ?
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Get real accountability partners
                  </h3>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    AI-powered goal-setting
                  </h3>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Vibes and community that keep you locked in
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Blob image */}
          <div className="flex-1 flex justify-center">
            <Image
              src={rightBlobImage}
              alt="Padlupp Features"
              width={400}
              height={400}
              className="w-full max-w-md object-contain"
            />
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16 reveal-section">
        {/* Tools image section */}
        <div className="relative mt-16">
          <div className="bg-[rgba(255,255,255,0.6)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.4)] rounded-3xl p-5 sm:p-8 lg:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
            <div className="flex justify-center">
              <Image
                src={toolsImage}
                alt="Padlupp Tools"
                width={800}
                height={400}
                className="w-full rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16 reveal-section">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative">
            <Image
              src={communityImage}
              alt="Padlupp Community"
              width={800}
              height={600}
              className="rounded-xl w-full shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Your Goals. Your People. One Powerful Community
              <span className="text-blue-600">.</span>
            </h2>
            <p className="text-gray-600 mb-8">
              Find the perfect accountability partner, track progress together,
              and stay motivated with seamless chat, calls, and video. Connect
              globally with like-minded individuals who push you toward success.
            </p>
            <Button
              onClick={handleJoinWaitlist}
              className="bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Join the Waitlist
            </Button>
          </div>
        </div>
      </section>

      {/* Goal Promo Section */}
      <section id="goal-promo" className="mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16 max-w-7xl reveal-section" aria-label="Goal highlight">
        <div className="grid lg:grid-cols-2 items-center gap-8 lg:gap-10">
          <div className="flex justify-center md:justify-start">
            <Image
              src={goalImage}
              alt="Goal features preview"
              width={640}
              height={420}
              loading="lazy"
              decoding="async"
              className="w-full max-w-[640px] h-auto object-contain"
            />
          </div>
          <div>
            <h2 className="text-[#0F172A] font-extrabold text-3xl sm:text-4xl lg:text-[56px] leading-tight lg:leading-[64px] tracking-[-0.5px]">
              Your Goals. Your People. One Powerful Community <span className="text-blue-600">.</span>
            </h2>
            <p className="mt-4 text-[#475569] text-base sm:text-[18px] leading-7 max-w-[560px]">
              We&apos;ve launched our MVP in a closed beta with early waitlist users.
              We&apos;re building iteratively based on feedback before opening the
              next phase. Join the waitlist to follow our progress and be
              notified when we launch.
            </p>
            <Button
              onClick={handleJoinWaitlist}
              className="mt-6 bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white px-6 py-3.5 rounded-[12px] shadow-lg hover:shadow-xl transition-all"
            >
              Join the Waitlist
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16 reveal-section">
        <div className="flex items-center justify-between mb-8 lg:mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            What everyone says
          </h2>
          <div className="flex space-x-2">
            <Button
              onClick={handlePreviousTestimonialCard}
              variant="outline"
              size="icon"
              className="rounded-full bg-white hover:bg-gray-50 border-2 border-gray-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleNextTestimonialCard}
              variant="outline"
              size="icon"
              className="rounded-full bg-white hover:bg-gray-50 border-2 border-gray-200"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div
          ref={testimonialContainerDesktopRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimonials"
          aria-live="polite"
          tabIndex={0}
          onMouseEnter={handleHoverStart}
          onMouseLeave={handleHoverEnd}
          onTouchStart={handleHoverStart}
          onTouchEnd={handleHoverEnd}
          onFocus={handleHoverStart}
          onBlur={handleHoverEnd}
          className="flex gap-4 lg:gap-6 overflow-x-auto lg:overflow-x-hidden scroll-smooth snap-x snap-mandatory pb-4 pt-2 justify-start lg:justify-center items-center"
        >
          {getCircularTestimonials(
            currentTestimonialCardIndex,
            testimonialsContent,
            3
          ).map((testimonial, idx) => {
            const highlight = idx === 1; // the middle
            const tIdx = testimonial._tIdx;
            return (
              <motion.div
                key={tIdx}
                ref={(el) => {
                  testimonialRefs.current[tIdx] = el;
                }}
                className={`flex-shrink-0 w-[18rem] lg:w-80 rounded-2xl bg-white shadow-lg transition-all duration-500 relative overflow-hidden border-2 snap-center ${
                  highlight
                    ? "border-blue-500 scale-105 z-10"
                    : "border-gray-300 opacity-75"
                }`}
                style={{
                  transition: "all 0.5s",
                }}
                onClick={() => toggleTestimonialExpansion(tIdx)}
                layout
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              >
                <motion.div
                  className={`w-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden border border-gray-100 cursor-pointer ${
                    expandedTestimonials.includes(tIdx) ? "h-auto" : "h-auto"
                  }`}
                  layout
                >
                  <div className="p-8 flex flex-col">
                    <div className="mb-6">
                      <motion.p className="text-gray-600 text-base leading-relaxed" layout>
                        "
                        {expandedTestimonials.includes(tIdx)
                          ? testimonial.text
                          : testimonial.shortText}
                        "
                      </motion.p>
                      {!expandedTestimonials.includes(tIdx) && (
                        <motion.p className="text-blue-600 text-sm mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          Click to read more...
                        </motion.p>
                      )}
                    </div>
                    <div className="mt-auto">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-12 space-x-2">
          {testimonialsContent.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonialCardIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentTestimonialCardIndex
                  ? "bg-blue-600 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Join the Movement Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 overflow-hidden reveal-section">
        <div className="absolute w-full inset-0 bg-gradient-to-b from-white to-blue-100"></div>

        <div className="relative w-full min-h-[20rem] lg:h-96">
          {/* Left background image */}
          <div className="absolute left-0 top-0 w-1/2 h-full z-1">
            <Image
              src={cardLeftImage}
              alt="Avatar"
              className="w-full h-full object-cover object-left"
            />
          </div>

          {/* Right background image */}
          <div className="absolute right-0 w-1/2 top-0 h-full z-1">
            <Image
              src={cardRightImage}
              alt="Avatar"
              className="w-full h-full object-cover object-right"
            />
          </div>

          {/* Center content overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-2">
            <div className="text-center px-4 sm:px-8 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Join the Movement
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Ready to stay accountable and achieve more?
              </p>
              <Button
                onClick={handleJoinWaitlist}
                className="bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Join the waitlist
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
