import { laurierCourses } from "@/data/courses";

export type ShowcaseTier = "spotlight" | "standard" | "comingSoon";
export type ProjectCategory = "featured" | "coursework";
export type ProjectStatus = "shipped" | "in-progress" | "comingSoon";

export interface EmbedConfig {
  type: "iframe" | "video" | "component";
  src: string;
  title?: string;
  height?: number;
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
  "clinical-license-tracker",
  "resumeforge",
  "stock-analyst-agent",
  "omni-architect",
  "bespoke-creative-showcase",
  "arcane-hand-casting",
] as const;

export const projects: Project[] = [
  {
    slug: "clinical-license-tracker",
    title: "Clinical License Tracker & Enterprise Automation",
    oneLiner:
      "On-premises clinical license portal pairing 4-bit quantized local LLMs (Ollama) with idempotent n8n workflows to enforce strict hospital data residency.",
    category: "featured",
    status: "shipped",
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Python",
      "Local LLMs (Ollama)",
      "n8n",
      "Active Directory",
      "Docker",
      "Playwright",
      "Enterprise IT",
    ],
    showcaseTier: "spotlight",
    highlights: [
      "Designed and deployed an on-premise portal in Next.js, TypeScript, and Prisma, managing 1,000+ software licenses with real-time capacity tracking and Action Queue",
      "Engineered transactional lifecycle workflows with isolated staff/learner license pools, role-based access control (RBAC), and append-only audit logging",
      "Built idempotent n8n intake pipeline integrated with Active Directory validation to automate employee credential verification and expiry alerting",
      "Integrated on-premises AI assistant using 4-bit quantized local models via Ollama, context-window management, and live inventory grounding to preserve data privacy",
      "Verified critical user paths and security boundaries with comprehensive Vitest and Playwright test suites",
    ],
    whatIBuilt: [
      "Next.js App Router portal with Prisma ORM managing license pools, learner allocations, and audit history",
      "Local LLM prompt pipeline via Ollama parsing unstructured credential certificates into typed schema records",
      "Self-hosted event-driven n8n workflow triggers with Active Directory synchronization",
      "Vitest unit tests and Playwright E2E suites verifying license transaction integrity and privacy boundaries",
    ],
  },
  {
    slug: "resumeforge",
    title: "ResumeForge",
    oneLiner:
      "Local-first resume intelligence engine and compiler that stops AI hallucination by deterministically verifying tailored bullet claims against a protected Evidence Bank.",
    category: "featured",
    status: "shipped",
    tags: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Typst WASM",
      "Prisma",
      "SQLite",
      "Vitest (355 tests)",
      "Playwright (80 E2E)",
      "Tailwind CSS",
    ],
    repoUrl: "https://github.com/ZenzerJs/resumeforge",
    showcaseTier: "spotlight",
    highlights: [
      "Architected a local-first resume intelligence engine that deterministically verifies tailored bullet claims against source evidence, blocking unsupported claims",
      "Sub-second Typst WASM compilation pipeline delivering mathematical typesetting precision and instant PDF/DOCX preview with zero LaTeX overhead",
      "Deterministic 100-point ATS evaluation pipeline with rule-based keyword extraction, section auditing, and requirement gap analysis",
      "Engineered comprehensive test coverage with 355 unit tests and 80 Playwright E2E specs, including security test suites for SSRF and token redaction",
      "Strict BYOK architecture where user OpenAI/Anthropic/Gemini API keys and private documents are scrubbed client-side and never leave the local machine",
    ],
    whatIBuilt: [
      "Next.js 15 & React 19 reactive split-editor with real-time Typst WASM in-browser compilation",
      "Protected Master Resume and Evidence Bank relational schema in Prisma ORM with SQLite persistence",
      "Ranked evidence matching algorithm parsing job descriptions into typed requirements and surfacing coverage gaps",
      "Security test suite covering SSRF defense, client-side secret scrubbing, and private evidence isolation",
    ],
  },
  {
    slug: "stock-analyst-agent",
    title: "AI Stock Analyst Desk",
    oneLiner:
      "Autonomous equity research desk with cyclical LangGraph orchestration — live quotes, SEC 10-K/10-Q attribution, 8-quarter fundamentals cache, and sub-second Groq inference.",
    category: "featured",
    status: "shipped",
    tags: [
      "Python",
      "FastAPI",
      "LangGraph",
      "LangChain",
      "Groq LPU",
      "Gemini API",
      "React",
      "SQLite",
      "Finnhub API",
      "SEC EDGAR",
    ],
    repoUrl: "https://github.com/ZenzerJs/stock-analyst-agent",
    liveUrl: "https://stock-analyst-agent-ashen.vercel.app/",
    showcaseTier: "spotlight",
    embed: {
      type: "iframe",
      src: "https://stock-analyst-agent-ashen.vercel.app/",
      title: "Stock Analyst Agent",
      height: 560,
    },
    highlights: [
      "Stateful LangGraph tool-calling graph coordinating market data, 8-quarter fundamentals, analyst consensus, and earnings calendars",
      "Dual LLM routing pipeline prioritizing sub-second Groq LPU inference with automatic fallback to Gemini on rate limits",
      "Local SQLite fundamentals cache pre-ingesting income statements, balance sheets, and cash flows to eliminate third-party API latency",
      "Transparent research reasoning with outbound citation verification linking directly to SEC EDGAR 10-K/10-Q and Finnhub filings",
      "Production-hardened FastAPI backend with SlowAPI rate-limiting, ticker input sanitization, and BYOK credential support",
    ],
    whatIBuilt: [
      "LangGraph cyclical state graph in Python managing multi-turn agent reasoning and tool invocation handoffs",
      "SQLite caching and batch ingestion engine for historical quarterly financial statements",
      "React research interface with real-time ticker tape, interactive charts, and step-by-step reasoning drawers",
      "Production deployment combining Vercel (frontend) and Railway (FastAPI backend)",
    ],
  },
  {
    slug: "omni-architect",
    title: "OmniArchitect",
    oneLiner:
      "Hybrid on-premise vision and cloud reasoning system translating UI sketches and wireframes into structured specifications and production code.",
    category: "featured",
    status: "shipped",
    tags: [
      "Python",
      "FastAPI",
      "DeepSeek-VL",
      "Groq LPU",
      "Next.js",
      "PyMuPDF",
      "JWT Auth",
      "AI Agents",
    ],
    repoUrl: "https://github.com/ZenzerJs/Omni-Architect",
    showcaseTier: "spotlight",
    highlights: [
      "Local DeepSeek-VL vision pipeline ingesting UI sketches, wireframes, and design screenshots on-premise without cloud data leaks",
      "Interactive clarification interview loop generating targeted technical questions and producing typed functional specifications",
      "High-velocity code generation powered by Groq LPU inference translating approved specs into full-stack code",
      "Enterprise session management with JWT authentication (OMNI_JWT_SECRET) and isolated session directories under specs/sessions/",
      "PyMuPDF document ingestion pipeline parsing design briefs and technical requirements into context streams",
    ],
    whatIBuilt: [
      "FastAPI backend orchestrating local DeepSeek-VL multimodal inference and cloud Groq code generation",
      "Stateful interview loop generating typed markdown specifications (spec_*.md) and requirement checklists",
      "Next.js web client with real-time token streaming and session history management",
      "JWT authentication layer with password protection and ephemeral key fallback",
    ],
  },
  {
    slug: "bespoke-creative-showcase",
    title: "Client's Portfolio",
    oneLiner:
      "Agency-grade creative portfolio and interactive media platform featuring a retro CRT Broadcast TV console, trigonometric orbit physics, and sub-second load times.",
    category: "featured",
    status: "shipped",
    tags: [
      "Next.js 15",
      "React 19",
      "Tailwind CSS",
      "GSAP 3",
      "ScrollTrigger",
      "Lenis",
      "Vercel",
    ],
    liveUrl: "https://shanesia-portfolio.vercel.app/",
    showcaseTier: "spotlight",
    embed: {
      type: "iframe",
      src: "https://shanesia-portfolio.vercel.app/",
      title: "Client's Portfolio",
      height: 560,
    },
    highlights: [
      "Interactive retro CRT Broadcast TV console featuring simulated cathode-ray scanlines, physical dial knobs, TV Guide drawer, and keyboard controls",
      "Trigonometric orbit engine (orbitEngine.ts) calculating dynamic radial convergence of case study icons on scroll",
      "Scroll-orchestrated UI with GSAP 3, ScrollTrigger timeline pinning, and Lenis smooth scrolling",
      "Custom curtain overlay route transitions (PageTransitionProvider.tsx) and reactive cursor dot follower",
      "Optimized asset pipeline with WOFF2 font subsetting, WebP image conversion, and zero layout shift on Vercel",
    ],
    whatIBuilt: [
      "Next.js 15 App Router web application with 4 distinct routes (Home, About, Work, Contact)",
      "Custom CRT Television player component with channel switching and accessible hotkey controls",
      "Dynamic project showcase at /work with modal case-study decks and video reels",
      "Zero-dependency CSS marquee loop and responsive testimonial carousel",
    ],
  },
  {
    slug: "arcane-hand-casting",
    title: "Arcane Handcasting",
    oneLiner:
      "Real-time browser spellcasting arena powered by webcam hand tracking, MediaPipe WASM landmark detection, custom particle renderers, and rigid-body physics.",
    category: "featured",
    status: "shipped",
    tags: [
      "Next.js 16",
      "TypeScript",
      "MediaPipe WASM",
      "PixiJS",
      "Matter.js",
      "Vitest",
      "Computer Vision",
    ],
    repoUrl: "https://github.com/ZenzerJs/Arcane-Hand-Casting",
    showcaseTier: "spotlight",
    highlights: [
      "21-keypoint 3D hand tracking executing 100% in-browser via Google MediaPipe Vision WASM (hand_landmarker.task) with zero server video transmission",
      "Temporal landmark smoothing algorithms (landmarkSmoother.ts) and camera calibration to eliminate tracking jitter",
      "Four gesture-driven spell mechanics: Void Singularity, Storm Weave lightning, Aegis Ward rune shield, and Ember Grasp",
      "Custom Canvas and WebGL particle renderers simulating particle vortices, branching lightning arcs, and rotating rune wards",
      "Two dedicated runtime modes: /sandbox (FPS & landmark debug telemetry overlay) and /arena (wave-based combat with Matter.js collision physics)",
    ],
    whatIBuilt: [
      "Gesture recognition pipeline translating continuous 3D hand coordinates into discrete spell state machines",
      "Custom PixiJS particle shaders and Canvas composite renderers for high-FPS visual effects",
      "Wave-based trial arena with score tracking, health systems, and dynamic obstacle spawning",
      "Camera calibration and latency monitoring suite verified with Vitest",
    ],
  },
  {
    slug: "wc26-travel-mapper",
    title: "WC26 Travel Mapper",
    oneLiner:
      "Full-stack 2026 World Cup GIS travel planner across 16 host cities — multi-modal routing, real-time flight search, venue POIs, and weather tracking.",
    category: "featured",
    status: "shipped",
    tags: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Leaflet / Mapbox GIS",
      "Amadeus API",
      "Skyscanner API",
      "Foursquare API",
      "Vercel",
    ],
    repoUrl: "https://github.com/ZenzerJs/wc26-travel-mapper",
    liveUrl: "https://wc26-travel-mapper.vercel.app/",
    showcaseTier: "spotlight",
    embed: {
      type: "iframe",
      src: "https://wc26-travel-mapper.vercel.app/",
      title: "WC26 Travel Mapper",
      height: 560,
    },
    highlights: [
      "Interactive geospatial engine mapping 16 host stadiums, match venues, and fan zones across USA, Canada, and Mexico",
      "Multi-source flight price aggregation and routing engine integrating Amadeus API and Skyscanner endpoints (lib/flight-search.ts)",
      "Venue POI discovery for hotels, dining, and transit hubs via Foursquare Places API integration",
      "Multi-modal routing calculating transit times, driving directions, and matchday weather forecasts",
      "Resilient edge architecture featuring secure Next.js server proxies, in-memory caching (lib/api-cache.ts), and token-bucket rate limiting",
    ],
    whatIBuilt: [
      "Next.js mapping web application with dynamic Leaflet / Mapbox marker clusters and custom stadium pins",
      "Aggregated flight comparison and driving route calculation service",
      "Server-side API routes shielding third-party credentials and absorbing rate limits",
      "Debounced search and client-side viewport bounds caching for instant navigation",
    ],
  },
  {
    slug: "ml-stock-simulator",
    title: "ML Stock Simulator",
    oneLiner:
      "Multi-model time-series forecasting on 10 years of market data — ARIMA, Ridge, and Random Forest compared with walk-forward backtesting.",
    category: "featured",
    status: "shipped",
    tags: ["Python", "Machine Learning", "PyTorch", "scikit-learn", "Next.js", "Railway"],
    repoUrl: "https://github.com/ZenzerJs/ML-Stock-Simulator",
    liveUrl: "https://ml-stock-simulator.up.railway.app/",
    showcaseTier: "spotlight",
    embed: {
      type: "iframe",
      src: "https://ml-stock-simulator.up.railway.app/",
      title: "ML Stock Simulator",
      height: 560,
    },
    highlights: [
      "Feature engineering pipeline computing rolling moving averages, volatility indicators, and volume trends",
      "Comparative forecasting across ARIMA, Ridge Regression, and Random Forest on historical price data",
      "Strict time-respecting walk-forward evaluation using MAE and RMSE performance metrics",
      "Interactive scenario modeling UI for exploring bearish, base, and bullish market horizons",
    ],
    whatIBuilt: [
      "Python machine learning pipeline built with scikit-learn, statsmodels, and yfinance",
      "Walk-forward cross-validation algorithm preventing future data leakage during training",
      "Next.js full-stack interface with interactive charting and real-time ticker lookup",
      "Containerized deployment on Railway with integrated educational disclosures",
    ],
  },
  {
    slug: "geometry-dash-ai",
    title: "Geometry Dash RL Agent",
    oneLiner:
      "Deep reinforcement learning agent trained to navigate demon-level obstacle courses in Geometry Dash using real-time game-state extraction.",
    category: "featured",
    status: "in-progress",
    tags: ["Python", "PyTorch", "Reinforcement Learning", "Neural Networks", "OpenCV"],
    showcaseTier: "standard",
    highlights: [
      "Deep reinforcement learning policy training targeting frame-perfect jumps on demon difficulty levels",
      "Computer vision pipeline extracting player momentum and collision boundaries frame-by-frame",
      "Custom reward shaping functions penalizing premature jumps and maximizing level progression",
    ],
    whatIBuilt: [
      "Deep neural network policy model built from scratch in PyTorch",
      "Custom Gym-compatible simulation environment interfacing directly with live gameplay",
      "Automated checkpointing, replay buffer storage, and loss telemetry logging",
    ],
  },
  {
    slug: "scholars-spark",
    title: "Scholar's Spark",
    oneLiner:
      "Native iOS application connecting students with regional academic scholarships and opportunities, developed during a Swift development internship at the Career Education Council.",
    category: "featured",
    status: "shipped",
    tags: ["Swift", "Xcode", "iOS", "UI/UX Prototyping"],
    showcaseTier: "standard",
    highlights: [
      "Pitched and presented functional iOS prototypes to regional education leaders and stakeholders",
      "Engineered clean Swift app architecture in Xcode following Human Interface Guidelines",
      "Conducted weekly QA testing cycles and resolved runtime logic bugs ahead of presentation",
      "Awarded official CEC Swift Development Certification upon internship completion",
    ],
    whatIBuilt: [
      "Native iOS application prototype built with Swift and Xcode",
      "Iterative user workflows connecting students to curated academic scholarships and workshops",
      "Structured weekly engineering deliverables and stakeholder feedback integrations",
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
