"use client";

import { motion } from "motion/react";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  count?: number;
  countLabel?: string;
  eyebrow?: string;
};

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export function SectionHeader({
  title,
  subtitle,
  count,
  countLabel = "items",
  eyebrow,
}: SectionHeaderProps) {
  const eyebrowText =
    eyebrow ?? (count != null ? `( ${count} ${countLabel} )` : undefined);

  return (
    <header className="section-header mb-10 sm:mb-12">
      {eyebrowText ? (
        <motion.p
          className="section-eyebrow"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease }}
        >
          {eyebrowText}
        </motion.p>
      ) : null}
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.08, ease }}
      >
        {title}
        <motion.span
          className="section-title-slash"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.2, ease }}
          style={{ transformOrigin: "left", display: "inline-block" }}
        >
          /
        </motion.span>
      </motion.h2>
      {subtitle ? (
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15, ease }}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </header>
  );
}
