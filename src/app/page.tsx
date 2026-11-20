import { ViewTransition } from "react";
import { AboutSection } from "@/components/about/AboutSection";
import { EducationSection } from "@/components/education/EducationSection";
import { ExperienceList } from "@/components/experience/ExperienceList";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Hero } from "@/components/hero/Hero";
import { HeroWorkBridge } from "@/components/hero/HeroWorkBridge";
import { ContactSection } from "@/components/layout/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { SkillChips } from "@/components/SkillChips";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  educationEntries,
  experiences,
  links,
  profile,
} from "@/data/portfolio";
import { siteConfig } from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteConfig.url.toString(),
  jobTitle: profile.shortRole,
  email: profile.email,
  sameAs: [links.github, links.linkedin],
};

export default function HomePage() {
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
          <main id="main-content" className="flex-1">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
            }}
          />

          <Hero />

          <HeroWorkBridge />

          <section id="work" className="page-container pt-8 pb-16 sm:pt-10">
            <SectionHeader
              title="Selected Work"
              subtitle="Shipped AI pipelines, full-stack systems, and spatial tools built end to end."
            />
            <FeaturedProjects />
          </section>

          <section
            id="experience"
            className="page-container pt-14 pb-16 sm:pt-16"
          >
            <SectionHeader
              title="Experience"
              subtitle="Software engineering and infrastructure roles across healthcare IT and mobile development."
            />
            <ExperienceList experiences={experiences} />
          </section>

          <section id="skills" className="page-container pt-14 pb-16 sm:pt-16">
            <SectionHeader
              title="Technical Stack"
              subtitle="Languages, frameworks, AI tooling, and infrastructure used across shipped systems."
            />
            <SkillChips />
          </section>

          <section
            id="education"
            className="page-container pt-14 pb-16 sm:pt-16"
          >
            <SectionHeader
              title="Education & Background"
              subtitle="Computer science foundation, coursework, and current engineering focus."
            />
            <div className="space-y-6">
              {educationEntries.map((entry) => (
                <EducationSection key={entry.school} {...entry} />
              ))}
              <AboutSection />
            </div>
          </section>

          <section id="contact" className="page-container pt-14 pb-20 sm:pt-16">
            <ContactSection />
          </section>
          </main>
        </ViewTransition>

        <Footer />
      </div>
    </div>
  );
}
