export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jayden-saha.vercel.app",
);

export const siteConfig = {
  name: "Jayden Saha",
  title: "Jayden Saha — Portfolio",
  description:
    "IT Operations @ Trillium Health Partners · CS @ Laurier · Python, Java, SQL, TypeScript · Building AI agents and full-stack apps.",
  url: siteUrl,
  locale: "en_CA",
  keywords: [
    "Jayden Saha",
    "software developer",
    "full-stack developer",
    "machine learning",
    "AI agents",
    "Laurier computer science",
    "Trillium Health Partners",
    "Python",
    "TypeScript",
    "React Native",
  ],
} as const;
