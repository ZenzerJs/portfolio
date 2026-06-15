"use client";

import { useState, Suspense } from "react";
import { ChevronDown, ChevronUp, Play } from "lucide-react";
import type { EmbedConfig } from "@/content/projects";

interface DemoModuleProps {
  embed: EmbedConfig;
}

function DemoEmbed({ embed }: { embed: EmbedConfig }) {
  if (embed.type === "iframe") {
    return (
      <iframe
        src={embed.src}
        title={embed.title || "Interactive demo"}
        className="w-full rounded-2xl border border-white/10"
        style={{ height: "500px" }}
        loading="lazy"
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
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-accent/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Play size={18} className="text-primary" />
          <span className="font-medium">
            {isOpen ? "Hide Interactive Demo" : "Open Interactive Demo"}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp size={18} className="text-muted-foreground" />
        ) : (
          <ChevronDown size={18} className="text-muted-foreground" />
        )}
      </button>

      {isOpen && (
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
      )}
    </div>
  );
}
