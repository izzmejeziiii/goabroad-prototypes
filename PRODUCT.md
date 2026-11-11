# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The GoAbroad team: designers, developers, PMs and stakeholders. They open the prototypes site to find a prototype, click through it, compare its versions, and give feedback. The landing page (`/`) is their way in.

## Product Purpose

GoAbroad Prototypes (titled "GoAbroad Design Library") is a static Next.js site holding clickable design prototypes and explorations for GoAbroad: redesigns of the public site, the provider admin portal, advertising and sales pages, and partner sites. Nothing in it is production code, and it has no real back end. Success means a teammate can find the prototype they need, see what it looks like before opening it, and reach the exact page or version they want to review.

## Positioning

It is GoAbroad's own working library of in-progress design, built in the same Tailwind tokens and components as goabroad.com, so prototypes look like the real product rather than like mockups.

## Operating Context

- Each prototype lives at its own route (`app/<name>/page.tsx`) with mock content in `app/components/<name>/data.ts`.
- Several prototypes contain many inner pages: the admin portal has a provider side and a staff side with dozens of screens, Top Rated has 11 directory pages, the invoice tool has demo invoices for each payment state, and program comparison has a directory and a search results page.
- Some prototypes switch between design versions on the page itself (Advertise, Advertise Guide, Program Listing) using a version selector rather than separate URLs.
- New prototypes are added over time; the landing page needs a new entry each time.
- Prototypes either use the public GoAbroad header and footer or opt out of them as full-screen pages (pathname check in `app/components/reusable/header.tsx` and `footer/footer.tsx`).

## Capabilities and Constraints

- Next.js 16 App Router, React 19, Tailwind v4 (tokens in `app/globals.css` under `@theme`), `lucide-react` and `react-icons` for icons, Headless UI available.
- Static demo content only; no auth, no database.
- Changes are committed straight to `main`; no branches or PRs.

## Brand Commitments

- GoAbroad brand. Interface colour comes from cobalt, slate, sun, roman (coral) and fern. The bright "primary"/pacific teal is retired for UI colour because it fails WCAG contrast.
- No text set on photos behind a scrim or gradient; captions sit on a solid surface.
- New GoAbroad pages follow the /mygoabroad redesign pattern (light slate hero, cobalt accents, cobalt buttons), not the older dark directory heroes.
- The landing page keeps the name "GoAbroad Design Library" and its intro line, and each prototype's description text word for word (confirmed 2026-11-11).

## Evidence on Hand

- The prototype routes themselves, which can be shown live.
- Each prototype's own mock data (`app/components/*/data.ts`), e.g. Top Rated's `directories`, the invoice tool's demo `invoices`.
- GoAbroad logo and imagery on `images.goabroad.com`; Top Rated and Ads Specs images under `public/images/`.
- No screenshots or thumbnails of the prototypes exist yet.

## Product Principles

1. Show the real thing: a prototype is best judged by seeing it, not by reading about it.
2. Get people to the exact page they need to review in as few steps as possible.
3. Stay accurate as prototypes are added; the index should read from the prototypes' own data where it can.
4. Look like GoAbroad, built from the same tokens as the live site.

## Accessibility & Inclusion

Meet WCAG AA contrast (the reason the primary teal was retired). Keyboard and screen-reader access for every interactive control.
