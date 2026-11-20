import { ExternalLink } from "lucide-react";
import type { CourseworkEntry } from "@/data/portfolio";
import { EditorialReveal } from "@/components/boreal/EditorialMotion";

type EducationSectionProps = {
  school: string;
  shortName: string;
  country: string;
  degree: string;
  yearRange: string;
  highlights: string[];
  coursework: CourseworkEntry[];
};

export function EducationSection({
  school,
  country,
  degree,
  yearRange,
  highlights,
  coursework,
}: EducationSectionProps) {
  return (
    <EditorialReveal>
      <article className="editorial-surface p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
          <div>
            <h3 className="text-xl font-semibold leading-snug tracking-[-0.015em] text-foreground sm:text-2xl">
              {school}
            </h3>
            <p className="mt-1 text-base text-soft">{degree}</p>
          </div>

          <div className="shrink-0 sm:text-right">
            <p className="font-mono text-[13px] font-medium tabular-nums text-accent">
              {yearRange}
            </p>
            <p className="mt-1 text-[13px] text-muted">{country}</p>
          </div>
        </div>

        {highlights.length > 0 ? (
          <ul className="mt-5 max-w-[62ch] space-y-2.5">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[15px] leading-relaxed text-muted"
              >
                <span
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet/80"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {coursework.length > 0 ? (
          <div className="mt-7 border-t border-border pt-6">
            <h4 className="font-display text-sm font-semibold text-foreground">
              Relevant coursework
            </h4>
            <ul className="mt-3 divide-y divide-border">
              {coursework.map((course) => (
                <li
                  key={course.code}
                  className="flex flex-col justify-between gap-2.5 py-3 first:pt-1 last:pb-0 sm:flex-row sm:items-center"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="font-mono text-[13px] font-medium tabular-nums text-foreground">
                      {course.code}
                    </span>
                    <span className="text-[15px] text-soft">
                      {course.label}
                    </span>
                    {course.status === "in-progress" ? (
                      <span className="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[12px] text-muted backdrop-blur-sm">
                        In progress
                      </span>
                    ) : null}
                  </div>

                  {course.bohrUrl || course.calendarUrl ? (
                    <div className="flex shrink-0 items-center gap-2">
                      {course.bohrUrl ? (
                        <a
                          href={course.bohrUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${course.code} course page`}
                          className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-muted backdrop-blur-sm transition-colors hover:border-border-hover hover:bg-white/[0.08] hover:text-accent"
                        >
                          <span>Course page</span>
                          <ExternalLink size={14} aria-hidden="true" />
                        </a>
                      ) : null}
                      {course.calendarUrl ? (
                        <a
                          href={course.calendarUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${course.code} Wilfrid Laurier calendar`}
                          className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-muted backdrop-blur-sm transition-colors hover:border-border-hover hover:bg-white/[0.08] hover:text-accent"
                        >
                          <span>WLU calendar</span>
                          <ExternalLink size={14} aria-hidden="true" />
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </article>
    </EditorialReveal>
  );
}
