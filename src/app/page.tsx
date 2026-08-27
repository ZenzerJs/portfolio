import { AboutSection } from "@/components/about/AboutSection";
import { EducationSection } from "@/components/education/EducationSection";
import { ExperienceList } from "@/components/experience/ExperienceList";
import { Hero } from "@/components/hero/Hero";
import { ContactSection } from "@/components/layout/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { GradientBackground } from "@/components/layout/GradientBackground";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { ArchitectureMatrix } from "@/components/architecture/ArchitectureMatrix";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { SkillChips } from "@/components/SkillChips";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealSection } from "@/components/ui/MotionPrimitives";
import { educationEntries, experiences, links, profile } from "@/data/portfolio";
import { siteConfig } from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteConfig.url.toString(),
  jobTitle: profile.role.split("·")[0]?.trim() ?? "IT Operations",
  email: profile.email,
  sameAs: [links.github, links.linkedin],
};

export default function HomePage() {
  return (
    <div className="site-page">
      <GradientBackground />
      <SidebarNav />

      <main id="main-content" className="site-main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <Hero />

        <RevealSection id="about" className="page-container pb-16 pt-10 sm:pt-14">
          <SectionHeader
            title="About"
            subtitle="CS @ Laurier · IT Operations @ Trillium Health Partners · builder at heart."
          />
          <AboutSection />
        </RevealSection>

        <RevealSection id="experience" className="page-container pb-16 pt-6">
          <SectionHeader
            title="Experience"
            subtitle="Roles across healthcare IT and software development."
            count={experiences.length}
            countLabel="positions"
          />
          <ExperienceList experiences={experiences} />
        </RevealSection>

        <RevealSection id="systems" className="page-container pb-16 pt-6">
          <SectionHeader
            title="Architecture"
            subtitle="6-system engineering blueprint: technical moats, verification gates, and signals."
          />
          <ArchitectureMatrix />
        </RevealSection>

        <RevealSection id="works" className="page-container pb-16 pt-6">
          <SectionHeader
            title="Projects"
            subtitle="ML tools, AI agents, full-stack apps, and coursework experiments."
          />
          <FeaturedProjects />
        </RevealSection>

        <RevealSection id="skills" className="page-container pb-16 pt-6">
          <SectionHeader title="Skills" subtitle="Technologies I use and keep sharpening." />
          <SkillChips />
        </RevealSection>

        <RevealSection id="education" className="page-container pb-16 pt-6">
          <SectionHeader title="Education" subtitle="Academic background and relevant coursework." />
          <div className="space-y-6">
            {educationEntries.map((entry) => (
              <EducationSection key={entry.school} {...entry} />
            ))}
          </div>
        </RevealSection>

        <RevealSection id="contact" className="">
          <ContactSection />
        </RevealSection>

        <Footer />
      </main>
    </div>
  );
}
