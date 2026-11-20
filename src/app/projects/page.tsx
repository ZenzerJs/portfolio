import { ViewTransition } from "react";
import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectsFilter } from "@/components/ProjectsFilter";
import { Footer } from "@/components/layout/Footer";
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
      <SidebarNav />

      <div className="site-shell">
        <ViewTransition
          enter={{
            "nav-forward": "nav-forward",
            "nav-back": "nav-back",
            default: "none",
          }}
          exit={{
            "nav-forward": "nav-forward",
            "nav-back": "nav-back",
            default: "none",
          }}
          default="none"
        >
          <main id="main-content" className="flex-1 pb-20 pt-20 lg:pt-12">
            <div className="page-container">
              <SectionHeader
                as="h1"
                title="Projects"
                subtitle="Complete index of shipped systems, active research, and computer science coursework."
              />
              <ProjectsFilter projects={projects} />
            </div>
          </main>
        </ViewTransition>

        <Footer />
      </div>
    </div>
  );
}
