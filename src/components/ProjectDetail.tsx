"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/content/projects";
import { DemoModule } from "@/components/DemoModule";
import { Footer } from "@/components/layout/Footer";
import { GradientBackground } from "@/components/layout/GradientBackground";
import { SidebarNav } from "@/components/layout/SidebarNav";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const statusLabel = {
    shipped: "Shipped",
    "in-progress": "In progress",
    comingSoon: "Coming soon",
  }[project.status];

  const showcaseTierLabel = {
    spotlight: "Spotlight",
    standard: "Featured",
    comingSoon: "Coming soon",
  }[project.showcaseTier];

  return (
    <div className="site-page">
      <GradientBackground interactive={false} />
      <SidebarNav />

      <main className="site-main min-h-screen pb-16 pt-24 lg:pt-10">
        <div className="page-container max-w-3xl">
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>

          <div className="mb-4 flex flex-wrap gap-2">
            <span className="chip text-accent">{statusLabel}</span>
            {project.showcaseTier !== "standard" ? (
              <span className="chip">{showcaseTierLabel}</span>
            ) : null}
          </div>

          <h1 className="display-heading text-4xl sm:text-5xl">{project.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{project.oneLiner}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Github size={16} />
                Repository
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <ExternalLink size={16} />
                Live demo
              </a>
            )}
            {project.bohrUrl && (
              <a
                href={project.bohrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <ExternalLink size={16} />
                Bohr course page
              </a>
            )}
            {project.calendarUrl && (
              <a
                href={project.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <ExternalLink size={16} />
                Laurier calendar
              </a>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>

          {project.showcaseTier === "spotlight" && project.embed && (
            <div className="glass-card mt-10 overflow-hidden p-4">
              <DemoModule embed={project.embed} />
            </div>
          )}

          <div className="mt-10 border-t border-[var(--panel-border)] pt-10">
            <p className="paren-label">( Highlights )</p>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2 text-sm text-muted">
                  <span className="text-accent">•</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 border-t border-[var(--panel-border)] pt-10">
            <p className="paren-label">( What I built )</p>
            <ul className="mt-4 space-y-3">
              {project.whatIBuilt.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted">
                  <span className="text-violet">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
