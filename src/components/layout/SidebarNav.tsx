"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Briefcase,
  Compass,
  Cpu,
  Flame,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  Menu,
  Search,
  Snowflake,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import { useBorealAtmosphere } from "@/components/boreal/BorealAtmosphereContext";
import {
  pauseSmoothScroll,
  resumeSmoothScroll,
  scrollToTarget,
} from "@/components/boreal/SmoothScrollProvider";
import type { AuroraIntensity } from "@/components/boreal/types";
import { openCommandPalette } from "@/components/layout/CommandPalette";
import { links, navSections, profile } from "@/data/portfolio";

const MENU_PANEL_ID = "mobile-menu-panel";

const AURORA_PRESET_LABELS: Record<AuroraIntensity, string> = {
  quiet: "Quiet",
  balanced: "Balanced",
  vivid: "Vivid",
};

const NAV_ICONS: Record<string, LucideIcon> = {
  top: Compass,
  work: Layers,
  experience: Briefcase,
  skills: Cpu,
  education: GraduationCap,
  contact: Mail,
};

type SectionMetric = {
  id: string;
  top: number;
};

function resolveActiveSection(
  sectionMetrics: SectionMetric[],
  scrollY: number,
  viewportHeight: number,
  docHeight: number,
): string {
  if (sectionMetrics.length === 0) return "top";

  const nearBottom = scrollY + viewportHeight >= docHeight - 24;
  if (nearBottom) {
    return sectionMetrics[sectionMetrics.length - 1].id;
  }

  if (scrollY < 80) {
    return sectionMetrics[0].id;
  }

  const activationLine = scrollY + 140;
  let currentId = sectionMetrics[0].id;

  for (const section of sectionMetrics) {
    if (section.top <= activationLine) {
      currentId = section.id;
    }
  }

  return currentId;
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

function MonogramTile({ compact = false }: { compact?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`relative flex shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.05] font-display font-bold tracking-[-0.03em] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-colors group-hover:border-accent/40 ${
        compact ? "h-8 w-8 text-[13px]" : "h-9 w-9 text-[15px]"
      }`}
    >
      <span>JS</span>
      <span className="text-accent">.</span>
      <span className="pointer-events-none absolute inset-x-1.5 bottom-0 h-[2px] rounded-full bg-gradient-to-r from-accent to-violet" />
    </span>
  );
}

const subscribeEmpty = () => () => {};

function getShortcutSnapshot(): string {
  const platformHint =
    typeof navigator !== "undefined"
      ? navigator.platform || navigator.userAgent
      : "";
  return platformHint && !/Mac|iPhone|iPad|iPod/i.test(platformHint)
    ? "Ctrl K"
    : "⌘K";
}

function getShortcutServerSnapshot(): string {
  return "⌘K";
}

export function SidebarNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProjectsRoute = pathname.startsWith("/projects");

  const {
    aurora,
    auroraStrength,
    setAuroraStrength,
    snow,
    toggleSnow,
    stoked,
    toggleStoked,
  } = useBorealAtmosphere();

  const [activeId, setActiveId] = useState<string>("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const shortcutLabel = useSyncExternalStore(
    subscribeEmpty,
    getShortcutSnapshot,
    getShortcutServerSnapshot,
  );

  const menuButtonId = useId();
  const sliderIdBase = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((restoreFocus = false) => {
    setMenuOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => {
        menuButtonRef.current?.focus();
      });
    }
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const sectionIds = navSections.map(({ id }) => id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    let sectionMetrics: SectionMetric[] = [];
    let cachedDocHeight = 0;
    let cachedViewportHeight = 0;
    let rafId: number | null = null;

    const update = () => {
      rafId = null;
      const next = resolveActiveSection(
        sectionMetrics,
        window.scrollY,
        cachedViewportHeight,
        cachedDocHeight,
      );
      setActiveId((prev) => (prev === next ? prev : next));
    };

    const scheduleUpdate = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(update);
    };

    const measure = () => {
      const scrollY = window.scrollY;
      sectionMetrics = sections.map((el) => ({
        id: el.id,
        top: el.getBoundingClientRect().top + scrollY,
      }));
      cachedDocHeight = document.documentElement.scrollHeight;
      cachedViewportHeight = window.innerHeight;
      scheduleUpdate();
    };

    measure();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", measure, { passive: true });

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;
    resizeObserver?.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", measure);
      resizeObserver?.disconnect();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isHome]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    pauseSmoothScroll();

    const focusRaf = requestAnimationFrame(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = getFocusableElements(dialog);
      focusables[0]?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = getFocusableElements(dialog);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (!active || !dialog.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const mq = window.matchMedia("(min-width: 1024px)");
    const onViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    mq.addEventListener("change", onViewportChange);

    return () => {
      cancelAnimationFrame(focusRaf);
      document.body.style.overflow = previousOverflow;
      resumeSmoothScroll();
      window.removeEventListener("keydown", onKeyDown);
      mq.removeEventListener("change", onViewportChange);
    };
  }, [menuOpen, closeMenu]);

  const handleSectionClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    closeMenu(false);
    if (!isHome) return;

    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const isMobileHeader = window.innerWidth < 1024;
    scrollToTarget(target, {
      offset: id === "top" ? 0 : isMobileHeader ? -56 : -16,
    });
    window.history.replaceState(null, "", `#${id}`);
  };

  const renderAvailabilityPill = () => (
    <div
      title={profile.availability}
      className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-2.5 py-1 text-[12px] font-medium text-emerald-200/90"
    >
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.75)]"
        aria-hidden="true"
      />
      <span>Open · 2026 Co-op</span>
    </div>
  );

  const renderNavLinks = () =>
    navSections.map(({ id, label }) => {
      const isActive = isHome
        ? activeId === id
        : isProjectsRoute && id === "work";
      const Icon = NAV_ICONS[id] ?? Compass;

      return (
        <Link
          key={id}
          href={isHome ? `#${id}` : `/#${id}`}
          onClick={(event) => handleSectionClick(event, id)}
          aria-current={isActive ? (isHome ? "location" : "page") : undefined}
          className={`group relative flex min-h-11 items-center gap-3 rounded-lg border px-3 py-2 text-[14.5px] transition-colors ${
            isActive
              ? "border-accent/30 bg-white/[0.07] font-medium text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
              : "border-transparent text-muted hover:bg-white/[0.04] hover:text-foreground"
          }`}
        >
          {isActive ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-2 left-0 top-2 w-[2px] rounded-full bg-accent shadow-[0_0_8px_rgba(45,212,191,0.8)]"
            />
          ) : null}
          <Icon
            size={16}
            className={`shrink-0 transition-colors ${
              isActive
                ? "text-accent drop-shadow-[0_0_6px_rgba(45,212,191,0.5)]"
                : "text-muted group-hover:text-soft"
            }`}
            aria-hidden="true"
          />
          <span>{label}</span>
        </Link>
      );
    });

  const renderSocialLinks = () => (
    <div className="flex items-center gap-2">
      <a
        href={links.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        className="inline-flex min-h-10 flex-1 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-muted transition-colors hover:border-border-hover hover:bg-white/[0.08] hover:text-foreground"
      >
        <Github size={17} aria-hidden="true" />
      </a>
      <a
        href={links.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        className="inline-flex min-h-10 flex-1 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-muted transition-colors hover:border-border-hover hover:bg-white/[0.08] hover:text-foreground"
      >
        <Linkedin size={17} aria-hidden="true" />
      </a>
      <a
        href={`mailto:${profile.email}`}
        aria-label={`Email ${profile.name}`}
        className="inline-flex min-h-10 flex-1 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-muted transition-colors hover:border-border-hover hover:bg-white/[0.08] hover:text-foreground"
      >
        <Mail size={17} aria-hidden="true" />
      </a>
    </div>
  );

  const renderAtmosphereControls = (variant: "desktop" | "mobile") => {
    const sliderId = `${sliderIdBase}-${variant}`;
    const presetLabel = AURORA_PRESET_LABELS[aurora];
    const sliderStyle = {
      "--slider-pct": `${auroraStrength}%`,
    } as CSSProperties;

    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor={sliderId}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-soft"
          >
            <Sparkles
              size={13}
              className="shrink-0 text-accent"
              aria-hidden="true"
            />
            <span>Aurora</span>
          </label>
          <span className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[11.5px] tabular-nums text-accent">
            {presetLabel} · {auroraStrength}%
          </span>
        </div>

        <div className="mt-2.5 flex h-7 items-center">
          <input
            id={sliderId}
            type="range"
            min={0}
            max={100}
            step={1}
            value={auroraStrength}
            onChange={(event) => setAuroraStrength(Number(event.target.value))}
            aria-label="Aurora strength"
            aria-valuetext={`${presetLabel}, ${auroraStrength} percent`}
            className="aurora-slider"
            style={sliderStyle}
          />
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={toggleSnow}
            aria-pressed={snow === "flurry"}
            className={`inline-flex min-h-10 cursor-pointer items-center justify-between gap-1 rounded-lg border px-2.5 text-[12px] font-medium transition-colors ${
              snow === "flurry"
                ? "border-accent/30 bg-accent/10 text-foreground"
                : "border-white/10 bg-white/[0.03] text-muted hover:border-white/20 hover:text-foreground"
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              <Snowflake
                size={13}
                className={snow === "flurry" ? "text-accent" : "text-muted"}
                aria-hidden="true"
              />
              <span>Snow</span>
            </span>
            <span
              className={`font-mono text-[11px] ${
                snow === "flurry" ? "text-accent" : "text-muted"
              }`}
            >
              {snow === "flurry" ? "On" : "Off"}
            </span>
          </button>

          <button
            type="button"
            onClick={toggleStoked}
            aria-pressed={stoked}
            className={`inline-flex min-h-10 cursor-pointer items-center justify-between gap-1 rounded-lg border px-2.5 text-[12px] font-medium transition-colors ${
              stoked
                ? "border-violet/35 bg-violet/12 text-foreground"
                : "border-white/10 bg-white/[0.03] text-muted hover:border-white/20 hover:text-foreground"
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              <Flame
                size={13}
                className={stoked ? "text-violet" : "text-muted"}
                aria-hidden="true"
              />
              <span>Hearth</span>
            </span>
            <span
              className={`font-mono text-[11px] ${
                stoked ? "text-violet" : "text-muted"
              }`}
            >
              {stoked ? "Stoked" : "Calm"}
            </span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <header
        style={{ viewTransitionName: "site-mobile-header" }}
        className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-2 border-b border-white/10 bg-[#070b14]/82 px-4 backdrop-blur-xl sm:px-5 lg:hidden"
      >
        <Link
          href="/"
          transitionTypes={isHome ? undefined : ["nav-back"]}
          className="group inline-flex min-h-11 min-w-0 items-center gap-2.5 font-display text-[15px] font-semibold tracking-[-0.015em] text-foreground transition-colors hover:text-accent"
        >
          <MonogramTile compact />
          <span className="truncate">{profile.name}</span>
        </Link>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            aria-label="Open command palette"
            onClick={() => {
              closeMenu(false);
              openCommandPalette();
            }}
            className="inline-flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-white/12 bg-white/[0.04] px-2.5 text-[13px] font-medium text-soft transition-colors hover:border-border-hover hover:bg-white/[0.08] hover:text-foreground"
          >
            <Search size={15} className="shrink-0" aria-hidden="true" />
            <kbd className="whitespace-nowrap font-mono text-[12px] text-muted">
              {shortcutLabel}
            </kbd>
          </button>

          <button
            ref={menuButtonRef}
            id={menuButtonId}
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls={MENU_PANEL_ID}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-transparent text-soft transition-colors hover:border-white/10 hover:bg-white/[0.05] hover:text-foreground"
          >
            {menuOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div
          ref={dialogRef}
          id={MENU_PANEL_ID}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-x-0 bottom-0 top-14 z-40 flex flex-col overflow-y-auto bg-[#070b14]/92 px-5 py-6 backdrop-blur-xl lg:hidden"
        >
          <div className="mb-5">{renderAvailabilityPill()}</div>

          <nav className="flex flex-col gap-1" aria-label="Mobile primary">
            {renderNavLinks()}
          </nav>

          <div className="mt-6 border-t border-white/10 pt-5">
            {renderAtmosphereControls("mobile")}
          </div>

          <div className="mt-auto border-t border-white/10 pt-5">
            {renderSocialLinks()}
            <a
              href={links.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => closeMenu(false)}
              className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-accent/35 bg-accent/12 px-3 text-sm font-medium text-accent transition-colors hover:border-accent/55 hover:bg-accent/20"
            >
              <span>View résumé</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      ) : null}

      <aside
        style={{ viewTransitionName: "site-sidebar" }}
        className="sidebar-glass fixed inset-y-0 left-0 z-40 hidden w-[16rem] flex-col overflow-hidden lg:flex"
      >
        {/* Whisper-soft top aurora ambient wash */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-accent/[0.08] via-violet/[0.04] to-transparent"
        />

        {/* Subtle right-edge aurora vertical hairline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-accent/30 via-60% to-transparent"
        />

        <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto px-5 py-6">
          <div>
            <Link
              href="/"
              transitionTypes={isHome ? undefined : ["nav-back"]}
              className="group flex items-center gap-3 rounded-lg py-0.5"
            >
              <MonogramTile />
              <div className="min-w-0">
                <span className="block truncate font-display text-[17px] font-semibold leading-tight tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent">
                  {profile.name}
                </span>
                <span className="mt-0.5 block truncate text-[12px] text-muted">
                  Full-Stack · AI Systems
                </span>
              </div>
            </Link>

            <div className="mt-3.5">{renderAvailabilityPill()}</div>

            <button
              type="button"
              onClick={openCommandPalette}
              className="mt-3.5 flex min-h-11 w-full cursor-pointer items-center justify-between rounded-lg border border-white/12 bg-white/[0.04] px-3 text-[13px] font-medium text-soft transition-colors hover:border-border-hover hover:bg-white/[0.07] hover:text-foreground"
            >
              <span className="inline-flex items-center gap-2">
                <Search size={14} className="text-muted" aria-hidden="true" />
                <span>Jump to…</span>
              </span>
              <kbd className="rounded border border-white/12 bg-[#070b14]/70 px-1.5 py-0.5 font-mono text-[11.5px] text-muted">
                {shortcutLabel}
              </kbd>
            </button>
          </div>

          <nav className="mt-5 flex flex-col gap-1" aria-label="Primary">
            {renderNavLinks()}
          </nav>

          <div className="mt-auto space-y-4 pt-5">
            {renderAtmosphereControls("desktop")}

            <div className="border-t border-white/10 pt-4">
              {renderSocialLinks()}
              <a
                href={links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-accent/35 bg-accent/12 px-3 text-sm font-medium text-accent transition-colors hover:border-accent/55 hover:bg-accent/20"
              >
                <span>View résumé</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
