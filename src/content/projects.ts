import { laurierCourses } from "@/data/courses";

export type ProjectDomain =
  | "AI Systems"
  | "Full-Stack"
  | "Spatial & ML"
  | "Coursework";
export type ProjectCategory = "featured" | "coursework";
export type ProjectStatus = "shipped" | "in-progress";

export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  overview?: string;
  category: ProjectCategory;
  domain: ProjectDomain;
  status: ProjectStatus;
  year: string;
  metric: string;
  architectureMoat: string;
  stackSummary: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  image?: string;
  diagram?:
    | "clinical-pipeline"
    | "handcasting-pipeline"
    | "ripple-pipeline"
    | "ailab-pipeline";
  bohrUrl?: string;
  calendarUrl?: string;
  highlights: string[];
  whatIBuilt: string[];
}

export const HOMEPAGE_SLUGS = [
  "clinical-license-tracker",
  "resumeforge",
  "ripple",
  "ai-lab",
  "stock-analyst-agent",
  "arcane-hand-casting",
  "wc26-travel-mapper",
] as const;

export const projects: Project[] = [
  {
    slug: "clinical-license-tracker",
    title: "Clinical License Tracker",
    oneLiner:
      "On-premises hospital portal managing 1,000+ clinical software licenses with isolated pools, RBAC, idempotent n8n intake, and a 4-bit Ollama assistant.",
    overview:
      "Clinical License Tracker replaces spreadsheet seat tracking across 1,000+ clinical software licenses with an on-premises Next.js and Prisma portal. It separates staff and learner pools under role-based access control, automates intake verification through idempotent n8n and Active Directory workflows, and runs a 4-bit quantized Ollama assistant grounded strictly in live local inventory so zero clinical records leave the hospital network.",
    category: "featured",
    domain: "AI Systems",
    status: "shipped",
    year: "2026",
    metric: "1,000+ licenses · On-prem",
    architectureMoat:
      "Air-gapped Ollama 4-bit grounding + idempotent n8n/AD lifecycle workflows",
    stackSummary: "Next.js · Prisma · Ollama · n8n",
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Ollama",
      "n8n",
      "Active Directory",
      "RBAC",
      "Vitest",
      "Playwright",
    ],
    diagram: "clinical-pipeline",
    highlights: [
      "Replaced spreadsheet tracking for 1,000+ clinical software licenses with live capacity tracking, assignment workflows, and an Action Queue.",
      "Implemented isolated staff and learner pools with role-based access control (RBAC) and append-only audit logging.",
      "Built idempotent n8n intake pipelines backed by Active Directory validation to automate request verification and expiry alerts.",
      "Engineered an on-premises assistant using 4-bit quantized local models through Ollama with context-window management and live inventory grounding.",
      "Verified core workflows and security boundaries with Vitest unit tests and Playwright E2E suites.",
    ],
    whatIBuilt: [
      "Next.js App Router portal with Prisma ORM managing license pools, learner allocations, and immutable audit history.",
      "On-premises Ollama prompt pipeline grounded in live inventory records so zero clinical data leaves the hospital network.",
      "Idempotent self-hosted n8n workflows integrated with Active Directory validation.",
      "Vitest and Playwright test suites verifying transactional lifecycle mutations and RBAC policies.",
    ],
  },
  {
    slug: "resumeforge",
    title: "ResumeForge",
    oneLiner:
      "Local-first workspace that tailors a protected master resume to job postings, enforcing evidence grounding and blocking unsupported or uncited claims.",
    overview:
      "ResumeForge is a split-pane tailoring workspace that adapts a protected master resume to target job postings without inventing experience. Every proposed bullet adjustment is validated against structured Evidence Bank records in PostgreSQL, scored by a deterministic 100-point ATS rubric, and compiled in real time in the browser via Typst WASM for instant PDF and DOCX export.",
    category: "featured",
    domain: "AI Systems",
    status: "shipped",
    year: "2026",
    metric: "Live · resumeforge.studio",
    architectureMoat:
      "Evidence-bank grounding with client-side Typst WASM & deterministic 100-pt ATS rubric",
    stackSummary: "Next.js · TypeScript · Prisma · PostgreSQL · Typst WASM",
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Typst WASM",
      "Playwright",
      "Vitest",
      "Tailwind CSS",
    ],
    repoUrl: "https://github.com/ZenzerJs/ResumeForge",
    liveUrl: "https://resumeforge.studio/",
    image: "/projects/resumeforge-studio.png",
    highlights: [
      "Tailors a protected master resume against job descriptions while verifying every bullet claim against Evidence Bank records.",
      "Engineered deterministic job-description parsing and a 100-point ATS evaluation rubric paired with a BYOK AI patch gateway.",
      "Renders instant in-browser PDF previews through Typst WASM alongside clean DOCX and PDF exports.",
      "Maintains automated Vitest unit and Playwright E2E test suites covering SSRF defense, redaction, and private-evidence isolation.",
    ],
    whatIBuilt: [
      "Next.js and React split-pane workspace with real-time client-side Typst WASM compilation.",
      "Protected Master Resume and Evidence Bank relational schema modeled with Prisma and PostgreSQL.",
      "Deterministic requirement-gap analyzer and 100-point ATS scorer paired with a BYOK patch gateway.",
      "Automated Vitest and Playwright security test suites covering SSRF defense, secret redaction, and evidence isolation.",
    ],
  },
  {
    slug: "stock-analyst-agent",
    title: "AI Stock Analyst Agent",
    oneLiner:
      "Full-stack AI research agent synthesizing SEC 10-K/10-Q filings, historical market pricing, and live analyst sentiment into source-backed equity reports.",
    overview:
      "AI Stock Analyst Agent coordinates multi-turn financial tool calls in a cyclical Python LangGraph state graph backed by FastAPI and React. It pre-caches eight quarters of financial statements in SQLite to reduce third-party API latency, routes inference through Groq with automatic Gemini 429 failover, and links every equity claim directly to SEC EDGAR 10-K/10-Q filings and Finnhub data.",
    category: "featured",
    domain: "AI Systems",
    status: "shipped",
    year: "2026",
    metric: "8Q SQLite cache · SEC citations",
    architectureMoat:
      "Stateful LangGraph tool loop with Groq → Gemini 429 failover & server-side BYOK",
    stackSummary: "Python · FastAPI · LangGraph · React",
    tags: [
      "Python",
      "FastAPI",
      "LangGraph",
      "React",
      "JavaScript",
      "Groq API",
      "Gemini API",
      "SQLite",
      "SEC EDGAR",
    ],
    repoUrl: "https://github.com/ZenzerJs/stock-analyst-agent",
    liveUrl: "https://stock-analyst-agent-ashen.vercel.app/",
    image: "/projects/stock-analyst.png",
    highlights: [
      "Stateful LangGraph tool-calling loop coordinating market quotes, 8-quarter fundamentals, analyst consensus, and earnings calendars.",
      "Dual-provider routing prioritizing low-latency Groq inference with automatic Gemini failover on 429 rate limits.",
      "Local SQLite fundamentals cache pre-ingesting quarterly statements to cut repeat third-party API latency.",
      "Direct outbound citations linking generated equity claims to SEC EDGAR 10-K/10-Q filings and Finnhub market data.",
      "Hardened FastAPI service with SlowAPI rate limiting, ticker sanitization, and strictly server-side BYOK credential handling.",
    ],
    whatIBuilt: [
      "Cyclical LangGraph state graph in Python managing multi-turn tool calls and fallback routing.",
      "SQLite caching and batch ingestion service for 8 quarters of historical financial statements.",
      "React research workspace with interactive charts, live quotes, and step-by-step reasoning traces.",
      "Split production deployment with Vercel on the frontend and Railway running the FastAPI backend.",
    ],
  },
  {
    slug: "wc26-travel-mapper",
    title: "WC26 Travel Mapper",
    oneLiner:
      "World Cup 2026 travel planner with multimodal routing, venue POI discovery, and flight search across 16 North American host cities.",
    overview:
      "WC26 Travel Mapper unifies stadium navigation, multimodal transit routing, lodging and dining POI search, and flight comparisons across all 16 World Cup 2026 host cities in the United States, Canada, and Mexico. All Mapbox Directions, Foursquare Places, and flight search requests run through Next.js server route proxies equipped with TTL caching and token-bucket rate limiting.",
    category: "featured",
    domain: "Spatial & ML",
    status: "shipped",
    year: "2026",
    metric: "16 host cities · 3 countries",
    architectureMoat:
      "Proxied Mapbox/Foursquare/Skyscanner routes with server-side caching & rate limiting",
    stackSummary: "Next.js · TypeScript · Mapbox GL JS · Tailwind CSS",
    tags: [
      "Next.js",
      "TypeScript",
      "Mapbox GL JS",
      "Tailwind CSS",
      "Foursquare API",
      "Skyscanner API",
      "Vercel",
    ],
    repoUrl: "https://github.com/ZenzerJs/wc26-travel-mapper",
    liveUrl: "https://wc26-travel-mapper.vercel.app/",
    image: "/projects/wc26-travel-mapper.png",
    highlights: [
      "Mapped all 16 World Cup 2026 host stadiums, cities, and fan zones across the United States, Canada, and Mexico.",
      "Proxied Mapbox Directions, Foursquare Places, and RapidAPI/Skyscanner behind Next.js server routes to shield API keys.",
      "Added server-side TTL caching and token-bucket rate limiting to absorb external quotas under burst traffic.",
      "Combined multimodal transit routes, hotel and dining POI search, flight comparisons, and matchday weather forecasts.",
    ],
    whatIBuilt: [
      "Interactive Mapbox GL JS mapping UI with custom stadium markers and viewport bounds caching.",
      "Next.js server route proxies wrapping Mapbox Directions, Foursquare Places, and flight search endpoints.",
      "In-memory response cache and token-bucket rate limiter protecting upstream API credentials.",
      "Debounced city, venue, and flight search experience deployed on Vercel.",
    ],
  },
  {
    slug: "arcane-hand-casting",
    title: "Arcane Handcasting",
    oneLiner:
      "Browser-based spellcasting arena built with a close friend, driven by webcam hand tracking, MediaPipe Vision WASM landmarks, PixiJS particle shaders, and Matter.js physics.",
    overview:
      "Built collaboratively with a close friend, Arcane Handcasting turns a standard webcam into a real-time spellcasting arena entirely inside the browser. It processes 21-keypoint 3D hand landmarks locally through MediaPipe Vision WASM with temporal smoothing, translating gestures into four PixiJS particle spells and Matter.js rigid-body wave combat without sending video frames to a server.",
    category: "featured",
    domain: "Spatial & ML",
    status: "shipped",
    year: "2026",
    metric: "Client WASM · MediaPipe",
    architectureMoat:
      "In-browser MediaPipe Vision WASM landmarks with PixiJS particle shaders & Matter.js physics",
    stackSummary: "Next.js · TypeScript · MediaPipe WASM · PixiJS",
    tags: [
      "Next.js",
      "TypeScript",
      "MediaPipe WASM",
      "PixiJS",
      "Matter.js",
      "Vitest",
      "WebGL",
    ],
    repoUrl: "https://github.com/ZenzerJs/Arcane-Hand-Casting",
    liveUrl: "https://arcane-hand-casting.vercel.app/",
    image: "/projects/arcane-hand-casting.png",
    diagram: "handcasting-pipeline",
    highlights: [
      "Built with a close friend to run 21-keypoint 3D hand tracking client-side via Google MediaPipe Vision WASM with zero webcam frames sent to a server.",
      "Implemented temporal landmark smoothing and camera calibration routines to remove tracking jitter across lighting conditions.",
      "Designed four gesture-triggered spells (Void Singularity, Storm Weave, Aegis Ward, Ember Grasp) rendered with PixiJS particle effects.",
      "Shipped both a /sandbox debug telemetry view and a /arena wave combat mode backed by Matter.js collision physics.",
    ],
    whatIBuilt: [
      "Gesture recognition state machine translating continuous 3D hand landmarks into discrete spell triggers.",
      "Custom PixiJS particle shaders and Canvas composite renderers.",
      "Wave-based combat arena with Matter.js rigid-body physics, health tracking, and obstacle spawning.",
      "Camera calibration and latency test utilities verified with Vitest.",
    ],
  },
  {
    slug: "omni-architect",
    title: "OmniArchitect",
    oneLiner:
      "Hybrid local-vision and cloud-reasoning pipeline turning UI wireframes and design briefs into structured specifications and starter code.",
    overview:
      "OmniArchitect pairs local multimodal vision with cloud code generation so UI sketches, wireframes, and PDF design briefs can be parsed on-premise via DeepSeek-VL and PyMuPDF. An interactive clarification loop refines ambiguous requirements into typed markdown specifications before streaming starter application code through FastAPI and Next.js under JWT-isolated sessions.",
    category: "featured",
    domain: "AI Systems",
    status: "shipped",
    year: "2026",
    metric: "DeepSeek-VL · LangGraph",
    architectureMoat:
      "On-premise DeepSeek-VL wireframe parsing + stateful clarification loop with JWT sessions",
    stackSummary: "Python · FastAPI · DeepSeek-VL · Next.js",
    tags: [
      "Python",
      "FastAPI",
      "DeepSeek-VL",
      "Groq API",
      "Next.js",
      "PyMuPDF",
      "JWT Auth",
    ],
    repoUrl: "https://github.com/ZenzerJs/Omni-Architect",
    highlights: [
      "Runs DeepSeek-VL locally to parse UI sketches, wireframes, and design screenshots on-premise without uploading assets to third-party APIs.",
      "Guides users through a clarification interview loop that outputs typed markdown specifications and requirement checklists.",
      "Generates full-stack starter code from approved specifications using low-latency Groq inference.",
      "Isolates sessions with JWT authentication and extracts written project briefs through PyMuPDF.",
    ],
    whatIBuilt: [
      "FastAPI backend coordinating local DeepSeek-VL multimodal inference and cloud Groq code generation.",
      "Stateful clarification loop generating structured specification files and implementation checklists.",
      "Next.js web client with real-time token streaming and isolated session history.",
      "JWT authentication middleware and PDF brief ingestion pipeline using PyMuPDF.",
    ],
  },
  {
    slug: "bespoke-creative-showcase",
    title: "Sia Creative Portfolio",
    oneLiner:
      "Interactive client portfolio built with Next.js 15, React 19, GSAP ScrollTrigger timelines, trigonometric orbit motion, and a custom CRT player.",
    overview:
      "Sia Creative Portfolio is a bespoke four-route client showcase engineered with Next.js 15, React 19, GSAP 3 ScrollTrigger, and Lenis smooth scrolling. It features a custom CRT television console with simulated scanlines and channel controls alongside a scroll-linked trigonometric orbit engine that converges case-study thumbnails radially with zero layout shift.",
    category: "featured",
    domain: "Full-Stack",
    status: "shipped",
    year: "2025",
    metric: "Custom CRT console & orbit engine",
    architectureMoat:
      "Scroll-linked trigonometric orbit engine + custom CRT media player with WOFF2/WebP pipeline",
    stackSummary: "Next.js 15 · React 19 · GSAP 3 · Lenis",
    tags: [
      "Next.js 15",
      "React 19",
      "Tailwind CSS",
      "GSAP 3",
      "ScrollTrigger",
      "Lenis",
      "Vercel",
    ],
    repoUrl: "https://github.com/ZenzerJs/Sia-Portfolio",
    liveUrl: "https://shanesia-portfolio.vercel.app/",
    image: "/projects/sia-portfolio.png",
    highlights: [
      "Built an interactive CRT television showcase component with simulated scanlines, physical dial controls, TV Guide drawer, and keyboard navigation.",
      "Engineered a trigonometric orbit engine calculating radial convergence of case-study thumbnails tied to scroll progress.",
      "Choreographed pinned scroll timelines and smooth scrolling with GSAP 3, ScrollTrigger, and Lenis.",
      "Optimized delivery on Vercel using subsetted WOFF2 fonts, WebP imagery, and zero layout shift.",
    ],
    whatIBuilt: [
      "Four-route Next.js 15 App Router web application (Home, About, Work, Contact) with route transitions.",
      "Custom CRT media player supporting channel switching, keyboard shortcuts, and case-study video reels.",
      "Scroll-linked radial orbit layout and modal project decks on the /work route.",
      "Responsive testimonial carousel and zero-dependency CSS marquee.",
    ],
  },
  {
    slug: "ml-stock-simulator",
    title: "ML Stock Simulator",
    oneLiner:
      "Multi-model time-series workbench benchmarking ARIMA, Ridge Regression, and Random Forest across 10 years of walk-forward market backtests.",
    overview:
      "ML Stock Simulator benchmarks ARIMA, Ridge Regression, and Random Forest models across 10 years of historical equity data using rolling moving-average, volatility, and volume-trend features. Strict walk-forward cross-validation prevents look-ahead leakage across folds while reporting comparative MAE and RMSE metrics inside an interactive Next.js and Python workbench.",
    category: "featured",
    domain: "Spatial & ML",
    status: "shipped",
    year: "2025",
    metric: "10-yr walk-forward backtests",
    architectureMoat:
      "Time-respecting walk-forward validation preventing look-ahead leakage across 3 model families",
    stackSummary: "Python · scikit-learn · Next.js · Railway",
    tags: [
      "Python",
      "scikit-learn",
      "PyTorch",
      "Next.js",
      "Railway",
      "Time-Series ML",
    ],
    repoUrl: "https://github.com/ZenzerJs/ML-Stock-Simulator",
    liveUrl: "https://ml-stock-simulator.up.railway.app/",
    image: "/projects/ml-stock-simulator.png",
    highlights: [
      "Engineered rolling moving average, volatility, and volume-trend features across 10 years of historical price series.",
      "Compared ARIMA, Ridge Regression, and Random Forest forecasts side by side with MAE and RMSE metrics.",
      "Enforced strict walk-forward cross-validation so training windows never observe future price data.",
      "Built an interactive scenario explorer for comparing bearish, base, and bullish market horizons.",
    ],
    whatIBuilt: [
      "Python feature-engineering and forecasting pipeline using scikit-learn, statsmodels, and yfinance.",
      "Leakage-free walk-forward backtesting harness reporting MAE and RMSE across rolling folds.",
      "Next.js full-stack interface with real-time ticker lookup and comparative forecast charts.",
      "Containerized Railway deployment with clear educational model disclosures.",
    ],
  },
  {
    slug: "ripple",
    title: "Ripple",
    oneLiner:
      "Reproducible financial ML lab testing whether volatility forecasts improve portfolio decisions after trading costs, with stress testing and an interactive results viewer; supervised ML did not beat simpler baselines in the exploratory backtest.",
    overview:
      "Ripple is a reproducible Python financial ML lab evaluating whether scikit-learn and PyTorch volatility forecasts improve portfolio allocation after transaction costs. Tested across walk-forward splits and stress regimes, the study reports honest empirical results—supervised ML models did not outperform simpler volatility baselines after trading costs—and publishes an interactive results viewer on GitHub Pages.",
    category: "featured",
    domain: "Spatial & ML",
    status: "shipped",
    year: "2026",
    metric: "Financial ML Lab · Live",
    architectureMoat:
      "Walk-forward volatility forecasting & cost-adjusted portfolio stress testing",
    stackSummary: "Python · scikit-learn · PyTorch · GitHub Pages",
    tags: [
      "Python",
      "scikit-learn",
      "PyTorch",
      "Time-Series ML",
      "GitHub Pages",
    ],
    repoUrl: "https://github.com/ZenzerJs/Ripple",
    liveUrl: "https://zenzerjs.github.io/Ripple/",
    image: "/projects/ripple.png",
    diagram: "ripple-pipeline",
    highlights: [
      "Built a reproducible financial ML lab testing whether volatility forecasts improve portfolio allocation decisions after accounting for trading costs.",
      "Benchmarked scikit-learn and PyTorch models against simpler volatility baselines under walk-forward splits and stress-test regimes.",
      "Reported honest empirical findings: supervised ML did not beat simpler baselines in the exploratory backtest.",
      "Published an interactive results viewer on GitHub Pages for inspecting per-regime performance and cost sensitivity.",
    ],
    whatIBuilt: [
      "Reproducible Python feature and walk-forward evaluation pipeline using scikit-learn and PyTorch.",
      "Transaction-cost and stress-testing harness comparing ML signals against baseline estimators.",
      "Interactive static results viewer deployed to GitHub Pages.",
    ],
  },
  {
    slug: "ai-lab",
    title: "Ai-Lab",
    oneLiner:
      "A/B harness for governed vs. baseline AI coding agents with public telemetry and per-task cost, runtime, and quality dashboard; results are task-dependent: structure cut defects on harder tasks and added overhead on simpler ones.",
    overview:
      "Ai-Lab is an A/B evaluation harness that benchmarks governed AI coding agents against baseline runs across controlled software engineering tasks verified by Pytest. It logs per-task token cost, wall-clock runtime, and defect counts into public telemetry datasets, showing that governance structure reduced defects on complex tasks while adding token and runtime overhead on simpler ones.",
    category: "featured",
    domain: "AI Systems",
    status: "shipped",
    year: "2026",
    metric: "Agent A/B Harness · Live",
    architectureMoat:
      "Governed vs. baseline agent A/B harness with per-task cost, runtime & defect telemetry",
    stackSummary: "Python · Pytest · AI Agents · Telemetry",
    tags: ["Python", "Pytest", "AI Agents", "Telemetry", "GitHub Pages"],
    repoUrl: "https://github.com/ZenzerJs/Ai-Lab",
    liveUrl: "https://zenzerjs.github.io/Ai-Lab/",
    image: "/projects/ai-lab.png",
    diagram: "ailab-pipeline",
    highlights: [
      "Designed an A/B evaluation harness comparing governed AI coding agents against baseline agent runs across controlled software tasks.",
      "Captured per-task token cost, wall-clock runtime, and Pytest defect counts into public telemetry datasets.",
      "Observed task-dependent tradeoffs: added structure cut defects on harder tasks while introducing overhead on simpler ones.",
      "Shipped a public dashboard on GitHub Pages to explore task-level outcomes and cost-quality curves.",
    ],
    whatIBuilt: [
      "Python A/B runner orchestrating governed and baseline agent trials with Pytest verification.",
      "Telemetry collector logging per-task cost, runtime, and defect rates.",
      "Public GitHub Pages evaluation dashboard visualizing task-by-task tradeoffs.",
    ],
  },
  {
    slug: "stacktris",
    title: "Stacktris",
    oneLiner:
      "Python CLI generating animated Tetris-style skill boards for GitHub READMEs with custom stack definitions, colour palettes, and drop timing.",
    overview:
      "Stacktris is a zero-dependency Python CLI tool that compiles custom developer skill definitions into animated Tetris-style SVG boards for GitHub profile READMEs. It computes deterministic grid placements and keyframe drop timings with configurable color palettes to output self-contained SVG assets.",
    category: "featured",
    domain: "Full-Stack",
    status: "shipped",
    year: "2026",
    metric: "Python CLI · SVG Boards",
    architectureMoat:
      "Deterministic SVG animation generator with custom stack schemas & drop timing",
    stackSummary: "Python · CLI · SVG · GitHub",
    tags: ["Python", "CLI", "SVG", "GitHub"],
    repoUrl: "https://github.com/ZenzerJs/Stacktris",
    highlights: [
      "Built a Python CLI that compiles custom tech-stack definitions into animated Tetris-style SVG boards for GitHub profile READMEs.",
      "Supports configurable colour palettes, piece layouts, and deterministic drop timing.",
      "Outputs self-contained SVG assets with zero external runtime dependencies.",
    ],
    whatIBuilt: [
      "Python CLI parser and layout engine mapping skill entries onto a Tetris grid.",
      "Animated SVG renderer with customizable palettes and keyframe drop timing.",
    ],
  },
  {
    slug: "scholars-spark",
    title: "Scholars Spark",
    oneLiner:
      "Native iOS application built in Swift and Xcode connecting students with academic scholarships and local learning resources.",
    overview:
      "Scholars Spark is a native iOS prototype built in Swift and Xcode to connect students with academic scholarships and regional educational resources. Developed through weekly test-driven iterations with local persistence and presented to regional education and industry leaders, the project earned official Career Education Council Swift proficiency certification.",
    category: "featured",
    domain: "Full-Stack",
    status: "shipped",
    year: "2024",
    metric: "CEC Swift Certification · iOS",
    architectureMoat:
      "Weekly test-driven Xcode prototypes with local persistence and stakeholder demos",
    stackSummary: "Swift · Xcode · iOS",
    tags: ["Swift", "Xcode", "iOS", "Local Persistence"],
    highlights: [
      "Engineered a working iOS prototype in Swift and Xcode connecting students to academic resources.",
      "Delivered weekly test-driven iterations from mentor feedback, optimizing UI state transitions and local data persistence.",
      "Presented the functional prototype to regional education leaders and industry professionals.",
      "Earned official Career Education Council Swift proficiency certification.",
    ],
    whatIBuilt: [
      "Native Swift iOS application views and navigation flows built in Xcode.",
      "Local persistence layer storing saved scholarships and student resources.",
      "Weekly QA cycles resolving runtime state-transition edge cases ahead of stakeholder demos.",
    ],
  },
  {
    slug: "cp104-intro-programming",
    title: "CP104: Intro to Programming",
    oneLiner:
      "Python coursework covering functions, algorithmic problem solving, string validation, and file I/O across 9 assignments and 11 labs.",
    overview:
      "Completed at Wilfrid Laurier University across 9 assignments and 11 labs, CP104 established modular Python foundations in control flow, string validation, and structured file I/O. Implementations included trial-division prime verification, multi-step ISBN-13 validation, loan amortization schedules, and CSV student-record statistics parsers.",
    category: "coursework",
    domain: "Coursework",
    status: "shipped",
    year: "2025",
    metric: "9 assignments · 11 labs",
    architectureMoat:
      "Core Python algorithms, ISBN-13 validation, and structured CSV file parsing",
    stackSummary: "Python · Algorithms · File I/O",
    tags: ["Python", "Algorithms", "File I/O"],
    bohrUrl: laurierCourses.cp104.bohrUrl,
    calendarUrl: laurierCourses.cp104.calendarUrl,
    highlights: [
      "Completed 9 assignments and 11 labs covering modular Python control flow and file I/O.",
      "Implemented optimized trial-division prime checks and multi-step ISBN-13 format validation.",
      "Built a loan amortization schedule generator and CSV student-record statistics parser.",
    ],
    whatIBuilt: [
      "Modular Python utilities for numeric sequences, sorted-list verification, and string parsing.",
      "File I/O pipelines for reading, validating, and formatting structured text datasets.",
    ],
  },
  {
    slug: "cp164-data-structures",
    title: "CP164: Data Structures & Algorithms",
    oneLiner:
      "Data structures and object-oriented Python coursework covering custom ADTs, comparison operators, and file serialization.",
    overview:
      "Completed at Wilfrid Laurier University, CP164 focused on implementing abstract data types and object-oriented collections in Python from scratch. Coursework covered custom comparison and hashing operator overloading, pipe-delimited record serialization, and multi-criteria search and aggregation utilities.",
    category: "coursework",
    domain: "Coursework",
    status: "shipped",
    year: "2026",
    metric: "Custom ADTs · Python",
    architectureMoat:
      "Custom Python ADTs, operator overloading, and pipe-delimited record serialization",
    stackSummary: "Python · Data Structures · OOP",
    tags: ["Python", "Data Structures", "Algorithms", "OOP"],
    bohrUrl: laurierCourses.cp164.bohrUrl,
    calendarUrl: laurierCourses.cp164.calendarUrl,
    highlights: [
      "Implemented core abstract data types and object-oriented collections from scratch in Python.",
      "Implemented custom Python classes with full comparison, equality, and hashing operator support.",
      "Built pipe-delimited object serialization and multi-criteria collection filtering utilities.",
    ],
    whatIBuilt: [
      "Custom abstract data types and comparison-driven record classes in Python.",
      "File serialization helpers for persistent collection storage.",
      "Multi-criteria search, aggregation, and filtering utilities verified against lab suites.",
    ],
  },
  {
    slug: "cp213-oop",
    title: "CP213: Object-Oriented Programming",
    oneLiner:
      "Java coursework focused on inheritance, polymorphism, encapsulation, interfaces, and object-oriented design patterns.",
    overview:
      "CP213 at Wilfrid Laurier University focuses on strongly typed object-oriented software construction in Java. Lab and assignment implementations emphasize class inheritance hierarchies, interface contracts, polymorphism, encapsulation, and reusable object-oriented design patterns verified against edge-case test suites.",
    category: "coursework",
    domain: "Coursework",
    status: "in-progress",
    year: "2026",
    metric: "In progress · Java OOP",
    architectureMoat:
      "Strongly typed Java class hierarchies, polymorphism, and reusable design patterns",
    stackSummary: "Java · OOP · Design Patterns",
    tags: ["Java", "OOP", "Design Patterns"],
    bohrUrl: laurierCourses.cp213.bohrUrl,
    calendarUrl: laurierCourses.cp213.calendarUrl,
    highlights: [
      "Designing typed class hierarchies using inheritance, interfaces, and polymorphism in Java.",
      "Applying encapsulation and standard object-oriented design patterns across weekly labs.",
    ],
    whatIBuilt: [
      "Modular Java packages with reusable base classes and interface contracts.",
      "Object-oriented assignment implementations tested for edge-case correctness.",
    ],
  },
  {
    slug: "cp363-databases",
    title: "CP363: Database Management Systems",
    oneLiner:
      "Relational database coursework covering entity-relationship modeling, schema normalization, integrity constraints, and SQL querying.",
    overview:
      "CP363 at Wilfrid Laurier University covers relational database architecture from conceptual entity-relationship modeling to normalized schema enforcement. Coursework includes designing referential integrity constraints and writing multi-table SQL joins, views, subqueries, and analytical aggregations.",
    category: "coursework",
    domain: "Coursework",
    status: "shipped",
    year: "2026",
    metric: "SQL · Relational Design",
    architectureMoat:
      "Normalized relational schemas, ER modeling, and multi-table SQL aggregation queries",
    stackSummary: "SQL · Relational Design · Normalization",
    tags: ["SQL", "Database Design", "Normalization"],
    bohrUrl: laurierCourses.cp363.bohrUrl,
    calendarUrl: laurierCourses.cp363.calendarUrl,
    highlights: [
      "Modeling entity-relationship diagrams and translating them into normalized relational schemas.",
      "Writing complex SQL queries using multi-table joins, aggregations, views, and subqueries.",
      "Enforcing referential integrity constraints and normal forms across database designs.",
    ],
    whatIBuilt: [
      "Normalized relational schema specifications for structured domain datasets.",
      "SQL query suites for reporting, multi-table joins, and constraint verification.",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getHomepageProjects(): Project[] {
  return HOMEPAGE_SLUGS.map((slug) =>
    projects.find((p) => p.slug === slug),
  ).filter((p): p is Project => p !== undefined);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const current = getProjectBySlug(slug);
  if (!current) {
    return { prev: null, next: null };
  }
  const pool = projects.filter((p) => p.category === current.category);
  const index = pool.findIndex((p) => p.slug === slug);
  if (index === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: index > 0 ? pool[index - 1] : null,
    next: index < pool.length - 1 ? pool[index + 1] : null,
  };
}
