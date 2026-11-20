"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

export interface ScrollBusState {
  scroll: number;
  progress: number;
  velocity: number;
  heroProgress: number;
}

/**
 * Shared mutable scroll bus (zero React re-renders).
 * Synced on Lenis scroll ticks on desktop and native scroll events on touch/reduced-motion.
 */
export const scrollBus: ScrollBusState = {
  scroll: 0,
  progress: 0,
  velocity: 0,
  heroProgress: 0,
};

function smoothstep(edge0: number, edge1: number, x: number): number {
  const span = Math.max(1, edge1 - edge0);
  const t = Math.max(0, Math.min(1, (x - edge0) / span));
  return t * t * (3 - 2 * t);
}

let cachedDocMax = 1;
let cachedHeroSpan = 320;
let hasHero = false;

function refreshLayoutMetrics() {
  if (typeof window === "undefined") return;
  cachedDocMax = Math.max(
    1,
    document.documentElement.scrollHeight - window.innerHeight,
  );
  const heroEl = document.getElementById("top");
  hasHero = heroEl !== null;
  cachedHeroSpan = heroEl ? Math.max(320, heroEl.offsetHeight * 0.84) : 320;
}

function updateScrollBusMetrics(scrollY: number, velocity: number) {
  scrollBus.scroll = scrollY;
  scrollBus.progress = Math.max(0, Math.min(1, scrollY / cachedDocMax));
  scrollBus.velocity = velocity;

  if (!hasHero) {
    scrollBus.heroProgress = 1;
  } else {
    scrollBus.heroProgress = smoothstep(0, cachedHeroSpan, scrollY);
  }
}

export interface ScrollToTargetOptions {
  offset?: number;
  immediate?: boolean;
}

export function scrollToTarget(
  selectorOrY: string | number | HTMLElement,
  options?: ScrollToTargetOptions,
) {
  if (typeof window === "undefined") return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const offset = options?.offset ?? 0;
  const immediate = Boolean(options?.immediate || reducedMotion);
  const lenis = window.__lenis;

  if (lenis && !reducedMotion) {
    lenis.scrollTo(selectorOrY, {
      offset,
      immediate,
      duration: immediate ? 0 : 1.05,
    });
    return;
  }

  if (typeof selectorOrY === "number") {
    window.scrollTo({
      top: selectorOrY + offset,
      behavior: immediate ? "auto" : "smooth",
    });
    return;
  }

  const target =
    typeof selectorOrY === "string"
      ? document.querySelector<HTMLElement>(selectorOrY)
      : selectorOrY;

  if (!target) return;

  if (offset !== 0) {
    const top = target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({
      top,
      behavior: immediate ? "auto" : "smooth",
    });
  } else {
    target.scrollIntoView({
      behavior: immediate ? "auto" : "smooth",
      block: "start",
    });
  }
}

export function pauseSmoothScroll() {
  if (typeof window !== "undefined") {
    window.__lenis?.stop();
  }
}

export function resumeSmoothScroll() {
  if (typeof window !== "undefined") {
    window.__lenis?.start();
  }
}

interface SmoothScrollContextValue {
  scrollToTarget: typeof scrollToTarget;
  pauseSmoothScroll: typeof pauseSmoothScroll;
  resumeSmoothScroll: typeof resumeSmoothScroll;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollToTarget,
  pauseSmoothScroll,
  resumeSmoothScroll,
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  const destroyLenis = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }
    if (typeof window !== "undefined") {
      window.__lenis = null;
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarseQuery = window.matchMedia("(pointer: coarse)");

    let tickerCallback: ((time: number) => void) | null = null;
    let usingNativeFallback = false;
    let lastNativeY = window.scrollY;
    let lastNativeTime = performance.now();

    const onNativeScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const dt = Math.max(8, now - lastNativeTime);
      const rawVel = ((y - lastNativeY) / dt) * 16;
      lastNativeY = y;
      lastNativeTime = now;
      updateScrollBusMetrics(y, rawVel);
    };

    const onResizeSync = () => {
      refreshLayoutMetrics();
      const currentY = lenisRef.current?.scroll ?? window.scrollY;
      updateScrollBusMetrics(currentY, scrollBus.velocity * 0.5);
    };

    const teardown = () => {
      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
        tickerCallback = null;
      }
      if (usingNativeFallback) {
        window.removeEventListener("scroll", onNativeScroll);
        usingNativeFallback = false;
      }
      destroyLenis();
    };

    const setup = () => {
      teardown();
      refreshLayoutMetrics();
      updateScrollBusMetrics(window.scrollY, 0);

      if (motionQuery.matches || coarseQuery.matches) {
        usingNativeFallback = true;
        lastNativeY = window.scrollY;
        lastNativeTime = performance.now();
        window.addEventListener("scroll", onNativeScroll, { passive: true });
        return;
      }

      const lenis = new Lenis({
        lerp: 0.09,
        smoothWheel: true,
        autoRaf: false,
      });

      lenisRef.current = lenis;
      window.__lenis = lenis;

      lenis.on("scroll", (instance: Lenis) => {
        updateScrollBusMetrics(instance.scroll, instance.velocity);
        ScrollTrigger.update();
      });

      tickerCallback = (time: number) => {
        lenis.raf(time * 1000);
        // Smooth velocity decay when idle between wheel events
        scrollBus.velocity *= 0.9;
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    };

    setup();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        refreshLayoutMetrics();
        const currentY = lenisRef.current?.scroll ?? window.scrollY;
        updateScrollBusMetrics(currentY, scrollBus.velocity);
      });
      resizeObserver.observe(document.documentElement);
    }

    const handleChange = () => {
      setup();
    };

    window.addEventListener("resize", onResizeSync, { passive: true });
    motionQuery.addEventListener("change", handleChange);
    coarseQuery.addEventListener("change", handleChange);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", onResizeSync);
      motionQuery.removeEventListener("change", handleChange);
      coarseQuery.removeEventListener("change", handleChange);
      teardown();
    };
  }, [destroyLenis]);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      refreshLayoutMetrics();
      updateScrollBusMetrics(window.scrollY, 0);
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  return (
    <SmoothScrollContext.Provider
      value={{ scrollToTarget, pauseSmoothScroll, resumeSmoothScroll }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}
