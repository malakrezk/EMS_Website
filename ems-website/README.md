# EMS — Energy Management & Automation Solutions Website

A modern, production-ready corporate website for an engineering company (EMS) specializing in SCADA, Energy
Management Systems, substation automation, protection & control, and smart grid solutions.

Built with React + Vite, Tailwind CSS, React Router, Framer Motion, React Icons, and Recharts.

## Getting Started

```bash
npm install
npm run dev
```

The app will start at `http://localhost:5173`.

To build for production:

```bash
npm run build
npm run preview
```

## Project Structure

```
ems-website/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx              # App entry point
    ├── App.jsx                # Route definitions
    ├── index.css              # Tailwind directives + global styles
    ├── components/
    │   ├── layout/            # Navbar, Footer, Layout wrapper
    │   ├── home/               # Landing page sections (Hero, About, Services, etc.)
    │   ├── projects/           # ProjectCard, ProjectFilters
    │   └── ui/                 # Reusable primitives (SectionHeading, StatCard, CircuitPlaceholder, PageHeader)
    ├── pages/                  # Route-level pages (Home, About, Services, Solutions,
    │                           #   Projects, ProjectDetails, Partners, Contact, NotFound)
    ├── data/                   # Sample content: services, industries, projects, partners,
    │                           #   timeline, dashboard metrics
    ├── hooks/                  # useScrollToTop, useCountUp
    └── utils/                  # cn() class-name helper
```

## Notes

- No backend is wired up. The contact form and newsletter signup simulate a successful submission client-side, and
  all project / dashboard data lives in `src/data/` as static sample data — replace with real API calls when ready.
- Project imagery uses a generative SVG "circuit" placeholder (`CircuitPlaceholder`) instead of photography, so the
  project runs immediately with no external image dependencies. Swap in real photography by replacing
  `CircuitPlaceholder` usages with an `<img>`.
- **Color system** (dark-first, enterprise): Background `#07182E`, Secondary Background `#102A43`, Cards `#132F4C`,
  Primary `#0066FF`, Accent `#00C8FF`, Text `#FFFFFF`, Secondary Text `#B8C5D1`, Borders `rgba(255,255,255,.08)`.
  Defined in `tailwind.config.js` as `navy` / `card` / `primary` / `cyan` / `muted`.
- Typography uses Inter throughout (headings and body) plus JetBrains Mono for data readouts, loaded in `index.html`.
