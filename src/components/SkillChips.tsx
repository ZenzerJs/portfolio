"use client";

import { skillGroups } from "@/data/portfolio";

export function SkillChips() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {skillGroups.map((group) => (
        <article key={group.title} className="glass-card p-6">
          <p className="paren-label">( {group.title} )</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <li key={skill}>
                <span className="chip">{skill}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
