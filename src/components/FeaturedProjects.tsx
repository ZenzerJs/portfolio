"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getHomepageProjects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { StaggerList, StaggerItem } from "@/components/ui/MotionPrimitives";

export function FeaturedProjects() {
  const featured = getHomepageProjects();

  return (
    <div>
      <StaggerList className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {featured.map((project) => (
          <StaggerItem key={project.slug}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </StaggerList>

      <div className="mt-10">
        <Link href="/projects" className="btn-ghost inline-flex">
          View all projects
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
