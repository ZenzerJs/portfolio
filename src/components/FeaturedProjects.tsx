"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";

export function FeaturedProjects() {
  const featured = getFeaturedProjects().slice(0, 4);

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <div className="mt-10">
        <Link href="/projects" className="btn-ghost inline-flex">
          View all projects
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
