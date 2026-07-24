"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { links, navSections, profile } from "@/data/portfolio";

const MENU_PANEL_ID = "mobile-menu-panel";

function resolveActiveSection(sections: HTMLElement[]) {
  const activationLine = 120;
  let currentId = sections[0]?.id ?? "top";

  for (const section of sections) {
    if (section.getBoundingClientRect().top <= activationLine) {
      currentId = section.id;
    }
  }

  if (window.scrollY < 80) return "top";
  return currentId;
}

export function SidebarNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeId, setActiveId] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const [pillY, setPillY] = useState(0);
  const [pillH, setPillH] = useState(42);
  const [pillReady, setPillReady] = useState(false);
  const menuButtonId = useId();
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const navRef = useRef<HTMLElement>(null);

  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const scrollToSection = useCallback(
    (id: string) => {
      closeMenu();
      if (!isHome) {
        window.location.href = `/#${id}`;
        return;
      }
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
    },
    [isHome, closeMenu],
  );

  /* Move pill with transform only — no layoutId / spring */
  const syncPill = useCallback((id: string) => {
    const link = linkRefs.current.get(id);
    if (!link) return;
    setPillY(link.offsetTop);
    setPillH(link.offsetHeight);
    setPillReady(true);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const sectionIds = navSections.map(({ id }) => id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    let ticking = false;
    const update = () => {
      const next = resolveActiveSection(sections);
      setActiveId((prev) => (prev === next ? prev : next));
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    syncPill(activeId);
  }, [activeId, syncPill]);

  useEffect(() => {
    const onResize = () => syncPill(activeId);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [activeId, syncPill]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  const renderNavLinks = (desktop = false) => (
    <>
      {navSections.map(({ id, label }) => {
        const isActive = isHome && activeId === id;
        return (
          <a
            key={id}
            href={sectionHref(id)}
            ref={
              desktop
                ? (node) => {
                    if (node) linkRefs.current.set(id, node);
                    else linkRefs.current.delete(id);
                  }
                : undefined
            }
            onClick={(event) => {
              event.preventDefault();
              scrollToSection(id);
            }}
            className={`sidebar-link ${desktop ? "has-pill" : ""} ${isActive ? "is-active" : ""}`}
          >
            <span className="sidebar-link-dot" aria-hidden="true" />
            {label}
          </a>
        );
      })}
    </>
  );

  const socialLinks = (
    <div className="flex gap-2">
      <a
        href={links.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="inline-flex min-h-11 min-w-11 items-center justify-center text-muted hover:text-accent"
      >
        <Github size={18} />
      </a>
      <a
        href={links.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="inline-flex min-h-11 min-w-11 items-center justify-center text-muted hover:text-accent"
      >
        <Linkedin size={18} />
      </a>
      <a
        href={`mailto:${profile.email}`}
        aria-label="Email"
        className="inline-flex min-h-11 min-w-11 items-center justify-center text-muted hover:text-accent"
      >
        <Mail size={18} />
      </a>
    </div>
  );

  return (
    <>
      <header className="mobile-nav lg:hidden">
        <div>
          <p className="sidebar-brand">Portfolio</p>
          <p className="sidebar-name text-base">{profile.name}</p>
        </div>
        <button
          id={menuButtonId}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls={MENU_PANEL_ID}
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted hover:text-foreground"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {menuOpen ? (
        <div
          id={MENU_PANEL_ID}
          className="mobile-menu-panel lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className="sidebar-nav !mt-0" aria-label="Primary">
            {renderNavLinks()}
          </nav>
          <div className="mt-6">{socialLinks}</div>
          <a
            href={links.resume}
            download="Jayden_Saha_Resume.pdf"
            className="btn-ghost mt-4 w-full text-xs"
            onClick={closeMenu}
          >
            Resume
          </a>
        </div>
      ) : null}

      <aside className="sidebar hidden lg:flex">
        <div>
          <p className="sidebar-brand">2026</p>
          <p className="sidebar-name">{profile.name}</p>
        </div>

        <nav ref={navRef} className="sidebar-nav" aria-label="Primary">
          {isHome ? (
            <span
              className={`sidebar-pill ${pillReady ? "is-ready" : ""}`}
              style={{
                height: pillH,
                transform: `translate3d(0, ${pillY}px, 0)`,
              }}
              aria-hidden="true"
            />
          ) : null}
          {renderNavLinks(true)}
        </nav>

        <div className="sidebar-footer">
          <p className="sidebar-availability">{profile.availability}</p>
          <div className="sidebar-socials">
            <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={16} />
            </a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <Mail size={16} />
            </a>
          </div>
          <a
            href={links.resume}
            download="Jayden_Saha_Resume.pdf"
            className="btn-ghost mt-4 w-full text-xs"
          >
            Resume
          </a>
        </div>
      </aside>
    </>
  );
}
