"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Experience } from "@/data/portfolio";
import { ExperienceCard } from "@/components/experience/ExperienceCard";

type ExperienceListProps = {
  experiences: Experience[];
};

export function ExperienceList({ experiences }: ExperienceListProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const spineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const containerEl = containerRef.current;
    const spineEl = spineRef.current;
    if (!containerEl || !spineEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(spineEl, { scaleY: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const nodes = Array.from(
      containerEl.querySelectorAll<HTMLElement>("[data-timeline-node]"),
    );
    const rows = Array.from(
      containerEl.querySelectorAll<HTMLElement>("[data-timeline-row]"),
    );

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spineEl,
        { scaleY: 0.06 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerEl,
            start: "top 75%",
            end: "bottom 70%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      );

      nodes.forEach((node) => {
        ScrollTrigger.create({
          trigger: node,
          start: "top 72%",
          onEnter: () => {
            node.dataset.active = "true";
          },
          onLeaveBack: () => {
            node.dataset.active = "false";
          },
        });
      });

      rows.forEach((row) => {
        if (row.getBoundingClientRect().top < window.innerHeight * 0.96) {
          return;
        }
        ScrollTrigger.create({
          trigger: row,
          start: "top 95%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              row,
              { y: 18, opacity: 0.16 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                overwrite: "auto",
                clearProps: "transform,opacity",
              },
            );
          },
          onLeave: () => {
            gsap.set(row, { y: 0, opacity: 1, clearProps: "transform,opacity" });
          },
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative pl-7 sm:pl-9">
      {/* Dedicated vertical timeline margin track outside card boundaries */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-7 bottom-7 left-2 w-px bg-border"
      />
      <div
        ref={spineRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-7 bottom-7 left-2 w-px origin-top bg-gradient-to-b from-accent via-accent to-violet will-change-transform"
        style={{ transform: "scaleY(1)" }}
      />

      <div className="divide-y divide-border border-y border-border">
        {experiences.map((experience, index) => (
          <div
            key={`${experience.period}-${experience.company}`}
            data-timeline-row
            className="relative"
          >
            <span
              data-timeline-node
              data-active={index === 0 ? "true" : "false"}
              aria-hidden="true"
              className="timeline-node-marker pointer-events-none absolute top-8 -left-[25px] h-2.5 w-2.5 rounded-full border border-border-hover bg-background transition-colors duration-300 sm:-left-[33px]"
            />
            <ExperienceCard {...experience} />
          </div>
        ))}
      </div>
    </div>
  );
}
