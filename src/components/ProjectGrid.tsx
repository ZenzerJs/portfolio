import Link from "next/link";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { SlotRollText } from "@/components/ui/SlotRollText";
import { TechIcon } from "@/components/ui/TechIcon";
import type { Project } from "@/content/projects";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const visualProjects = projects.filter((p) => Boolean(p.image || p.diagram));
  const textOnlyProjects = projects.filter((p) => !p.image && !p.diagram);
  const showDivider = visualProjects.length > 0 && textOnlyProjects.length > 0;

  return (
    <div className="space-y-12">
      {visualProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {visualProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} headingAs="h2" />
          ))}
        </div>
      ) : null}

      {textOnlyProjects.length > 0 ? (
        <div>
          {showDivider ? (
            <div className="mb-5 flex items-center gap-4">
              <span className="shrink-0 font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-muted">
                Additional Projects &amp; Coursework
              </span>
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-gradient-to-r from-border via-border/60 to-transparent"
              />
            </div>
          ) : null}

          <div className="space-y-3">
            {textOnlyProjects.map((project) => (
              <article
                key={project.slug}
                className="editorial-surface slot-trigger group relative flex flex-col gap-4 overflow-hidden p-5 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-border-hover sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <span
                  aria-hidden="true"
                  className="card-top-sheen pointer-events-none absolute inset-x-0 top-0 z-20 h-px group-hover:opacity-100 group-focus-within:opacity-100"
                />

                <Link
                  href={`/projects/${project.slug}`}
                  transitionTypes={["nav-forward"]}
                  className="absolute inset-0 z-10 rounded-[inherit]"
                  aria-label={`Read case study: ${project.title}`}
                />

                <div className="pointer-events-none min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 className="text-lg font-semibold leading-snug tracking-[-0.015em] text-foreground transition-colors group-hover:text-accent">
                      {project.title}
                    </h2>
                    <span className="font-mono text-[13px] font-medium tabular-nums text-accent">
                      {project.metric}
                    </span>
                  </div>

                  <p className="mt-1.5 max-w-[68ch] text-sm leading-relaxed text-soft">
                    {project.oneLiner}
                  </p>

                  <ul
                    aria-label="Technologies"
                    className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] text-muted"
                  >
                    {project.tags.slice(0, 4).map((tag) => (
                      <li
                        key={tag}
                        className="inline-flex items-center gap-1.5"
                      >
                        <TechIcon name={tag} size={13} />
                        <span>{tag}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-20 flex shrink-0 items-center justify-between gap-3 sm:flex-col sm:items-end sm:justify-center">
                  {project.repoUrl || project.liveUrl ? (
                    <div className="flex items-center gap-0.5">
                      {project.repoUrl ? (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} GitHub repository`}
                          className="pointer-events-auto relative z-20 inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/[0.08] hover:text-foreground"
                        >
                          <Github size={16} aria-hidden="true" />
                        </a>
                      ) : null}
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} live demo`}
                          className="pointer-events-auto relative z-20 inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg px-2.5 text-muted transition-colors hover:bg-white/[0.08] hover:text-foreground"
                        >
                          <span className="font-mono text-[13px]">Live</span>
                          <ExternalLink size={14} aria-hidden="true" />
                        </a>
                      ) : null}
                    </div>
                  ) : null}

                  <span className="pointer-events-none inline-flex items-center gap-1.5 font-mono text-[13px] text-soft transition-colors group-hover:text-accent">
                    <SlotRollText>Case study</SlotRollText>
                    <ArrowUpRight
                      size={15}
                      aria-hidden="true"
                      className="card-arrow-shift text-muted group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                    />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
