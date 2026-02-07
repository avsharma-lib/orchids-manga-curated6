## Project Summary
A premium manga e-commerce website called **Inkai** (formerly KUROMANGA), offering a curated collection of high-quality manga titles. The site focuses on a "quality over quantity" philosophy, targeting serious readers with a sophisticated, minimalist aesthetic.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** Custom SVGs, Lucide (available in package.json)
- **Data:** Static local data in `src/lib/manga-data.ts`

## Architecture
- `src/app`: Page components and layouts
- `src/components`: Reusable UI components (Header, Footer, MangaCard, etc.)
- `src/lib`: Data models, utility functions, and context providers
- `public`: Static assets (images, etc.)

## User Preferences
- **Branding:** Changed name from KUROMANGA to **Inkai**.
- **Logo:** Uses a specific PNG logo provided by the user.
- **Design:** Sophisticated, minimalist, high-contrast (Ink/Paper theme).
- **Hero Section:** Minimalist hero without generic CTA buttons or scroll indicators.
- **Contact:** Clean, design-matched contact page with clear placeholders.

## Project Guidelines
- **Logo Size:** Logos in Header/Footer/Hero should be prominent and larger than standard text logos.
- **Image Handling:** Ensure all manga images load correctly; use reliable external sources (Amazon/Media URLs).
- **GitHub Portability:** Use clear placeholders for contact details and text that can be easily edited via GitHub UI.
- **Components:** Max ~600 lines per file. Use RSC where possible.

## Common Patterns
- **Price Formatting:** Use `formatPrice` utility from `manga-data.ts` for INR currency.
- **Animations:** Use `framer-motion` for subtle entry animations (fade-up, slide-in).
- **Theme Variables:** Use CSS variables defined in `globals.css` (e.g., `var(--ink)`, `var(--paper)`, `var(--crimson)`).
- **Navigation:** Standard App Router Link components.
