# Jayden Saha — Portfolio

A recruiter-optimized portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **WebGL Aurora background** — Custom OGL shader for an atmospheric visual effect
- **Glassmorphism UI** — Floating nav, glassy cards, and bubble-style pills
- **Data-driven projects** — Add projects by editing a single TypeScript file
- **Tiered demo system** — Spotlight embeds (lazy-loaded), standard links, or "coming soon"
- **Framer Motion animations** — Staggered reveals, hover states, scroll-triggered transitions
- **Fully static** — Pre-rendered with Next.js App Router for fast loads
- **Dark mode** — Default dark theme with green accent

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **WebGL:** OGL
- **Icons:** Lucide React
- **Deployment:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding Projects

Edit `src/content/projects.ts` — each project is a typed object with slug, title, tags, highlights, and showcase tier.

## Deployment

Push to GitHub and connect to [Vercel](https://vercel.com) for automatic deployments.
