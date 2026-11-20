"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SectionHeaderProps = {
  as?: "h1" | "h2";
  title: string;
  subtitle?: string;
};

export function SectionHeader({
  as = "h2",
  title,
  subtitle,
}: SectionHeaderProps) {
  const headerRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const ruleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (as === "h1") return;

    const headerEl = headerRef.current;
    const lineEl = lineRef.current;
    const ruleEl = ruleRef.current;
    if (!headerEl || !lineEl || !ruleEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (headerEl.getBoundingClientRect().top < window.innerHeight * 0.94) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: headerEl,
        start: "top 92%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            lineEl,
            { yPercent: 100 },
            {
              yPercent: 0,
              duration: 0.65,
              ease: "power4.out",
              overwrite: "auto",
              clearProps: "transform",
            },
          );
          if (subRef.current) {
            gsap.fromTo(
              subRef.current,
              { y: 12, opacity: 0.2 },
              {
                y: 0,
                opacity: 1,
                duration: 0.55,
                delay: 0.08,
                ease: "power3.out",
                overwrite: "auto",
                clearProps: "transform,opacity",
              },
            );
          }
          gsap.fromTo(
            ruleEl,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.72,
              delay: 0.1,
              ease: "power3.out",
              overwrite: "auto",
              clearProps: "transform",
            },
          );
        },
        onLeave: () => {
          gsap.set(lineEl, { yPercent: 0, clearProps: "transform" });
          if (subRef.current) {
            gsap.set(subRef.current, {
              y: 0,
              opacity: 1,
              clearProps: "transform,opacity",
            });
          }
          gsap.set(ruleEl, { scaleX: 1, clearProps: "transform" });
        },
      });
    }, headerRef);

    return () => {
      ctx.revert();
    };
  }, [as]);

  const Heading = as;

  return (
    <header ref={headerRef} className="mb-8 sm:mb-10">
      <Heading
        className={
          as === "h1"
            ? "text-[clamp(2.25rem,4.5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-foreground"
            : "text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground"
        }
      >
        <span className="inline-block overflow-hidden align-bottom">
          <span ref={lineRef} className="inline-block">
            {title}
          </span>
        </span>
      </Heading>
      {subtitle ? (
        <p
          ref={subRef}
          className="mt-3 max-w-[62ch] text-base leading-relaxed text-muted"
        >
          {subtitle}
        </p>
      ) : null}
      <div
        ref={ruleRef}
        aria-hidden="true"
        className="mt-5 h-px w-full origin-left bg-gradient-to-r from-accent/55 via-violet/35 to-transparent"
      />
    </header>
  );
}
