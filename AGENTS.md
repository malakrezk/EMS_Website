# Development rules

- Build for the web with React.js and strict TypeScript. Do not use React Native or Expo.
- Retain Vite, React Router, Tailwind, and the existing deployment conventions.
- Preserve the established appearance, content, responsive layouts, routes, redirects, animations, and working features. This is an existing application, not a redesign.
- Reuse components in `src/components/common`, `layout`, `ui`, `store`, and `projects` before creating another implementation. Prefer backward-compatible optional props for new variants.
- Keep route composition in `src/pages/<Page>/<Page>.tsx`, page sections in its `components/`, content in `<Page>.data.ts`, and custom CSS in `<Page>.css`. Export the page through `index.ts`.
- Keep page-specific interaction state with its owning section. Share state only when multiple consumers need it. `CartContext` is the shared cart; `ThemeContext` exposes the fixed theme without mutable state. Do not add a redundant AppContext.
- Define typed props and domain contracts. Do not use `any`, suppression comments, or loosen TypeScript checks to bypass errors.
- Use data-driven rendering for repeated cards, navigation, statistics, policies, and form fields. Keep reusable UI independent of whether content comes from local data or an API.
- Keep design tokens in `src/theme/`, exposed through `tailwind.config.ts`. Use existing named Tailwind tokens, `paint-*` colors, CSS custom properties, and `@screen` conditions. Preserve intentional page-specific artwork and geometry.
- Keep static media URLs in `src/constants/images.ts`. Public assets remain in `public/` to preserve existing URLs. Verify references before moving or deleting any file.
- Keep network requests in `src/services/`. Preserve `/api/send-order` and its request contract. Never invent APIs or authentication flows, replace real data with mock data, or report success after a failed request.
- Put server secrets in environment variables, never source code or `VITE_*` variables. Do not send real email during tests; intercept the order endpoint.
- Keep keyboard access, visible focus, dialog focus containment/restoration, meaningful labels, image alternatives, and reduced-motion behavior intact.
- Use CSS for responsive layout. JavaScript viewport checks belong only to interactions that need them, such as carousel geometry and GSAP pinning.
- Add no unnecessary dependencies, empty architecture files, duplicate stores, or universal components with unrelated responsibilities.
- Run `npm run typecheck`, `npm run lint`, `npm run build`, and relevant `npm test` cases. Use `node scripts/verify-assets.mjs` for local media and `node scripts/capture.mjs <label>` for 1440/768/390px screenshots. Do not claim checks passed without running them.

On Windows PowerShell with restricted script execution, invoke `npm.cmd` and `npx.cmd`.
