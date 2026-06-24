import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectsFilter } from "@/components/ProjectsFilter";
import { Footer } from "@/components/layout/Footer";
import { GradientBackground } from "@/components/layout/GradientBackground";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse all of Jayden Saha's projects, demos, and coursework.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description: "Browse all of Jayden Saha's projects, demos, and coursework.",
    url: new URL("/projects", siteConfig.url).toString(),
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects | ${siteConfig.name}`,
    description: "Browse all of Jayden Saha's projects, demos, and coursework.",
  },
};

export default function ProjectsPage() {
  return (
    <div className="site-page">
      <GradientBackground interactive={false} />
      <SidebarNav />

      <main id="main-content" className="site-main min-h-screen pb-16 pt-24 lg:pt-10">
        <div className="page-container">
          <SectionHeader
            title="Projects"
            subtitle="Everything I've built — featured work, experiments, and coursework."
          />
          <ProjectsFilter projects={projects} />
        </div>
        <Footer />
      </main>
    </div>
  );
}
