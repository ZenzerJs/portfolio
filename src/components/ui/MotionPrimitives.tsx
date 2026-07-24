"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "motion/react";

/* ── Scroll-triggered section reveal ──────────────────────────── */

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Delay in seconds before animation starts */
  delay?: number;
}

export function RevealSection({
  children,
  className,
  id,
  delay = 0,
}: RevealSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.section>
  );
}

/* ── Stagger container + children ─────────────────────────────── */

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

interface StaggerListProps {
  children: ReactNode;
  className?: string;
}

export function StaggerList({ children, className }: StaggerListProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={itemVariants}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
