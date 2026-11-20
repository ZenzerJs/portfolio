import { aboutContent } from "@/data/portfolio";
import { EditorialReveal } from "@/components/boreal/EditorialMotion";
import { TechIcon } from "@/components/ui/TechIcon";

export function AboutSection() {
  return (
    <EditorialReveal>
      <div className="editorial-surface grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
        <div className="max-w-[62ch] space-y-4">
          <p className="text-base leading-relaxed text-soft">
            {aboutContent.summary}
          </p>
          <p className="text-[15px] leading-relaxed text-muted">
            {aboutContent.focus}
          </p>
        </div>

        <dl className="divide-y divide-border border-t border-border pt-4 lg:border-t-0 lg:pt-0">
          {aboutContent.facts.map(({ label, value }) => (
            <div key={label} className="py-3 first:pt-0 last:pb-0">
              <dt className="font-mono text-[13px] text-muted">{label}</dt>
              <dd className="mt-1.5 text-[15px] font-medium text-foreground">
                {label === "Primary Stack" ? (
                  <ul className="flex flex-wrap gap-2">
                    {value.split(" · ").map((item) => (
                      <li
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/55 px-2.5 py-1 text-[13px] font-medium text-soft"
                      >
                        <TechIcon name={item} size={13} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </EditorialReveal>
  );
}
