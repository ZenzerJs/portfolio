import type { Experience } from "@/data/portfolio";

export function ExperienceCard({
  period,
  company,
  location,
  role,
  description,
  bullets,
}: Experience) {
  return (
    <article className="grid grid-cols-1 gap-3 py-8 first:pt-6 last:pb-6 md:grid-cols-[13.5rem_1fr] md:gap-8">
      <div className="md:col-start-2">
        <h3 className="text-xl font-semibold leading-snug tracking-[-0.015em] text-foreground">
          {company}
        </h3>
        <p className="mt-1 text-[15px] font-medium text-accent">{role}</p>

        <p className="mt-1.5 font-mono text-[13px] tabular-nums text-muted md:hidden">
          {period} · {location}
        </p>

        <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-soft">
          {description}
        </p>

        {bullets.length > 0 ? (
          <ul className="mt-4 max-w-[62ch] space-y-2.5">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-3 text-[15px] leading-relaxed text-muted"
              >
                <span
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80"
                  aria-hidden="true"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="hidden md:col-start-1 md:row-start-1 md:block md:pt-1">
        <p className="font-mono text-[13px] font-medium tabular-nums text-soft">
          {period}
        </p>
        <p className="mt-1 text-[13px] text-muted">{location}</p>
      </div>
    </article>
  );
}
