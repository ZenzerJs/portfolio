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
  role: "IT Operations · CS @ Laurier",
  location: "Greater Toronto Area",
  availability: "Open to Fall 2026 / Winter 2027 co-op",
  tagline:
    "Building AI agents, ML pipelines, and full-stack products — turning hard technical problems into tools people can actually use.",
  intro:
    "IT Operations at Trillium Health Partners. Second-year CS student at Laurier shipping AI agents, full-stack apps, and ML tools with Python, TypeScript, and React Native.",
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
  { id: "works", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export const heroMarqueeItems = [
  "Jayden Saha",
  "AI Agents",
  "Full-Stack",
  "Machine Learning",
  "Python",
  "Java",
  "SQL",
  "TypeScript",
  "React Native",
];

export const aboutContent = {
  blocks: [
    {
      label: "About Me",
      body: "I'm Jayden — a second-year Computer Science student at Laurier with a Business Management option, currently working in IT Operations at Trillium Health Partners.",
    },
    {
      label: "Why I Build",
      body: "I like systems that do something real: forecasting models that teach, agents that coordinate, apps that ship. I iterate fast, document what I learn, and care about code I can walk through in an interview.",
    },
    {
      label: "Right Now",
      body: "Balancing enterprise IT ops while actively taking CP213 (OOP) and CP363 (Databases, early enrollment), plus side projects in ML and multi-agent AI. Open to Fall 2026 / Winter 2027 co-op opportunities.",
    },
  ],
  highlights: [
    { label: "Based in", value: "Greater Toronto Area" },
    { label: "Studying", value: "2nd year CS @ Laurier" },
    { label: "Working", value: "IT Ops @ THP" },
    { label: "Stack", value: "Python · TS · React Native" },
  ],
  interests: [
    "Machine Learning",
    "AI Agents",
    "Mobile Dev",
    "Web Design",
    "Open Source",
    "Problem Solving",
  ],
};

export const experiences = [
  {
    period: "2026 — Present",
    company: "Trillium Health Partners",
    location: "Mississauga, ON",
    role: "IT Operations",
    description:
      "Supporting enterprise IT in a hospital network — troubleshooting systems, coordinating infrastructure work, and keeping clinical and corporate technology reliable.",
    bullets: [
      "Enterprise IT support with Active Directory, VMware, and Veeam",
      "Infrastructure tracking and documentation via Sunbird dcTrack",
      "Incident response, systems troubleshooting, and cross-team coordination",
    ],
  },
  {
    period: "2024",
    company: "Career Education Council",
    location: "Guelph, ON",
    role: "Swift Development Intern",
    description:
      "Built Scholar's Spark — an iOS app connecting students with academic opportunities — through weekly prototypes and stakeholder feedback cycles.",
    bullets: [
      "iOS prototyping in Swift & Xcode",
      "Weekly deliverables & QA cycles",
      "Earned CEC Swift Certification",
    ],
  },
];

export const educationEntries = [
  {
    school: "Wilfrid Laurier University",
    shortName: "Laurier",
    country: "Waterloo, ON",
    degree: "Honours BSc — Computer Science, Business Management Option",
    yearRange: "2024 – 2030",
    highlights: [
      "Second-year CS student — CP104 (98%) and CP164 (99%) in foundational courses",
      "Actively taking CP213 (OOP) and CP363 (Databases, early enrollment)",
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
        label: "Databases (early)",
        status: "in-progress",
        bohrUrl: laurierCourses.cp363.bohrUrl,
        calendarUrl: laurierCourses.cp363.calendarUrl,
      },
    ] satisfies CourseworkEntry[],
  },
];

export const skillGroups = [
  {
    title: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "HTML", "CSS", "Swift"],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      "React / Next.js",
      "React Native",
      "PyTorch",
      "LangChain",
      "LangGraph",
      "Tailwind CSS",
    ],
  },
  {
    title: "Tools & Concepts",
    skills: [
      "Git & GitHub",
      "Vercel",
      "Groq API",
      "Firebase",
      "Machine Learning",
      "AI Agents",
      "Full-Stack Development",
    ],
  },
  {
    title: "IT & Infrastructure",
    skills: [
      "Active Directory",
      "VMware",
      "Veeam",
      "Sunbird dcTrack",
      "Incident Response",
      "Systems Documentation",
    ],
  },
];

export const heroFocus = [
  "AI Agents",
  "Full-Stack",
  "Machine Learning",
  "Python",
  "Java",
  "SQL",
  "TypeScript",
  "React Native",
];
