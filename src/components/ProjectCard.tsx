"use client";

import { useRouter } from "next/navigation";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/content/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();

  const statusLabel = {
    shipped: "Shipped",
    "in-progress": "In progress",
    comingSoon: "Coming soon",
  }[project.status];

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
      className="glass-card group cursor-pointer p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="chip text-accent">{statusLabel}</span>
        <div className="flex items-center gap-2">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-muted transition-colors hover:text-accent"
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
              className="text-muted transition-colors hover:text-accent"
              aria-label="Live demo"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      <h3 className="display-heading text-2xl transition-colors group-hover:text-accent sm:text-[1.65rem]">
        {project.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{project.oneLiner}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="chip">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
