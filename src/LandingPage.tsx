import type { FC } from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "./components/Button";
import { Link } from "./components/Link";
import { APP_SIGN_IN_URL, APP_SIGN_UP_URL } from "./appLinks";

import { Image } from "./components/Image";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
//import { ExpandableCard } from "./components/ExpandableCard";
//import whyImage from "./assets/images/why.png";
import toolsImage from "./assets/images/tools.png";
import communityImage from "./assets/images/community_image.png";
import cardLeftImage from "./assets/images/card_left.png";
import cardRightImage from "./assets/images/card_right.png";
import underlineImage from "./assets/images/underline.png";
import rightBlobImage from "./assets/images/right_blob.png";
import goalImage from "./assets/images/goal.png";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// import blobGroupImage from "./assets/images/Blob Group.png";
// import blobGroup1Image from "./assets/images/Blob Group-1.png";
// import macbookImage from "./assets/images/MacBook Pro 14_ - 12.png";

export const LandingPage: FC = () => {
  const [currentTestimonialCardIndex, setCurrentTestimonialCardIndex] =
    useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedTestimonials, setExpandedTestimonials] = useState<number[]>(
    []
  );
  const pageRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useRef<boolean>(false);
  const footerRef = useRef<HTMLDivElement>(null);
  // Move this here so it's at the top level and always called
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);
  const testimonialContainerDesktopRef = useRef<HTMLDivElement | null>(null);
  const testimonialContainerMobileRef = useRef<HTMLDivElement | null>(null);
  const autoScrollIntervalRef = useRef<number | null>(null);
  const startTimeoutRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

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

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleTestimonialExpansion = (index: number) => {
    setExpandedTestimonials((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Mobile version
  if (isMobile) {
    return (
      <div className="min-h-screen bg-white relative">
        <Button
          aria-label="Back to top"
          className="fixed bottom-4 right-3 z-50 bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl"
          onClick={handleScrollToTop}
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
        <Header />

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
          <div className="flex flex-col gap-3">
            <Link
              href={APP_SIGN_UP_URL}
              className="inline-flex items-center justify-center no-underline font-medium bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white hover:text-white px-4 py-3 text-base rounded-lg shadow-lg hover:shadow-xl transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign Up
            </Link>
            <Link
              href={APP_SIGN_IN_URL}
              className="inline-flex items-center justify-center no-underline font-medium border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-4 py-3 text-base rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign In
            </Link>
          </div>
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
              <Link
                href={APP_SIGN_UP_URL}
                className="inline-flex items-center justify-center no-underline font-medium bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white hover:text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all w-full max-w-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Sign Up
              </Link>
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
              <Link
                href={APP_SIGN_UP_URL}
                className="inline-flex items-center justify-center no-underline font-medium mt-5 bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white hover:text-white px-5 py-3 rounded-[12px] shadow-lg hover:shadow-xl transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Sign Up
              </Link>
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
                <Link
                  href={APP_SIGN_UP_URL}
                  className="inline-flex items-center justify-center no-underline font-medium bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white hover:text-white px-6 py-3 text-base rounded-lg shadow-lg hover:shadow-xl transition-all w-full max-w-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="px-4 pt-4 text-center">
          <Button variant="text" onClick={handleScrollToFooter}>
            Contact Us
          </Button>
        </div>
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
      <Header />
      <Button
        aria-label="Back to top"
        className="fixed bottom-5 right-5 z-50 bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl"
        onClick={handleScrollToTop}
      >
        <ChevronUp className="w-5 h-5" />
      </Button>

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
        <div className="flex items-center justify-center gap-4">
          <Link
            href={APP_SIGN_UP_URL}
            className="inline-flex items-center justify-center no-underline font-medium bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white hover:text-white px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Sign Up
          </Link>
          <Link
            href={APP_SIGN_IN_URL}
            className="inline-flex items-center justify-center no-underline font-medium border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-4 text-lg rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Sign In
          </Link>
        </div>
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
            <Link
              href={APP_SIGN_UP_URL}
              className="inline-flex items-center justify-center no-underline font-medium bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white hover:text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign Up
            </Link>
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
              Find the perfect accountability partner, track progress together,
              and stay motivated with seamless chat, calls, and video.
            </p>
            <Link
              href={APP_SIGN_UP_URL}
              className="inline-flex items-center justify-center no-underline font-medium mt-6 bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white hover:text-white px-6 py-3.5 rounded-[12px] shadow-lg hover:shadow-xl transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign Up
            </Link>
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
              <Link
                href={APP_SIGN_UP_URL}
                className="inline-flex items-center justify-center no-underline font-medium bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white hover:text-white px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
