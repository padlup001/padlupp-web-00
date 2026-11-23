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

React 19, TypeScript, Vite 6, Tailwind 4, GSAP and Framer Motion for scroll
animations, Vitest + Testing Library. Path alias `@` → `src`.

- `src/LandingPage.tsx` — the whole page (~1,000 lines). It renders **two
  separate layouts**: a mobile layout (`isMobile`, width < 768 px) and a
  desktop layout, each with its own copy of the sections (`hero`,
  `why-padlupp`, `tools`, `community`, `goal-promo`, testimonials, footer
  call-to-action). **A content change usually has to be made in both.**
- `src/components/` — `Header`, `Footer` (social links), `Button`, `Card`,
  `ExpandableCard`, `Image`, `Input`, `Link`.
- `src/appLinks.ts` — links into the web app; covered by tests.
- `src/assets/images/`, `public/` — images and logo.
- `index.html` — page title, meta tags and the Google Analytics tag.

## Conventions

- Respect `prefers-reduced-motion`; the page already checks it before running
  GSAP animations.
- Keep images optimised; some existing assets are large (~800 kB).
- The old waitlist form and launch countdown were removed in October 2026;
  do not reintroduce them unless asked.
- `ENVIRONMENT_SETUP.md` and `env.*` files describe a server that no longer
  exists in this repository; ignore them.

## Before finishing a change

Run the tests and `npm run build`. The *Checks* workflow runs both. Check the
change at both mobile and desktop widths.
