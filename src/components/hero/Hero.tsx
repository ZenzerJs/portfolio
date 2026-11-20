"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useBorealAtmosphere } from "@/components/boreal/BorealAtmosphereContext";
import { BorealHeroStage } from "@/components/boreal/BorealHeroStage";
import { scrollToTarget } from "@/components/boreal/SmoothScrollProvider";
import { SlotRollText } from "@/components/ui/SlotRollText";
import { links, profile } from "@/data/portfolio";

export function Hero() {
  const { aurora, auroraStrength, snow, stoked, toggleStoked } =
    useBorealAtmosphere();

  const handleWorkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToTarget("#work");
    window.history.replaceState(null, "", "#work");
  };

  return (
    <BorealHeroStage
      id="top"
      ariaLabelledBy="hero-heading"
      surface="frost"
      aurora={aurora}
      auroraStrength={auroraStrength}
      snow={snow}
      stoked={stoked}
      onStokeCabin={toggleStoked}
      className="min-h-[100svh]"
      contentClassName="pt-20 pb-40 sm:pb-44 lg:pt-14 lg:pb-48"
    >
      <div className="page-container">
        <div className="pointer-events-auto max-w-[42rem]">
          <h1
            id="hero-heading"
            className="text-[clamp(2.5rem,5.5vw,4.35rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-foreground"
          >
            <span className="inline-block overflow-hidden align-bottom">
              <span data-hero-line className="inline-block">
                {profile.name}
              </span>
            </span>
          </h1>

          <p
            data-hero-item
            className="mt-3 text-base font-medium text-soft sm:text-lg"
          >
            {profile.role}
          </p>

          <p
            data-hero-item
            className="mt-5 max-w-[44ch] text-[clamp(1.2rem,2.2vw,1.5rem)] font-medium leading-[1.38] tracking-[-0.015em] text-foreground"
          >
            {profile.tagline}
          </p>

          <p
            data-hero-item
            className="mt-4 max-w-[36rem] text-base leading-relaxed text-soft"
          >
            {profile.intro}
          </p>

          <dl
            data-hero-item
            className="mt-7 grid grid-cols-1 gap-4 border-y border-white/12 py-4 sm:grid-cols-3 sm:gap-6 sm:py-5"
          >
            {profile.proofPoints.map((point) => (
              <div key={point.value} className="flex flex-col-reverse">
                <dt className="mt-1 text-sm leading-snug text-muted">
                  {point.label}
                </dt>
                <dd className="font-mono text-xl font-medium tabular-nums tracking-[-0.02em] text-accent sm:text-2xl">
                  {point.value}
                </dd>
              </div>
            ))}
          </dl>

          <div
            data-hero-item
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              onClick={handleWorkClick}
              className="btn-primary slot-trigger"
            >
              <SlotRollText>View shipped work</SlotRollText>
              <ArrowRight size={16} aria-hidden="true" />
            </a>

            <a
              href={links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary slot-trigger"
            >
              <SlotRollText>View résumé</SlotRollText>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>

          {profile.available ? (
            <p data-hero-item className="mt-5 text-[13px] text-muted">
              {profile.availability} · {profile.location}
            </p>
          ) : null}
        </div>
      </div>
    </BorealHeroStage>
  );
}
