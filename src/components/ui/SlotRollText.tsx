import type { ReactNode } from "react";

interface SlotRollTextProps {
  children: ReactNode;
  className?: string;
}

/**
 * Pure CSS 220ms vertical slot-roll hover primitive.
 * Renders text once in the DOM and projects the rolling copy via text-shadow
 * so assistive tech, textContent, and copy-paste never duplicate labels.
 */
export function SlotRollText({ children, className = "" }: SlotRollTextProps) {
  return (
    <span className={`slot-roll ${className}`}>
      <span className="slot-roll-track">{children}</span>
    </span>
  );
}
