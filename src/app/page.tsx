import { Hero } from "@/components/Hero";
import { RolePills } from "@/components/RolePills";
import { SkillChips } from "@/components/SkillChips";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import Aurora from "@/components/Aurora";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Aurora background — fixed behind everything */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Aurora
          colorStops={["#475569", "#64748b", "#475569"]}
          amplitude={1.2}
          blend={0.6}
          speed={0.8}
        />
      </div>

      <div className="relative z-10">
        <Hero />
        <RolePills />
        <SkillChips />
        <FeaturedProjects />
      </div>
    </div>
  );
}
