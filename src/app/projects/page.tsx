import { projects } from "@/content/projects";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Footer } from "@/components/layout/Footer";
import { GradientBackground } from "@/components/layout/GradientBackground";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Projects",
  description: "Browse all of Jayden Saha's projects, demos, and coursework.",
};

export default function ProjectsPage() {
  return (
    <div className="site-page">
      <GradientBackground interactive={false} />
      <SidebarNav />

      <main className="site-main min-h-screen pb-16 pt-24 lg:pt-10">
        <div className="page-container">
          <SectionHeader
            title="Projects"
            subtitle="Everything I've built — featured work, experiments, and coursework."
          />
          <ProjectGrid projects={projects} />
        </div>
        <Footer />
      </main>
    </div>
  );
}
