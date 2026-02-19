import { projects } from "@/content/projects";
import { ProjectGrid } from "@/components/ProjectGrid";

export const metadata = {
  title: "Projects — Jayden Saha",
  description: "Browse all of Jayden Saha's projects, demos, and coursework.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Projects
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Everything I&apos;ve built — from featured work to coursework and
            experiments.
          </p>
        </div>

        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
