"use client";

import { useEffect, ViewTransition } from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/content/projects";
import { ProjectVisual } from "@/components/ProjectVisual";
import { useBorealAtmosphere } from "@/components/boreal/BorealAtmosphereContext";
import { PROJECT_AURORA_TINTS } from "@/components/boreal/types";
import { SlotRollText } from "@/components/ui/SlotRollText";
import { TechIcon } from "@/components/ui/TechIcon";

interface ProjectCardProps {
  project: Project;
  featuredLead?: boolean;
  priority?: boolean;
  headingAs?: "h2" | "h3";
}

export function ProjectCard({
  project,
  featuredLead = false,
  priority = false,
  headingAs = "h3",
}: ProjectCardProps) {
  const { setAuroraTint } = useBorealAtmosphere();
  const hasVisual = Boolean(project.image || project.diagram);
  const Heading = headingAs;
  const projectTint = PROJECT_AURORA_TINTS[project.slug] ?? null;

  useEffect(() => {
    return () => {
      if (projectTint) {
        setAuroraTint(null, "card");
      }
    };
  }, [projectTint, setAuroraTint]);

  const handleActivateTint = () => {
    if (projectTint) {
      setAuroraTint(projectTint, "card");
    }
  };

  const handleResetTint = () => {
    if (projectTint) {
      setAuroraTint(null, "card");
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
      return;
    }
    handleResetTint();
  };

  return (
    <article
      onMouseEnter={handleActivateTint}
      onFocus={handleActivateTint}
      onMouseLeave={handleResetTint}
      onBlur={handleBlur}
      className={`project-card slot-trigger group relative flex flex-col overflow-hidden transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
        featuredLead && hasVisual ? "lg:grid lg:grid-cols-[1.15fr_1fr]" : ""
      }`}
    >
      {/* Pure CSS top-edge teal/purple sheen revealed on hover */}
      <span
        aria-hidden="true"
        className="card-top-sheen pointer-events-none absolute inset-x-0 top-0 z-20 h-px"
      />

      <Link
        href={`/projects/${project.slug}`}
        transitionTypes={["nav-forward"]}
        className="absolute inset-0 z-10 rounded-[inherit]"
        aria-label={`Read case study: ${project.title}`}
      />

      {hasVisual ? (
        <div
          className={`pointer-events-none ${
            featuredLead
              ? "border-b border-border lg:flex lg:items-stretch lg:border-b-0 lg:border-r lg:bg-[#070d1a]/55"
              : "border-b border-border"
          }`}
        >
          <ViewTransition
            name={`project-visual-${project.slug}`}
            share="morph"
            default="none"
          >
            <ProjectVisual
              project={project}
              priority={priority}
              sizes={
                featuredLead
                  ? "(max-width: 1024px) 100vw, 560px"
                  : "(max-width: 768px) 100vw, 460px"
              }
            />
          </ViewTransition>
        </div>
      ) : null}

      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          <div className="pointer-events-none relative z-20 flex items-center justify-between gap-2">
            <span className="font-mono text-[13px] font-medium tabular-nums text-accent">
              {project.metric}
            </span>

            {project.repoUrl || project.liveUrl ? (
              <div className="flex shrink-0 items-center gap-0.5">
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} GitHub repository`}
                    className="pointer-events-auto relative z-20 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
                  >
                    <Github size={17} aria-hidden="true" />
                  </a>
                ) : null}
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} live demo`}
                    className="pointer-events-auto relative z-20 inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg px-2.5 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
                  >
                    <span className="font-mono text-[13px]">Live</span>
                    <ExternalLink size={15} aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="pointer-events-none mt-2">
            <Heading
              className={`font-semibold leading-snug tracking-[-0.015em] text-foreground transition-colors group-hover:text-accent ${
                featuredLead ? "text-2xl sm:text-[1.65rem]" : "text-xl"
              }`}
            >
              {project.title}
            </Heading>

            <p className="mt-2.5 max-w-[58ch] text-[15px] leading-relaxed text-soft">
              {project.oneLiner}
            </p>

            <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-muted">
              {project.architectureMoat}
            </p>
          </div>
        </div>

        <div className="pointer-events-none mt-6 flex items-center justify-between gap-3 border-t border-border pt-4 font-mono text-[13px] text-muted">
          <ul
            aria-label="Technologies"
            className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1"
          >
            {project.tags.slice(0, 3).map((tag) => (
              <li
                key={tag}
                className="inline-flex items-center gap-1.5 text-[13px]"
              >
                <TechIcon name={tag} size={13} />
                <span>{tag}</span>
              </li>
            ))}
          </ul>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-soft transition-colors group-hover:text-accent">
            <SlotRollText>Case study</SlotRollText>
            <ArrowUpRight
              size={15}
              aria-hidden="true"
              className="card-arrow-shift text-muted group-hover:text-accent"
            />
          </span>
        </div>
      </div>
    </article>
  );
}
