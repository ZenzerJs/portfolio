"use client";

import { motion } from "motion/react";
import { skillGroups } from "@/data/portfolio";
import { StaggerList, StaggerItem } from "@/components/ui/MotionPrimitives";

export function SkillChips() {
  return (
    <StaggerList className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {skillGroups.map((group) => (
        <StaggerItem key={group.title}>
          <motion.article
            className="glass-card p-6 h-full"
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <p className="paren-label">( {group.title} )</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill}>
                  <span className="chip">{skill}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        </StaggerItem>
      ))}
    </StaggerList>
  );
}
