"use client";

import { useState, Suspense } from "react";
import { ChevronDown, Play } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { EmbedConfig } from "@/content/projects";

import { BroadcastTVConsole } from "@/components/showcase/BroadcastTVConsole";

interface DemoModuleProps {
  embed: EmbedConfig;
}

function DemoEmbed({ embed }: { embed: EmbedConfig }) {
  if (embed.src.includes("shanesia-portfolio")) {
    return <BroadcastTVConsole initialUrl={embed.src} title={embed.title} />;
  }

  if (embed.type === "iframe") {
    return (
      <iframe
        src={embed.src}
        title={embed.title || "Interactive demo"}
        className="w-full rounded-2xl border border-white/10"
        style={{ height: embed.height ?? 500 }}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  if (embed.type === "video") {
    return (
      <video
        src={embed.src}
        controls
        className="w-full rounded-2xl border border-white/10"
        style={{ maxHeight: "500px" }}
      >
        <track kind="captions" />
      </video>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
      <p>Custom component embed — coming soon.</p>
    </div>
  );
}

export function DemoModule({ embed }: DemoModuleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-card/50 backdrop-blur-sm overflow-hidden">
      <button
        type="button"
        id="demo-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="demo-panel"
        className="w-full flex items-center justify-between p-5 text-left hover:bg-accent/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Play size={18} className="text-primary" aria-hidden="true" />
          <span className="font-medium">
            {isOpen ? "Hide Interactive Demo" : "Open Interactive Demo"}
          </span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown size={18} className="text-muted-foreground" aria-hidden="true" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="demo-panel"
            key="demo-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-5">
              <Suspense
                fallback={
                  <div className="w-full h-64 rounded-xl bg-muted animate-pulse flex items-center justify-center text-muted-foreground text-sm">
                    Loading demo...
                  </div>
                }
              >
                <DemoEmbed embed={embed} />
              </Suspense>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
