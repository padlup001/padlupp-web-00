# Padlupp landing page

Static marketing site for Padlupp, served at `https://padlupp.com`. No backend.
Its *Sign in* / *Sign up* buttons link to the web app at
`https://app.padlupp.com` (constants in `src/appLinks.ts`). The web app and the
backend API are separate repositories.

**Nothing deploys this repository automatically.** A merged change goes live
only when someone uploads a new build to the server. Never push to `main`;
work on a branch and open a pull request.

## Commands

```bash
npm install
npm run dev                          # http://localhost:5173
npx vitest run --environment jsdom   # tests (src/LandingPage.test.tsx)
npm run build                        # tsc -b + vite build into dist/
npm run lint                         # currently fails on existing code
```

## Stack and layout

React 19, TypeScript, Vite 6, Tailwind 4, Framer Motion for all animation,
Vitest + Testing Library. Path alias `@` → `src`. (GSAP is still in
`package.json` but no longer used.)

- `src/LandingPage.tsx` — composes the page: one responsive layout (Tailwind
  breakpoints, no separate mobile copy) wrapped in
  `<MotionConfig reducedMotion="user">`.
- `src/sections/` — one file per section, in page order: `Hero` (`#hero`),
  `GoalMarquee`, `WhyPadlupp` (`#why-padlupp`), `HowItWorks`
  (`#how-it-works`), `Tools` (`#tools`), `Community` (`#community`),
  `Testimonials` (`#testimonials`), `FinalCta` (`#join`).
- `src/components/` — `Header` (section nav, mobile menu, scroll progress),
  `Footer` (`#contact`, social links), `BackToTop`, `CtaLink` (primary and
  secondary call-to-action links), `motion.tsx` (shared easing, `Reveal`,
  `SectionHeading`, `SpotlightCard`, `ScribbleUnderline`), plus older
  `Button`, `Card`, `ExpandableCard`, `Image`, `Input`, `Link`.
- Animation keyframes and brand colours (`brand-blue`, `brand-purple`, `ink`,
  `muted`) live in the `@theme` block in `src/index.css`. Decorative CSS loops
  use the `motion-safe:` variant; scroll-linked parallax is skipped when
  `useReducedMotion()` is true.
- The tests expect exactly 5 "Sign Up" links and 2 "Sign In" links; update
  `src/LandingPage.test.tsx` if you add or remove one.
- `src/appLinks.ts` — links into the web app; covered by tests.
- `src/assets/images/`, `public/` — images and logo.
- `index.html` — page title, meta tags and the Google Analytics tag.

## Conventions

- Respect `prefers-reduced-motion` (see above).
- Keep images optimised; some existing assets are large (~800 kB).
- The old waitlist form and launch countdown were removed in October 2026;
  do not reintroduce them unless asked.
- `ENVIRONMENT_SETUP.md` and `env.*` files describe a server that no longer
  exists in this repository; ignore them.

## Before finishing a change

Run the tests and `npm run build`. The *Checks* workflow runs both. Check the
change at both mobile and desktop widths.
