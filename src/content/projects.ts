export type ShowcaseTier = "spotlight" | "standard" | "comingSoon";
export type ProjectCategory = "featured" | "coursework";
export type ProjectStatus = "shipped" | "in-progress" | "comingSoon";

export interface EmbedConfig {
  type: "iframe" | "video" | "component";
  src: string;
  title?: string;
}

export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  category: ProjectCategory;
  status: ProjectStatus;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  showcaseTier: ShowcaseTier;
  embed?: EmbedConfig;
  highlights: string[];
  whatIBuilt: string[];
}

export const projects: Project[] = [
  {
    slug: "geometry-dash-ai",
    title: "Geometry Dash AI Agent",
    oneLiner:
      "A reinforcement learning agent trained to master demon-level maps in Geometry Dash using neural networks and a custom reward system.",
    category: "featured",
    status: "in-progress",
    tags: [
      "Python",
      "Reinforcement Learning",
      "Neural Networks",
      "Machine Learning",
    ],
    repoUrl: "https://github.com/ZenzerJs",
    showcaseTier: "spotlight",
    highlights: [
      "Training an AI agent on demon-level difficulty maps",
      "Custom reward system that rewards successful manoeuvres and penalizes failures",
      "Built from scratch with Python and ML libraries",
      "Iterative training loop with observable improvement over time",
    ],
    whatIBuilt: [
      "Artificial neural network as the core decision-making system",
      "Reinforcement learning environment interfacing with the game",
      "Reward shaping pipeline for effective trial-and-error learning",
      "Training infrastructure and performance monitoring",
    ],
  },
  {
    slug: "portfolio-site",
    title: "Portfolio Website",
    oneLiner:
      "The site you're looking at — a recruiter-optimized portfolio with WebGL effects, data-driven projects, and polished animations.",
    category: "featured",
    status: "shipped",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "WebGL"],
    repoUrl: "https://github.com/ZenzerJs",
    showcaseTier: "standard",
    highlights: [
      "Glassmorphism UI with animated WebGL Aurora background",
      "Data-driven projects system — add projects by editing one file",
      "Tiered demo strategy with lazy-loaded spotlight embeds",
      "Responsive, accessible, and optimized for fast loads",
    ],
    whatIBuilt: [
      "Full static site with Next.js App Router and TypeScript",
      "Custom OGL-based WebGL shader for the Aurora background",
      "Floating glassmorphism nav with scroll-aware visibility",
      "Framer Motion animations: staggered reveals, hover states, page transitions",
    ],
  },
  {
    slug: "scholars-spark",
    title: "Scholar's Spark",
    oneLiner:
      "An iOS app connecting high school students with relevant academic opportunities, built during a Swift development internship at the Career Education Council.",
    category: "featured",
    status: "shipped",
    tags: ["Swift", "Xcode", "iOS", "UI/UX Design"],
    showcaseTier: "standard",
    highlights: [
      "Pitched to industry professionals and received positive feedback on design and impact",
      "Developed functional prototypes weekly, ensuring compatibility with user requirements",
      "Conducted testing and debugging to resolve logic errors before deployment",
      "Collaborated with stakeholders to gather requirements and integrate feedback",
      "Earned CEC Swift Certification upon completion",
    ],
    whatIBuilt: [
      "Full iOS app prototype in Swift using Xcode",
      "User interface connecting students with academic resources and opportunities",
      "Iterative prototyping workflow with weekly deliverables and QA cycles",
      "Final polished presentation delivered to industry professionals",
    ],
  },
  {
    slug: "odin-project-web-dev",
    title: "Web Development — The Odin Project",
    oneLiner:
      "A growing collection of real-world web projects built from scratch, with Firebase integration for real-time data and authentication.",
    category: "coursework",
    status: "in-progress",
    tags: ["HTML", "CSS", "JavaScript", "Git", "React Native", "Firebase"],
    repoUrl: "https://github.com/ZenzerJs",
    showcaseTier: "standard",
    highlights: [
      "Building responsive web applications adhering to modern web standards",
      "Implementing Firebase for real-time user data and authentication",
      "Learning React Native to build cross-platform mobile apps",
      "Git and GitHub for version control and project management",
    ],
    whatIBuilt: [
      "Multiple functional web projects (recipes, exercises, and more)",
      "Responsive layouts with modern CSS techniques",
      "Firebase-powered data management and authentication flows",
      "Clean Git history with proper branching and documentation",
    ],
  },
  {
    slug: "cp104-intro-programming",
    title: "CP104 — Intro to Programming",
    oneLiner:
      "9 assignments and 11 labs in Python covering functions, algorithms, data structures, string processing, and file I/O at Laurier.",
    category: "coursework",
    status: "shipped",
    tags: ["Python", "Algorithms", "File I/O", "Data Processing"],
    showcaseTier: "standard",
    highlights: [
      "Prime number detection with optimized trial division",
      "ISBN-13 validation with multi-step format checking",
      "Loan amortization calculator with formatted financial tables",
      "File parser that processes CSV-like student data to compute statistics",
      "Word chain algorithm and English pluralization rule engine",
    ],
    whatIBuilt: [
      "Factorial, range sum, and multiplication table generators (functions & loops)",
      "List manipulation utilities — factor finder, in-place subtraction, sorted check",
      "String processing — ISBN validator, word chain checker, common suffix finder",
      "File I/O pipeline — reading, parsing, character classification, line numbering",
    ],
  },
  {
    slug: "cp164-data-structures",
    title: "CP164 — Data Structures & OOP",
    oneLiner:
      "Object-oriented programming in Python — classes, magic methods, file serialization, and data filtering patterns at Laurier.",
    category: "coursework",
    status: "in-progress",
    tags: ["Python", "OOP", "Data Structures", "Classes"],
    showcaseTier: "comingSoon",
    highlights: [
      "Custom class with __init__, __str__, __eq__, __lt__, __le__, and __hash__",
      "Static methods for formatted data display",
      "File serialization — reading and writing objects to pipe-delimited files",
      "Utility functions for filtering, searching, and aggregating object collections",
    ],
    whatIBuilt: [
      "Food class with full comparison operator overloading",
      "File I/O utilities for object persistence (read/write pipelines)",
      "List comprehension-based filtering (vegetarian filter, origin filter)",
      "Search function with multi-criteria filtering (origin, calories, dietary)",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.category === "featured");
}
