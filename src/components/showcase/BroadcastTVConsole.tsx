"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";

interface ChannelItem {
  id: string;
  name: string;
  category: string;
  liveUrl: string;
  description: string;
}

const CHANNELS: ChannelItem[] = [
  {
    id: "ch-01",
    name: "Sia Creative Broadcast",
    category: "Agency Portfolio",
    liveUrl: "https://shanesia-portfolio.vercel.app/",
    description: "Retro CRT hardware interface & orbit engine showcase.",
  },
  {
    id: "ch-02",
    name: "Stock Analyst Agent",
    category: "LangGraph Finance",
    liveUrl: "https://stock-analyst-agent-ashen.vercel.app/",
    description: "Autonomous equity research desk with SEC filing citations.",
  },
  {
    id: "ch-03",
    name: "WC26 Travel Mapper",
    category: "Geospatial GIS",
    liveUrl: "https://wc26-travel-mapper.vercel.app/",
    description: "16 North American host cities routing & flight engine.",
  },
];

interface BroadcastTVConsoleProps {
  initialUrl?: string;
  title?: string;
}

export function BroadcastTVConsole({ initialUrl, title }: BroadcastTVConsoleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const dialRef = useRef<HTMLDivElement>(null);

  const [currentChannelIndex, setCurrentChannelIndex] = useState(0);
  const [isPowered, setIsPowered] = useState(true);
  const [guideOpen, setGuideOpen] = useState(false);

  const activeChannel = CHANNELS[currentChannelIndex];
  const targetUrl = initialUrl || activeChannel.liveUrl;

  const isPoweredRef = useRef(isPowered);

  useEffect(() => {
    isPoweredRef.current = isPowered;
  }, [isPowered]);

  // 1. GSAP CRT Phosphor Collapse Timeline
  const togglePower = () => {
    const screen = screenRef.current;
    if (!screen) return;

    const tl = gsap.timeline();

    if (isPoweredRef.current) {
      // CRT Phosphor Collapse: compress vertically, snap horizontally to beam slit, fade
      tl.to(screen, {
        scaleY: 0.005,
        filter: "brightness(3) contrast(2)",
        duration: 0.18,
        ease: "power4.inOut",
      })
        .to(screen, {
          scaleX: 0,
          filter: "brightness(5)",
          duration: 0.14,
          ease: "power3.in",
        })
        .set(screen, {
          opacity: 0,
          onComplete: () => setIsPowered(false),
        });
    } else {
      // CRT Bloom Up: horizontal slit expands, vertical elastic pop
      setIsPowered(true);
      tl.set(screen, { opacity: 1, scaleX: 0.005, scaleY: 0.005, filter: "brightness(4)" })
        .to(screen, {
          scaleX: 1,
          duration: 0.15,
          ease: "power3.out",
        })
        .to(screen, {
          scaleY: 1,
          filter: "brightness(1) contrast(1)",
          duration: 0.24,
          ease: "elastic.out(1, 0.5)",
        });
    }
  };

  // 2. Rotary Channel Knob with Mechanical Overshoot Physics
  const switchChannel = (nextIdx: number, direction: "next" | "prev" = "next") => {
    if (!isPoweredRef.current) {
      togglePower();
    }

    const targetIdx = (nextIdx + CHANNELS.length) % CHANNELS.length;
    setCurrentChannelIndex(targetIdx);

    // Rotary knob spin with mechanical overshoot physics
    if (dialRef.current) {
      const rot = direction === "next" ? "+=45" : "-=45";
      gsap.to(dialRef.current, {
        rotation: rot,
        duration: 0.35,
        ease: "back.out(2)",
      });
    }

    // Screen phosphor hue flicker
    if (screenRef.current) {
      gsap.fromTo(
        screenRef.current,
        { filter: "hue-rotate(90deg) brightness(1.8) contrast(1.4)" },
        { filter: "hue-rotate(0deg) brightness(1) contrast(1)", duration: 0.28, ease: "power2.out" }
      );
    }
  };

  const nextChannel = () => switchChannel(currentChannelIndex + 1, "next");
  const prevChannel = () => switchChannel(currentChannelIndex - 1, "prev");

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        switchChannel(currentChannelIndex + 1, "next");
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        switchChannel(currentChannelIndex - 1, "prev");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentChannelIndex]);

  return (
    <div ref={containerRef} className="w-full rounded-3xl border border-white/10 bg-zinc-950 p-4 sm:p-6 shadow-2xl space-y-4">
      {/* Console Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-2.5">
          <div className="size-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#2dd4bf]" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted font-semibold">
            {title || "CRT Broadcast Console v2"}
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
          <span>CH {String(currentChannelIndex + 1).padStart(2, "0")}:</span>
          <span className="text-foreground font-medium">{activeChannel.name}</span>
        </div>
      </div>

      {/* Screen Enclosure */}
      <div className="relative aspect-[16/10] w-full rounded-2xl bg-black overflow-hidden border border-[var(--panel-border)] shadow-inner flex items-center justify-center">
        {/* Phosphor Scanline Overlay — STRICT pointer-events-none for WCAG iframe scrollability */}
        <div
          className="absolute inset-0 pointer-events-none z-20 opacity-30 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px]"
          aria-hidden="true"
        />

        {/* Curved Screen Glare Overlay — STRICT pointer-events-none */}
        <div
          className="absolute inset-0 pointer-events-none z-20 opacity-20 bg-gradient-to-tr from-transparent via-white/5 to-white/15"
          aria-hidden="true"
        />

        {/* CRT Vignette Border — STRICT pointer-events-none */}
        <div
          className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_80px_rgba(0,0,0,0.85)]"
          aria-hidden="true"
        />

        {/* Live Iframe Screen */}
        <div ref={screenRef} className="relative w-full h-full transform-gpu origin-center">
          {isPowered ? (
            <iframe
              src={targetUrl}
              title={title || activeChannel.name}
              className="w-full h-full border-0"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full bg-[#080b12] flex flex-col items-center justify-center text-muted font-mono text-xs space-y-2">
              <div className="size-2 rounded-full bg-muted/40" />
              <span>[ CATHODE RAY TUBE OFF ]</span>
            </div>
          )}
        </div>
      </div>

      {/* Tactile Control Panel Deck */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 px-1">
        {/* Left: Power Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePower}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono text-xs font-semibold tracking-wider transition-all cursor-pointer shadow-md ${
              isPowered
                ? "bg-white/[0.04] hover:bg-white/[0.08] text-foreground border-white/[0.12]"
                : "bg-black/60 hover:bg-black/80 text-muted border-white/[0.06]"
            }`}
          >
            <span
              className={`size-2 rounded-full ${
                isPowered ? "bg-accent shadow-[0_0_8px_#2dd4bf]" : "bg-muted/40"
              }`}
            />
            <span>{isPowered ? "POWER ON" : "STANDBY"}</span>
          </button>

          <button
            type="button"
            onClick={() => setGuideOpen(!guideOpen)}
            className={`px-3 py-2 rounded-xl border font-mono text-xs transition-colors cursor-pointer ${
              guideOpen
                ? "bg-accent/15 border-accent/40 text-accent"
                : "bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] text-muted"
            }`}
          >
            TV GUIDE {guideOpen ? "▲" : "▼"}
          </button>
        </div>

        {/* Center: Keyboard Hint */}
        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-muted">
          <span className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-soft">←</span>
          <span className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-soft">→</span>
          <span>Arrow Keys Switch Channel</span>
        </div>

        {/* Right: Rotary Dial with Mechanical Overshoot */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={prevChannel}
            className="px-2.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-muted font-mono text-xs cursor-pointer"
          >
            CH -
          </button>

          {/* Rotary Knob */}
          <div
            ref={dialRef}
            onClick={nextChannel}
            title="Click dial to advance channel"
            className="relative size-11 rounded-full bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-700 border-2 border-white/15 flex items-center justify-center shadow-lg cursor-pointer active:scale-95 transition-transform"
          >
            {/* Notch */}
            <div className="w-1 h-3 bg-accent rounded-full -translate-y-2.5 shadow-[0_0_6px_#2dd4bf]" />
            <div className="absolute size-3.5 rounded-full bg-neutral-950 border border-white/10" />
          </div>

          <button
            type="button"
            onClick={nextChannel}
            className="px-2.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-muted font-mono text-xs cursor-pointer"
          >
            CH +
          </button>
        </div>
      </div>

      {/* Guide Drawer */}
      {guideOpen && (
        <div className="pt-3 border-t border-[var(--panel-border)]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {CHANNELS.map((ch, idx) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => switchChannel(idx)}
                className={`p-3 rounded-xl border text-left font-mono transition-all cursor-pointer ${
                  idx === currentChannelIndex
                    ? "bg-accent/10 border-accent/60 text-foreground shadow-[0_0_12px_rgba(45,212,191,0.15)]"
                    : "bg-white/[0.03] border-white/[0.08] hover:border-white/20 text-muted"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="text-accent font-bold">CH {String(idx + 1).padStart(2, "0")}</span>
                  <span className="text-muted uppercase text-[9px]">{ch.category}</span>
                </div>
                <div className="text-xs font-semibold text-foreground truncate">{ch.name}</div>
                <p className="text-[11px] text-muted mt-1 line-clamp-1">{ch.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
