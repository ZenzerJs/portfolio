type ExperienceCardProps = {
  period: string;
  company: string;
  location: string;
  role: string;
  description: string;
  bullets: string[];
};

export function ExperienceCard({
  period,
  company,
  location,
  role,
  description,
  bullets,
}: ExperienceCardProps) {
  return (
    <article className="timeline-item glass-card mb-6 p-6 sm:p-7">
      <p className="timeline-period">{period}</p>
      <h3 className="timeline-company mt-2">{company}</h3>
      <p className="mt-1 text-sm text-muted">
        {role} · {location}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-soft sm:text-base">{description}</p>
      <ul className="mt-4 space-y-2">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2 text-sm text-muted">
            <span className="text-accent" aria-hidden="true">
              •
            </span>
            {bullet}
          </li>
        ))}
      </ul>
    </article>
  );
}
