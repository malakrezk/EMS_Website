# Architecture migration

## Assessment and migration plan

The starting application is React 18.3 on Vite 5, React Router 6 and Tailwind 3.
It has 13 JavaScript pages, shared layout/store components, seven content modules,
Framer Motion, GSAP/ScrollTrigger and a Services-only Lenis integration. The only
live backend is the existing Nodemailer `/api/send-order` handler. Contact submission
is a browser-only demo. CartContext persists the shared cart in localStorage.

The largest problems are the 90 KB Home page, embedded stylesheet strings in Home,
About and Solutions, duplicated navigation and reveal animations, inline content
arrays, an unreachable LegacyAbout component, an unreferenced cart store and cart
drawer family, and missing TypeScript validation. Store has unused pagination
code alongside its actual inline pagination. Checkout incorrectly treats API
failure as success. The server has a committed SMTP password requiring rotation.

Migration map (retain all active markup, classes, content and route behavior):

- `src/pages/*.jsx` -> `src/pages/<Page>/<Page>.tsx` with index exports.
- Embedded page styles -> colocated `<Page>.css`; content -> `<Page>.data.ts`.
- Large page sections -> colocated `components/`; retain GSAP class selectors.
- Shared layout/store/UI -> typed `.tsx` components in existing feature folders.
- `src/data/*.js` -> typed `.ts` content with domain models in `src/types/`.
- Tailwind palette -> `src/theme/`; expose tokens to Tailwind and global CSS.
- Navbar/footer links -> `src/config/navigationConfig.ts`.
- Order fetch calls -> typed `src/services/orderService.ts`, same endpoint/payload.
- Cart state -> typed CartContext, validated persistence and stable actions.
- Fixed theme -> immutable ThemeContext; no artificial app-wide mutable context.
- Confirmed unreachable files -> remove after import/reference checks.
- Public assets stay at their existing URLs; external fonts/media stay unchanged.

Visual invariants: preserve navy/cyan/blue/green gradients, Inter/Playfair/Manrope/
JetBrains Mono and local Cormorant/Space Grotesk fonts, section order, breakpoints,
carousels, video previews, hover states, GSAP pinning and existing redirects.
No framework migration, new runtime styling library, fabricated API or auth.

Verification: strict typecheck, configured lint/build, route and cart browser
tests, local asset checks and desktop/tablet/mobile screenshot comparisons.

## Final implementation report

### 1. Original architecture

React 18.3, Vite 5, React Router 6 and Tailwind 3, with 13 JavaScript page
components. Framer Motion and GSAP handle animation; Services uses Lenis. Static
content lives in local modules and public media files. CartContext persists the
cart. A Nodemailer endpoint handles orders and quotes.

### 2. Problems addressed

Large page components mixed content, styling, animation and state. Navigation,
form fields and reveal wrappers were duplicated. Unused components and a second
cart implementation obscured the active code. JavaScript provided no checked
domain contracts. Failed order requests could show success and clear the cart.
SMTP credentials were embedded in server code.

### 3. Folder structure

```text
src/
  components/{common,layout,projects,store,ui}/
  config/             Shared navigation
  constants/          Local media registry
  context/            Cart and immutable theme
  data/               Shared domain content and field definitions
  hooks/              Shared interaction hooks
  pages/<Page>/       Page.tsx, index.ts, optional data/CSS/components
  services/           Order API and cart persistence
  theme/              Central design tokens
  types/              Domain and component contracts
  utils/              Shared utilities
tests/                Playwright regression coverage
scripts/              Asset verification and screenshot comparison
```

`AGENTS.md` and `CLAUDE.md` document development conventions. Routes load page
modules lazily. Existing public asset paths and deployment configuration remain.

### 4. Reusable components

Added typed AppButton and AppInput variants and shared CustomerField rendering.
Consolidated reveal animation into Reveal; typed the existing Container,
SectionHeading, PageHeader, layout, product and project components. Shared
navigation and customer field definitions remove repeated content. Page-specific
sections remain colocated with their pages rather than becoming universal UI.

### 5. Pages refactored

Home, About, Services, ServiceDetails, IndustryDetails, Solutions, Projects,
ProjectDetails, Partners, Contact, Store, Cart and NotFound are strict TSX pages
with index exports. Large pages compose smaller sections. Existing routes and
legacy redirects are retained, as are section order, copy and visual styling.

### 6. Theme system

Centralized colors, typography, spacing, border radii, shadows, breakpoints and
transitions in `src/theme`. Tailwind and CSS variables expose the tokens. Indexed
`paint-*` shades retain the original decorative palette exactly. Responsive
conditions use shared screen definitions; responsive text uses typography
variables. Intentional page-specific illustration geometry, gradients and
animation values remain where needed to preserve the design.

### 7. State management

CartContext now has typed items/actions, stable callbacks and a memoized value.
Its storage adapter validates persisted data and tolerates corrupt or unavailable
storage. Immutable ThemeContext exposes the fixed theme without adding mutable
global state. Carousel, mute, filter and pagination state stay with their owning
sections. No redundant AppContext or second cart store remains.

### 8. Data-driven improvements

Page content and shared domain data have TypeScript contracts. Navigation, field
definitions, statistics, policies, offices, services and repeated cards render
from data. The local media registry keeps existing URLs stable. The order service
owns requests to the existing endpoint and validates responses. Errors remain
visible and retain the cart; confirmed success uses the submitted customer data.

### 9. Files moved or deleted

Application JS/JSX files became TS/TSX; pages moved into named folders and large
sections into their page's `components` folder. Embedded Home/About/Solutions
styles moved into colocated CSS. ContactSection and IndustriesAccordionCarousel
became page-local; Partners remains shared UI. Tailwind configuration became TS.
Removed the unreferenced cart store, old CartDrawer/CartItem/CartSummary family,
unused Pagination, unreachable LegacyAbout, unused SolutionsShowcase/WorkCard
and their unused data. Temporary migration scripts were removed. No public
media assets or active pages were deleted.

### 10. Dependencies

Added development dependencies TypeScript `~5.9.3`, typescript-eslint `^8.70.1`
and @playwright/test `^1.63.0`. Existing React types are reused. Runtime
dependencies and framework choices are unchanged; none were removed.

### 11. Verification executed

- `npx.cmd tsc --noEmit` and `npm.cmd run typecheck`: passed strict checking.
- `npm.cmd run lint`: passed, including retained verification scripts.
- `npm.cmd run build`: final production build passed (556 modules, 4.79 seconds).
  The main JavaScript entry is 351.88 kB / 112.99 kB gzip, versus the original
  737.93 kB / 222.69 kB gzip. Lazy route chunks load separately; these figures
  compare entry chunks, not the total download size of every route.
- `npm.cmd test`: 13 of 14 expanded tests passed on the first run. The remaining
  test initially tried to find a scroll-revealed control before scrolling to it.
  After correcting that test, `npm.cmd test -- --grep "home carousels"` passed.
  All 14 cases have therefore passed. Coverage includes 13 page types at 1440,
  768 and 390 pixels, all data-backed detail routes, redirects, mobile navigation,
  search/filter/pagination, dialog focus/Escape, cart persistence/quantity/removal,
  failed and successful order responses, failed quotes and normal-motion
  carousels/video previews. Order requests were intercepted; no email was sent.
- `node scripts/verify-assets.mjs`: all 85 registered local media files exist;
  local font stylesheet references also resolve.
- `node scripts/capture.mjs before` and `after`: 39 viewport screenshots per
  version, across 13 routes and three widths.
- `node scripts/compare-captures.mjs`: zero differences in captured titles,
  headings, links or horizontal overflow. Home, About, Solutions, Store, Cart
  and project listing/detail screenshots match at all three widths at the
  comparison's 20-channel-value tolerance. This is not an exact-pixel guarantee.

Screenshot comparison caught and helped fix a CSS `:first-child` change caused
by extracting inline style elements. Remaining image differences include
intermittently unavailable external images and asynchronous video frames.
Captures are viewport samples, not exhaustive full-page or animation snapshots.
Reports and screenshots remain in ignored `artifacts/` for local inspection.

### 12. Remaining issues and operational requirements

No missing registered local assets were found. Google Fonts, Unsplash and YouTube
still depend on external availability; some Unsplash images did not load during
comparison, so a universal visual match is not claimed. The existing general
Contact form remains a demonstration, not a live submission integration.

Configure `SMTP_USER`, `SMTP_PASS` and `RECIPIENT_EMAIL` using `.env.example` and
the deployment's server environment. Rotate the previously committed credential:
removal from source does not remove it from Git history. Real SMTP delivery was
not exercised; browser tests validate the client contract with intercepted
responses. No deployment or external message was performed.
