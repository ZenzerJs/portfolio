"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { links, profile } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SlotRollText } from "@/components/ui/SlotRollText";
import { CopyEmailButton } from "@/components/layout/CopyEmailButton";

export function ContactSection() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const hairlineRef = useRef<HTMLDivElement | null>(null);
  const washRef = useRef<HTMLDivElement | null>(null);

  // Scrubbed Aurora Purple horizon hairline expanding on arrival at #contact
  useEffect(() => {
    const cardEl = cardRef.current;
    const hairlineEl = hairlineRef.current;
    const washEl = washRef.current;
    if (!cardEl || !hairlineEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(hairlineEl, { scaleX: 1, opacity: 1 });
      if (washEl) gsap.set(washEl, { opacity: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        hairlineEl,
        { scaleX: 0.25, opacity: 0.35 },
        {
          scaleX: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: cardEl,
            start: "top bottom",
            end: "top 58%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      );
      if (washEl) {
        gsap.fromTo(
          washEl,
          { opacity: 0.2 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: cardEl,
              start: "top bottom",
              end: "top 58%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
      }
    }, cardRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div>
      <SectionHeader
        title="Contact"
        subtitle={`${profile.availability}. Reach out directly for software engineering, AI systems, or data and finance internship roles.`}
      />

      <div
        ref={cardRef}
        className="editorial-surface relative overflow-hidden p-6 sm:p-8"
      >
        {/* Scrubbed Aurora Purple top horizon hairline (zero amber, zero radial-halo) */}
        <div
          ref={hairlineRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px origin-center"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(167, 139, 250, 0.25) 22%, rgba(196, 181, 253, 0.58) 50%, rgba(167, 139, 250, 0.25) 78%, transparent 100%)",
          }}
        />

        {/* Whisper-soft linear violet top horizon wash */}
        <div
          ref={washRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-16"
          style={{
            background:
              "linear-gradient(180deg, rgba(167, 139, 250, 0.065) 0%, rgba(167, 139, 250, 0) 100%)",
          }}
        />

        <div className="relative z-10">
          <p className="font-mono text-[clamp(1.125rem,3vw,1.75rem)] font-medium tracking-[-0.015em] text-foreground break-all sm:break-normal">
            {profile.email}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="btn-primary slot-trigger"
            >
              <Mail size={16} aria-hidden="true" />
              <SlotRollText>Send email</SlotRollText>
            </a>

            <CopyEmailButton email={profile.email} />

            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Linkedin size={16} aria-hidden="true" />
              <span>LinkedIn</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>

            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Github size={16} aria-hidden="true" />
              <span>GitHub</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-border pt-5">
            <a
              href={links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover hover:underline"
            >
              <span>View résumé</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>

            <a
              href={links.resume}
              download="Jayden_Saha_Resume.pdf"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground hover:underline"
            >
              <Download size={15} aria-hidden="true" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
