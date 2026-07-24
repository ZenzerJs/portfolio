"use client";

import { ExperienceCard } from "@/components/experience/ExperienceCard";
import { StaggerList, StaggerItem } from "@/components/ui/MotionPrimitives";

type Experience = {
  period: string;
  company: string;
  location: string;
  role: string;
  description: string;
  bullets: string[];
};

type ExperienceListProps = {
  experiences: Experience[];
};

export function ExperienceList({ experiences }: ExperienceListProps) {
  return (
    <StaggerList>
      {experiences.map((experience) => (
        <StaggerItem key={`${experience.period}-${experience.company}`}>
          <ExperienceCard {...experience} />
        </StaggerItem>
      ))}
    </StaggerList>
  );
}
