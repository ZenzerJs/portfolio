import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getHomepageProjects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";
import {
  EditorialReveal,
  StaggerGrid,
} from "@/components/boreal/EditorialMotion";
import { SlotRollText } from "@/components/ui/SlotRollText";

export function FeaturedProjects() {
  const featured = getHomepageProjects();
  const [lead, ...rest] = featured;

  return (
    <div className="space-y-8">
      {lead ? (
        <EditorialReveal>
          <ProjectCard project={lead} featuredLead priority />
        </EditorialReveal>
      ) : null}

      {rest.length > 0 ? (
        <StaggerGrid className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start">
          {rest.map((project, index) => (
            <div
              key={project.slug}
              className={index % 2 === 1 ? "md:mt-12" : ""}
            >
              <ProjectCard project={project} priority={index === 0} />
            </div>
          ))}
        </StaggerGrid>
      ) : null}

      <div className="pt-2">
        <Link href="/projects" className="btn-secondary slot-trigger inline-flex">
          <SlotRollText>View all projects &amp; coursework</SlotRollText>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
