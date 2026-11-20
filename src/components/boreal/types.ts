export type AuroraIntensity = "quiet" | "balanced" | "vivid";
export type SnowMode = "still" | "flurry";
export type CabinSurface = "frost" | "hearth";

export type RgbColor = [number, number, number];

export const DEFAULT_AURORA_TINT: RgbColor = [45, 212, 191];

export const AURORA_PRESET_STRENGTH: Record<AuroraIntensity, number> = {
  quiet: 20,
  balanced: 60,
  vivid: 100,
};

export function getAuroraPreset(strength: number): AuroraIntensity {
  if (strength <= 33) return "quiet";
  if (strength <= 72) return "balanced";
  return "vivid";
}

export const PROJECT_AURORA_TINTS: Record<string, RgbColor> = {
  "clinical-license-tracker": [52, 211, 153],
  resumeforge: [245, 158, 11],
  "stock-analyst-agent": [56, 189, 248],
  "wc26-travel-mapper": [45, 212, 191],
  "arcane-hand-casting": [167, 139, 250],
  "omni-architect": [34, 211, 238],
  "bespoke-creative-showcase": [232, 121, 249],
  "ml-stock-simulator": [16, 185, 129],
  ripple: [96, 165, 250],
  "ai-lab": [129, 140, 248],
  stacktris: [52, 211, 153],
  "scholars-spark": [251, 146, 60],
  "cp104-intro-programming": [110, 231, 183],
  "cp164-data-structures": [103, 232, 249],
  "cp213-oop": [192, 132, 252],
  "cp363-databases": [147, 197, 253],
};

export function getProjectAuroraTint(slug: string): RgbColor {
  const tint = PROJECT_AURORA_TINTS[slug] ?? DEFAULT_AURORA_TINT;
  return [tint[0], tint[1], tint[2]];
}
