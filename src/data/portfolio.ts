import { laurierCourses } from "@/data/courses";

export type Experience = {
  period: string;
  company: string;
  location: string;
  role: string;
  description: string;
  bullets: string[];
};

export type CourseworkEntry = {
  code: string;
  label: string;
  status: "completed" | "in-progress";
  bohrUrl?: string;
  calendarUrl?: string;
};

export const profile = {
  name: "Jayden Saha",
  shortRole: "CS Student · Full-Stack & AI Systems",
  role: "Computer Science Student @ Wilfrid Laurier University · Full-Stack & AI Systems",
  location: "Waterloo / GTA, ON",
  shortAvailability: "Open · Summer 2027",
  availability: "Open to Summer 2027 SWE, Data & Finance Internships",
  tagline:
    "Building local-first AI tools, multi-agent research systems, and full-stack web apps.",
  intro:
    "Honours Computer Science undergraduate at Wilfrid Laurier University. Previously completed a Software Development Co-op in IT Operations at Trillium Health Partners, where I built an internal clinical license portal and on-premises Ollama assistant.",
  email: "jayden.saha.dev@gmail.com",
  available: true,
  proofPoints: [
    { value: "1,000+", label: "Clinical licenses managed on-prem at THP" },
    { value: "8 Live", label: "Public deployed web apps & ML labs" },
    { value: "12 Shipped", label: "AI tools, full-stack web apps, and ML labs" },
  ] satisfies Array<{ value: string; label: string }>,
};

export const links = {
  github: "https://github.com/ZenzerJs",
  linkedin: "https://www.linkedin.com/in/jayden-saha/",
  resume: "/resume.pdf",
};

export const navSections = [
  { id: "top", label: "Overview" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export const aboutContent = {
  summary:
    "I build software that holds up under real operational constraints: strict privacy boundaries, verifiable AI outputs, and deterministic test suites. Most of my work sits at the intersection of full-stack web engineering, local LLM inference, and workflow automation.",
  focus:
    "Following my Software Development Co-op at Trillium Health Partners, I am focused on ResumeForge (resumeforge.studio) with PostgreSQL and client-side Typst WASM compilation, alongside Ripple (financial ML lab) and Ai-Lab (agent A/B evaluation).",
  facts: [
    { label: "Base", value: "Waterloo & Greater Toronto Area, ON" },
    { label: "Degree", value: "Honours BSc Computer Science · Expected 2030 (with co-op)" },
    { label: "Recent Role", value: "Student – IT Operations (Software Development Co-op) @ Trillium Health Partners" },
    { label: "Primary Stack", value: "TypeScript · Python · Next.js · PostgreSQL · FastAPI" },
  ],
};

export const experiences: Experience[] = [
  {
    period: "May 2026 – Aug. 2026",
    company: "Trillium Health Partners",
    location: "Mississauga, ON",
    role: "Student – IT Operations (Software Development Co-op)",
    description:
      "Built an internal clinical license operations portal and on-premises Ollama assistant while supporting enterprise data-center operations.",
    bullets: [
      "Designed and deployed an internal clinical license operations portal in Next.js, TypeScript, and Prisma, replacing spreadsheet tracking for 1,000+ software licenses with live capacity tracking, assignment workflows, and an Action Queue.",
      "Implemented request and lifecycle workflows with isolated staff/learner pools, role-based access control (RBAC), idempotent n8n intake with Active Directory validation, and append-only audit logging.",
      "Engineered an on-premises assistant using 4-bit quantized local models through Ollama with context-window management and live inventory grounding to preserve data privacy, verified with Vitest and Playwright test suites.",
      "Maintained Sunbird dcTrack and Power IQ infrastructure documentation while supporting enterprise backups, server maintenance, and data-center operations.",
    ],
  },
  {
    period: "Feb. 2024 – June 2024",
    company: "Career Education Council",
    location: "Remote",
    role: "App Developer",
    description:
      "Developed an iOS academic resource app in Swift and Xcode through mentored weekly sprints.",
    bullets: [
      "Built Scholars Spark in Swift and Xcode to connect students with scholarships and regional learning resources, then demoed the working prototype to industry professionals.",
      "Delivered weekly test-driven iterations based on mentor feedback, optimizing UI state transitions and local data persistence, and earned Swift proficiency certification.",
    ],
  },
  {
    period: "Mar. 2022 – Present",
    company: "Volunteering MBC",
    location: "Mississauga, ON",
    role: "SAVVY Volunteer & Community Lead",
    description:
      "Facilitated biweekly cross-generational community sessions and coordinated regional volunteer events across Peel Region.",
    bullets: [
      "Facilitated structured intergenerational workshops and community engagement initiatives across Peel Region.",
      "Collaborated with regional coordinators on volunteer recruitment, onboarding, and event logistics.",
    ],
  },
];

export const educationEntries = [
  {
    school: "Wilfrid Laurier University",
    country: "Waterloo, ON, Canada",
    degree: "Honours BSc — Computer Science",
    yearRange: "2025 – Expected 2030",
    highlights: [
      "Second-year Honours Computer Science student (started September 2025), planning a Mathematics Minor and Big Data Systems concentration (not yet formally declared).",
      "Completed core coursework in Python programming (CP104), data structures & algorithms (CP164), relational databases & SQL (CP363), linear algebra (MA122), and calculus (MA103).",
      "Currently completing Java object-oriented programming (CP213) while preparing for Summer 2027 co-op terms.",
      "Participant in the University of Waterloo Euclid Mathematics Contest.",
    ],
    coursework: [
      {
        code: "CP104",
        label: laurierCourses.cp104.label,
        status: "completed",
        bohrUrl: laurierCourses.cp104.bohrUrl,
        calendarUrl: laurierCourses.cp104.calendarUrl,
      },
      {
        code: "CP164",
        label: "Data Structures & Algorithms",
        status: "completed",
        bohrUrl: laurierCourses.cp164.bohrUrl,
        calendarUrl: laurierCourses.cp164.calendarUrl,
      },
      {
        code: "CP213",
        label: "Object-Oriented Programming (Java)",
        status: "in-progress",
        bohrUrl: laurierCourses.cp213.bohrUrl,
        calendarUrl: laurierCourses.cp213.calendarUrl,
      },
      {
        code: "CP363",
        label: "Database Management Systems (SQL)",
        status: "completed",
        bohrUrl: laurierCourses.cp363.bohrUrl,
        calendarUrl: laurierCourses.cp363.calendarUrl,
      },
      {
        code: "MA122",
        label: "Linear Algebra",
        status: "completed",
      },
      {
        code: "MA103",
        label: "Calculus II",
        status: "completed",
      },
    ] satisfies CourseworkEntry[],
  },
];

export const skillGroups = [
  {
    title: "AI & LLM Systems",
    skills: [
      "LangGraph",
      "LangChain",
      "Ollama",
      "PyTorch",
      "scikit-learn",
      "Groq API",
      "MediaPipe Vision",
    ],
  },
  {
    title: "Languages & Frameworks",
    skills: [
      "TypeScript",
      "Python",
      "JavaScript",
      "Java",
      "Swift",
      "SQL",
      "Next.js",
      "React",
      "FastAPI",
      "Tailwind CSS",
      "Mapbox GL JS",
      "Typst",
    ],
  },
  {
    title: "Backend, Testing & Tooling",
    skills: [
      "PostgreSQL",
      "SQLite",
      "Prisma",
      "n8n",
      "Playwright",
      "Vitest",
      "Docker",
      "Git",
      "GitHub Actions",
      "Vercel",
    ],
  },
  {
    title: "Enterprise Infrastructure & IT",
    skills: [
      "Active Directory",
      "RBAC",
      "Linux",
      "Sunbird dcTrack",
      "Power IQ",
      "VMware",
      "Veeam Backup",
    ],
  },
];
