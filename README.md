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

Client-side routes use a fallback rewrite to `index.html`, including `/about`, `/services`, `/solutions`, `/case-studies`, `/partners`, and `/contact`.

## External content

All local file references are contained in this project. Some page content still requires an internet connection because it uses Google Fonts, Unsplash images, YouTube embeds, and external company/social links.

The general contact form remains a browser-only demonstration, as in the original
application. Store quote and cart requests use the real order endpoint described
above. Google Fonts, Unsplash images and YouTube embeds still require internet
access; no substitute assets or fonts were introduced.

See [ARCHITECTURE.md](ARCHITECTURE.md) for the migration report and [AGENTS.md](AGENTS.md)
for development rules.
