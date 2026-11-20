"use client";

import { ViewTransition } from "react";
import { ExternalLink } from "lucide-react";
import { ProjectVisual } from "@/components/ProjectVisual";
import type { Project } from "@/content/projects";

interface ProjectShowcaseStageProps {
  project: Project;
}

function formatHostLabel(url?: string): string {
  if (!url) {
    return "on-prem://hospital-network";
  }
  try {
    const parsed = new URL(url);
    const trimmedPath = parsed.pathname.replace(/\/+$/, "");
    return trimmedPath ? `${parsed.host}${trimmedPath}` : parsed.host;
  } catch {
    return url;
  }
}

export function ProjectShowcaseStage({ project }: ProjectShowcaseStageProps) {
  const targetUrl = project.liveUrl ?? project.repoUrl ?? project.bohrUrl;
  const hostLabel = formatHostLabel(targetUrl);

  const actionLabel = project.liveUrl
    ? "Opens live site"
    : project.repoUrl
      ? "Opens repository"
      : project.bohrUrl
        ? "Opens course page"
        : null;

  const visualNode = (
    <ViewTransition
      name={`project-visual-${project.slug}`}
      share="morph"
      default="none"
    >
      <ProjectVisual
        project={project}
        priority
        sizes="(max-width: 1024px) 100vw, 760px"
      />
    </ViewTransition>
  );

  return (
    <div className="glass-panel overflow-hidden rounded-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            aria-hidden="true"
            className={`h-2 w-2 shrink-0 rounded-full ${
              project.liveUrl ? "bg-emerald-400" : "bg-muted/60"
            }`}
          />
          <span className="truncate font-mono text-[13px] text-soft">
            {hostLabel}
          </span>
        </div>

        {actionLabel ? (
          <span className="font-mono text-[13px] text-accent">
            {actionLabel}
          </span>
        ) : null}
      </div>

      {targetUrl ? (
        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} (${hostLabel}) in a new tab`}
          className="group/stage block cursor-pointer"
        >
          {visualNode}
          <div className="flex min-h-11 items-center justify-between gap-3 border-t border-white/10 bg-white/[0.03] px-4 py-2.5 font-mono text-[13px] text-soft transition-colors group-hover/stage:text-accent">
            <span className="truncate">{`Click preview to launch ${hostLabel}`}</span>
            <ExternalLink
              size={14}
              aria-hidden="true"
              className="shrink-0 text-accent transition-transform group-hover/stage:translate-x-0.5 group-hover/stage:-translate-y-0.5"
            />
          </div>
        </a>
      ) : (
        <div>{visualNode}</div>
      )}
    </div>
  );
}
