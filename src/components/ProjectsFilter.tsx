"use client";

import { useState } from "react";
import type { Project, ProjectDomain } from "@/content/projects";
import { ProjectGrid } from "@/components/ProjectGrid";

type Filter = "all" | ProjectDomain;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "AI Systems", label: "AI Systems" },
  { value: "Full-Stack", label: "Full-Stack" },
  { value: "Spatial & ML", label: "Spatial & ML" },
  { value: "Coursework", label: "Coursework" },
];

interface ProjectsFilterProps {
  projects: Project[];
}

export function ProjectsFilter({ projects }: ProjectsFilterProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.domain === filter);

  return (
    <>
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects by domain"
      >
        {filters.map(({ value, label }) => {
          const isActive = filter === value;
          const count =
            value === "all"
              ? projects.length
              : projects.filter((p) => p.domain === value).length;

          return (
            <button
              key={value}
              type="button"
              aria-pressed={isActive}
              onClick={() => setFilter(value)}
              className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-200 ${
                isActive
                  ? "border-accent/45 bg-accent/15 text-accent shadow-[inset_0_1px_0_rgba(94,234,212,0.22)]"
                  : "border-white/10 bg-white/[0.03] text-muted hover:border-white/20 hover:bg-white/[0.06] hover:text-foreground"
              }`}
            >
              <span>{label}</span>
              <span className="font-mono text-[13px] tabular-nums opacity-80">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length > 0 ? (
        <ProjectGrid projects={filtered} />
      ) : (
        <div className="editorial-surface p-8 text-center">
          <p className="text-base text-muted">
            No projects match the selected filter.
          </p>
          <button
            type="button"
            onClick={() => setFilter("all")}
            className="btn-secondary mt-4"
          >
            Reset filter
          </button>
        </div>
      )}
    </>
  );
}
