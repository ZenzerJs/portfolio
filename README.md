# Jayden Saha — Engineering Portfolio

Personal software engineering and AI systems portfolio built with **Next.js 16 (App Router)**, **React 19**, **TypeScript 5**, **Tailwind CSS v4**, **GSAP / ScrollTrigger**, **Lenis**, **Motion**, and **Vitest**.

## Stack

- **Framework**: Next.js 16 (`App Router`, Server Components, dynamic `next/og` metadata routes)
- **UI & Styling**: React 19, Tailwind CSS v4 (`@tailwindcss/postcss`), Lucide icons, Syne / Manrope / JetBrains Mono typography
- **Motion & Graphics**: `gsap` + `ScrollTrigger`, `lenis`, `motion` (`motion/react` with `<MotionConfig reducedMotion="user">`), and native WebGL Aurora Veil shader + snow canvas (`BorealBackdropCanvas.tsx`)
- **Testing & Quality**: Vitest, TypeScript strict checking (`tsc --noEmit`), ESLint 9 (`eslint-config-next`)
- **Deployment**: Vercel (`vercel.json` security headers and cache policies mirrored in `next.config.ts`)

## Key Features

- **Boreal Frost Atmosphere**: Single-rail navigation (`SidebarNav`), WebGL Aurora Veil & Waves backdrop with blizzard-to-airy-snow scroll progression and sidebar-offset reading mask (`BorealBackdropCanvas.tsx`), 5-plane parallax Nordic cabin (`CabinHorizonSvg.tsx`), flagship project showcase with real live screenshots and blueprint pipelines (`ProjectVisual`), scrubbed Experience timeline spine, coursework grade count-ups, and copyable contact actions.
- **Project Archive & Case Studies**: Filterable archive at `/projects` and deep-dive pages at `/projects/[slug]` with sandboxed interactive live demo embeds (`DemoModule`) and previous/next project navigation.
- **Metadata & SEO**: Dynamic `src/app/icon.tsx`, `src/app/opengraph-image.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, and escaped JSON-LD structured data.
- **Security & Caching**: `Strict-Transport-Security`, `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` configured in both `vercel.json` and `next.config.ts`, with `Cache-Control: public, max-age=0, must-revalidate` on PDF assets such as `/resume.pdf`.

## Project Structure

```text
.
├── .github/workflows/ci.yml   # GitHub Actions CI (typecheck, lint, test, build)
├── public/
│   ├── projects/              # Captured project screenshots
│   └── resume.pdf             # Printable/downloadable resume
├── src/
│   ├── __tests__/             # Vitest unit & data-integrity tests
│   ├── app/                   # Next.js 16 App Router pages & metadata routes
│   │   ├── projects/          # Archive (/projects) and case studies (/projects/[slug])
│   │   ├── globals.css        # Tailwind v4 tokens & component styles
│   │   ├── icon.tsx           # Dynamic 32x32 PNG favicon
│   │   ├── layout.tsx         # Root shell & Syne / Manrope / JetBrains Mono fonts
│   │   ├── not-found.tsx      # 404 route
│   │   ├── opengraph-image.tsx# Dynamic 1200x630 Open Graph card
│   │   ├── page.tsx           # Portfolio homepage
│   │   ├── robots.ts          # Dynamic robots.txt
│   │   └── sitemap.ts         # Dynamic XML sitemap
│   ├── components/            # Modular React components (hero, layout, experience, education, UI)
│   ├── content/               # Project metadata & case study entries (projects.ts)
│   ├── data/                  # Profile, experience, skills & coursework data
│   └── lib/                   # Site configuration and URL helpers
├── next.config.ts             # Next.js config & mirrored security headers
├── vercel.json                # Vercel deployment headers & cache rules
└── vitest.config.ts           # Vitest configuration with @/* path alias
```

## Getting Started

### Prerequisites

- **Node.js** `22.12+` (or `24+`)
- **npm**

### Local Development

```bash
git clone https://github.com/ZenzerJs/portfolio.git
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the local Next.js development server |
| `npm run build` | Build the production Next.js bundle |
| `npm run start` | Serve the production build locally |
| `npm run typecheck` | Run TypeScript type checking (`tsc --noEmit`) |
| `npm run lint` | Run ESLint across the repository |
| `npm test` | Run the Vitest test suite (`vitest run`) |
