"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/content/projects";
import { DemoModule } from "@/components/DemoModule";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const tierLabel = {
    spotlight: "Spotlight",
    standard: "Standard",
    comingSoon: "Coming Soon",
  }[project.showcaseTier];

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20 px-5 sm:px-6 relative">
      {/* Subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-3xl mx-auto relative">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">
              {tierLabel}
            </span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground capitalize">
              {project.status}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {project.title}
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
            {project.oneLiner}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mb-10">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card hover:bg-accent transition-colors text-sm font-medium"
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
            {project.showcaseTier === "comingSoon" && !project.liveUrl && (
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                Demo coming soon
              </span>
            )}
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Spotlight embed */}
        {project.showcaseTier === "spotlight" && project.embed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-10"
          >
            <DemoModule embed={project.embed} />
          </motion.div>
        )}

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-xl font-semibold mb-4">Highlights</h2>
          <ul className="space-y-3">
            {project.highlights.map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-muted-foreground"
              >
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-sm leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* What I Built */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-4">What I Built</h2>
          <ul className="space-y-3">
            {project.whatIBuilt.map((w, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-muted-foreground"
              >
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-sm leading-relaxed">{w}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
