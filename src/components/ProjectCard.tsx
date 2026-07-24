"use client";

import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "motion/react";
import type { Project } from "@/content/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusLabel = {
    shipped: "Shipped",
    "in-progress": "In progress",
    comingSoon: "Coming soon",
  }[project.status];

  return (
    <motion.article
      className="glass-card group relative p-6"
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="absolute inset-0 z-0 rounded-[inherit]"
        aria-label={`View ${project.title}`}
      />

      <div className="relative z-10 mb-4 flex items-start justify-between gap-3">
        <span className="chip text-accent">{statusLabel}</span>
        <div className="pointer-events-auto flex items-center gap-1">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 inline-flex min-h-11 min-w-11 items-center justify-center text-muted transition-colors hover:text-accent"
              aria-label={`${project.title} repository`}
            >
              <Github size={16} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 inline-flex min-h-11 min-w-11 items-center justify-center text-muted transition-colors hover:text-accent"
              aria-label={`${project.title} live demo`}
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      <div className="relative z-10 pointer-events-none">
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
    </motion.article>
  );
}
