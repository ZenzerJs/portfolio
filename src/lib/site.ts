export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jaydens-dev-portfolio.vercel.app",
);

export const siteConfig = {
  name: "Jayden Saha",
  title: "Jayden Saha — Portfolio",
  description:
    "Second-year CS student at Laurier building AI agents, ML pipelines, and full-stack apps. Open to Fall 2026 / Winter 2027 co-op.",
  url: siteUrl,
  locale: "en_CA",
  keywords: [
    "Jayden Saha",
    "software developer",
    "full-stack developer",
    "machine learning",
    "AI agents",
    "LangGraph",
    "co-op",
    "Laurier computer science",
    "Trillium Health Partners",
    "Python",
    "TypeScript",
    "React Native",
  ],
} as const;
