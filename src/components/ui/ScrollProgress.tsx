"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";

/** Lightweight scroll progress — no spring (springs recompute every frame = lag). */
export function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
