"use client";

import { motion, useReducedMotion } from "motion/react";

interface BlurRevealTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const easeOut = [0.22, 1, 0.36, 1] as const;

/**
 * Line-level blur reveal.
 * Motion filter lives on the wrapper so CSS drop-shadow / gradient on the
 * inner span are not wiped by the animated filter property.
 */
export function BlurRevealText({
  text,
  className,
  delay = 0,
}: BlurRevealTextProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className="block w-fit max-w-full"
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay, ease: easeOut }}
    >
      <span className={className}>{text}</span>
    </motion.span>
  );
}
