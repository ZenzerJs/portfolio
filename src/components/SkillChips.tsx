"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillGroups } from "@/data/portfolio";
import { TechIcon } from "@/components/ui/TechIcon";

export function SkillChips() {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const gridEl = gridRef.current;
    if (!gridEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (gridEl.getBoundingClientRect().top < window.innerHeight * 0.96) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const columns = Array.from(
      gridEl.querySelectorAll<HTMLElement>("[data-skill-column]"),
    );
    const rules = Array.from(
      gridEl.querySelectorAll<HTMLElement>("[data-skill-rule]"),
    );

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: gridEl,
        start: "top 92%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            rules,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.65,
              stagger: 0.09,
              ease: "power3.out",
              overwrite: "auto",
              clearProps: "transform",
            },
          );
          gsap.fromTo(
            columns,
            { y: 20, opacity: 0.16 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.09,
              ease: "power3.out",
              overwrite: "auto",
              clearProps: "transform,opacity",
            },
          );
        },
        onLeave: () => {
          gsap.set(rules, { scaleX: 1, clearProps: "transform" });
          gsap.set(columns, {
            y: 0,
            opacity: 1,
            clearProps: "transform,opacity",
          });
        },
      });
    }, gridRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 gap-5 md:grid-cols-2"
    >
      {skillGroups.map((group) => (
        <div
          key={group.title}
          data-skill-column
          className="editorial-surface p-5 sm:p-6"
        >
          <div
            data-skill-rule
            aria-hidden="true"
            className="h-px w-full origin-left bg-gradient-to-r from-border-hover via-border to-transparent"
          />
          <h3 className="pt-4 text-base font-semibold tracking-[-0.01em] text-foreground">
            {group.title}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <li
                key={skill}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[13px] font-medium text-soft transition-colors hover:border-border-hover hover:bg-white/[0.09] hover:text-foreground"
              >
                <TechIcon name={skill} size={14} />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
