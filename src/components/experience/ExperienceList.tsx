import { ExperienceCard } from "@/components/experience/ExperienceCard";

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
    <div>
      {experiences.map((experience) => (
        <ExperienceCard key={`${experience.period}-${experience.company}`} {...experience} />
      ))}
    </div>
  );
}
