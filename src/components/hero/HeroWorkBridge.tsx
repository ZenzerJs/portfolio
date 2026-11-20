"use client";

import { ArrowDown } from "lucide-react";
import { scrollToTarget } from "@/components/boreal/SmoothScrollProvider";
import { TechIcon } from "@/components/ui/TechIcon";

const CORE_STACK = [
  "Next.js",
  "TypeScript",
  "Python",
  "React",
  "PostgreSQL",
  "Prisma",
  "FastAPI",
  "Ollama",
] as const;

export function HeroWorkBridge() {
  const handleJumpToWork = () => {
    scrollToTarget("#work", { offset: -16 });
    window.history.replaceState(null, "", "#work");
  };

  return (
    <div className="relative z-20 -mt-12 pb-2 sm:-mt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 sm:h-28"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,11,18,0.88) 0%, rgba(8,11,18,0.44) 55%, rgba(8,11,18,0) 100%)",
        }}
      />

      <div className="page-container relative z-10">
        <div className="relative overflow-hidden rounded-xl border border-border bg-[#0b1222]/84 px-4 py-3.5 backdrop-blur-md sm:px-5 sm:py-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent/60 to-violet/55"
          />

          <button
            type="button"
            onClick={handleJumpToWork}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 font-mono text-[13px] text-soft transition-colors hover:text-accent"
          >
            <ArrowDown size={14} aria-hidden="true" className="text-accent" />
            <span>Cabin clearing → Shipped work</span>
          </button>

          <ul
            aria-label="Core engineering stack"
            className="mt-2.5 flex flex-wrap gap-2"
          >
            {CORE_STACK.map((tech) => (
              <li
                key={tech}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface/65 px-2.5 py-1 text-[13px] font-medium text-soft"
              >
                <TechIcon name={tech} size={14} />
                <span>{tech}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
