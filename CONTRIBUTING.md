# Contributing to the Padlupp landing page

This repository is the **marketing landing page** served at
`https://padlupp.com`. It is a single static page with the waitlist form,
launch countdown and testimonials. Its *Sign in* and *Sign up* buttons link to
the web app at `https://app.padlupp.com` (see `src/appLinks.ts`).

| Part of the product | Lives at | Deploys |
|---|---|---|
| **Landing page (this repository)** | `padlupp.com` | **Manually (no automation)** |
| Web app | `app.padlupp.com` | Automatically on merge to `main` |
| Backend API | `api.padlupp.com` | Automatically on merge to `main` |

All three run on one DigitalOcean server behind Nginx.

## Ground rules

1. **Never push directly to `main`.** Work on a branch, open a pull request and
   get a review before merging.
2. **Wait for the green tick.** The *Checks* workflow runs the tests and the
   production build on every pull request.
3. **Merging does not publish the site.** Nothing deploys this repository
   automatically; whoever manages the server uploads a new build. Tell them
   when a change is merged and ready to go live.
4. **Never commit secrets.** Anything in this site is visible to every
   visitor, so it must not contain API secret keys.

## Running it on your computer

**You need:** Git and Node.js 22 (npm comes with it).

```bash
npm install
npm run dev
```

The page opens on <http://localhost:5173>. It needs no backend to run.

## Before opening a pull request

```bash
npx vitest run --environment jsdom
npm run build
```

`npm run lint` currently reports errors in existing code. Fixing those is a
good first task; once it passes, add it to `.github/workflows/pr-checks.yml`.

## Making a change, step by step

```bash
git switch main && git pull
git switch -c feature/short-description
# ...make changes, run the checks above...
git add -A && git commit -m "Describe what changed and why"
git push -u origin feature/short-description
```

Then open a pull request on GitHub, wait for the checks and a review, merge,
and ask for the new build to be published.

## Notes

- `ENVIRONMENT_SETUP.md` is out of date: it describes a server folder that was
  removed in December 2025.
- The production build is created with `npm run build` into `dist/`.
