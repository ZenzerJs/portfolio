"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import BorderGlow from "@/components/BorderGlow";

interface SystemBlueprint {
  id: string;
  name: string;
  category: "AI & Compilers" | "Systems Engineering" | "Quantitative & GIS" | "Spatial & WebGL";
  stack: string;
  moat: string;
  signals: string[];
  features: { title: string; desc: string }[];
  accentType: "teal" | "violet" | "cyan";
  slug: string;
  status: string;
}

const BLUEPRINTS: SystemBlueprint[] = [
  {
    id: "omni-architect",
    name: "Omni-Architect",
    category: "AI & Compilers",
    stack: "FastAPI · DeepSeek-VL (1.3B) · Groq API · LangGraph",
    moat: "Local/Cloud Split Spec-to-Code Pipeline",
    signals: [
      "VRAM optimization",
      "Self-correcting AST compiler",
      "Domain parameterization",
    ],
    features: [
      {
        title: "Self-Healing Compilation Loop",
        desc: "Validates generated React/LaTeX through AST syntax parsers; pipes runtime syntax errors back into self-correction nodes.",
      },
      {
        title: "Dynamic Domain Tuning",
        desc: "Adjusts temperature & top-p via heuristic classifier (0.1 for STEM LaTeX vs. 0.7 for creative copy).",
      },
    ],
    accentType: "teal",
    slug: "omni-architect",
    status: "Production Ready",
  },
  {
    id: "resumeforge",
    name: "ResumeForge",
    category: "AI & Compilers",
    stack: "Next.js 15 · Prisma · Postgres · Typst WASM · Docx",
    moat: "Fail-Closed Mechanical Fact-Guardrails",
    signals: [
      "Client-side WASM compilation",
      "SHA-256 manifest",
      "100-point deterministic ATS rubric",
    ],
    features: [
      {
        title: "Parallel ZIP Bundling",
        desc: "Exports client-side application packages (.pdf, .docx, .txt, .typ, manifest.json) with SHA-256 integrity verification.",
      },
      {
        title: "100-Point Deterministic ATS Rubric",
        desc: "Audits base health, required/preferred skill matches, and role profile overlays with 0 LLM hallucination dependency.",
      },
    ],
    accentType: "cyan",
    slug: "resumeforge",
    status: "355 Unit / 80 E2E",
  },
  {
    id: "stock-analyst-agent",
    name: "Stock Analyst Agent",
    category: "Quantitative & GIS",
    stack: "FastAPI · LangGraph · React 19 · SQLite · yfinance",
    moat: "Multi-Tool Research & 8Q SQLite Caching",
    signals: [
      "Dual Groq/Gemini failover",
      "Volume flow modeling",
      "SEC filing provenance",
    ],
    features: [
      {
        title: "Dual-Provider Failover Router",
        desc: "Intercepts HTTP 429 quota exhaustion on Groq; automatically falls back to Gemini 2.5 Flash without dropping graph state.",
      },
      {
        title: "Order Flow & Capital Analytics",
        desc: "Calculates buy/sell volume distributions from daily OHLC candles to render capital accumulation trends.",
      },
    ],
    accentType: "violet",
    slug: "stock-analyst-agent",
    status: "Autonomous Graph",
  },
  {
    id: "arcane-hand-casting",
    name: "Arcane Handcasting",
    category: "Spatial & WebGL",
    stack: "Next.js 16 · Pixi.js v8 · MediaPipe Tasks-Vision",
    moat: "Zero-Latency In-Browser Spatial Computing",
    signals: [
      "60Hz 3D landmarks",
      "Palm-width invariance transform",
      "Nearest-neighbor gesture matching",
    ],
    features: [
      {
        title: "Multi-Instance Dual-Cast Engine",
        desc: "Tracks left/right hands independently, allowing simultaneous dual-element spells (e.g. Aegis Ward + Ember Grasp).",
      },
      {
        title: "Object-Cover Viewport Transformer",
        desc: "Reconciles raw camera aspect ratios with CSS cover containers to eliminate spatial edge-distortion jitter.",
      },
    ],
    accentType: "teal",
    slug: "arcane-hand-casting",
    status: "60 FPS WebGL",
  },
  {
    id: "wc26-travel-mapper",
    name: "WC26 Travel Mapper",
    category: "Quantitative & GIS",
    stack: "Next.js 14 · Mapbox GL JS · Amadeus · Skyscanner",
    moat: "Multi-Modal Geodesic Tournament Routing",
    signals: [
      "Great Circle geodesic math",
      "Along-the-route POI sampling",
      "Carbon footprint modeling",
    ],
    features: [
      {
        title: "Great Circle Geodesic Math",
        desc: "Interpolates true spherical curvature arcs for flight legs alongside terrestrial road network sampling.",
      },
      {
        title: "Route-Vertex Waypoint Ordering",
        desc: "Orders user waypoints based on closest polyline vertex index to prevent navigation backtracking.",
      },
    ],
    accentType: "cyan",
    slug: "wc26-travel-mapper",
    status: "16 Host Cities",
  },
  {
    id: "bespoke-creative-showcase",
    name: "Showcase & Portfolio v2",
    category: "Systems Engineering",
    stack: "Next.js 16 · Tailwind CSS · GSAP · Lenis · Framer Motion",
    moat: "Hardware Device Docking & CRT TV Consoles",
    signals: [
      "3D CSS MacBook Pro lid animation",
      "Phosphor scanline filters",
      "Spring micro-interactions",
    ],
    features: [
      {
        title: "GSAP CRT Phosphor Collapse",
        desc: "Timeline power-down animations (scaleY: 0.005 → scaleX: 0) and rotary dial overshoot physics.",
      },
      {
        title: "100% WCAG Non-Blocking Overlay",
        desc: "Enforces strict pointer-events-none on scanline and glare overlays to preserve full iframe scrollability.",
      },
    ],
    accentType: "violet",
    slug: "bespoke-creative-showcase",
    status: "Hardware Simulated",
  },
];

const CATEGORIES = ["All", "AI & Compilers", "Systems Engineering", "Quantitative & GIS", "Spatial & WebGL"] as const;

export function ArchitectureMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedSystem, setExpandedSystem] = useState<string | null>(null);

  const filtered = selectedCategory === "All"
    ? BLUEPRINTS
    : BLUEPRINTS.filter((b) => b.category === selectedCategory);

  const getAccentStyles = (type: "teal" | "violet" | "cyan") => {
    switch (type) {
      case "teal":
        return {
          text: "text-accent",
          badge: "chip--teal",
          glow: "group-hover:border-accent/40 group-hover:shadow-[0_0_20px_-5px_rgba(45,212,191,0.18)]",
          border: "border-accent/20",
        };
      case "violet":
        return {
          text: "text-violet",
          badge: "chip--violet",
          glow: "group-hover:border-violet/40 group-hover:shadow-[0_0_20px_-5px_rgba(167,139,250,0.18)]",
          border: "border-violet/20",
        };
      case "cyan":
      default:
        return {
          text: "text-cyan-300",
          badge: "chip--teal",
          glow: "group-hover:border-cyan-400/40 group-hover:shadow-[0_0_20px_-5px_rgba(56,189,248,0.18)]",
          border: "border-cyan-400/20",
        };
    }
  };

  const getGlowConfig = (type: "teal" | "violet" | "cyan") => {
    switch (type) {
      case "teal":
        return {
          glowColor: "172 75 55",
          colors: ["#2dd4bf", "#14b8a6", "#38bdf8"],
        };
      case "violet":
        return {
          glowColor: "268 80 75",
          colors: ["#a78bfa", "#818cf8", "#2dd4bf"],
        };
      case "cyan":
      default:
        return {
          glowColor: "192 85 60",
          colors: ["#38bdf8", "#2dd4bf", "#a78bfa"],
        };
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Top Controller & Category Filter */}
      <div className="glass-card flex flex-col gap-6 p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex size-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
              Core Systems Architecture
            </span>
          </div>
          <span className="font-mono text-xs text-muted">
            6 Flagship Runtimes · Synchronized
          </span>
        </div>

        <p className="text-sm sm:text-base text-soft leading-relaxed max-w-3xl">
          Unified technical moats across local/cloud multi-agent graphs, deterministic AST fact-guardrails,
          real-time spatial vision tracking, and hardware-simulated interaction engines.
        </p>

        {/* Filter Toggle Group (Aurora Pill Styled) */}
        <div className="flex flex-wrap items-center gap-2 border-t border-[var(--panel-border)] pt-5">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-3.5 py-1.5 rounded-full font-mono text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-accent text-neutral-950 font-semibold shadow-sm"
                    : "bg-white/[0.03] text-muted hover:text-foreground hover:bg-white/[0.06] border border-white/[0.08]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Systems Matrix Table with Precision Alignment */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--panel-border)] font-mono text-[11px] uppercase tracking-wider text-muted bg-white/[0.02]">
                <th className="py-3.5 px-6 font-semibold">System</th>
                <th className="py-3.5 px-4 font-semibold">Primary Architecture</th>
                <th className="py-3.5 px-4 font-semibold">Technical Moat</th>
                <th className="py-3.5 px-4 font-semibold">Verification Signals</th>
                <th className="py-3.5 px-6 font-semibold text-right">Deep Dive</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--panel-border)] font-mono text-xs">
              {filtered.map((sys) => {
                const styles = getAccentStyles(sys.accentType);
                const isExpanded = expandedSystem === sys.id;

                return (
                  <tr
                    key={sys.id}
                    onClick={() => setExpandedSystem(isExpanded ? null : sys.id)}
                    className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                  >
                    {/* System Name & Status */}
                    <td className="py-4 px-6 align-middle">
                      <div className="flex flex-col gap-1">
                        <span className={`font-semibold text-sm ${styles.text}`}>
                          {sys.name}
                        </span>
                        <span className="text-[10px] text-muted font-normal">
                          {sys.status}
                        </span>
                      </div>
                    </td>

                    {/* Primary Architecture */}
                    <td className="py-4 px-4 align-middle font-sans text-xs text-soft max-w-[220px]">
                      {sys.stack}
                    </td>

                    {/* Technical Moat */}
                    <td className="py-4 px-4 align-middle font-sans text-xs font-medium text-foreground max-w-[260px]">
                      {sys.moat}
                    </td>

                    {/* Verification Signals */}
                    <td className="py-4 px-4 align-middle">
                      <div className="flex flex-wrap gap-1.5 max-w-[280px]">
                        {sys.signals.map((sig) => (
                          <span
                            key={sig}
                            className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-muted border border-white/[0.08]"
                          >
                            <CheckCircle2 size={10} className={styles.text} />
                            {sig}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 align-middle text-right font-sans">
                      <Link
                        href={`/projects/${sys.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent/80 font-mono font-medium transition-colors"
                      >
                        Inspect
                        <ArrowUpRight size={13} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Asymmetric Deep-Dive Grid Aligned with 2-Column Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((sys) => {
            const styles = getAccentStyles(sys.accentType);
            const glowConfig = getGlowConfig(sys.accentType);

            return (
              <motion.div
                layout
                key={sys.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <BorderGlow
                  borderRadius={24}
                  edgeSensitivity={30}
                  glowRadius={36}
                  glowIntensity={1.0}
                  coneSpread={12}
                  glowColor={glowConfig.glowColor}
                  colors={glowConfig.colors}
                  backgroundColor="rgba(15, 23, 42, 0.55)"
                  className="h-full"
                >
                  <div className="p-6 sm:p-7 h-full flex flex-col justify-between">
                    <div className="flex flex-col gap-4">
                    {/* Card Header: Category & Stack */}
                    <div className="flex items-center justify-between gap-3">
                      <span className={`chip ${styles.badge} text-[11px] font-mono font-medium`}>
                        {sys.category}
                      </span>
                      <span className="font-mono text-[11px] text-muted">
                        {sys.status}
                      </span>
                    </div>

                    {/* Title & Moat */}
                    <div>
                      <Link
                        href={`/projects/${sys.slug}`}
                        className="group inline-flex items-center gap-1.5 text-xl font-semibold text-foreground hover:text-accent transition-colors"
                      >
                        {sys.name}
                        <ArrowUpRight
                          size={17}
                          className="text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                      </Link>
                      <p className="mt-1.5 text-xs font-mono text-muted leading-relaxed">
                        Moat: <span className="text-soft font-sans font-medium">{sys.moat}</span>
                      </p>
                    </div>

                    {/* Feature Specs */}
                    <div className="flex flex-col gap-2.5 mt-2">
                      {sys.features.map((feat) => (
                        <div
                          key={feat.title}
                          className="flex flex-col gap-1 p-3.5 rounded-xl bg-black/40 border border-white/[0.07]"
                        >
                          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-foreground">
                            <span className={styles.text}>✓</span>
                            <span>{feat.title}</span>
                          </div>
                          <p className="text-xs text-muted leading-relaxed font-sans pl-4">
                            {feat.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Metadata */}
                  <div className="pt-4 mt-4 flex items-center justify-between border-t border-[var(--panel-border)] font-mono text-[11px] text-muted">
                    <span className="truncate max-w-[200px]">{sys.stack}</span>
                    <Link
                      href={`/projects/${sys.slug}`}
                      className="text-accent hover:underline flex items-center gap-1 font-medium"
                    >
                      View System Specs <ArrowUpRight size={12} />
                    </Link>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
