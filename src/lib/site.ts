export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jaydens-dev-portfolio.vercel.app",
);

export const siteConfig = {
  name: "Jayden Saha",
  title: "Jayden Saha — Full-Stack & AI Systems Engineer",
  description:
    "Full-Stack Software Engineer and AI Systems builder studying Computer Science at Wilfrid Laurier University with IT Operations experience at Trillium Health Partners. Specializing in LangGraph multi-agent orchestrations, local LLM automations, and modern Next.js platforms.",
  url: siteUrl,
  locale: "en_CA",
  keywords: [
    "Jayden Saha",
    "software engineer",
    "full-stack developer",
    "AI systems engineer",
    "LangGraph",
    "LangChain",
    "local LLMs",
    "n8n automation",
    "Trillium Health Partners",
    "Wilfrid Laurier University",
    "Python",
    "FastAPI",
    "Next.js",
    "TypeScript",
    "PyTorch",
  ],
} as const;
