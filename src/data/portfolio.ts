import { laurierCourses } from "@/data/courses";

export type CourseworkEntry = {
  code: string;
  label: string;
  status: "completed" | "in-progress";
  grade?: string;
  bohrUrl?: string;
  calendarUrl?: string;
};

export const profile = {
  name: "Jayden Saha",
  role: "Full-Stack Software & AI Systems Engineer · IT Operations @ THP",
  location: "Greater Toronto Area, ON, Canada",
  availability: "Open to Fall 2026 / Winter 2027 SWE & AI Roles",
  tagline:
    "Engineering autonomous multi-agent pipelines, privacy-first enterprise automations, and high-craft web applications.",
  intro:
    "Computer Science & Management student at Wilfrid Laurier University with enterprise IT experience at Trillium Health Partners. Focused on stateful LangGraph orchestrations, on-prem local LLMs, and high-performance Next.js architectures.",
  email: "Jaydensaha@yahoo.com",
  available: true,
};

export const links = {
  github: "https://github.com/ZenzerJs",
  linkedin: "https://www.linkedin.com/in/jayden-saha/",
  resume: "/resume.pdf",
};

export const navSections = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "systems", label: "Architecture" },
  { id: "works", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export const heroMarqueeItems = [
  "Jayden Saha",
  "Multi-Agent AI",
  "LangGraph",
  "Next.js",
  "TypeScript",
  "Python",
  "FastAPI",
  "Local LLMs & n8n",
  "PyTorch",
  "Java",
  "SQL",
];

export const aboutContent = {
  blocks: [
    {
      label: "About Me",
      body: "I'm Jayden — an undergraduate Computer Science student at Wilfrid Laurier University (Management Option), working in IT Operations at Trillium Health Partners. I build scalable software, autonomous multi-agent graphs, and privacy-first automation tools.",
    },
    {
      label: "Why I Build",
      body: "I enjoy engineering end-to-end systems that solve real operational friction: multi-agent pipelines that decompose complex reasoning, on-prem clinical trackers with local LLMs, and high-craft web applications with sub-second performance.",
    },
    {
      label: "Current Focus",
      body: "Building stateful agent graphs with LangGraph, deploying privacy-first AI workflows in healthcare infrastructure, and completing second-year coursework in OOP (Java) and Database Systems (SQL). Open to Fall 2026 / Winter 2027 software engineering opportunities.",
    },
  ],
  highlights: [
    { label: "Location", value: "Greater Toronto Area (Mississauga / Brampton)" },
    { label: "Education", value: "BSc Computer Science @ Laurier (2nd Year)" },
    { label: "Experience", value: "IT Operations & Automation @ THP" },
    { label: "Core Stack", value: "Python · LangGraph · TypeScript · Next.js · FastAPI" },
  ],
  interests: [
    "Multi-Agent AI Systems",
    "Privacy-First Local LLMs",
    "Full-Stack Web Architecture",
    "Reinforcement Learning",
    "Developer Tooling & Compilers",
    "Geospatial & Financial ML",
  ],
};

export const experiences = [
  {
    period: "May 2026 — Present",
    company: "Trillium Health Partners",
    location: "Mississauga, ON",
    role: "IT Operations & Clinical Systems Automation",
    description:
      "Supporting enterprise hospital network infrastructure while architecting an on-premise clinical license management tool using local LLMs and n8n event-driven automation.",
    bullets: [
      "Engineered a privacy-first, locally-hosted clinical license tracker pairing local LLMs (Ollama / llama.cpp) and n8n to automate validation workflows without external cloud APIs",
      "Maintained data-center hardware infrastructure, rack documentation, and asset lifecycles utilizing Sunbird dcTrack and Power IQ",
      "Provided enterprise IT support across Active Directory, VMware virtual environments, and clinical systems",
    ],
  },
  {
    period: "Jan 2024 — Jun 2024",
    company: "Career Education Council",
    location: "Guelph, ON",
    role: "iOS Application Development Intern",
    description:
      "Engineered Scholar's Spark — a native iOS application connecting students with academic opportunities — through weekly iterative prototypes in Swift and Xcode.",
    bullets: [
      "Developed functional Swift prototypes in Xcode following Apple Human Interface Guidelines",
      "Facilitated weekly stakeholder design reviews and conducted QA testing to eliminate logic errors prior to release",
      "Earned official CEC Swift Development Certification upon presenting the project to regional leaders",
    ],
  },
  {
    period: "Mar 2022 — Present",
    company: "Volunteering MBC",
    location: "Mississauga, ON",
    role: "SAVVY Volunteer & Community Lead",
    description:
      "Facilitated biweekly cross-generational community sessions and coordinated regional volunteer events across Peel Region.",
    bullets: [
      "Facilitated structured intergenerational workshops and community engagement initiatives",
      "Collaborated with regional coordinators to support volunteer recruitment and event planning",
    ],
  },
];

export const educationEntries = [
  {
    school: "Wilfrid Laurier University",
    shortName: "Laurier",
    country: "Waterloo, ON, Canada",
    degree: "Honours BSc — Computer Science, Business Management Option",
    yearRange: "2024 – 2028",
    highlights: [
      "Second-year Computer Science undergraduate — completed CP104 (98%) and CP164 (99%) with high distinction",
      "Accelerated enrollment: Taking CP213 (OOP in Java) and CP363 (Databases in SQL)",
      "Participant in University of Waterloo Euclid Mathematics Contest",
    ],
    coursework: [
      {
        code: "CP104",
        label: laurierCourses.cp104.label,
        status: "completed",
        grade: "98%",
        bohrUrl: laurierCourses.cp104.bohrUrl,
        calendarUrl: laurierCourses.cp104.calendarUrl,
      },
      {
        code: "CP164",
        label: laurierCourses.cp164.label,
        status: "completed",
        grade: "99%",
        bohrUrl: laurierCourses.cp164.bohrUrl,
        calendarUrl: laurierCourses.cp164.calendarUrl,
      },
      {
        code: "CP213",
        label: laurierCourses.cp213.label,
        status: "in-progress",
        bohrUrl: laurierCourses.cp213.bohrUrl,
        calendarUrl: laurierCourses.cp213.calendarUrl,
      },
      {
        code: "CP363",
        label: "Databases (Early Enrollment)",
        status: "in-progress",
        bohrUrl: laurierCourses.cp363.bohrUrl,
        calendarUrl: laurierCourses.cp363.calendarUrl,
      },
    ] satisfies CourseworkEntry[],
  },
];

export const skillGroups = [
  {
    title: "AI & Machine Learning",
    skills: [
      "LangGraph",
      "LangChain",
      "LangSmith",
      "Local LLMs (Ollama/llama.cpp)",
      "PyTorch",
      "scikit-learn",
      "Groq LPU API",
      "Reinforcement Learning",
      "Computer Vision (MediaPipe)",
    ],
  },
  {
    title: "Languages & Frameworks",
    skills: [
      "Python",
      "TypeScript",
      "JavaScript",
      "Next.js 14/15",
      "React",
      "FastAPI",
      "Java",
      "SQL",
      "Swift",
      "Tailwind CSS",
      "Typst",
    ],
  },
  {
    title: "Backend & Systems Tooling",
    skills: [
      "n8n Automation",
      "Prisma ORM",
      "PostgreSQL / SQLite",
      "Docker",
      "Git & GitHub",
      "Vercel",
      "Railway",
      "REST APIs",
      "Mapbox GL JS",
    ],
  },
  {
    title: "Enterprise Infrastructure & IT",
    skills: [
      "Sunbird dcTrack",
      "Power IQ",
      "Active Directory",
      "VMware",
      "Veeam Backup",
      "Data Center Operations",
      "Incident Response",
    ],
  },
];

export const heroFocus = [
  "Multi-Agent AI",
  "LangGraph",
  "Next.js",
  "TypeScript",
  "Python",
  "FastAPI",
  "Local LLMs & n8n",
  "PyTorch",
  "SQL",
];
