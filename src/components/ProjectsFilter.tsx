"use client";

import { useState } from "react";
import type { Project, ProjectCategory } from "@/content/projects";
import { ProjectGrid } from "@/components/ProjectGrid";

type Filter = "all" | ProjectCategory;

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "featured", label: "Featured" },
  { value: "coursework", label: "Coursework" },
];

interface ProjectsFilterProps {
  projects: Project[];
}

export function ProjectsFilter({ projects }: ProjectsFilterProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter projects by category"
      >
        {filters.map(({ value, label }) => {
          const isActive = filter === value;
          const count =
            value === "all"
              ? projects.length
              : projects.filter((p) => p.category === value).length;

          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(value)}
              className={`chip transition-all ${
                isActive ? "chip--teal border-[var(--accent)] text-accent" : ""
              }`}
            >
              {label}
              <span className="ml-1.5 opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      {filtered.length > 0 ? (
        <ProjectGrid projects={filtered} />
      ) : (
        <p className="text-center text-muted">No projects in this category.</p>
      )}
    </>
  );
}
