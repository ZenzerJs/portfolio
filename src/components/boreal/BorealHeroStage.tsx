"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flame } from "lucide-react";
import { CabinHorizonSvg } from "@/components/boreal/CabinHorizonSvg";
import { scrollBus } from "@/components/boreal/SmoothScrollProvider";
import {
  type AuroraIntensity,
  type SnowMode,
} from "@/components/boreal/types";

export interface BorealHeroStageProps {
  id?: string;
  ariaLabelledBy?: string;
  aurora: AuroraIntensity;
  auroraStrength: number;
  snow: SnowMode;
  stoked: boolean;
  onStokeCabin: () => void;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

interface ForegroundFlake {
  x: number;
  y: number;
  r: number;
  speed: number;
  alpha: number;
}

function createForegroundFlakes(): ForegroundFlake[] {
  let seed = 31337;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  return Array.from({ length: 10 }, () => ({
    x: rand(),
    y: rand(),
    r: 1.9 + rand() * 1.1,
    speed: 0.9 + rand() * 0.45,
    alpha: 0.36 + rand() * 0.24,
  }));
}

export function BorealHeroStage({
  id,
  ariaLabelledBy,
  aurora,
  auroraStrength,
  snow,
  stoked,
  onStokeCabin,
  children,
  className = "",
  contentClassName = "",
}: BorealHeroStageProps) {
  const stageRef = useRef<HTMLElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const horizonRef = useRef<HTMLDivElement | null>(null);
  const fgSnowRef = useRef<HTMLCanvasElement | null>(null);

  const snowRef = useRef(snow);
  const stokedStateRef = useRef(stoked);
  const isStageVisibleRef = useRef(true);
  const syncFgSnowRef = useRef<(() => void) | null>(null);
  const hasInteractedStokeRef = useRef(false);
  const toastHideTimerRef = useRef<number | null>(null);
  const toastClearTimerRef = useRef<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    snowRef.current = snow;
    syncFgSnowRef.current?.();
  }, [snow]);

  useEffect(() => {
    stokedStateRef.current = stoked;
  }, [stoked]);

  // Beat 1 ("Cabin Awakening"), Beat 2 ("Stepping Into the Clearing" unpinned scrub),
  // and Beat 3 (Desktop fine-pointer depth via gsap.quickTo)
  useEffect(() => {
    const stageEl = stageRef.current;
    const copyEl = copyRef.current;
    const horizonEl = horizonRef.current;
    if (!stageEl || !copyEl || !horizonEl) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const cleanupFns: Array<() => void> = [];

    const ctx = gsap.context(() => {
      // Beat 1: Cabin Awakening (0.0s -> 0.95s)
      const headlineLines = stageEl.querySelectorAll<HTMLElement>(
        "[data-hero-line]",
      );
      const staggerItems = stageEl.querySelectorAll<HTMLElement>(
        "[data-hero-item]",
      );
      const cabinWindows = horizonEl.querySelectorAll(
        '[data-cabin-part="windows"]',
      );
      const hearthSpill = horizonEl.querySelectorAll(
        '[data-cabin-part="hearth-spill"]',
      );

      const introTl = gsap.timeline({
        defaults: { overwrite: "auto" },
      });

      if (headlineLines.length > 0) {
        introTl.fromTo(
          headlineLines,
          { yPercent: 105 },
          {
            yPercent: 0,
            duration: 0.78,
            stagger: 0.08,
            ease: "power4.out",
            clearProps: "transform",
          },
          0,
        );
      }

      if (staggerItems.length > 0) {
        introTl.fromTo(
          staggerItems,
          { y: 18, opacity: 0.08 },
          {
            y: 0,
            opacity: 1,
            duration: 0.54,
            stagger: 0.06,
            ease: "power3.out",
            clearProps: "transform",
          },
          0.14,
        );
      }

      if (cabinWindows.length > 0) {
        introTl.fromTo(
          cabinWindows,
          { opacity: 0.55 },
          {
            opacity: 1,
            duration: 0.62,
            ease: "power2.out",
            clearProps: "opacity",
          },
          0.34,
        );
      }

      if (hearthSpill.length > 0) {
        introTl.fromTo(
          hearthSpill,
          { opacity: 0.2 },
          {
            opacity: 1,
            duration: 0.68,
            ease: "power2.out",
            clearProps: "opacity",
          },
          0.38,
        );
      }

      // Beat 2: "Stepping Into the Clearing" — unpinned ScrollTrigger scrub (NO scroll-jacking)
      const farMountains = horizonEl.querySelector<HTMLElement>(
        '[data-parallax-layer="far-mountains"]',
      );
      const midForest = horizonEl.querySelector<HTMLElement>(
        '[data-parallax-layer="mid-forest"]',
      );
      const cabinClearing = horizonEl.querySelector<HTMLElement>(
        '[data-parallax-layer="cabin-clearing"]',
      );
      const foregroundLeft = horizonEl.querySelector<HTMLElement>(
        '[data-parallax-layer="foreground-left"]',
      );
      const foregroundRight = horizonEl.querySelector<HTMLElement>(
        '[data-parallax-layer="foreground-right"]',
      );

      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: stageEl,
          start: "top top",
          end: "bottom top",
          scrub: 0.75,
          invalidateOnRefresh: true,
        },
      });

      if (foregroundLeft) {
        scrubTl.to(
          foregroundLeft,
          { x: -26, y: -12, scale: 1.07, ease: "none" },
          0,
        );
      }
      if (foregroundRight) {
        scrubTl.to(
          foregroundRight,
          { x: 26, y: -12, scale: 1.07, ease: "none" },
          0,
        );
      }
      if (cabinClearing) {
        scrubTl.to(
          cabinClearing,
          { y: -20, scale: 1.04, ease: "none" },
          0,
        );
      }
      if (midForest) {
        scrubTl.to(midForest, { y: 18, ease: "none" }, 0);
      }
      if (farMountains) {
        scrubTl.to(farMountains, { y: 42, ease: "none" }, 0);
      }

      scrubTl.to(copyEl, { y: -36, ease: "none" }, 0);

      // Beat 3: Subtle desktop pointer depth on inner SVGs
      if (finePointer) {
        const farSvg = horizonEl.querySelector(
          '[data-parallax-layer="far-mountains"] > svg',
        );
        const midSvg = horizonEl.querySelector(
          '[data-parallax-layer="mid-forest"] > svg',
        );
        const fgLeftSvg = horizonEl.querySelector(
          '[data-parallax-layer="foreground-left"] > svg',
        );
        const fgRightSvg = horizonEl.querySelector(
          '[data-parallax-layer="foreground-right"] > svg',
        );

        const quickOpts = { duration: 0.8, ease: "power3.out" } as const;
        const movers: Array<{
          xTo: gsap.QuickToFunc;
          yTo: gsap.QuickToFunc;
          ampX: number;
          ampY: number;
        }> = [];

        if (farSvg) {
          movers.push({
            xTo: gsap.quickTo(farSvg, "x", quickOpts),
            yTo: gsap.quickTo(farSvg, "y", quickOpts),
            ampX: 6,
            ampY: 3,
          });
        }
        if (midSvg) {
          movers.push({
            xTo: gsap.quickTo(midSvg, "x", quickOpts),
            yTo: gsap.quickTo(midSvg, "y", quickOpts),
            ampX: 10,
            ampY: 5,
          });
        }
        if (fgLeftSvg) {
          movers.push({
            xTo: gsap.quickTo(fgLeftSvg, "x", quickOpts),
            yTo: gsap.quickTo(fgLeftSvg, "y", quickOpts),
            ampX: 14,
            ampY: 6,
          });
        }
        if (fgRightSvg) {
          movers.push({
            xTo: gsap.quickTo(fgRightSvg, "x", quickOpts),
            yTo: gsap.quickTo(fgRightSvg, "y", quickOpts),
            ampX: 14,
            ampY: 6,
          });
        }

        if (movers.length > 0) {
          const onPointerMove = (event: PointerEvent) => {
            const rect = stageEl.getBoundingClientRect();
            if (rect.width <= 0 || rect.height <= 0) return;
            const nx = Math.max(
              -1,
              Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1),
            );
            const ny = Math.max(
              -1,
              Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1),
            );
            for (const m of movers) {
              m.xTo(-nx * m.ampX);
              m.yTo(-ny * m.ampY);
            }
          };

          const onPointerLeave = () => {
            for (const m of movers) {
              m.xTo(0);
              m.yTo(0);
            }
          };

          stageEl.addEventListener("pointermove", onPointerMove, {
            passive: true,
          });
          stageEl.addEventListener("pointerleave", onPointerLeave);

          cleanupFns.push(() => {
            stageEl.removeEventListener("pointermove", onPointerMove);
            stageEl.removeEventListener("pointerleave", onPointerLeave);
          });
        }
      }
    }, stageRef);

    return () => {
      for (const fn of cleanupFns) fn();
      ctx.revert();
    };
  }, []);

  // Lightweight ~10-flake foreground squall passing in front of Hero foreground spruces
  useEffect(() => {
    const canvas = fgSnowRef.current;
    const horizonEl = horizonRef.current;
    const stageEl = stageRef.current;
    if (!canvas || !horizonEl || !stageEl) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const flakes = createForegroundFlakes();
    let width = 0;
    let height = 0;
    let rafId = 0;
    let lastTime = performance.now();

    const shouldRun = () =>
      snowRef.current === "flurry" &&
      isStageVisibleRef.current &&
      !document.hidden &&
      !motionQuery.matches;

    const stopLoop = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      ctx.clearRect(0, 0, width, height);
    };

    const resize = () => {
      const rect = horizonEl.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!shouldRun()) {
        ctx.clearRect(0, 0, width, height);
      }
    };

    const draw = (now: number) => {
      if (!shouldRun()) {
        rafId = 0;
        ctx.clearRect(0, 0, width, height);
        return;
      }

      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      const hp = scrollBus.heroProgress;
      if (hp < 0.94) {
        const fade = 1 - hp;
        const calm = stokedStateRef.current ? 0.78 : 1;
        const vx = (-108 * (1 - hp) - 10 * hp) * calm - scrollBus.velocity * 0.5;
        const vy = 128 * (1 - hp) + 30 * hp;

        for (let i = 0; i < flakes.length; i++) {
          const f = flakes[i];
          f.x += (vx * f.speed * dt) / width;
          f.y += (vy * f.speed * dt) / height;
          if (f.x < -0.04) f.x += 1.08;
          if (f.x > 1.04) f.x -= 1.08;
          if (f.y > 1.05) f.y = -0.05;

          ctx.fillStyle = `rgba(241, 245, 249, ${(f.alpha * fade).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(f.x * width, f.y * height, f.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    const syncLoop = () => {
      if (shouldRun()) {
        if (!rafId) {
          lastTime = performance.now();
          rafId = requestAnimationFrame(draw);
        }
      } else {
        stopLoop();
      }
    };

    syncFgSnowRef.current = syncLoop;

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          isStageVisibleRef.current = entry.isIntersecting;
          syncLoop();
        },
        { threshold: 0 },
      );
      observer.observe(stageEl);
    }

    resize();
    syncLoop();

    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", syncLoop);
    motionQuery.addEventListener("change", syncLoop);

    return () => {
      syncFgSnowRef.current = null;
      stopLoop();
      observer?.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", syncLoop);
      motionQuery.removeEventListener("change", syncLoop);
    };
  }, []);

  // Beat 4: Interactive Cabin Fireplace Stoke pulse + Aurora Purple confirmation toast
  useEffect(() => {
    if (!hasInteractedStokeRef.current) return;

    const horizonEl = horizonRef.current;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (horizonEl && !reducedMotion) {
      const windows = horizonEl.querySelectorAll('[data-cabin-part="windows"]');
      const hearthSpill = horizonEl.querySelectorAll(
        '[data-cabin-part="hearth-spill"]',
      );
      const smoke = horizonEl.querySelectorAll('[data-cabin-part="smoke"]');

      const pulseTl = gsap.timeline({ defaults: { overwrite: "auto" } });
      if (windows.length > 0) {
        pulseTl.fromTo(
          windows,
          { opacity: stoked ? 0.72 : 1 },
          {
            opacity: 1,
            duration: 0.45,
            ease: "power2.out",
            clearProps: "opacity",
          },
          0,
        );
      }
      if (hearthSpill.length > 0) {
        pulseTl.fromTo(
          hearthSpill,
          { opacity: stoked ? 0.6 : 0.95 },
          {
            opacity: 1,
            duration: 0.55,
            ease: "power2.out",
            clearProps: "opacity",
          },
          0,
        );
      }
      if (smoke.length > 0 && stoked) {
        pulseTl.fromTo(
          smoke,
          { y: 4 },
          {
            y: -6,
            duration: 0.85,
            ease: "power2.out",
            clearProps: "transform",
          },
          0,
        );
      }
    }

    if (toastHideTimerRef.current !== null) {
      window.clearTimeout(toastHideTimerRef.current);
    }
    if (toastClearTimerRef.current !== null) {
      window.clearTimeout(toastClearTimerRef.current);
    }

    toastHideTimerRef.current = window.setTimeout(() => {
      setToastVisible(false);
      toastClearTimerRef.current = window.setTimeout(() => {
        setToastMessage(null);
      }, 260);
    }, 3200);

    return () => {
      if (toastHideTimerRef.current !== null) {
        window.clearTimeout(toastHideTimerRef.current);
      }
      if (toastClearTimerRef.current !== null) {
        window.clearTimeout(toastClearTimerRef.current);
      }
    };
  }, [stoked]);

  const handleStokeCabin = () => {
    hasInteractedStokeRef.current = true;
    const nextStoked = !stoked;
    setToastMessage(
      nextStoked
        ? "Cabin hearth stoked — aurora shimmer heightened"
        : "Cabin hearth resting — embers dimmed",
    );
    setToastVisible(true);
    onStokeCabin();
  };

  return (
    <section
      ref={stageRef}
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`relative flex w-full flex-col justify-between overflow-hidden overflow-x-clip bg-transparent ${className}`}
    >
      {/* Light left contrast scrim keeping the Aurora Veil focal point unobstructed */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(108deg, rgba(5, 10, 20, 0.44) 0%, rgba(5, 10, 20, 0.16) 44%, rgba(5, 10, 20, 0) 76%)",
        }}
      />

      {/* Hero typography container */}
      <div
        ref={copyRef}
        className={`pointer-events-none relative z-10 w-full ${contentClassName}`}
      >
        {children}
      </div>

      {/* Multi-plane architectural snowy forest & lone Nordic cabin with soft bottom feather */}
      <div
        ref={horizonRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-[44%] min-h-[240px] max-h-[390px] w-full overflow-hidden sm:h-[46%] lg:h-[48%]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 58%, rgba(0,0,0,0.72) 78%, rgba(0,0,0,0.22) 92%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 58%, rgba(0,0,0,0.72) 78%, rgba(0,0,0,0.22) 92%, transparent 100%)",
        }}
      >
        <CabinHorizonSvg
          aurora={aurora}
          auroraStrength={auroraStrength}
          stoked={stoked}
          onStokeCabin={handleStokeCabin}
          className="h-full w-full"
        />
        <canvas
          ref={fgSnowRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
      </div>

      {/* Smooth midnight-frost ground veil melting the snowy clearing into #080b12 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-28 sm:h-32"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,11,18,0) 0%, rgba(8,11,18,0.58) 55%, rgba(8,11,18,0.88) 100%)",
        }}
      />

      {/* Aurora Purple cabin fireplace confirmation toast */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed bottom-4 right-4 z-30 sm:bottom-5 sm:right-6"
      >
        {toastMessage ? (
          <div
            key={toastMessage}
            className={`inline-flex items-center gap-2 rounded-lg border border-violet/45 bg-[#080b12]/90 px-3.5 py-2 text-[13px] font-medium text-[#ede9fe] shadow-lg transition-[opacity,transform] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none starting:translate-y-2 starting:opacity-0 ${
              toastVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-1.5 opacity-0"
            }`}
          >
            <Flame
              size={14}
              className="shrink-0 text-violet"
              aria-hidden="true"
            />
            <span>{toastMessage}</span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
