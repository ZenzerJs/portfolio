import { ViewTransition } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { getAdjacentProjects, type Project } from "@/content/projects";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Footer } from "@/components/layout/Footer";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { ProjectAtmosphereSync } from "@/components/boreal/ProjectAtmosphereSync";
import { ProjectReadmePlate } from "@/components/case-studies/ProjectReadmePlate";
import { ProjectShowcaseStage } from "@/components/case-studies/ProjectShowcaseStage";
import { SlotRollText } from "@/components/ui/SlotRollText";
import { TechIcon } from "@/components/ui/TechIcon";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const statusLabel = project.status === "shipped" ? "Shipped" : "In progress";
  const { prev, next } = getAdjacentProjects(project.slug);

  const hasShowcasePlate = Boolean(project.image || project.diagram);
  const hasDiagramPlate = Boolean(project.image && project.diagram);

  return (
    <div className="site-page">
      <ProjectAtmosphereSync slug={project.slug} />
      <SidebarNav />

      <div className="site-shell">
        <ViewTransition
          enter={{
            "nav-forward": "nav-forward",
            "nav-back": "nav-back",
            default: "none",
          }}
          exit={{
            "nav-forward": "nav-forward",
            "nav-back": "nav-back",
            default: "none",
          }}
          default="none"
        >
          <main id="main-content" className="flex-1 pb-20 pt-20 lg:pt-12">
            <article className="page-container max-w-[76rem]">
              <Link
                href="/projects"
                transitionTypes={["nav-back"]}
                className="mb-6 inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                <span>Back to projects</span>
              </Link>

              <div className="lg:grid lg:grid-cols-[21.5rem_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[23.5rem_minmax(0,1fr)]">
                <div className="lg:sticky lg:top-10">
                  <h1 className="text-[clamp(2rem,4vw,2.875rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-foreground">
                    {project.title}
                  </h1>

                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[13px] text-muted">
                    <span className="font-medium tabular-nums text-accent">
                      {project.metric}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{project.domain}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{project.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>{statusLabel}</span>
                  </div>

                  <p className="mt-5 text-[16px] leading-relaxed text-soft">
                    {project.oneLiner}
                  </p>

                  <ul
                    aria-label="Technologies used"
                    className="mt-5 flex flex-wrap gap-2"
                  >
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/[0.04] px-3 py-1.5 font-mono text-[13px] text-soft backdrop-blur-sm"
                      >
                        <TechIcon name={tag} size={14} />
                        <span>{tag}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 border-t border-border pt-4">
                    <div className="font-mono text-[13px] uppercase tracking-[0.08em] text-muted">
                      Architecture focus
                    </div>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-soft">
                      {project.architectureMoat}
                    </p>
                  </div>

                  {project.liveUrl ||
                  project.repoUrl ||
                  project.bohrUrl ||
                  project.calendarUrl ? (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary slot-trigger min-h-11 cursor-pointer"
                        >
                          <ExternalLink size={16} aria-hidden="true" />
                          <span>
                            <SlotRollText>Visit live site</SlotRollText>
                          </span>
                        </a>
                      ) : null}
                      {project.repoUrl ? (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary slot-trigger min-h-11 cursor-pointer"
                        >
                          <Github size={16} aria-hidden="true" />
                          <span>
                            <SlotRollText>GitHub repo</SlotRollText>
                          </span>
                        </a>
                      ) : null}
                      {project.bohrUrl ? (
                        <a
                          href={project.bohrUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary slot-trigger min-h-11 cursor-pointer"
                        >
                          <ExternalLink size={16} aria-hidden="true" />
                          <span>
                            <SlotRollText>Course page</SlotRollText>
                          </span>
                        </a>
                      ) : null}
                      {project.calendarUrl ? (
                        <a
                          href={project.calendarUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary slot-trigger min-h-11 cursor-pointer"
                        >
                          <ExternalLink size={16} aria-hidden="true" />
                          <span>
                            <SlotRollText>WLU calendar</SlotRollText>
                          </span>
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                <div className="mt-10 min-w-0 space-y-10 lg:mt-0">
                  {hasShowcasePlate ? (
                    <ProjectShowcaseStage project={project} />
                  ) : null}

                  <ProjectReadmePlate project={project} />

                  {hasDiagramPlate ? (
                    <ProjectVisual
                      project={project}
                      mode="diagram"
                      framed
                    />
                  ) : null}
                </div>
              </div>

              {prev || next ? (
                <nav
                  aria-label="Adjacent projects"
                  className="mt-14 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2"
                >
                  {prev ? (
                    <Link
                      href={`/projects/${prev.slug}`}
                      transitionTypes={["nav-back"]}
                      className="editorial-surface group slot-trigger flex min-h-11 min-w-0 cursor-pointer flex-col justify-between p-4 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-hover motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    >
                      <span className="inline-flex items-center gap-1.5 font-mono text-[13px] text-muted">
                        <ArrowLeft size={14} aria-hidden="true" />
                        <span>Previous project</span>
                      </span>
                      <span className="mt-2 block min-w-0 truncate whitespace-nowrap font-display text-base font-semibold text-foreground transition-colors group-hover:text-accent">
                        <SlotRollText>{prev.title}</SlotRollText>
                      </span>
                    </Link>
                  ) : (
                    <div className="hidden sm:block" />
                  )}

                  {next ? (
                    <Link
                      href={`/projects/${next.slug}`}
                      transitionTypes={["nav-forward"]}
                      className="editorial-surface group slot-trigger flex min-h-11 min-w-0 cursor-pointer flex-col justify-between p-4 text-left transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-border-hover sm:text-right motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    >
                      <span className="inline-flex items-center gap-1.5 font-mono text-[13px] text-muted sm:justify-end">
                        <span>Next project</span>
                        <ArrowRight size={14} aria-hidden="true" />
                      </span>
                      <span className="mt-2 block min-w-0 truncate whitespace-nowrap font-display text-base font-semibold text-foreground transition-colors group-hover:text-accent">
                        <SlotRollText>{next.title}</SlotRollText>
                      </span>
                    </Link>
                  ) : null}
                </nav>
              ) : null}
            </article>
          </main>
        </ViewTransition>

        <Footer />
      </div>
    </div>
  );
}
