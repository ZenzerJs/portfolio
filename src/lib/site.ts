export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jaydens-dev-portfolio.vercel.app",
);

export const siteConfig = {
  name: "Jayden Saha",
  title: "Jayden Saha — CS Student · Full-Stack & AI Systems",
  description:
    "Computer Science student at Wilfrid Laurier University and former IT Operations (Software Development Co-op) at Trillium Health Partners. Building full-stack web apps, local-first AI tools, and reproducible ML systems.",
  url: siteUrl,
  locale: "en_CA",
  keywords: [
    "Jayden Saha",
    "computer science student",
    "software developer",
    "full-stack developer",
    "SWE intern",
    "AI systems",
    "LangGraph",
    "LangChain",
    "Ollama",
    "local LLMs",
    "Typst WASM",
    "n8n",
    "Trillium Health Partners",
    "Wilfrid Laurier University",
    "Python",
    "FastAPI",
    "Next.js",
    "TypeScript",
    "Prisma",
  ],
} as const;
