import { ExternalLink } from "lucide-react";
import type { CourseworkEntry } from "@/data/portfolio";

type EducationSectionProps = {
  school: string;
  shortName: string;
  country: string;
  degree: string;
  yearRange: string;
  highlights: string[];
  coursework: CourseworkEntry[];
};

function formatCourseChip(course: CourseworkEntry) {
  if (course.status === "completed" && course.grade) {
    return `${course.code} · ${course.grade}`;
  }
  return `${course.code} · In progress`;
}

export function EducationSection({
  school,
  country,
  degree,
  yearRange,
  highlights,
  coursework,
}: EducationSectionProps) {
  return (
    <article className="glass-card p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="timeline-period">{yearRange}</p>
          <h3 className="timeline-company mt-2">{school}</h3>
          <p className="mt-1 text-sm text-muted">{country}</p>
        </div>
        <span className="chip">{degree.split("—")[0]?.trim()}</span>
      </div>

      <p className="mt-5 text-base leading-relaxed text-soft">{degree}</p>

      {highlights.length > 0 && (
        <ul className="mt-5 space-y-2">
          {highlights.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-muted">
              <span className="text-violet" aria-hidden="true">
                →
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}

      {coursework.length > 0 && (
        <div className="mt-6">
          <p className="paren-label">( Relevant coursework )</p>
          <ul className="space-y-3">
            {coursework.map((course) => (
              <li key={course.code}>
                <div className="flex flex-wrap items-center gap-2">
                  {course.bohrUrl ? (
                    <a
                      href={course.bohrUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${course.label} on Bohr`}
                      className={`chip transition-colors hover:border-[var(--accent)] hover:text-accent ${
                        course.status === "in-progress" ? "chip--warm" : ""
                      }`}
                    >
                      {formatCourseChip(course)}
                    </a>
                  ) : (
                    <span
                      className={`chip ${course.status === "in-progress" ? "chip--warm" : ""}`}
                      title={course.label}
                    >
                      {formatCourseChip(course)}
                    </span>
                  )}
                  {course.calendarUrl ? (
                    <a
                      href={course.calendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-accent"
                      aria-label={`${course.code} Laurier academic calendar`}
                    >
                      Calendar
                      <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
                <p className="mt-1 text-xs text-muted">{course.label}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
