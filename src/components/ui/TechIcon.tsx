import {
  Activity,
  Code2,
  Cpu,
  Database,
  Layers,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import type { SimpleIcon } from "simple-icons";
import {
  siCodemirror,
  siDocker,
  siFastapi,
  siFramer,
  siGit,
  siGithub,
  siGithubactions,
  siHtml5,
  siJavascript,
  siLangchain,
  siLinux,
  siMapbox,
  siMediapipe,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siOllama,
  siOpencv,
  siPostgresql,
  siPrisma,
  siPytest,
  siPython,
  siPytorch,
  siRadixui,
  siRailway,
  siReact,
  siScikitlearn,
  siSqlite,
  siSwift,
  siTailwindcss,
  siThreedotjs,
  siTypescript,
  siTypst,
  siVercel,
  siVitest,
  siVmware,
  siWebgl,
  siZod,
} from "simple-icons";

export interface TechIconInfo {
  matched: boolean;
  slug?: string;
  path?: string;
  color: string;
}

const ICON_MAP: Record<string, SimpleIcon> = {
  typescript: siTypescript,
  ts: siTypescript,
  python: siPython,
  javascript: siJavascript,
  js: siJavascript,
  swift: siSwift,
  "next.js": siNextdotjs,
  nextjs: siNextdotjs,
  "next.js 15": siNextdotjs,
  "next.js 16": siNextdotjs,
  react: siReact,
  "react 19": siReact,
  fastapi: siFastapi,
  "tailwind css": siTailwindcss,
  tailwindcss: siTailwindcss,
  tailwind: siTailwindcss,
  "radix ui": siRadixui,
  radix: siRadixui,
  framer: siFramer,
  "framer motion": siFramer,
  motion: siFramer,
  zod: siZod,
  mapbox: siMapbox,
  "mapbox gl js": siMapbox,
  webgl: siWebgl,
  codemirror: siCodemirror,
  "codemirror 6": siCodemirror,
  typst: siTypst,
  "typst wasm": siTypst,
  prisma: siPrisma,
  sqlite: siSqlite,
  postgresql: siPostgresql,
  postgres: siPostgresql,
  n8n: siN8n,
  vitest: siVitest,
  docker: siDocker,
  git: siGit,
  github: siGithub,
  "github pages": siGithub,
  "github actions": siGithubactions,
  vercel: siVercel,
  railway: siRailway,
  pytorch: siPytorch,
  "scikit-learn": siScikitlearn,
  sklearn: siScikitlearn,
  ollama: siOllama,
  langchain: siLangchain,
  langgraph: siLangchain,
  mediapipe: siMediapipe,
  "mediapipe vision": siMediapipe,
  "mediapipe wasm": siMediapipe,
  opencv: siOpencv,
  linux: siLinux,
  vmware: siVmware,
  pytest: siPytest,
  html5: siHtml5,
  "html/css": siHtml5,
  html: siHtml5,
  "node.js": siNodedotjs,
  nodejs: siNodedotjs,
  "three.js": siThreedotjs,
  threejs: siThreedotjs,
};

function getSafeDarkSkyColor(hex: string): string {
  const clean = hex.replace(/^#/, "");
  if (clean.length !== 6) return "#e2e8f0";
  const r = Number.parseInt(clean.slice(0, 2), 16);
  const g = Number.parseInt(clean.slice(2, 4), 16);
  const b = Number.parseInt(clean.slice(4, 6), 16);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance < 90 ? "#e2e8f0" : `#${clean}`;
}

export function getTechIconInfo(name: string): TechIconInfo {
  const normalized = name.trim().toLowerCase();
  const icon = ICON_MAP[normalized];
  if (!icon) {
    return { matched: false, color: "#e2e8f0" };
  }
  return {
    matched: true,
    slug: icon.slug,
    path: icon.path,
    color: getSafeDarkSkyColor(icon.hex),
  };
}

function renderFallbackIcon(
  name: string,
  size: number,
  className: string,
): React.JSX.Element {
  const n = name.trim().toLowerCase();
  const iconClass = `shrink-0 text-accent/85 ${className}`.trim();
  const props = { size, "aria-hidden": true as const, className: iconClass };

  if (/(active directory|rbac|security|auth)/.test(n)) {
    return <ShieldCheck {...props} />;
  }
  if (/(sql|database|backup|veeam)/.test(n)) {
    return <Database {...props} />;
  }
  if (/(server|dctrack|power iq|data center|infra)/.test(n)) {
    return <Server {...props} />;
  }
  if (/(llm|ai|groq|agent|inference)/.test(n)) {
    return <Sparkles {...props} />;
  }
  if (/(telemetry|time-series|ml|analytics)/.test(n)) {
    return <Activity {...props} />;
  }
  if (/(cli|api|rest|playwright|terminal)/.test(n)) {
    return <Terminal {...props} />;
  }
  if (/(cpu|hardware|wasm)/.test(n)) {
    return <Cpu {...props} />;
  }
  if (/(java|svg|code)/.test(n)) {
    return <Code2 {...props} />;
  }
  return <Layers {...props} />;
}

export function TechIcon({
  name,
  size = 14,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}): React.JSX.Element {
  const info = getTechIconInfo(name);

  if (info.matched && info.path) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={info.color}
        aria-hidden="true"
        className={`shrink-0 ${className}`.trim()}
      >
        <path d={info.path} />
      </svg>
    );
  }

  return renderFallbackIcon(name, size, className);
}
