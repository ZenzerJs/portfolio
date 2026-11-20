"use client";

import { memo, useId, type CSSProperties } from "react";

export interface CabinHorizonSvgProps {
  aurora?: "quiet" | "balanced" | "vivid";
  auroraStrength?: number;
  stoked?: boolean;
  onStokeCabin?: () => void;
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Palette                                                             */
/* ------------------------------------------------------------------ */

interface Palette {
  farBack: string;
  farBackShade: string;
  farFront: string;
  farFrontShade: string;
  farSnow: string;
  haze: string;
  ridgeTop: string;
  ridgeBottom: string;
  ridgeRim: string;
  treeBack: string;
  treeBackShade: string;
  treeFront: string;
  treeFrontShade: string;
  treeSnow: string;
  snowTop: string;
  snowMid: string;
  snowLow: string;
  snowRim: string;
  snowShadow: string;
  roofSnowTop: string;
  roofSnowBottom: string;
  icicle: string;
  fgLit: string;
  fgShade: string;
  fgSnow: string;
  fgBank: string;
  ground: string;
  smoke: string;
}

const FROST_PALETTE: Palette = {
  farBack: "#1a2944",
  farBackShade: "#0f1a2e",
  farFront: "#12203a",
  farFrontShade: "#0b1526",
  farSnow: "#a7b9d3",
  haze: "#1c2c47",
  ridgeTop: "#7d90ad",
  ridgeBottom: "#172235",
  ridgeRim: "#d5e1ef",
  treeBack: "#132038",
  treeBackShade: "#0d172a",
  treeFront: "#0a1322",
  treeFrontShade: "#060d18",
  treeSnow: "#b3c3d8",
  snowTop: "#c3d1e2",
  snowMid: "#5b6d89",
  snowLow: "#1a2538",
  snowRim: "#e6eef7",
  snowShadow: "#33445f",
  roofSnowTop: "#f1f6fb",
  roofSnowBottom: "#a3b4ca",
  icicle: "#dbeafe",
  fgLit: "#0a111d",
  fgShade: "#03060b",
  fgSnow: "#8597b1",
  fgBank: "#18233a",
  ground: "#080b12",
  smoke: "#cdd7e4",
};

const WOOD = "#3d2b1f";
const WOOD_DARK = "#22170f";
const WOOD_LIGHT = "#6a4c34";
const WOOD_SHADE = "#1d140e";
const RECESS = "#0f0a07";
const STONE = "#4b505c";
const STONE_DARK = "#2a2e37";
const LOG_END = "#7c5536";
const LOG_RING = "#a37a52";

/* ------------------------------------------------------------------ */
/* Deterministic geometry helpers (integer RNG => SSR/CSR identical)   */
/* ------------------------------------------------------------------ */

interface Pt {
  x: number;
  y: number;
}

const f = (n: number) => Math.round(n * 10) / 10;
const lerp = (a: Pt, b: Pt, t: number): Pt => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});
const P = (p: Pt) => `${f(p.x)} ${f(p.y)}`;

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pts = (list: [number, number][]): Pt[] => list.map(([x, y]) => ({ x, y }));

/** Catmull-Rom spline through points, as cubic beziers (no leading M). */
function smoothThrough(p: Pt[]): string {
  let d = "";
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += `C${P(c1)} ${P(c2)} ${P(p2)}`;
  }
  return d;
}

function interpY(p: Pt[], x: number): number {
  for (let i = 0; i < p.length - 1; i++) {
    if (x >= p[i].x && x <= p[i + 1].x) {
      const t = (x - p[i].x) / (p[i + 1].x - p[i].x);
      return p[i].y + (p[i + 1].y - p[i].y) * t;
    }
  }
  return p[p.length - 1].y;
}

/* ------------------------------------------------------------------ */
/* Spruce generator                                                     */
/* ------------------------------------------------------------------ */

interface TreeSpec {
  x: number;
  y: number;
  h: number;
  w: number;
  tiers: number;
  jitter: number;
  snow: number;
}

interface TreeGeo {
  body: string;
  shade: string;
  snowLit: string;
  snowShade: string;
}

function buildSpruce(t: TreeSpec, rand: () => number): TreeGeo {
  const { x, y, h, w, tiers } = t;
  const top = y - h;
  const crown = h * 0.88;
  const tierH = crown / tiers;
  const apex = { x, y: top };
  const trunkW = Math.max(0.8, w * 0.045);
  const trunkTop = top + crown;

  const side = (dir: 1 | -1) => {
    const tips: Pt[] = [];
    const notches: Pt[] = [];
    for (let i = 0; i < tiers; i++) {
      const k = (i + 1) / tiers;
      const jit = 1 + (rand() - 0.5) * t.jitter;
      const half = (w / 2) * (0.22 + 0.78 * k) * jit;
      const ty = top + crown * k;
      tips.push({ x: x + dir * half, y: ty + tierH * 0.1 });
      notches.push({ x: x + dir * half * 0.42, y: ty - tierH * 0.22 });
    }
    return { tips, notches };
  };

  const R = side(1);
  const L = side(-1);

  const seq = (s: { tips: Pt[]; notches: Pt[] }, dir: 1 | -1) => {
    const out: Pt[] = [];
    for (let i = 0; i < tiers; i++) {
      out.push(s.tips[i]);
      if (i < tiers - 1) out.push(s.notches[i]);
    }
    out.push({ x: x + dir * trunkW, y: trunkTop });
    out.push({ x: x + dir * trunkW, y });
    return out;
  };

  const rSeq = seq(R, 1);
  const lSeq = seq(L, -1).reverse();
  const body = `M${P(apex)}${rSeq.map((p) => `L${P(p)}`).join("")}${lSeq
    .map((p) => `L${P(p)}`)
    .join("")}Z`;
  const shade = `M${P(apex)}${rSeq.map((p) => `L${P(p)}`).join("")}L${f(x)} ${f(y)}Z`;

  const strips = (s: { tips: Pt[]; notches: Pt[] }) => {
    let d = "";
    for (let i = 0; i < tiers; i++) {
      const a = i === 0 ? apex : s.notches[i - 1];
      const b = s.tips[i];
      const th = t.snow * (0.6 + 0.4 * ((i + 1) / tiers));
      const p1 = lerp(a, b, i === 0 ? 0 : 0.12);
      const p2 = lerp(a, b, 0.8);
      const mid = lerp(p1, p2, 0.5);
      d += `M${P(p1)}L${P(p2)}L${f(p2.x)} ${f(p2.y + th * 0.7)}L${f(mid.x)} ${f(
        mid.y + th,
      )}L${f(p1.x)} ${f(p1.y + th * 0.55)}Z`;
    }
    return d;
  };

  return { body, shade, snowLit: strips(L), snowShade: strips(R) };
}

function scatterTrees(
  seed: number,
  x0: number,
  x1: number,
  step: number,
  heightAt: (x: number, r: number) => number,
  baseAt: (x: number) => number,
  opts: { widthRatio?: number; snow?: number } = {},
): TreeGeo[] {
  const rand = rng(seed);
  const out: TreeGeo[] = [];
  let x = x0 + rand() * step * 0.5;
  while (x < x1) {
    const h = heightAt(x, rand());
    const w = h * (opts.widthRatio ?? 0.42) * (0.85 + rand() * 0.3);
    const tiers = Math.max(3, Math.min(9, Math.round(h / 12)));
    out.push(
      buildSpruce(
        {
          x: f(x),
          y: f(baseAt(x) + rand() * 4),
          h,
          w,
          tiers,
          jitter: 0.18,
          snow: opts.snow ?? Math.max(0.9, h * 0.02),
        },
        rand,
      ),
    );
    x += step * (0.6 + rand() * 0.8);
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Static scene geometry (computed once at module load)                */
/* ------------------------------------------------------------------ */

// Far mountain ranges -------------------------------------------------
const BACK_RANGE = pts([
  [-60, 320], [40, 304], [130, 314], [220, 292], [310, 306], [410, 280],
  [492, 294], [580, 262], [652, 276], [736, 228], [796, 248], [858, 198],
  [904, 216], [962, 170], [1012, 204], [1062, 186], [1122, 222], [1180, 192],
  [1242, 150], [1302, 198], [1352, 180], [1404, 212], [1500, 196],
]);
const FRONT_RANGE = pts([
  [-60, 338], [70, 324], [176, 336], [276, 316], [376, 328], [466, 306],
  [556, 320], [646, 298], [716, 308], [796, 272], [866, 294], [928, 254],
  [988, 278], [1038, 262], [1098, 286], [1158, 264], [1210, 282], [1280, 238],
  [1342, 272], [1400, 256], [1500, 270],
]);

function rangeGeo(range: Pt[], capBelow: number) {
  const ridge = `M${range.map(P).join("L")}`;
  const body = `${ridge}L1500 440L-60 440Z`;
  let caps = "";
  let facets = "";
  for (let i = 1; i < range.length - 1; i++) {
    const pk = range[i];
    const l = range[i - 1];
    const r = range[i + 1];
    if (!(pk.y < l.y && pk.y < r.y)) continue;
    const dx = r.x - pk.x;
    facets += `M${P(pk)}L${P(r)}L${f(r.x)} 440L${f(pk.x + dx * 0.3)} 440Z`;
    if (pk.y >= capBelow) continue;
    const c = 0.44;
    const lc = lerp(pk, l, c);
    const rc = lerp(pk, r, c);
    const drop = (lc.y + rc.y) / 2 - pk.y;
    const offs = [0.35, -0.12, 0.55, 0.02, 0.3];
    let jag = "";
    offs.forEach((o, j) => {
      const b = lerp(rc, lc, (j + 1) / 6);
      jag += `L${f(b.x)} ${f(b.y + o * drop)}`;
    });
    caps += `M${P(pk)}L${P(rc)}${jag}L${P(lc)}Z`;
  }
  return { ridge, body, caps, facets };
}

const BACK_GEO = rangeGeo(BACK_RANGE, 232);
const FRONT_GEO = rangeGeo(FRONT_RANGE, 280);

// Mid ridge + forest ------------------------------------------------
const MID_RIDGE = pts([
  [-60, 352], [200, 346], [420, 348], [640, 334], [800, 318], [920, 302],
  [1000, 296], [1100, 292], [1200, 296], [1300, 288], [1380, 286], [1500, 292],
]);
const MID_RIDGE_TOP = `M${P(MID_RIDGE[0])}${smoothThrough(MID_RIDGE)}`;
const MID_RIDGE_BODY = `${MID_RIDGE_TOP}L1500 440L-60 440Z`;
const ridgeY = (x: number) => interpY(MID_RIDGE, x);

const MID_BACK_TREES: TreeGeo[] = [
  ...scatterTrees(11, -30, 640, 22, (_x, r) => 12 + r * 18, (x) => ridgeY(x) + 6),
  ...scatterTrees(
    12,
    640,
    1010,
    18,
    (x, r) => 26 + ((x - 640) / 370) * 38 + (r - 0.5) * 22,
    (x) => ridgeY(x) + 6,
  ),
  ...scatterTrees(13, 1210, 1480, 20, (_x, r) => 50 + r * 46, (x) => ridgeY(x) + 6),
];
const MID_FRONT_TREES: TreeGeo[] = [
  ...scatterTrees(21, -30, 620, 46, (_x, r) => 18 + r * 20, (x) => ridgeY(x) + 22),
  ...scatterTrees(
    22,
    700,
    1000,
    22,
    (x, r) => 40 + ((x - 700) / 300) * 56 + (r - 0.5) * 18,
    (x) => ridgeY(x) + 22,
  ),
  ...scatterTrees(23, 1224, 1480, 24, (_x, r) => 70 + r * 62, (x) => ridgeY(x) + 22),
];

// Clearing slope ----------------------------------------------------
const SLOPE = pts([
  [-60, 388], [240, 382], [520, 376], [760, 360], [900, 342], [990, 322],
  [1060, 310], [1120, 304], [1190, 302], [1240, 308], [1340, 330], [1500, 338],
]);
const SLOPE_TOP = `M${P(SLOPE[0])}${smoothThrough(SLOPE)}`;
const SLOPE_BODY = `${SLOPE_TOP}L1500 440L-60 440Z`;

const CLEARING_TREES: TreeGeo[] = (() => {
  const rand = rng(31);
  return [
    { x: 976, y: 330, h: 74, w: 32 },
    { x: 1216, y: 318, h: 88, w: 36 },
    { x: 1240, y: 324, h: 56, w: 25 },
  ].map((t) =>
    buildSpruce({ ...t, tiers: 7, jitter: 0.16, snow: 2 }, rand),
  );
})();

// Foreground spruces ------------------------------------------------
const FG_LEFT_TREES: TreeGeo[] = (() => {
  const rand = rng(41);
  return [
    { x: 262, h: 120 },
    { x: 205, h: 190 },
    { x: 118, h: 270 },
    { x: 8, h: 360 },
  ].map((t) =>
    buildSpruce(
      { x: t.x, y: 434, h: t.h, w: t.h * 0.44, tiers: Math.round(t.h / 27), jitter: 0.22, snow: 3.4 },
      rand,
    ),
  );
})();

const FG_RIGHT_TREES: TreeGeo[] = (() => {
  const rand = rng(51);
  return [
    { x: 1300, h: 230 },
    { x: 1452, h: 380 },
    { x: 1384, h: 320 },
  ].map((t) =>
    buildSpruce(
      { x: t.x, y: 434, h: t.h, w: t.h * 0.43, tiers: Math.round(t.h / 27), jitter: 0.22, snow: 3.4 },
      rand,
    ),
  );
})();

// Cabin details -----------------------------------------------------
const FRONT_SIDING = (() => {
  let d = "";
  for (let y = 220; y <= 312; y += 6) {
    const half = y >= 264 ? 42 : (42 * (y - 214)) / 50;
    d += `M${f(1094 - half)} ${y}H${f(1094 + half)}`;
  }
  return d;
})();

const SIDE_SIDING = (() => {
  let d = "";
  for (let y = 270; y <= 312; y += 6) d += `M1136 ${y}L1176 ${y - 12}`;
  return d;
})();

const LOG_CORNERS: { x: number; y: number }[] = (() => {
  const out: { x: number; y: number }[] = [];
  for (let y = 268; y <= 312; y += 6) {
    out.push({ x: 1049, y: y - 2.2 });
    out.push({ x: 1133, y: y - 2.2 });
    if (y - 12 > 258) out.push({ x: 1173, y: y - 14.2 });
  }
  return out;
})();

const STACKED_LOGS = (() => {
  let ends = "";
  let rings = "";
  const r = 2.7;
  const rows = [313, 308, 303, 298, 293];
  rows.forEach((cy, row) => {
    const offset = row % 2 ? 2.7 : 0;
    for (let cx = 1023 + offset; cx <= 1049; cx += 5.4) {
      const roofY = 270 + ((1052 - cx) * 16) / 36;
      if (cy - r < roofY + 3) continue;
      ends += `M${f(cx - r)} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`;
      rings += `M${f(cx - 1.1)} ${cy}a1.1 1.1 0 1 0 2.2 0a1.1 1.1 0 1 0 -2.2 0`;
    }
  });
  return { ends, rings };
})();

const ICICLES = (() => {
  const lens = [5, 3, 7, 4, 6, 3, 5, 4];
  let d = "";
  lens.forEach((len, i) => {
    const x = 1153 + i * 4.6;
    const y = 273.4 - (x - 1150) * 0.3;
    d += `M${f(x - 1.1)} ${f(y)}L${f(x + 1.1)} ${f(y - 0.3)}L${f(x + 0.1)} ${f(y + len)}Z`;
  });
  return d;
})();

const CHIMNEY_STONES =
  "M1126 186H1140M1126 194H1140M1126 202H1140M1126 210H1140" +
  "M1131 178V186M1136 186V194M1130 194V202M1135 202V210M1132 210V218";

/* ------------------------------------------------------------------ */
/* Scoped CSS (deduped & hoisted by React 19 via href + precedence)    */
/* ------------------------------------------------------------------ */

const SCENE_CSS = `
.boreal-svg-fade{transition:opacity 700ms cubic-bezier(0.23,1,0.32,1)}
.boreal-svg-spill{opacity:var(--boreal-svg-spill,0.6)}
.boreal-svg-cabin-zone:has(.boreal-svg-stoke:hover) .boreal-svg-spill,
.boreal-svg-cabin-zone:has(.boreal-svg-stoke:focus-visible) .boreal-svg-spill{opacity:min(1,calc(var(--boreal-svg-spill,0.6) + 0.16))}
.boreal-svg-smoke-puff{transform-box:fill-box;transform-origin:50% 50%;animation:boreal-svg-smoke-drift 6.4s ease-in-out infinite alternate}
.boreal-svg-ember{transform-box:fill-box;transform-origin:50% 50%;animation:boreal-svg-ember-rise 2.8s cubic-bezier(0.22,1,0.36,1) infinite}
@keyframes boreal-svg-smoke-drift{0%{transform:translate(0,0) scale(1);opacity:.9}100%{transform:translate(-7px,-9px) scale(1.14);opacity:.5}}
@keyframes boreal-svg-ember-rise{0%{transform:translate(0,0);opacity:1}100%{transform:translate(-6px,-24px);opacity:.12}}
@media (prefers-reduced-motion: reduce){
.boreal-svg-smoke-puff,.boreal-svg-ember{animation:none}
.boreal-svg-fade{transition:none}
}
`;

/* ------------------------------------------------------------------ */
/* Shared bits                                                          */
/* ------------------------------------------------------------------ */

const SVG_PROPS = {
  viewBox: "0 0 1440 420",
  preserveAspectRatio: "xMaxYMax slice",
  className: "absolute inset-0 h-full w-full overflow-visible",
  "aria-hidden": true,
  focusable: "false",
} as const;

const LAYER_CLASS = "pointer-events-none absolute inset-0";

/** Maps a viewBox-unit length to CSS px under xMaxYMax slice scaling. */
const vb = (n: number) => `calc(${n} * max(100cqw / 1440, 100cqh / 420))`;

function Tree({
  geo,
  fill,
  shade,
  snow,
  snowOpacity = 0.85,
}: {
  geo: TreeGeo;
  fill: string;
  shade: string;
  snow: string;
  snowOpacity?: number;
}) {
  return (
    <g>
      <path d={geo.body} fill={fill} />
      <path d={geo.shade} fill={shade} opacity={0.75} />
      <path d={geo.snowLit} fill={snow} opacity={snowOpacity} />
      <path d={geo.snowShade} fill={snow} opacity={snowOpacity * 0.45} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Layer 1 — far mountains                                              */
/* ------------------------------------------------------------------ */

const FarMountains = memo(function FarMountains({
  p,
  k,
  uid,
}: {
  p: Palette;
  k: number;
  uid: string;
}) {
  const id = (n: string) => `boreal-svg-${uid}-far-${n}`;
  return (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id={id("back")} x1="0" y1="150" x2="0" y2="380" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={p.farBack} />
          <stop offset="1" stopColor={p.farBackShade} />
        </linearGradient>
        <linearGradient id={id("front")} x1="0" y1="236" x2="0" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={p.farFront} />
          <stop offset="1" stopColor={p.farFrontShade} />
        </linearGradient>
        <linearGradient id={id("wash")} x1="0" y1="150" x2="0" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2dd4bf" stopOpacity={0.22 * k} />
          <stop offset="1" stopColor="#2dd4bf" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("rim")} x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#34d399" stopOpacity={0.12 * k} />
          <stop offset="0.55" stopColor="#2dd4bf" stopOpacity={0.6 * k} />
          <stop offset="1" stopColor="#2dd4bf" stopOpacity={0.9 * k} />
        </linearGradient>
        <linearGradient id={id("haze")} x1="0" y1="230" x2="0" y2="420" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={p.haze} stopOpacity="0" />
          <stop offset="0.6" stopColor={p.haze} stopOpacity="0.6" />
          <stop offset="1" stopColor={p.haze} stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Back range */}
      <path d={BACK_GEO.body} fill={`url(#${id("back")})`} />
      <path d={BACK_GEO.caps} fill={p.farSnow} opacity={0.5} />
      <path d={BACK_GEO.facets} fill={p.farBackShade} opacity={0.5} />
      <path d={BACK_GEO.body} fill={`url(#${id("wash")})`} className="boreal-svg-fade" />
      <path
        d={BACK_GEO.ridge}
        fill="none"
        stroke={`url(#${id("rim")})`}
        strokeWidth={1.3}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Front range */}
      <path d={FRONT_GEO.body} fill={`url(#${id("front")})`} />
      <path d={FRONT_GEO.caps} fill={p.farSnow} opacity={0.62} />
      <path d={FRONT_GEO.facets} fill={p.farFrontShade} opacity={0.55} />
      <path
        d={FRONT_GEO.ridge}
        fill="none"
        stroke="#34d399"
        strokeOpacity={0.35 * k}
        strokeWidth={0.9}
        strokeLinejoin="round"
      />

      {/* Atmospheric haze between ranges and forest */}
      <rect x="-200" y="230" width="1840" height="220" fill={`url(#${id("haze")})`} />
    </svg>
  );
});

/* ------------------------------------------------------------------ */
/* Layer 2 — mid forest                                                 */
/* ------------------------------------------------------------------ */

const MidForest = memo(function MidForest({
  p,
  k,
  uid,
}: {
  p: Palette;
  k: number;
  uid: string;
}) {
  const id = (n: string) => `boreal-svg-${uid}-mid-${n}`;
  return (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id={id("ridge")} x1="0" y1="286" x2="0" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={p.ridgeTop} />
          <stop offset="0.45" stopColor={p.snowMid} />
          <stop offset="1" stopColor={p.ridgeBottom} />
        </linearGradient>
        <linearGradient id={id("tint")} x1="0" y1="284" x2="0" y2="326" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2dd4bf" stopOpacity={0.16 * k} />
          <stop offset="1" stopColor="#2dd4bf" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={MID_RIDGE_BODY} fill={`url(#${id("ridge")})`} />
      <path d={MID_RIDGE_BODY} fill={`url(#${id("tint")})`} className="boreal-svg-fade" />
      <path d={MID_RIDGE_TOP} fill="none" stroke={p.ridgeRim} strokeOpacity={0.45} strokeWidth={1.2} />

      {MID_BACK_TREES.map((g, i) => (
        <Tree key={`b${i}`} geo={g} fill={p.treeBack} shade={p.treeBackShade} snow={p.treeSnow} snowOpacity={0.55} />
      ))}
      {MID_FRONT_TREES.map((g, i) => (
        <Tree key={`f${i}`} geo={g} fill={p.treeFront} shade={p.treeFrontShade} snow={p.treeSnow} snowOpacity={0.7} />
      ))}
    </svg>
  );
});

/* ------------------------------------------------------------------ */
/* Layer 3 — clearing + cabin                                           */
/* ------------------------------------------------------------------ */

const ClearingScene = memo(function ClearingScene({
  p,
  uid,
  spill,
  glassBoost,
  smokeOpacity,
  stoked,
}: {
  p: Palette;
  uid: string;
  spill: number;
  glassBoost: number;
  smokeOpacity: number;
  stoked: boolean;
}) {
  const id = (n: string) => `boreal-svg-${uid}-cabin-${n}`;
  const url = (n: string) => `url(#${id(n)})`;
  return (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id={id("snow")} x1="0" y1="300" x2="0" y2="420" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={p.snowTop} />
          <stop offset="0.38" stopColor={p.snowMid} />
          <stop offset="0.78" stopColor={p.snowLow} />
          <stop offset="1" stopColor={p.ground} />
        </linearGradient>
        <linearGradient id={id("drift")} x1="0" y1="304" x2="0" y2="332" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={p.snowRim} stopOpacity="0.95" />
          <stop offset="0.45" stopColor={p.snowTop} stopOpacity="0.8" />
          <stop offset="1" stopColor={p.snowTop} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("roof")} x1="1100" y1="190" x2="1170" y2="272" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={p.roofSnowTop} />
          <stop offset="1" stopColor={p.roofSnowBottom} />
        </linearGradient>
        <linearGradient id={id("glass")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fef3c7" />
          <stop offset="0.5" stopColor="#fcd34d" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id={id("glass-hot")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffbeb" />
          <stop offset="1" stopColor="#fde68a" />
        </linearGradient>
        <radialGradient id={id("spill")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fcd34d" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#f59e0b" stopOpacity="0.22" />
          <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("halo")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fde68a" stopOpacity="0.42" />
          <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("smoke")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={p.smoke} stopOpacity="0.5" />
          <stop offset="0.6" stopColor={p.smoke} stopOpacity="0.2" />
          <stop offset="1" stopColor={p.smoke} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Snowy clearing slope */}
      <path d={SLOPE_BODY} fill={url("snow")} />
      <path d={SLOPE_TOP} fill="none" stroke={p.snowRim} strokeOpacity={0.55} strokeWidth={1.5} />

      {/* Wind-sculpted drift shadows */}
      <g fill={p.snowShadow}>
        <path d="M600 386C660 378 720 378 770 384C720 383 660 384 600 386Z" opacity={0.5} />
        <path d="M820 372C880 362 940 364 984 372C940 370 880 370 820 372Z" opacity={0.55} />
        <path d="M1196 336C1240 326 1290 330 1330 340C1290 336 1240 334 1196 336Z" opacity={0.5} />
        <path d="M300 396C380 390 450 391 500 396C450 395 380 395 300 396Z" opacity={0.4} />
      </g>
      <g fill="none" stroke={p.snowRim} strokeOpacity={0.18} strokeWidth={0.8} strokeLinecap="round">
        <path d="M700 372C740 368 790 368 830 371" />
        <path d="M1250 322C1280 318 1310 320 1336 326" />
        <path d="M880 352C910 348 940 348 962 351" />
      </g>

      {/* Trail from the porch winding down-hill */}
      <path
        d="M1086 318C1070 340 1030 352 1000 372C975 390 960 404 950 426L990 426C996 404 1010 390 1030 376C1060 356 1096 340 1102 318Z"
        fill={p.snowShadow}
        opacity={0.32}
      />

      {/* Clearing-edge spruces framing the cabin */}
      {CLEARING_TREES.map((g, i) => (
        <Tree key={i} geo={g} fill={p.treeFront} shade={p.treeFrontShade} snow={p.treeSnow} snowOpacity={0.8} />
      ))}

      {/* ---------------- Cabin ---------------- */}
      <g data-cabin-part="structure">
        {/* Woodshed lean-to */}
        <path d="M1016 285L1052 270V316H1016Z" fill={RECESS} />
        <path d={STACKED_LOGS.ends} fill={LOG_END} />
        <path d={STACKED_LOGS.rings} fill={LOG_RING} opacity={0.7} />
        <rect x="1014.5" y="283" width="3" height="33" fill={WOOD_DARK} />
        <path d="M1054 266V271L1012 289L1008 287Z" fill={WOOD_DARK} />
        <path d="M1005 286.5Q1005 281 1011 280L1054 261.5L1055 267L1012 286Q1008 288.5 1005 286.5Z" fill={url("roof")} />
        <path d="M1011 289L1013 294L1015 288.4ZM1022 285L1023.6 290L1025 284.6ZM1036 279L1037.4 283L1038.8 278.4Z" fill={p.icicle} opacity={0.75} />

        {/* Chopping block + axe */}
        <rect x="996" y="310" width="10" height="8" rx="1" fill={WOOD} />
        <ellipse cx="1001" cy="310" rx="5" ry="1.6" fill={WOOD_LIGHT} />
        <path d="M1001 310L1007 300" stroke={WOOD_LIGHT} strokeWidth={1.2} strokeLinecap="round" />
        <path d="M1005.4 299.4L1009.6 301.2L1008.6 303.6L1005 302Z" fill={STONE} />

        {/* Side wall (shaded, oblique) */}
        <path d="M1136 316V264L1176 252V304Z" fill={WOOD_SHADE} />
        <path d={SIDE_SIDING} stroke="#000" strokeOpacity={0.3} strokeWidth={0.8} />
        <path d="M1146 275L1164 269.6V289.6L1146 295Z" fill={WOOD_LIGHT} opacity={0.75} />

        {/* Front gable wall */}
        <path d="M1052 316V264L1094 214L1136 264V316Z" fill={WOOD} />
        <path d={FRONT_SIDING} stroke={WOOD_DARK} strokeOpacity={0.7} strokeWidth={0.9} />
        <path d="M1052 264L1094 214L1136 264V271.5L1094 222L1052 271.5Z" fill="#000" opacity={0.4} />
        {LOG_CORNERS.map((c, i) => (
          <rect key={i} x={c.x} y={c.y} width="6" height="4.4" rx="2.2" fill={WOOD_LIGHT} />
        ))}

        {/* Window + door frames */}
        <rect x="1084" y="226" width="20" height="26" fill={WOOD_LIGHT} />
        <rect x="1056" y="282" width="20" height="20" fill={WOOD_LIGHT} />
        <rect x="1112" y="282" width="20" height="20" fill={WOOD_LIGHT} />
        <rect x="1084" y="282" width="20" height="34" fill={WOOD_LIGHT} />
        <rect x="1086" y="284" width="16" height="32" fill={WOOD} />
        <path d="M1090 284V316M1094 296V316M1098 284V316" stroke={WOOD_DARK} strokeWidth={0.8} />
        <circle cx="1099.6" cy="303" r="0.9" fill="#e9c46a" />
        <g fill={p.snowTop}>
          <rect x="1054" y="301" width="24" height="3" rx="1.5" />
          <rect x="1110" y="301" width="24" height="3" rx="1.5" />
          <rect x="1082.5" y="251" width="23" height="2.6" rx="1.3" />
        </g>

        {/* Roof: solid backing, fascia, snow blanket, ridge crest */}
        <path d="M1093 203L1134 190L1188 260L1135 272Z" fill={WOOD_DARK} />
        <path d="M1042 272L1094 204L1148 272H1139L1094 212L1049 272Z" fill={WOOD_DARK} />
        <path d="M1093.5 196L1134 186L1190 258L1147 272L1093.5 203Z" fill={url("roof")} />
        <path d="M1104 214L1144 202M1114 230L1154 218M1126 246L1166 234" stroke={p.roofSnowBottom} strokeOpacity={0.4} strokeWidth={0.8} />
        <path
          d="M1146 270L1190 257.5L1191 263Q1186 266 1182 264Q1177 268 1172 266.5Q1166 270.5 1161 268.8Q1155 273.5 1148 272.6Z"
          fill={p.roofSnowBottom}
        />
        <path d={ICICLES} fill={p.icicle} opacity={0.8} />
        <path d="M1036 272Q1036 266 1041 265L1094 196L1094 203.5L1044 270Q1040 273.5 1036 272Z" fill={url("roof")} />
        <path d="M1094 196L1134 186" stroke="#f8fbff" strokeOpacity={0.85} strokeWidth={1.5} strokeLinecap="round" />
        <path d="M1041 265L1094 196" stroke="#f8fbff" strokeOpacity={0.55} strokeWidth={1} strokeLinecap="round" />

        {/* Stone chimney */}
        <path d="M1140 178L1145 176.5V217L1140 220Z" fill={STONE_DARK} />
        <rect x="1126" y="178" width="14" height="42" fill={STONE} />
        <path d={CHIMNEY_STONES} stroke={STONE_DARK} strokeWidth={0.8} />
        <rect x="1124" y="175.5" width="23" height="4" fill={STONE_DARK} />
        <path d="M1123 176.5Q1125 170 1135 170Q1146 170 1148 175.5Z" fill={p.roofSnowTop} />
        <path d="M1122 219Q1133 212 1147 214L1148 220Q1134 224 1121 223Z" fill={url("roof")} />

        {/* Porch canopy, posts, step */}
        <path d="M1076 272H1112L1114 279H1074Z" fill={WOOD_DARK} />
        <path d="M1073 273Q1076 267.5 1094 267.5Q1112 267.5 1115 273Z" fill={p.roofSnowTop} />
        <rect x="1077" y="279" width="2.2" height="37" fill={WOOD_LIGHT} />
        <rect x="1108.8" y="279" width="2.2" height="37" fill={WOOD_LIGHT} />
        <rect x="1078" y="314" width="32" height="4" fill={WOOD_LIGHT} />
        <path d="M1105 279V283" stroke={WOOD_DARK} strokeWidth={0.8} />
        <rect x="1102.5" y="282.4" width="5" height="1.4" fill={WOOD_DARK} />

        {/* Snow drifts banked against the cabin */}
        <path d="M1134 319Q1156 309 1180 305.5L1182 312Q1158 318 1134 322Z" fill={url("drift")} />
        <path
          d="M982 329C996 322 1014 313 1034 315C1052 316 1068 313 1088 316C1108 319 1126 315 1146 312C1166 309 1184 307 1198 310C1212 313 1222 320 1236 329C1164 335 1054 335 982 329Z"
          fill={url("drift")}
        />
        <path
          d="M994 323C1010 315 1024 314 1044 315C1068 314 1094 318 1120 315C1146 312 1172 308 1192 309C1206 310 1216 316 1226 323"
          fill="none"
          stroke={p.snowRim}
          strokeOpacity={0.62}
          strokeWidth={1}
          strokeLinecap="round"
        />
      </g>

      {/* Hearth light spilling onto snow + window halos */}
      <g
        data-cabin-part="hearth-spill"
        className="boreal-svg-spill boreal-svg-fade"
        style={{ "--boreal-svg-spill": spill } as CSSProperties}
      >
        <ellipse cx="1066" cy="327" rx="36" ry="9" fill={url("spill")} />
        <ellipse cx="1122" cy="326" rx="36" ry="9" fill={url("spill")} />
        <ellipse cx="1094" cy="330" rx="30" ry="11" fill={url("spill")} />
        <ellipse cx="1170" cy="312" rx="22" ry="6" fill={url("spill")} />
        <circle cx="1066" cy="292" r="22" fill={url("halo")} />
        <circle cx="1122" cy="292" r="22" fill={url("halo")} />
        <circle cx="1094" cy="239" r="20" fill={url("halo")} />
        <circle cx="1155" cy="282" r="16" fill={url("halo")} />
        <circle cx="1105" cy="286" r="12" fill={url("halo")} />
      </g>

      {/* Warm multi-pane windows */}
      <g data-cabin-part="windows">
        <g fill={url("glass")}>
          <rect x="1086" y="228" width="16" height="22" />
          <rect x="1058" y="284" width="16" height="16" />
          <rect x="1114" y="284" width="16" height="16" />
          <rect x="1089" y="287" width="10" height="7" />
          <path d="M1148 276.4L1162 272.2V288.2L1148 292.4Z" opacity={0.85} />
          <rect x="1103" y="283.8" width="4" height="6" rx="1" />
        </g>
        <g fill={url("glass-hot")} className="boreal-svg-fade" opacity={glassBoost}>
          <rect x="1086" y="228" width="16" height="22" />
          <rect x="1058" y="284" width="16" height="16" />
          <rect x="1114" y="284" width="16" height="16" />
          <rect x="1089" y="287" width="10" height="7" />
          <path d="M1148 276.4L1162 272.2V288.2L1148 292.4Z" />
        </g>
        <path
          d="M1094 228V250M1086 239H1102M1066 284V300M1058 292H1074M1122 284V300M1114 292H1130M1094 287V294M1155 274.3V290.3M1148 284.4L1162 280.2"
          stroke={WOOD_DARK}
          strokeWidth={1.1}
        />
      </g>

      {/* Chimney smoke */}
      <g data-cabin-part="smoke" className="boreal-svg-fade" opacity={smokeOpacity}>
        <g className="boreal-svg-smoke-puff" style={{ animationDelay: "0s" }}>
          <ellipse cx="1134" cy="163" rx="7" ry="6" fill={url("smoke")} />
          <ellipse cx="1131" cy="153" rx="9" ry="7" fill={url("smoke")} />
        </g>
        <g className="boreal-svg-smoke-puff" style={{ animationDelay: "-1.6s", animationDuration: "7.2s" }}>
          <ellipse cx="1135" cy="138" rx="12" ry="9" fill={url("smoke")} />
          <ellipse cx="1127" cy="131" rx="9" ry="7" fill={url("smoke")} />
        </g>
        <g className="boreal-svg-smoke-puff" style={{ animationDelay: "-3.2s", animationDuration: "8s" }}>
          <ellipse cx="1129" cy="116" rx="16" ry="11" fill={url("smoke")} />
          <ellipse cx="1142" cy="112" rx="11" ry="8" fill={url("smoke")} />
        </g>
        <g className="boreal-svg-smoke-puff" style={{ animationDelay: "-4.8s", animationDuration: "9s" }}>
          <ellipse cx="1137" cy="92" rx="21" ry="13" fill={url("smoke")} />
          <ellipse cx="1120" cy="86" rx="13" ry="9" fill={url("smoke")} />
        </g>
      </g>

      {stoked ? (
        <g data-cabin-part="embers" fill="#fcd34d">
          <circle className="boreal-svg-ember" cx="1133" cy="168" r="0.9" />
          <circle className="boreal-svg-ember" cx="1137" cy="166" r="0.7" style={{ animationDelay: "-0.9s" }} />
          <circle className="boreal-svg-ember" cx="1130" cy="165" r="0.8" style={{ animationDelay: "-1.8s" }} />
        </g>
      ) : null}
    </svg>
  );
});

/* ------------------------------------------------------------------ */
/* Layers 4 & 5 — foreground framing                                    */
/* ------------------------------------------------------------------ */

const ForegroundLeft = memo(function ForegroundLeft({ p, uid }: { p: Palette; uid: string }) {
  const id = `boreal-svg-${uid}-fgl-bank`;
  return (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id={id} x1="0" y1="376" x2="0" y2="420" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={p.fgBank} />
          <stop offset="1" stopColor={p.ground} />
        </linearGradient>
      </defs>
      {FG_LEFT_TREES.map((g, i) => (
        <Tree key={i} geo={g} fill={p.fgLit} shade={p.fgShade} snow={p.fgSnow} snowOpacity={0.5} />
      ))}
      {/* Snow-crested low bough reaching in from the edge */}
      <path
        d="M-40 352C20 346 90 350 170 364L150 366L162 372L132 370L140 377L108 372L112 380L80 373L80 381L50 372L46 380L18 370L10 378L-40 372Z"
        fill={p.fgShade}
      />
      <path d="M-40 350C20 344 90 348 170 362C110 354 40 352 -40 356Z" fill={p.fgSnow} opacity={0.55} />
      <path d="M-600 440V382C-100 378 120 372 240 386C300 394 340 404 390 440Z" fill={`url(#${id})`} />
      <path d="M-100 380C60 374 160 374 240 386" fill="none" stroke={p.fgSnow} strokeOpacity={0.35} strokeWidth={1.2} />
    </svg>
  );
});

const ForegroundRight = memo(function ForegroundRight({ p, uid }: { p: Palette; uid: string }) {
  const id = (n: string) => `boreal-svg-${uid}-fgr-${n}`;
  return (
    <svg {...SVG_PROPS}>
      <defs>
        <linearGradient id={id("bank")} x1="0" y1="368" x2="0" y2="418" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={p.fgBank} />
          <stop offset="1" stopColor={p.ground} />
        </linearGradient>
        <linearGradient id={id("fade")} x1="0" y1="394" x2="0" y2="416" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={p.ground} stopOpacity="0" />
          <stop offset="1" stopColor={p.ground} />
        </linearGradient>
      </defs>
      {/* Foreground snowbank floor */}
      <path
        d="M-600 520V404C200 400 700 402 1000 398C1200 394 1320 380 1480 372H2040V520Z"
        fill={`url(#${id("bank")})`}
      />
      <path
        d="M1000 398C1200 394 1320 380 1480 372"
        fill="none"
        stroke={p.fgSnow}
        strokeOpacity={0.4}
        strokeWidth={1.2}
      />
      {FG_RIGHT_TREES.map((g, i) => (
        <Tree key={i} geo={g} fill={p.fgLit} shade={p.fgShade} snow={p.fgSnow} snowOpacity={0.5} />
      ))}
      {/* Seamless hand-off into the page ground colour */}
      <rect x="-600" y="394" width="2640" height="26" fill={`url(#${id("fade")})`} />
      <rect x="-600" y="416" width="2640" height="120" fill={p.ground} />
    </svg>
  );
});

/* ------------------------------------------------------------------ */
/* Component                                                            */
/* ------------------------------------------------------------------ */

export function CabinHorizonSvg({
  aurora = "balanced",
  auroraStrength = 60,
  stoked = false,
  onStokeCabin,
  className = "",
}: CabinHorizonSvgProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const p = FROST_PALETTE;
  const k = 0.42 + (auroraStrength / 100) * 1.08;
  const spill = stoked ? 1 : 0.58;
  const glassBoost = stoked ? 0.9 : 0.12;
  const smokeOpacity = stoked ? 1 : 0.75;

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      data-boreal-horizon=""
      data-aurora={aurora}
      data-stoked={stoked ? "true" : "false"}
    >
      <style href="boreal-svg-cabin-horizon" precedence="default">
        {SCENE_CSS}
      </style>

      <div data-parallax-layer="far-mountains" className={LAYER_CLASS}>
        <FarMountains p={p} k={k} uid={uid} />
      </div>

      <div data-parallax-layer="mid-forest" className={LAYER_CLASS}>
        <MidForest p={p} k={k} uid={uid} />
      </div>

      <div
        data-parallax-layer="cabin-clearing"
        className={`${LAYER_CLASS} boreal-svg-cabin-zone`}
        style={{ containerType: "size" }}
      >
        <ClearingScene
          p={p}
          uid={uid}
          spill={spill}
          glassBoost={glassBoost}
          smokeOpacity={smokeOpacity}
          stoked={stoked}
        />
        {onStokeCabin ? (
          <button
            type="button"
            onClick={onStokeCabin}
            aria-label="Stoke cabin fireplace"
            aria-pressed={stoked}
            className="boreal-svg-stoke group pointer-events-auto absolute flex min-h-11 min-w-11 cursor-pointer items-start justify-center rounded-xl border-0 bg-transparent p-0 outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#fcd34d]"
            style={{
              right: vb(248),
              bottom: vb(94),
              width: vb(184),
              height: vb(154),
            }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none -translate-y-2 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-[#080b12]/80 px-2.5 py-1 text-[11px] font-medium tracking-wide text-[#eef2ff] opacity-0 shadow-md backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
            >
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                  stoked
                    ? "bg-violet shadow-[0_0_6px_rgba(167,139,250,0.85)]"
                    : "bg-[#fbbf24] shadow-[0_0_6px_rgba(251,191,36,0.85)]"
                }`}
              />
              <span>{stoked ? "Rest hearth" : "Stoke hearth"}</span>
            </span>
          </button>
        ) : null}
      </div>

      <div data-parallax-layer="foreground-left" className={LAYER_CLASS}>
        <ForegroundLeft p={p} uid={uid} />
      </div>

      <div data-parallax-layer="foreground-right" className={LAYER_CLASS}>
        <ForegroundRight p={p} uid={uid} />
      </div>
    </div>
  );
}
