# JAYSHREE Aluminium & Trading: website (V1)

Next.js (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui. Static prerender (SSG), no database, no backend.

## Run
```bash
npm install
npm run dev        # dev mode: clearly labelled placeholders show where real photos are missing
npm run build      # production build: placeholders NEVER render
npm start
```
Copy `.env.example` to `.env.local` and fill it in (see "Environment").

## Where to change things
| What | File |
|---|---|
| Phones, address, Instagram, hours, dealer wording, service areas, WhatsApp number, hero photo | `src/data/site.ts` |
| Services (7) and their text | `src/data/services.ts` |
| Real projects (photos) | `src/data/projects.ts` (+ `public/images/README.md`) |
| Process steps | `src/data/process.ts` |
| Navigation | `src/data/nav.ts` |
| Colours, type scale, radius | `src/app/globals.css` (Stage 3 tokens) |

## Still PENDING (hidden or inert until you set it)
| Item | How to enable |
|---|---|
| Which number is on WhatsApp | `site.whatsapp.number` + `confirmed: true` (WhatsApp buttons are hidden until then) |
| Which number the Call buttons dial | `site.primaryPhoneIndex` (defaults to the first number) |
| Business hours | `site.hours` |
| Authorised dealer wording | `site.dealer { verified: true, wording }` (exact wording from the dealership papers) |
| Towns served | `site.serviceAreas` |
| Google Maps link | `site.mapUrl` |
| Owner's About text | `site.about.intro` |
| Real photos | see `public/images/README.md` |
| Quote form delivery | `NEXT_PUBLIC_WEB3FORMS_KEY` (without it the form is replaced by Call/WhatsApp buttons) |
| Domain | `NEXT_PUBLIC_SITE_URL` (until set, robots.txt blocks crawlers) |
| Analytics | `NEXT_PUBLIC_GA_ID` (off by default) |
| Favicon | pending a mark-only logo asset; none is generated from the logo |
| Official WhatsApp glyph | `ContactButtons.tsx` uses a generic chat icon (TODO) |
| Privacy page wording | `src/app/privacy/page.tsx`: have it reviewed |

## Logo
`public/brand/jayshree-logo.png` is the file supplied by the owner (transparent PNG, 1138x552), byte-identical
(SHA-256 96c640f4...fb1d7). It is never resized, re-encoded, optimised, traced or recoloured; `Logo.tsx` only sets
its display height with CSS. It is placed on white surfaces only. When a vector (SVG) version arrives, replace the
file and update `LOGO` in `src/components/common/Logo.tsx`.

## UI architecture
- `src/components/ui/` = shadcn/ui primitives only, restyled to the Stage 3 system: button, card, breadcrumb, sheet,
  dialog, input, textarea, label, native-select, form (react-hook-form), alert, accordion, navigation-menu,
  toggle-group, sonner. `components.json` is included, so `npx shadcn@latest add <name>` works.
- `src/components/common/` = app composites (Container, Section, ButtonLink, Logo, SitePhoto, Breadcrumbs).
- `src/components/{layout,sections,features,seo}/` = page-level pieces.
- shadcn's `accent` token is a hover surface (blue-50). The brand orange is `brand-orange`, used in exactly two places:
  the active-nav bar (`Header`, `MobileNav`) and the step tiles (`ProcessList`).

## Deploy
Vercel: import the repo, set the env vars, deploy (SSG + image optimiser). Cloudflare Pages / static hosting:
`NEXT_OUTPUT=export npm run build` (images are then served as-is: compress them first).
