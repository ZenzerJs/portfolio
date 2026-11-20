import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  DEFAULT_AURORA_TINT,
  PROJECT_AURORA_TINTS,
  getProjectAuroraTint,
} from "@/components/boreal/types";
import {
  filterCommandItems,
  resolveCommandPaletteKeyAction,
  type CommandSearchItem,
} from "@/components/layout/commandPaletteLogic";
import { getTechIconInfo } from "@/components/ui/TechIcon";
import { projects } from "@/content/projects";
import {
  aboutContent,
  educationEntries,
  experiences,
  profile,
} from "@/data/portfolio";

describe("Aurora Project Tints (@/components/boreal/types)", () => {
  it("matches exact RGB color tuples for all defined project slugs", () => {
    expect(PROJECT_AURORA_TINTS["clinical-license-tracker"]).toEqual([52, 211, 153]);
    expect(PROJECT_AURORA_TINTS["resumeforge"]).toEqual([245, 158, 11]);
    expect(PROJECT_AURORA_TINTS["stock-analyst-agent"]).toEqual([56, 189, 248]);
    expect(PROJECT_AURORA_TINTS["wc26-travel-mapper"]).toEqual([45, 212, 191]);
    expect(PROJECT_AURORA_TINTS["arcane-hand-casting"]).toEqual([167, 139, 250]);
    expect(PROJECT_AURORA_TINTS["ripple"]).toEqual([96, 165, 250]);
    expect(PROJECT_AURORA_TINTS["ai-lab"]).toEqual([129, 140, 248]);
  });

  it("returns DEFAULT_AURORA_TINT [45, 212, 191] for unknown slugs", () => {
    expect(DEFAULT_AURORA_TINT).toEqual([45, 212, 191]);
    expect(getProjectAuroraTint("non-existent-project")).toEqual([45, 212, 191]);
  });

  it("returns a fresh array copy so mutating the return value does not mutate the constant", () => {
    const tint1 = getProjectAuroraTint("clinical-license-tracker");
    tint1[0] = 999;
    const tint2 = getProjectAuroraTint("clinical-license-tracker");
    expect(tint2[0]).toBe(52);
    expect(PROJECT_AURORA_TINTS["clinical-license-tracker"][0]).toBe(52);

    const defaultTint = getProjectAuroraTint("unknown-slug");
    defaultTint[0] = 999;
    expect(DEFAULT_AURORA_TINT[0]).toBe(45);
  });
});

describe("Command Palette Logic (@/components/layout/commandPaletteLogic)", () => {
  const sampleItems: CommandSearchItem[] = [
    {
      id: "resumeforge",
      group: "projects",
      label: "ResumeForge",
      subtitle: "Tailored typst resume engine",
      keywords: ["latex", "ai", "ats", "wasm"],
    },
    {
      id: "clinical",
      group: "projects",
      label: "Clinical License Tracker",
      subtitle: "Enterprise license tracking system",
      keywords: ["rbac", "audit", "hipaa", "ad"],
    },
    {
      id: "copy-email",
      group: "quick",
      label: "Copy Email",
      subtitle: "hello@example.com",
      keywords: ["contact", "inbox"],
    },
  ];

  it("returns all items when query is empty or whitespace", () => {
    expect(filterCommandItems(sampleItems, "")).toHaveLength(3);
    expect(filterCommandItems(sampleItems, "   ")).toHaveLength(3);
  });

  it("filters items case-insensitively across label, subtitle, group, and keywords", () => {
    // By label
    expect(filterCommandItems(sampleItems, "resumeforge")).toHaveLength(1);
    expect(filterCommandItems(sampleItems, "RESUME")).toHaveLength(1);

    // By subtitle
    expect(filterCommandItems(sampleItems, "engine")).toHaveLength(1);

    // By group
    expect(filterCommandItems(sampleItems, "projects")).toHaveLength(2);

    // By keywords
    expect(filterCommandItems(sampleItems, "wasm")).toHaveLength(1);
    expect(filterCommandItems(sampleItems, "HIPAA")).toHaveLength(1);
  });

  it("supports multi-token matching where every token must match across fields", () => {
    expect(filterCommandItems(sampleItems, "projects ats")).toHaveLength(1);
    expect(filterCommandItems(sampleItems, "projects rbac")).toHaveLength(1);
    expect(filterCommandItems(sampleItems, "projects nonexistent")).toHaveLength(0);
  });

  it("resolves key actions: Escape, Home, End, Enter, ArrowDown, ArrowUp, and boundary wrapping", () => {
    // Escape always closes
    expect(resolveCommandPaletteKeyAction("Escape", 0, 5)).toEqual({ type: "close" });

    // Empty list returns "none" for navigation & selection
    expect(resolveCommandPaletteKeyAction("ArrowDown", 0, 0)).toEqual({ type: "none" });
    expect(resolveCommandPaletteKeyAction("ArrowUp", 0, 0)).toEqual({ type: "none" });
    expect(resolveCommandPaletteKeyAction("Enter", 0, 0)).toEqual({ type: "none" });

    // ArrowDown standard increment and wrap-around
    expect(resolveCommandPaletteKeyAction("ArrowDown", 0, 3)).toEqual({ type: "move", nextIndex: 1 });
    expect(resolveCommandPaletteKeyAction("ArrowDown", 2, 3)).toEqual({ type: "move", nextIndex: 0 });

    // ArrowUp standard decrement and wrap-around
    expect(resolveCommandPaletteKeyAction("ArrowUp", 2, 3)).toEqual({ type: "move", nextIndex: 1 });
    expect(resolveCommandPaletteKeyAction("ArrowUp", 0, 3)).toEqual({ type: "move", nextIndex: 2 });

    // Home & End
    expect(resolveCommandPaletteKeyAction("Home", 2, 5)).toEqual({ type: "move", nextIndex: 0 });
    expect(resolveCommandPaletteKeyAction("End", 1, 5)).toEqual({ type: "move", nextIndex: 4 });

    // Enter selects clamped activeIndex
    expect(resolveCommandPaletteKeyAction("Enter", 2, 5)).toEqual({ type: "select", index: 2 });
    expect(resolveCommandPaletteKeyAction("Enter", -1, 5)).toEqual({ type: "select", index: 0 });
    expect(resolveCommandPaletteKeyAction("Enter", 10, 5)).toEqual({ type: "select", index: 4 });

    // Unrecognized key returns "none"
    expect(resolveCommandPaletteKeyAction("Tab", 0, 5)).toEqual({ type: "none" });

    // Home & End on empty list return "none"
    expect(resolveCommandPaletteKeyAction("Home", 0, 0)).toEqual({ type: "none" });
    expect(resolveCommandPaletteKeyAction("End", 0, 0)).toEqual({ type: "none" });

    // Out-of-range activeIndex for ArrowDown/ArrowUp wraps safely within [0, length - 1]
    const downFromNeg = resolveCommandPaletteKeyAction("ArrowDown", -1, 3);
    expect(downFromNeg.type).toBe("move");
    if (downFromNeg.type === "move") {
      expect(downFromNeg.nextIndex).toBeGreaterThanOrEqual(0);
      expect(downFromNeg.nextIndex).toBeLessThan(3);
    }
    const upFromHigh = resolveCommandPaletteKeyAction("ArrowUp", 10, 3);
    expect(upFromHigh.type).toBe("move");
    if (upFromHigh.type === "move") {
      expect(upFromHigh.nextIndex).toBeGreaterThanOrEqual(0);
      expect(upFromHigh.nextIndex).toBeLessThan(3);
    }
  });
});

describe("TechIcon Mapping & Contrast Guard (@/components/ui/TechIcon)", () => {
  it("returns matched: true with non-empty SVG path for supported technologies", () => {
    for (const name of ["TypeScript", "Python", "PostgreSQL", "Typst"]) {
      const info = getTechIconInfo(name);
      expect(info.matched).toBe(true);
      expect(info.path).toBeDefined();
      expect(typeof info.path).toBe("string");
      expect(info.path && info.path.length > 0).toBe(true);
    }
  });

  it("normalizes dark brand colors to contrast-safe #e2e8f0", () => {
    for (const darkBrand of ["Next.js", "Vercel", "GitHub"]) {
      const info = getTechIconInfo(darkBrand);
      expect(info.matched).toBe(true);
      expect(info.color.toLowerCase()).toBe("#e2e8f0");
    }
  });

  it("safely returns matched: false for unmatched conceptual strings", () => {
    for (const unmatched of ["Active Directory", "RBAC"]) {
      const info = getTechIconInfo(unmatched);
      expect(info.matched).toBe(false);
    }
  });
});

describe("Verified Projects & Portfolio Data Integrity", () => {
  it("verifies expected external liveUrl and repoUrl values for key projects", () => {
    const rf = projects.find((p) => p.slug === "resumeforge");
    expect(rf?.liveUrl).toBe("https://resumeforge.studio/");

    const arcane = projects.find((p) => p.slug === "arcane-hand-casting");
    expect(arcane?.liveUrl).toBe("https://arcane-hand-casting.vercel.app/");

    const ripple = projects.find((p) => p.slug === "ripple");
    expect(ripple?.liveUrl).toBe("https://zenzerjs.github.io/Ripple/");

    const aiLab = projects.find((p) => p.slug === "ai-lab");
    expect(aiLab?.liveUrl).toBe("https://zenzerjs.github.io/Ai-Lab/");

    const sia = projects.find((p) => p.slug === "bespoke-creative-showcase");
    expect(sia?.repoUrl).toBe("https://github.com/ZenzerJs/Sia-Portfolio");
  });

  it("removes geometry-dash-ai and includes ripple, ai-lab, stacktris", () => {
    const slugs = projects.map((p) => p.slug);
    expect(slugs).not.toContain("geometry-dash-ai");
    expect(slugs).toContain("ripple");
    expect(slugs).toContain("ai-lab");
    expect(slugs).toContain("stacktris");
  });

  it("includes ripple and ai-lab in PROJECT_AURORA_TINTS", () => {
    expect(PROJECT_AURORA_TINTS["ripple"]).toBeDefined();
    expect(PROJECT_AURORA_TINTS["ai-lab"]).toBeDefined();
    expect(PROJECT_AURORA_TINTS["ripple"]).toEqual([96, 165, 250]);
    expect(PROJECT_AURORA_TINTS["ai-lab"]).toEqual([129, 140, 248]);
  });

  it("guards privacy and accuracy: no Management Option and no Google interview leakage", () => {
    const combinedData = JSON.stringify({
      profile,
      aboutContent,
      experiences,
      educationEntries,
    });
    expect(combinedData).not.toContain("Management Option");
    expect(combinedData.toLowerCase()).not.toContain("google");
  });

  it("verifies every project has non-empty overview, highlights, and whatIBuilt, and zero projects carry legacy embed", () => {
    expect(projects.length).toBeGreaterThan(0);
    for (const project of projects) {
      expect(typeof project.overview, `Missing overview on ${project.slug}`).toBe("string");
      expect(project.overview?.trim().length, `Empty overview on ${project.slug}`).toBeGreaterThan(0);
      expect(Array.isArray(project.highlights)).toBe(true);
      expect(project.highlights.length, `Empty highlights on ${project.slug}`).toBeGreaterThan(0);
      expect(Array.isArray(project.whatIBuilt)).toBe(true);
      expect(project.whatIBuilt.length, `Empty whatIBuilt on ${project.slug}`).toBeGreaterThan(0);
      expect("embed" in (project as unknown as Record<string, unknown>)).toBe(false);
    }
  });

  it("verifies resumeforge uses real preview image /projects/resumeforge-studio.png and liveUrl https://resumeforge.studio/", () => {
    const rf = projects.find((p) => p.slug === "resumeforge");
    expect(rf).toBeDefined();
    expect(rf?.image).toBe("/projects/resumeforge-studio.png");
    expect(rf?.liveUrl).toBe("https://resumeforge.studio/");
  });

  it("enforces frame-src 'none' in next.config.ts CSP", () => {
    const nextConfigPath = path.resolve(process.cwd(), "next.config.ts");
    const nextConfigText = fs.readFileSync(nextConfigPath, "utf8");
    expect(nextConfigText).toContain("frame-src 'none'");
  });

  it("does not define Content-Security-Policy in vercel.json to prevent stale frame-src drift", () => {
    const vercelConfigPath = path.resolve(process.cwd(), "vercel.json");
    const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, "utf8")) as {
      headers?: Array<{ headers?: Array<{ key: string; value: string }> }>;
    };
    const allHeaderKeys = (vercelConfig.headers ?? []).flatMap((rule) =>
      (rule.headers ?? []).map((h) => h.key.toLowerCase()),
    );
    expect(allHeaderKeys).not.toContain("content-security-policy");
  });

  it("omits numeric grades (98%, 99%, final grade) from educationEntries and projects", () => {
    const combined = JSON.stringify({ educationEntries, projects });
    expect(combined).not.toContain("98%");
    expect(combined).not.toContain("99%");
    expect(combined.toLowerCase()).not.toContain("final grade");
  });

  it("defines an entry in PROJECT_AURORA_TINTS for every project slug", () => {
    for (const project of projects) {
      expect(
        PROJECT_AURORA_TINTS[project.slug],
        `Missing PROJECT_AURORA_TINTS entry for ${project.slug}`,
      ).toBeDefined();
    }
  });
});
