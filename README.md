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

`npm run check` runs the source lint check and creates the production build in `dist/`.

## Project structure

```text
ems-website/
|-- public/              Static images, videos, logos, and favicon
|-- src/
|   |-- components/      Shared layout and interface components
|   |-- data/            Website content and project data
|   |-- hooks/           Reusable React hooks
|   |-- pages/           Route-level page components
|   |-- utils/           Shared utilities
|   |-- App.jsx          Route definitions
|   |-- index.css        Global styles and Tailwind layers
|   `-- main.jsx         Application entry point
|-- eslint.config.js     Source validation rules
|-- index.html           HTML entry point
|-- package.json         Commands and dependencies
|-- tailwind.config.js   Design-system configuration
|-- vercel.json          Vercel build and SPA routing configuration
`-- vite.config.js       Development and production build configuration
```

## Deployment

The folder is deployable as its own Vercel project. Set the Vercel root directory to this folder; `vercel.json` builds with `npm run build` and publishes `dist`.

Client-side routes use a fallback rewrite to `index.html`, including `/about`, `/services`, `/solutions`, `/case-studies`, `/partners`, and `/contact`.

## External content

All local file references are contained in this project. Some page content still requires an internet connection because it uses Google Fonts, Unsplash images, YouTube embeds, and external company/social links.

The contact form and newsletter interface currently simulate submission in the browser; no backend or email service is connected.
