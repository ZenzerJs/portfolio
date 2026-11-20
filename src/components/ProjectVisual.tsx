import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/projects";

interface ProjectVisualProps {
  project: Project;
  priority?: boolean;
  framed?: boolean;
  sizes?: string;
  mode?: "auto" | "diagram";
}

type PipelineStage = {
  step: string;
  title: string;
  detail: string;
  accent?: "teal" | "violet";
};

type PipelineBlueprintProps = {
  label: string;
  badge: string;
  badgeTone: "teal" | "violet";
  stages: PipelineStage[];
  footer: string;
  ariaLabel: string;
};

const CLINICAL_STAGES: PipelineStage[] = [
  {
    step: "01",
    title: "AD & Intake",
    detail: "Directory credential check",
  },
  {
    step: "02",
    title: "n8n Idempotent Queue",
    detail: "Expiry alerts & retries",
  },
  {
    step: "03",
    title: "Prisma RBAC Pools",
    detail: "Staff & learner audit log",
  },
  {
    step: "04",
    title: "Local Ollama Assistant",
    detail: "4-bit inventory grounding",
    accent: "teal",
  },
];

const HANDCASTING_STAGES: PipelineStage[] = [
  {
    step: "01",
    title: "Webcam Stream",
    detail: "Local frame capture",
  },
  {
    step: "02",
    title: "MediaPipe WASM",
    detail: "21-keypoint 3D landmarks",
  },
  {
    step: "03",
    title: "Temporal Smoother",
    detail: "Gesture state machine",
  },
  {
    step: "04",
    title: "PixiJS & Matter.js",
    detail: "Particle shaders & arena",
    accent: "violet",
  },
];

const RIPPLE_STAGES: PipelineStage[] = [
  {
    step: "01",
    title: "Market Ingestion",
    detail: "Rolling volatility features",
  },
  {
    step: "02",
    title: "Walk-Forward ML",
    detail: "scikit-learn & PyTorch",
  },
  {
    step: "03",
    title: "Cost & Stress Test",
    detail: "Trading-cost backtests",
  },
  {
    step: "04",
    title: "Results Viewer",
    detail: "Interactive GitHub Pages lab",
    accent: "teal",
  },
];

const AILAB_STAGES: PipelineStage[] = [
  {
    step: "01",
    title: "Task Suite",
    detail: "Governed vs. baseline runs",
  },
  {
    step: "02",
    title: "Pytest Gate",
    detail: "Automated defect checks",
  },
  {
    step: "03",
    title: "Telemetry Capture",
    detail: "Per-task cost & runtime",
  },
  {
    step: "04",
    title: "A/B Dashboard",
    detail: "Public GitHub Pages report",
    accent: "violet",
  },
];

function PipelineBlueprint({
  label,
  badge,
  badgeTone,
  stages,
  footer,
  ariaLabel,
}: PipelineBlueprintProps) {
  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className="flex h-full min-h-[248px] w-full flex-col justify-between bg-[#080f1d]/55"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3">
        <span className="font-mono text-[13px] text-muted">{label}</span>
        <span
          className={`font-mono text-[13px] font-medium tabular-nums ${
            badgeTone === "violet" ? "text-violet" : "text-accent"
          }`}
        >
          {badge}
        </span>
      </div>

      <ol className="relative grid flex-1 grid-cols-1 sm:grid-cols-2">
        {stages.map((stage, index) => {
          const isLast = index === stages.length - 1;
          const borderClasses = [
            index > 0 ? "border-t border-border" : "",
            index === 1 ? "sm:border-t-0" : "",
            index % 2 === 0 ? "sm:border-r sm:border-border" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <li
              key={stage.step}
              className={`flex flex-col justify-center px-5 py-4 ${borderClasses} ${
                stage.accent === "teal"
                  ? "bg-accent-soft/60"
                  : stage.accent === "violet"
                    ? "bg-violet-soft/60"
                    : ""
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-baseline gap-2.5">
                  <span
                    className={`font-mono text-[13px] font-medium tabular-nums ${
                      stage.accent === "violet" ? "text-violet" : "text-accent"
                    }`}
                  >
                    {stage.step}
                  </span>
                  <span className="font-display text-[15px] font-semibold leading-snug text-foreground">
                    {stage.title}
                  </span>
                </span>
                {!isLast ? (
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className={`shrink-0 ${
                      badgeTone === "violet"
                        ? "text-violet/80"
                        : "text-accent/80"
                    }`}
                  />
                ) : null}
              </div>
              <p className="mt-1 font-mono text-[13px] leading-snug text-muted">
                {stage.detail}
              </p>
            </li>
          );
        })}
      </ol>

      <div className="border-t border-border px-5 py-2.5 font-mono text-[13px] text-muted">
        {footer}
      </div>
    </div>
  );
}

export function ProjectVisual({
  project,
  priority = false,
  framed = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  mode = "auto",
}: ProjectVisualProps) {
  if (!project.image && !project.diagram) {
    return null;
  }

  if (mode === "diagram" && !project.diagram) {
    return null;
  }

  if (mode !== "diagram" && project.image) {
    const imageWrapperClass = framed
      ? "relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-[#070c17]/70"
      : "relative aspect-[16/10] w-full overflow-hidden bg-[#070c17]/70";

    return (
      <div className={imageWrapperClass}>
        <Image
          src={project.image}
          alt={`${project.title} interface screenshot`}
          fill
          priority={priority}
          sizes={sizes}
          className="card-media-zoom object-cover object-top"
        />
      </div>
    );
  }

  const diagramWrapperClass = framed
    ? "w-full overflow-hidden rounded-xl border border-border"
    : "h-full w-full overflow-hidden";

  if (project.diagram === "clinical-pipeline") {
    return (
      <div className={diagramWrapperClass}>
        <PipelineBlueprint
          label="Clinical License Pipeline"
          badge="On-prem · 1,000+ seats"
          badgeTone="teal"
          stages={CLINICAL_STAGES}
          footer="Air-gapped hospital network · zero external cloud calls"
          ariaLabel="Clinical License Tracker architecture: Active Directory and intake flows through an idempotent n8n queue into Prisma RBAC license pools managing over 1,000 seats and a local 4-bit Ollama assistant"
        />
      </div>
    );
  }

  if (project.diagram === "handcasting-pipeline") {
    return (
      <div className={diagramWrapperClass}>
        <PipelineBlueprint
          label="Spatial Runtime Pipeline"
          badge="Client WASM · MediaPipe"
          badgeTone="violet"
          stages={HANDCASTING_STAGES}
          footer="In-browser execution · zero server video upload"
          ariaLabel="Arcane Handcasting data flow: local webcam stream feeds MediaPipe 21-keypoint WASM hand tracking into a temporal smoother driving PixiJS shaders and Matter.js arena physics"
        />
      </div>
    );
  }

  if (project.diagram === "ripple-pipeline") {
    return (
      <div className={diagramWrapperClass}>
        <PipelineBlueprint
          label="Financial ML Pipeline"
          badge="Live · Financial ML Lab"
          badgeTone="teal"
          stages={RIPPLE_STAGES}
          footer="Reproducible walk-forward backtests · GitHub Pages viewer"
          ariaLabel="Ripple financial ML pipeline: market ingestion feeds walk-forward scikit-learn and PyTorch models into cost-adjusted stress tests and an interactive results viewer"
        />
      </div>
    );
  }

  if (project.diagram === "ailab-pipeline") {
    return (
      <div className={diagramWrapperClass}>
        <PipelineBlueprint
          label="Agent Evaluation Pipeline"
          badge="Live · A/B Harness"
          badgeTone="violet"
          stages={AILAB_STAGES}
          footer="Governed vs. baseline agent telemetry · public dashboard"
          ariaLabel="Ai-Lab evaluation pipeline: task suite runs governed and baseline agents through Pytest defect checks, cost and runtime telemetry capture, and a public A/B dashboard"
        />
      </div>
    );
  }

  return null;
}
