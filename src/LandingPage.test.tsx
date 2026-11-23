import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { LandingPage } from "./LandingPage";

vi.mock("gsap", () => ({ default: { registerPlugin: vi.fn() } }));
vi.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: {} }));

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("matchMedia", vi.fn(() => ({
    matches: true,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })));
  // jsdom has no IntersectionObserver; Framer Motion's scroll reveals need one.
  vi.stubGlobal("IntersectionObserver", class {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);
  });
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

function expectAuthLinks(container: HTMLElement) {
  const account = within(screen.getByRole("navigation", { name: "Account" }));
  const hero = within(container.querySelector<HTMLElement>("#hero")!);

  for (const section of [account, hero]) {
    expect(section.getByRole("link", { name: "Sign In" })).toHaveAttribute(
      "href",
      "https://app.padlupp.com/signin"
    );
    expect(section.getByRole("link", { name: "Sign Up" })).toHaveAttribute(
      "href",
      "https://app.padlupp.com/signup"
    );
  }

  const signUpLinks = screen.getAllByRole("link", { name: "Sign Up" });
  expect(signUpLinks).toHaveLength(5);
  for (const link of signUpLinks) {
    expect(link).toHaveAttribute("href", "https://app.padlupp.com/signup");
    expect(link).not.toHaveAttribute("target");
  }
  expect(screen.getAllByRole("link", { name: "Sign In" })).toHaveLength(2);
  expect(screen.queryByRole("button", { name: /sign in|sign up/i })).not.toBeInTheDocument();
}

describe("marketing app entry points", () => {
  it.each([320, 375, 768, 1280])("links every CTA to the app at %ipx", (width) => {
    vi.stubGlobal("innerWidth", width);
    const { container } = render(<LandingPage />);

    expectAuthLinks(container);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Big goals? You're not alone"
    );
    expect(container).not.toHaveTextContent(/waitlist|launch\s*day|closed beta|started 1st/i);
    expect(container.querySelector("form, canvas, .countdown")).toBeNull();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/privacy");
    expect(screen.getByRole("link", { name: "Terms of Use" })).toHaveAttribute("href", "/terms");
    expect(screen.getByRole("link", { name: "hello@padlupp.com" })).toHaveAttribute(
      "href",
      "mailto:hello@padlupp.com"
    );
  });

  it("keeps app links when switching between desktop and mobile layouts", () => {
    vi.stubGlobal("innerWidth", 1280);
    const { container } = render(<LandingPage />);

    for (const width of [375, 1280]) {
      vi.stubGlobal("innerWidth", width);
      fireEvent(window, new Event("resize"));
      expectAuthLinks(container);
    }
  });
});
