import { ExternalLink, FileText } from "lucide-react";
import type { Project } from "@/content/projects";

interface ProjectReadmePlateProps {
  project: Project;
}

export function ProjectReadmePlate({ project }: ProjectReadmePlateProps) {
  return (
    <section
      aria-label={`${project.title} technical README`}
      className="glass-panel overflow-hidden rounded-xl"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-white/[0.03] px-5 py-3">
        <div className="flex min-w-0 items-center gap-2 font-mono text-[13px]">
          <FileText
            size={15}
            aria-hidden="true"
            className="shrink-0 text-accent"
          />
          <span className="font-semibold text-foreground">README.md</span>
          <span aria-hidden="true" className="text-muted">
            ·
          </span>
          <span className="truncate text-muted">{project.domain}</span>
        </div>

        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 font-mono text-[13px] text-accent transition-colors hover:text-accent-hover"
          >
            <span>View on GitHub</span>
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        ) : null}
      </div>

      <div className="space-y-6 p-5 sm:p-7">
        <div className="space-y-3">
          <h2 className="font-mono text-[13px] font-semibold uppercase tracking-[0.08em] text-accent">
            Overview
          </h2>
          <p className="text-[15px] leading-relaxed text-soft">
            {project.overview ?? project.oneLiner}
          </p>
        </div>

        <div className="space-y-3 border-t border-border pt-5">
          <h2 className="font-mono text-[13px] font-semibold uppercase tracking-[0.08em] text-accent">
            Key Outcomes
          </h2>
          <ul className="space-y-2.5">
            {project.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-[15px] leading-relaxed text-soft"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 border-t border-border pt-5">
          <h2 className="font-mono text-[13px] font-semibold uppercase tracking-[0.08em] text-accent">
            Architecture &amp; Implementation
          </h2>
          <ul className="space-y-2.5">
            {project.whatIBuilt.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-[15px] leading-relaxed text-soft"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2.5 border-t border-border pt-5">
          <h2 className="font-mono text-[13px] font-semibold uppercase tracking-[0.08em] text-accent">
            Stack
          </h2>
          <p className="rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 font-mono text-[13px] text-foreground">
            {project.stackSummary}
          </p>
        </div>
      </div>
    </section>
  );
}
