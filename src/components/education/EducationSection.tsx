type EducationSectionProps = {
  school: string;
  shortName: string;
  country: string;
  degree: string;
  yearRange: string;
  highlights: string[];
  coursework: string[];
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
          <ul className="flex flex-wrap gap-2">
            {coursework.map((course) => (
              <li key={course}>
                <span className="chip">{course}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
