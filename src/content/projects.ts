import { laurierCourses } from "@/data/courses";

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
  bohrUrl?: string;
  calendarUrl?: string;
  showcaseTier: ShowcaseTier;
  embed?: EmbedConfig;
  highlights: string[];
  whatIBuilt: string[];
}

export const HOMEPAGE_SLUGS = [
  "ml-stock-simulator",
  "omni-architect",
  "wc26-travel-mapper",
  "scholars-spark",
] as const;

export const projects: Project[] = [
  {
    slug: "ml-stock-simulator",
    title: "ML Stock Simulator",
    oneLiner:
      "ML forecasting on 10 years of market data — ARIMA, Ridge, and Random Forest compared with walk-forward MAE/RMSE backtesting and live scenario projections.",
    category: "featured",
    status: "shipped",
    tags: ["Python", "Machine Learning", "PyTorch", "scikit-learn", "Next.js"],
    repoUrl: "https://github.com/ZenzerJs/ML-Stock-Simulator",
    liveUrl: "https://ml-stock-simulator.up.railway.app/",
    showcaseTier: "spotlight",
    embed: {
      type: "iframe",
      src: "https://ml-stock-simulator.up.railway.app/",
      title: "ML Stock Simulator",
    },
    highlights: [
      "Feature engineering with moving averages and volume trends",
      "Compare ARIMA, Ridge, and Random Forest on 10 years of market data",
      "Walk-forward evaluation with MAE and RMSE metrics",
      "Interactive scenario forecasting — bearish, stable, and bullish projections",
      "Deployed full-stack with live ticker search and interactive charts",
    ],
    whatIBuilt: [
      "ML pipeline with scikit-learn and statsmodels for baseline models",
      "Time-respecting backtest with proper train/test splitting",
      "Scenario-based forecasting UI for exploring multiple futures",
      "Deployed app on Railway with educational disclaimers built in",
    ],
  },
  {
    slug: "omni-architect",
    title: "Omni Architect",
    oneLiner:
      "Multi-agent AI orchestration with LangGraph and LangChain — task decomposition, parallel agent execution, and vision-to-code via Groq API.",
    category: "featured",
    status: "shipped",
    tags: ["Python", "LangChain", "LangGraph", "Groq API", "AI Agents"],
    repoUrl: "https://github.com/ZenzerJs/Omni-Architect",
    showcaseTier: "spotlight",
    highlights: [
      "Multi-agent coordination with LangGraph state machines",
      "Task decomposition and parallel execution across specialized agents",
      "Ultra-low latency inference via Groq API",
      "Vision-to-code pipeline using DeepSeek-VL for UI mockup analysis",
    ],
    whatIBuilt: [
      "LangGraph workflow with vision analysis and code generation nodes",
      "Agent state management with typed TypedDict pipelines",
      "Groq-powered LLM integration for fast inference",
      "Local vision model integration for UI mockup understanding",
    ],
  },
  {
    slug: "geometry-dash-ai",
    title: "Geometry Dash AI Agent",
    oneLiner:
      "A reinforcement learning agent trained to master demon-level maps in Geometry Dash using neural networks and a custom reward system.",
    category: "featured",
    status: "in-progress",
    tags: ["Python", "Reinforcement Learning", "Neural Networks"],
    showcaseTier: "standard",
    highlights: [
      "Training an AI agent on demon-level difficulty maps",
      "Custom reward system for successful manoeuvres vs failures",
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
      "Developed functional prototypes weekly with stakeholder integration",
      "Conducted testing and debugging to resolve logic errors before deployment",
      "Earned CEC Swift Certification upon completion",
    ],
    whatIBuilt: [
      "Full iOS app prototype in Swift using Xcode",
      "User interface connecting students with academic resources",
      "Iterative prototyping workflow with weekly deliverables and QA cycles",
      "Final polished presentation delivered to industry professionals",
    ],
  },
  {
    slug: "wc26-travel-mapper",
    title: "WC26 Travel Mapper",
    oneLiner:
      "Full-stack World Cup travel planner for exploring routes between 2026 host cities across North America — interactive maps, route-aware POI discovery, and flight suggestions for longer trips.",
    category: "featured",
    status: "shipped",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Mapbox", "Vercel"],
    repoUrl: "https://github.com/ZenzerJs/wc26-travel-mapper",
    liveUrl: "https://wc26-travel-mapper.vercel.app/",
    showcaseTier: "standard",
    highlights: [
      "Interactive Mapbox map with satellite and streets view toggling",
      "Route planning between FIFA World Cup host cities in Canada, the U.S., and Mexico",
      "Driving and walking route visualization with multi-city travel exploration",
      "Route-aware POI discovery for restaurants, hotels, gas stations, and attractions",
      "Flight suggestion flow for longer-distance trips between host cities",
      "Deployed on Vercel with environment variable setup and third-party API debugging",
    ],
    whatIBuilt: [
      "Next.js app with Mapbox GL JS and react-map-gl for interactive route visualization",
      "Directions and place-search integrations via RapidAPI and Foursquare Places API",
      "Responsive map-based UI with satellite/street view switching and POI filtering",
      "Production deployment on Vercel with API key management and integration debugging",
    ],
  },
  {
    slug: "portfolio-site",
    title: "Jayden's Dev Portfolio",
    oneLiner:
      "Designed and built a fully responsive personal portfolio from scratch — aurora-glass UI, interactive constellation background, and mobile-first layout deployed on Vercel.",
    category: "featured",
    status: "shipped",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Canvas", "Vercel"],
    repoUrl: "https://github.com/ZenzerJs/portfolio",
    liveUrl: "https://jaydens-dev-portfolio.vercel.app",
    showcaseTier: "standard",
    highlights: [
      "Interactive constellation canvas with depth parallax and cursor links",
      "Data-driven projects system — add projects by editing one file",
      "Single-page scroll with experience, skills, and education sections",
      "Responsive, accessible, and optimized for recruiter scanning",
    ],
    whatIBuilt: [
      "Full static site with Next.js App Router and TypeScript",
      "Centralized portfolio data layer for easy content updates",
      "Section-based navigation with scroll-aware active states",
      "Deployed on Vercel with automatic preview deployments",
    ],
  },
  {
    slug: "odin-project-web-dev",
    title: "Web Development — The Odin Project",
    oneLiner:
      "Following a comprehensive, project-based curriculum to build real-world web applications from scratch — HTML, CSS, JavaScript, Git, and React Native.",
    category: "featured",
    status: "in-progress",
    tags: ["HTML", "CSS", "JavaScript", "Git", "React Native", "Firebase"],
    repoUrl: "https://github.com/ZenzerJs/odin-recipes",
    showcaseTier: "standard",
    highlights: [
      "Building responsive web applications adhering to modern web standards",
      "Git and GitHub for version control, collaboration, and code management",
      "Implementing Firebase for real-time user data and authentication",
      "Learning React Native for cross-platform mobile development",
    ],
    whatIBuilt: [
      "Multiple functional web projects (recipes, exercises, and more)",
      "Responsive layouts with modern CSS techniques",
      "Clean Git history with proper branching and documentation",
      "Problem-solving through complex assignments and real-world briefs",
    ],
  },
  {
    slug: "cp104-intro-programming",
    title: "CP104 — Intro to Programming (98%)",
    oneLiner:
      "9 assignments and 11 labs in Python covering functions, algorithms, data structures, string processing, and file I/O — finished with 98%.",
    category: "coursework",
    status: "shipped",
    tags: ["Python", "Algorithms", "File I/O", "Data Processing"],
    showcaseTier: "standard",
    bohrUrl: laurierCourses.cp104.bohrUrl,
    calendarUrl: laurierCourses.cp104.calendarUrl,
    highlights: [
      "Prime number detection with optimized trial division",
      "ISBN-13 validation with multi-step format checking",
      "Loan amortization calculator with formatted financial tables",
      "File parser that processes CSV-like student data to compute statistics",
    ],
    whatIBuilt: [
      "Factorial, range sum, and multiplication table generators",
      "List manipulation utilities and sorted check algorithms",
      "String processing — ISBN validator, word chain checker",
      "File I/O pipeline — reading, parsing, and line numbering",
    ],
  },
  {
    slug: "cp164-data-structures",
    title: "CP164 — Data Structures (99%)",
    oneLiner:
      "Object-oriented programming in Python — classes, magic methods, file serialization, and data filtering patterns — finished with 99%.",
    category: "coursework",
    status: "shipped",
    tags: ["Python", "OOP", "Data Structures", "Classes"],
    showcaseTier: "standard",
    bohrUrl: laurierCourses.cp164.bohrUrl,
    calendarUrl: laurierCourses.cp164.calendarUrl,
    highlights: [
      "Custom class with full comparison operator overloading",
      "File serialization — reading and writing objects to pipe-delimited files",
      "Utility functions for filtering, searching, and aggregating collections",
    ],
    whatIBuilt: [
      "Food class with __init__, __str__, __eq__, __lt__, __le__, and __hash__",
      "File I/O utilities for object persistence",
      "List comprehension-based filtering patterns",
      "Multi-criteria search functions",
    ],
  },
  {
    slug: "cp213-oop",
    title: "CP213 — Object-Oriented Programming",
    oneLiner:
      "Second-year OOP course at Laurier — actively enrolled in inheritance, polymorphism, design patterns, and structured software design in Java.",
    category: "coursework",
    status: "in-progress",
    tags: ["Java", "OOP", "Design Patterns", "Inheritance"],
    showcaseTier: "comingSoon",
    bohrUrl: laurierCourses.cp213.bohrUrl,
    calendarUrl: laurierCourses.cp213.calendarUrl,
    highlights: [
      "Object-oriented design principles and class hierarchies",
      "Polymorphism, encapsulation, and abstraction in practice",
      "Design pattern applications in coursework assignments",
    ],
    whatIBuilt: [
      "Structured Java programs with reusable class architectures",
      "Assignment solutions demonstrating OOP best practices",
    ],
  },
  {
    slug: "cp363-databases",
    title: "CP363 — Databases",
    oneLiner:
      "Third-year databases course taken early — actively enrolled in relational design, SQL queries, normalization, and data modeling.",
    category: "coursework",
    status: "in-progress",
    tags: ["SQL", "Database Design", "Normalization", "Relational Model"],
    showcaseTier: "comingSoon",
    bohrUrl: laurierCourses.cp363.bohrUrl,
    calendarUrl: laurierCourses.cp363.calendarUrl,
    highlights: [
      "Enrolled ahead of schedule as a second-year student",
      "Relational schema design and entity-relationship modeling",
      "Complex SQL queries — joins, aggregations, and subqueries",
      "Database normalization and integrity constraints",
    ],
    whatIBuilt: [
      "Schema designs for structured data problems",
      "SQL query sets for data retrieval and manipulation",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.category === "featured");
}

export function getHomepageProjects(): Project[] {
  return HOMEPAGE_SLUGS.map((slug) => projects.find((p) => p.slug === slug)).filter(
    (p): p is Project => p !== undefined,
  );
}
