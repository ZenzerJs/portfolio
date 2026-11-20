"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  Check,
  Code2,
  FileText,
  Flame,
  Github,
  Hash,
  Linkedin,
  Mail,
  Search,
  Snowflake,
  Sparkles,
  X,
} from "lucide-react";
import { useBorealAtmosphere } from "@/components/boreal/BorealAtmosphereContext";
import {
  pauseSmoothScroll,
  resumeSmoothScroll,
  scrollToTarget,
} from "@/components/boreal/SmoothScrollProvider";
import { projects } from "@/content/projects";
import { links, navSections, profile } from "@/data/portfolio";
import { copyTextToClipboard } from "@/lib/clipboard";
import {
  filterCommandItems,
  resolveCommandPaletteKeyAction,
  type CommandGroupId,
  type CommandSearchItem,
} from "./commandPaletteLogic";

export const OPEN_COMMAND_PALETTE_EVENT = "boreal:open-command-palette";

export function openCommandPalette() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_COMMAND_PALETTE_EVENT));
  }
}

interface CommandPaletteItem extends CommandSearchItem {
  action: () => void;
  badge?: string;
  badgeTone?: "accent" | "error";
  icon: React.ReactNode;
}

type CopyStatus = "idle" | "copied" | "error";

const GROUPS: Array<{ id: CommandGroupId; label: string }> = [
  { id: "quick", label: "Quick Actions" },
  { id: "projects", label: "Projects" },
  { id: "sections", label: "Sections" },
  { id: "atmosphere", label: "Atmosphere" },
];

const AURORA_LABELS = {
  quiet: "Quiet",
  balanced: "Balanced",
  vivid: "Vivid",
} as const;

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

function CommandPaletteDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const listboxId = useId();

  const {
    aurora,
    auroraStrength,
    cycleAurora,
    snow,
    toggleSnow,
    stoked,
    toggleStoked,
  } = useBorealAtmosphere();

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");

  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleCopyEmail = useCallback(async () => {
    const ok = await copyTextToClipboard(profile.email);
    setCopyStatus(ok ? "copied" : "error");
  }, []);

  useEffect(() => {
    if (copyStatus !== "copied") return;
    const timer = window.setTimeout(() => {
      onClose();
    }, 650);
    return () => window.clearTimeout(timer);
  }, [copyStatus, onClose]);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    pauseSmoothScroll();

    const rafId = requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.overflow = prevOverflow;
      resumeSmoothScroll();
      if (prevFocus && prevFocus.isConnected) {
        prevFocus.focus();
      }
    };
  }, []);

  const filteredItems = useMemo(() => {
    const quickItems: CommandPaletteItem[] = [
      {
        id: "copy-email",
        group: "quick",
        label: "Copy Email",
        subtitle: profile.email,
        keywords: ["email", "contact", "copy", profile.email],
        badge:
          copyStatus === "copied"
            ? "Copied"
            : copyStatus === "error"
              ? "Failed"
              : undefined,
        badgeTone: copyStatus === "error" ? "error" : "accent",
        icon:
          copyStatus === "copied" ? (
            <Check size={16} className="text-accent" aria-hidden="true" />
          ) : copyStatus === "error" ? (
            <AlertCircle
              size={16}
              className="text-rose-400"
              aria-hidden="true"
            />
          ) : (
            <Mail size={16} aria-hidden="true" />
          ),
        action: handleCopyEmail,
      },
      {
        id: "open-resume",
        group: "quick",
        label: "Open Resume PDF",
        subtitle: "View curriculum vitae",
        keywords: ["resume", "cv", "pdf", "bio"],
        icon: <FileText size={16} aria-hidden="true" />,
        action: () => {
          window.open(links.resume, "_blank", "noopener,noreferrer");
          onClose();
        },
      },
      {
        id: "open-github",
        group: "quick",
        label: "Open GitHub",
        subtitle: "github.com",
        keywords: ["github", "code", "repo", "git"],
        icon: <Github size={16} aria-hidden="true" />,
        action: () => {
          window.open(links.github, "_blank", "noopener,noreferrer");
          onClose();
        },
      },
      {
        id: "open-linkedin",
        group: "quick",
        label: "Open LinkedIn",
        subtitle: "linkedin.com",
        keywords: ["linkedin", "social", "connect", "network"],
        icon: <Linkedin size={16} aria-hidden="true" />,
        action: () => {
          window.open(links.linkedin, "_blank", "noopener,noreferrer");
          onClose();
        },
      },
    ];

    const projectItems: CommandPaletteItem[] = projects.map((project) => ({
      id: `project-${project.slug}`,
      group: "projects",
      label: project.title,
      subtitle: `${project.metric} · ${project.domain}`,
      keywords: [project.domain, ...(project.tags ?? []), project.slug],
      icon: <Code2 size={16} aria-hidden="true" />,
      action: () => {
        onClose();
        router.push(`/projects/${project.slug}`);
      },
    }));

    const sectionItems: CommandPaletteItem[] = navSections.map((section) => ({
      id: `section-${section.id}`,
      group: "sections",
      label: section.label,
      subtitle: `/#${section.id}`,
      keywords: [section.id, section.label, "scroll", "jump"],
      icon: <Hash size={16} aria-hidden="true" />,
      action: () => {
        onClose();
        if (pathname === "/") {
          requestAnimationFrame(() => {
            scrollToTarget(`#${section.id}`, {
              offset:
                section.id === "top"
                  ? 0
                  : typeof window !== "undefined" && window.innerWidth < 1024
                    ? -56
                    : -16,
            });
            if (typeof window !== "undefined") {
              window.history.replaceState(null, "", `#${section.id}`);
            }
          });
        } else {
          router.push(`/#${section.id}`);
        }
      },
    }));

    const atmosphereItems: CommandPaletteItem[] = [
      {
        id: "cycle-aurora",
        group: "atmosphere",
        label: "Cycle Aurora Intensity",
        subtitle: "Toggle quiet, balanced, or vivid glow",
        keywords: ["aurora", "intensity", "theme", "glow", "atmosphere"],
        icon: <Sparkles size={16} aria-hidden="true" />,
        badge: `${AURORA_LABELS[aurora]} · ${auroraStrength}%`,
        action: cycleAurora,
      },
      {
        id: "toggle-snow",
        group: "atmosphere",
        label: "Toggle Snowfall",
        subtitle: "Particle snowfall effect",
        keywords: ["snow", "snowfall", "winter", "particles", "atmosphere"],
        icon: <Snowflake size={16} aria-hidden="true" />,
        badge: snow === "flurry" ? "On" : "Off",
        action: toggleSnow,
      },
      {
        id: "stoke-hearth",
        group: "atmosphere",
        label: "Stoke Cabin Hearth",
        subtitle: "Warm ambient hearth accent",
        keywords: ["hearth", "fire", "stoke", "cabin", "warmth", "atmosphere"],
        icon: <Flame size={16} aria-hidden="true" />,
        badge: stoked ? "Stoked" : "Calm",
        action: toggleStoked,
      },
    ];

    const allItems: CommandPaletteItem[] = [
      ...quickItems,
      ...projectItems,
      ...sectionItems,
      ...atmosphereItems,
    ];

    return filterCommandItems(allItems, query);
  }, [
    aurora,
    auroraStrength,
    copyStatus,
    cycleAurora,
    handleCopyEmail,
    onClose,
    pathname,
    query,
    router,
    snow,
    stoked,
    toggleSnow,
    toggleStoked,
  ]);

  const clampedActiveIndex =
    filteredItems.length === 0
      ? -1
      : Math.max(0, Math.min(activeIndex, filteredItems.length - 1));
  const activeItem =
    clampedActiveIndex >= 0 ? filteredItems[clampedActiveIndex] : undefined;
  const activeOptionId = activeItem ? `cmd-option-${activeItem.id}` : undefined;

  useEffect(() => {
    if (!activeOptionId) return;
    document.getElementById(activeOptionId)?.scrollIntoView({ block: "nearest" });
  }, [activeOptionId]);

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    const action = resolveCommandPaletteKeyAction(
      e.key,
      clampedActiveIndex,
      filteredItems.length,
    );

    if (action.type === "close") {
      e.preventDefault();
      onClose();
    } else if (action.type === "move") {
      e.preventDefault();
      setActiveIndex(action.nextIndex);
    } else if (action.type === "select") {
      e.preventDefault();
      filteredItems[action.index]?.action();
    }
  };

  const handleDialogKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }

    if (e.key !== "Tab") return;

    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusables = getFocusableElements(dialog);
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (!active || !dialog.contains(active)) {
      e.preventDefault();
      (e.shiftKey ? last : first).focus();
      return;
    }

    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-[#050a14]/72 px-4 pt-[min(14vh,7rem)] backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="sr-only" role="status" aria-live="polite">
        {copyStatus === "copied"
          ? "Email copied to clipboard"
          : copyStatus === "error"
            ? "Could not copy email"
            : ""}
      </div>

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Quick switcher"
        onKeyDown={handleDialogKeyDown}
        className="glass-panel animate-modal-enter w-full max-w-xl overflow-hidden rounded-xl border-border-hover/50"
      >
        <div className="flex min-h-12 items-center border-b border-border/80 px-4">
          <Search
            size={18}
            className="shrink-0 text-muted"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded="true"
            aria-controls={listboxId}
            aria-activedescendant={activeOptionId}
            aria-autocomplete="list"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Search commands, projects, sections..."
            className="min-h-12 w-full bg-transparent px-3 text-sm text-foreground placeholder:text-muted focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveIndex(0);
                inputRef.current?.focus();
              }}
              className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center text-[13px] text-muted transition-colors hover:text-foreground"
              aria-label="Clear search"
            >
              <X size={16} aria-hidden="true" />
            </button>
          ) : (
            <kbd className="hidden rounded border border-border bg-white/[0.04] px-1.5 py-0.5 font-mono text-[13px] text-muted sm:inline-flex">
              ESC
            </kbd>
          )}
        </div>

        <div
          id={listboxId}
          role="listbox"
          aria-label="Commands"
          data-lenis-prevent
          className="max-h-[min(60vh,420px)] overflow-y-auto p-2"
        >
          {filteredItems.length === 0 ? (
            <div className="flex min-h-16 items-center justify-center px-4 py-8 text-center text-sm text-muted">
              No matching commands found.
            </div>
          ) : (
            GROUPS.map((group) => {
              const groupItems = filteredItems
                .map((item, flatIndex) => ({ item, flatIndex }))
                .filter(({ item }) => item.group === group.id);

              if (groupItems.length === 0) return null;

              return (
                <div key={group.id} className="mb-2 last:mb-0">
                  <div className="px-3 pb-1 pt-2 font-mono text-[13px] font-medium uppercase tracking-wider text-muted">
                    {group.label}
                  </div>
                  <div className="flex flex-col gap-1">
                    {groupItems.map(({ item, flatIndex }) => {
                      const isActive = flatIndex === clampedActiveIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          role="option"
                          id={`cmd-option-${item.id}`}
                          aria-selected={isActive}
                          onClick={() => item.action()}
                          onMouseEnter={() => setActiveIndex(flatIndex)}
                          className={`group flex min-h-11 w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                            isActive
                              ? "bg-white/[0.08] font-medium text-foreground"
                              : "text-soft hover:bg-white/[0.04] hover:text-foreground"
                          }`}
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <span
                              className={`shrink-0 transition-colors ${
                                isActive ? "text-accent" : "text-muted"
                              }`}
                              aria-hidden="true"
                            >
                              {item.icon}
                            </span>
                            <div className="flex min-w-0 flex-col">
                              <span className="truncate text-sm font-medium text-foreground">
                                {item.label}
                              </span>
                              {item.subtitle ? (
                                <span className="truncate font-mono text-[13px] text-muted">
                                  {item.subtitle}
                                </span>
                              ) : null}
                            </div>
                          </div>
                          {item.badge ? (
                            <span
                              className={`ml-2 shrink-0 rounded border px-2 py-0.5 font-mono text-[13px] tabular-nums ${
                                item.badgeTone === "error"
                                  ? "border-rose-400/35 bg-rose-500/10 text-rose-300"
                                  : "border-border bg-white/[0.05] text-accent"
                              }`}
                            >
                              {item.badge}
                            </span>
                          ) : (
                            <ArrowRight
                              size={14}
                              className={`ml-2 shrink-0 transition-opacity ${
                                isActive
                                  ? "text-accent opacity-100"
                                  : "opacity-0"
                              }`}
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="flex min-h-11 items-center justify-between border-t border-border/80 px-4 py-2 font-mono text-[13px] text-muted">
          <div className="flex items-center gap-2">
            <span>↑↓ Navigate</span>
            <span>·</span>
            <span>↵ Select</span>
            <span>·</span>
            <span>ESC Close</span>
          </div>
          <span className="hidden text-[13px] sm:inline">Boreal Navigator</span>
        </div>
      </div>
    </div>
  );
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    const handleCustomOpen = () => {
      setOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, handleCustomOpen);
    };
  }, []);

  return open ? <CommandPaletteDialog onClose={handleClose} /> : null;
}
