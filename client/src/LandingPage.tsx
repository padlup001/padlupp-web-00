import type { FC } from "react";
import { useState, useRef } from "react";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { Image } from "./components/Image";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WaitlistForm } from "./components/WaitlistForm";
import { ExpandableCard } from "./components/ExpandableCard";
import whyImage from "./assets/images/why.png";
import toolsImage from "./assets/images/tools.png";
import communityImage from "./assets/images/community_image.png";
import cardLeftImage from "./assets/images/card_left.png";
import cardRightImage from "./assets/images/card_right.png";

export const LandingPage: FC = () => {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [currentTestimonialCardIndex, setCurrentTestimonialCardIndex] =
    useState(0);

  const testimonialCardsContainerRef = useRef<HTMLDivElement>(null);

  const testimonialsContent = [
    {
      text: "This app has been great for staying organized and focused on my goals. As someone new to this UI and productivity space, I found it intuitive and easy to use. The community aspect enhances goal tracking tools, and the valuable AI insights make it exactly what I needed to stay motivated and organized.",
      name: "Olumide Sanni",
      role: "Product Designer",
    },
    {
      text: "For someone who finds it hard to connect with people at the same frequency, this platform has been a game-changer. I love that I can find like-minded individuals who share similar goals and that I can without feeling like I'm messaging to fill a group. This has been a great way to stay accountable and motivated.",
      name: "Tara A.",
      role: "Startup Founder",
    },
    {
      text: "I procrastinate a lot and struggle to follow up on goals I set which is supposed timeline. This platform has made me more accountable to myself and others. I love the community aspect and how it keeps me motivated to achieve my goals.",
      name: "Ifeoma John",
      role: "Software Engineer",
    },
  ];

  const handlePreviousTestimonialCard = () => {
    setCurrentTestimonialCardIndex((prevIndex) => {
      const newIndex =
        prevIndex === 0 ? testimonialsContent.length - 2 : prevIndex - 1;
      if (testimonialCardsContainerRef.current) {
        const cardWidth =
          testimonialCardsContainerRef.current.children[0].clientWidth;
        testimonialCardsContainerRef.current.scrollLeft = newIndex * cardWidth;
      }
      return newIndex;
    });
  };

  const handleNextTestimonialCard = () => {
    setCurrentTestimonialCardIndex((prevIndex) => {
      const newIndex =
        prevIndex === testimonialsContent.length - 2 ? 0 : prevIndex + 1;
      if (testimonialCardsContainerRef.current) {
        const cardWidth =
          testimonialCardsContainerRef.current.children[0].clientWidth;
        testimonialCardsContainerRef.current.scrollLeft = newIndex * cardWidth;
      }
      return newIndex;
    });
  };

  const handleJoinWaitlist = () => {
    setShowWaitlist(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWaitlistSubmit = (email: string) => {
    console.log("Email submitted:", email);
  };

  if (showWaitlist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F8FF] via-[#F0F5FF] to-[#E8F0FF]">
        <Header hideNavigation />
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your Goals. Your People. One Powerful Community.
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              Find the perfect accountability partner, track progress together,
              and stay motivated with seamless chat, calls, and video.
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

  return (
    <div className="min-h-screen bg-white">
      <Header hideNavigation={false} />

      {/* Hero Section */}
      <section id="hero" className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Big <span className="underline decoration-blue-500">goals</span>?
          You're not alone
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
      <section id="why-padlupp" className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Why Padlupp?
        </h2>
        <div className="flex justify-center">
          <div className="w-full bg-white p-12 rounded-2xl shadow-lg">
            <Image
              src={whyImage}
              alt="Why Padlupp Features"
              width={800}
              height={600}
              className="w-full rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="max-w-4xl mx-auto px-4 py-16">
        <div className="rounded-2xl p-8">
          <div className="text-center mb-8">
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

      {/* Community Section */}
      <section id="community" className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Image
              src={communityImage}
              alt="Padlupp Community"
              width={800}
              height={600}
              className="rounded-xl w-full shadow-lg"
            />
            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
              <Image
                src={cardLeftImage}
                alt="Card Left"
                width={200}
                height={240}
                className="opacity-70"
              />
            </div>
            <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
              <Image
                src={cardRightImage}
                alt="Card Right"
                width={200}
                height={240}
                className="opacity-70"
              />
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
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

      {/* Testimonials Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            What everyone says
          </h2>
          <div className="hidden md:flex space-x-2">
            <Button
              onClick={handlePreviousTestimonialCard}
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleNextTestimonialCard}
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="relative">
          <div
            ref={testimonialCardsContainerRef}
            className="flex space-x-8 overflow-x-auto snap-x snap-mandatory pb-4 hide-scrollbar"
          >
            {testimonialsContent.map((testimonial, i) => (
              <div
                key={i}
                className="w-[calc(80%-2rem)] md:w-[calc(50%-1rem)] flex-shrink-0 snap-start"
              >
                <ExpandableCard
                  content={testimonial.text}
                  maxLength={150}
                  name={testimonial.name}
                  role={testimonial.role}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Movement Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-white"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join the Movement
            </h2>
            <p className="text-lg md:text-xl text-gray-900 mb-8 max-w-2xl mx-auto">
              Ready to stay accountable and achieve more?
            </p>
            <Button
              onClick={handleJoinWaitlist}
              className="bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Join the waitlist
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
