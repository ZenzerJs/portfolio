"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface EditorialRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function EditorialReveal({
  children,
  className = "",
  delay = 0,
  y = 16,
}: EditorialRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Elements already within or above the viewport on mount stay cleanly at rest.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.96) {
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 96%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            el,
            { y, opacity: 0.16 },
            {
              y: 0,
              opacity: 1,
              duration: 0.46,
              delay,
              ease: "power3.out",
              overwrite: "auto",
              clearProps: "transform,opacity",
            },
          );
        },
        onLeave: () => {
          gsap.set(el, { y: 0, opacity: 1, clearProps: "transform,opacity" });
        },
      });
    }, ref);

    return () => {
      ctx.revert();
    };
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface StaggerGridProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
}

export function StaggerGrid({
  children,
  className = "",
  stagger = 0.045,
  y = 16,
}: StaggerGridProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const items = Array.from(grid.children).filter(
      (node): node is HTMLElement => node instanceof HTMLElement,
    );
    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.96) {
          return;
        }

        ScrollTrigger.create({
          trigger: item,
          start: "top 96%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              item,
              { y, opacity: 0.16 },
              {
                y: 0,
                opacity: 1,
                duration: 0.46,
                delay: (index % 2) * stagger,
                ease: "power3.out",
                overwrite: "auto",
                clearProps: "transform,opacity",
              },
            );
          },
          onLeave: () => {
            gsap.set(item, { y: 0, opacity: 1, clearProps: "transform,opacity" });
          },
        });
      });
    }, gridRef);

    return () => {
      ctx.revert();
    };
  }, [stagger, y]);

  return (
    <div ref={gridRef} className={className}>
      {children}
    </div>
  );
}
