"use client";

import { useRouter } from "next/navigation";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/content/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();

  const tierBadge = {
    spotlight: { label: "Spotlight", className: "bg-primary/20 text-primary" },
    standard: {
      label: "Standard",
      className: "bg-secondary text-secondary-foreground",
    },
    comingSoon: {
      label: "Coming Soon",
      className: "bg-muted text-muted-foreground",
    },
  }[project.showcaseTier];

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => router.push(`/projects/${project.slug}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(`/projects/${project.slug}`);
        }
      }}
      className="block group cursor-pointer rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 h-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
    >
      {/* Header: tier badge + links */}
      <div className="flex items-start justify-between mb-4">
        <span
          className={`px-2.5 py-1 text-xs font-medium rounded-full ${tierBadge.className}`}
        >
          {tierBadge.label}
        </span>

        <div className="flex items-center gap-2">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Repository"
            >
              <Github size={16} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Live demo"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Title + description */}
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {project.oneLiner}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
