# EMS Engineering Website

Corporate website for EMS engineering, automation, SCADA, energy management, and smart infrastructure services.

## Requirements

- Node.js 20.19 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Vite serves the site at `http://localhost:5173` by default.

## Verify and build

```bash
npm run check
npm run preview
```

`npm run check` runs strict TypeScript validation, lint, and the production build in `dist/`.

```bash
npm run typecheck
npm run lint
npm run build
npm test
node scripts/verify-assets.mjs
```

Browser tests use installed Google Chrome and start Vite when needed. They intercept
order requests and never send email. Screenshot tools require the development server:
`node scripts/capture.mjs before`, `node scripts/capture.mjs after`, then
`node scripts/compare-captures.mjs`. Captures and comparison reports live in ignored
`artifacts/`. On Windows with restricted PowerShell scripts, use `npm.cmd`/`npx.cmd`.

## Order email configuration

Copy `.env.example` to `.env` and configure `SMTP_USER`, `SMTP_PASS`, and
`RECIPIENT_EMAIL` with your own server credentials. Vite loads these for its local
API middleware. Configure the same server environment variables in Vercel.
Never prefix them with `VITE_`. The formerly committed credential must be rotated;
removing it from working files does not remove it from Git history.

The existing `/api/send-order` endpoint and email templates are retained. Failed
requests now display an error and preserve the cart, rather than claiming success.

## Project structure

### BMS day-to-night hero

The BMS hero blends the supplied brighter courtyard and starlit courtyard images directly from
scroll progress using Framer Motion scroll values. Both layers share the same
zoom and crop, while the copy and shade fade away to reveal the night scene.
The sticky sequence reverses when scrolling upward and releases into the existing
page content after the night scene. Reduced-motion mode shows a static daytime
hero without the extra scroll hold. The navbar is transparent over both moods,
returns to its normal background below the hero, and keeps an opaque mobile menu.
The Home page retains its original video hero.

### Projects scroll gallery

The Projects page features the existing Data Center, ZIA Building Complex, and
Water Treatment Plant Automation records above the complete filterable portfolio.
At viewport widths of 768px or more and heights of 600px or more, GSAP
ScrollTrigger pins a perspective-layered image composition and scrubs a reversible
timeline: incoming photographs rise diagonally from alternating sides as outgoing
photographs shrink toward the upper edge. The building-photo hero has a slow
entrance zoom and a pinned parallax exit. A page-scoped Lenis instance smooths
desktop wheel input, leaving both GSAP timelines at `scrub: true`.
Previous/Next and arrow keys on the focused gallery change the scroll position,
so images, captions, counter, and progress share one animation source. Navigation
stops at the first/last project; All projects skips directly to the portfolio.
Mobile, short viewports, and reduced-motion preferences use unpinned project
stories with all descriptions and detail links visible. GSAP contexts and
intersection observers, scroll listeners, and Lenis are cleaned up when the route
or media query changes.

```text
ems-website/
|-- public/              Static images, videos, logos, and favicon
|-- src/
|   |-- components/      Common, layout, UI, store and project components
|   |-- config/          Shared navigation
|   |-- constants/       Stable local media URLs
|   |-- context/         Typed cart and fixed-theme providers
|   |-- data/            Domain content, field definitions and store policies
|   |-- hooks/           Theme, modal, counting and route-scroll hooks
|   |-- pages/           Per-page TSX, data, CSS and section components
|   |-- services/        Order API client and validated cart persistence
|   |-- theme/           Palette, typography, spacing, radii, shadows, motion, breakpoints
|   |-- types/           Content and store domain contracts
|   |-- utils/           Shared utilities
|   |-- App.tsx          Lazy route definitions and existing redirects
|   |-- index.css        Global styles and Tailwind layers
|   `-- main.tsx         Application entry point
|-- tests/               Browser regression tests
|-- scripts/             Media checks and visual comparison tools
|-- eslint.config.js     Source validation rules
|-- index.html           HTML entry point
|-- package.json         Commands and dependencies
|-- tailwind.config.ts   Central design tokens exposed to Tailwind/CSS
|-- tsconfig.json        Strict application type checking
|-- vercel.json          Vercel build and SPA routing configuration
`-- vite.config.js       Development and production build configuration
```

## Deployment

The folder is deployable as its own Vercel project. Set the Vercel root directory to this folder; `vercel.json` builds with `npm run build` and publishes `dist`.

Client-side routes use a fallback rewrite to `index.html`, including `/about`, `/services`, `/solutions`, `/projects`, `/partners`, and `/contact`.

## External content

All local file references are contained in this project. Some page content still requires an internet connection because it uses Google Fonts, Unsplash images, YouTube embeds, and external company/social links.

The general contact form remains a browser-only demonstration, as in the original
application. Store quote and cart requests use the real order endpoint described
above. Google Fonts, Unsplash images and YouTube embeds still require internet
access; no substitute assets or fonts were introduced.

See [ARCHITECTURE.md](ARCHITECTURE.md) for the migration report and [AGENTS.md](AGENTS.md)
for development rules.
