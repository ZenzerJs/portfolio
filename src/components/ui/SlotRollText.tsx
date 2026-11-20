import type { ReactNode } from "react";

interface SlotRollTextProps {
  children: ReactNode;
  className?: string;
}

/**
 * Pure CSS 220ms vertical slot-roll hover primitive.
 * Duplicate clone carries aria-hidden so assistive tech reads text once.
 */
export function SlotRollText({ children, className = "" }: SlotRollTextProps) {
  return (
    <span className={`slot-roll ${className}`}>
      <span className="slot-roll-track">
        <span className="slot-roll-face">{children}</span>
        <span className="slot-roll-face" aria-hidden="true">
          {children}
        </span>
      </span>
    </span>
  );
}
