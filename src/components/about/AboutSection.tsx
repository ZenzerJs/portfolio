import { aboutContent } from "@/data/portfolio";

export function AboutSection() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
      <div className="space-y-8">
        {aboutContent.blocks.map((block) => (
          <article key={block.label} className="glass-card p-6 sm:p-7">
            <p className="paren-label">( {block.label} )</p>
            <p className="text-base leading-relaxed text-soft sm:text-lg">{block.body}</p>
          </article>
        ))}
      </div>

      <aside className="space-y-6">
        <div className="glass-card p-6">
          <p className="paren-label">( Quick read )</p>
          <ul className="space-y-4">
            {aboutContent.highlights.map(({ label, value }) => (
              <li key={label}>
                <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-muted">
                  {label}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card p-6">
          <p className="paren-label">( Interests )</p>
          <ul className="flex flex-wrap gap-2">
            {aboutContent.interests.map((interest) => (
              <li key={interest}>
                <span className="chip">{interest}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
