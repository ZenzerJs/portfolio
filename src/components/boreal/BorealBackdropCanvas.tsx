"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  DEFAULT_AURORA_TINT,
  useBorealAtmosphere,
} from "@/components/boreal/BorealAtmosphereContext";
import { scrollBus } from "@/components/boreal/SmoothScrollProvider";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  phase: number;
  speed: number;
  depth: number;
  tint: string;
  glint: boolean;
}

interface SnowFlake {
  x: number;
  y: number;
  radius: number;
  speedScale: number;
  driftAmp: number;
  driftFreq: number;
  phase: number;
  alpha: number;
  order: number;
}

const VERT_SHADER = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

// Smooth domain-warped FBM Aurora Veil + sweeping Aurora Waves (zero vertical bars)
const FRAG_SHADER = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uHeroProgress;
uniform float uScrollProgress;
uniform float uIntensity;
uniform float uPurpleMix;
uniform vec2 uPointer;
uniform vec3 uTintColor;
uniform float uStoked;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 0.5;
  mat2 rot = mat2(0.84, -0.54, 0.54, 0.84);
  for (int i = 0; i < 4; i++) {
    value += amp * noise(p);
    p = rot * p * 2.04 + vec2(1.7, 9.2);
    amp *= 0.5;
  }
  return value;
}

float waveRibbon(vec2 uv, float baseY, float speed, float freq, float thickness, float t, float scrollShift) {
  float x = uv.x * freq + scrollShift;
  float drift = fbm(vec2(x * 0.65 + t * speed, uv.y * 1.4 - t * speed * 0.4));
  float sweep = sin(x * 1.55 + t * speed * 1.35 + drift * 2.6) * 0.095
              + cos(x * 0.82 - t * speed * 0.9) * 0.055;
  float dist = uv.y - (baseY + sweep);
  // Crisp luminous lower ridge fading softly upward like real northern-lights silk
  float softTop = dist > 0.0 ? exp(-dist * thickness * 0.68) : exp(dist * thickness * 1.65);
  float veil = 0.55 + 0.55 * fbm(vec2(uv.x * 2.1 - t * speed * 0.7, uv.y * 2.4 + drift * 1.8));
  return softTop * veil;
}

void main() {
  vec2 uv = gl_FragCoord.xy / max(uResolution, vec2(1.0));
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

  // Subtle zenith-to-ground midnight backdrop
  vec3 zenith = vec3(0.0196, 0.0392, 0.0784);  // #050a14
  vec3 horizon = vec3(0.0314, 0.0431, 0.0706); // #080b12
  vec3 sky = mix(horizon, zenith, smoothstep(0.05, 0.95, uv.y));

  float t = uTime * 0.14;
  float scrollPhase = uScrollProgress * 1.45;
  vec2 ptr = uPointer * 0.035;

  // Lift and soften ribbons smoothly once past the Hero cabin clearing
  float heroFocal = 1.0 - uHeroProgress * 0.58;
  float yLift = uHeroProgress * 0.11;

  // Gentle left-copy breathing room in Hero, opening right over the cabin & sky
  float spatialBias = smoothstep(-0.18, 0.92, uv.x + 0.22 * (1.0 - uHeroProgress));
  float ambientFloor = mix(0.46, 0.68, uHeroProgress);
  float mask = mix(ambientFloor, 1.0, spatialBias) * smoothstep(0.06, 0.34, uv.y) * smoothstep(1.04, 0.76, uv.y);

  // Domain warp for silky flowing aurora veils
  vec2 q = vec2(
    fbm(p * 1.15 + ptr + vec2(t * 0.45, -t * 0.25 + scrollPhase * 0.3)),
    fbm(p * 1.25 - ptr + vec2(-t * 0.32, t * 0.35 + 4.2))
  );
  float silkField = fbm(p * 1.55 + q * 1.45 + vec2(t * 0.22, 0.0));

  // Three sweeping overlapping aurora wave curtains
  float w1 = waveRibbon(uv + q * 0.06 + ptr, 0.60 + yLift, 0.52, 2.1, 8.2, t, scrollPhase * 0.65);
  float w2 = waveRibbon(uv - q * 0.05 + ptr * 0.7, 0.69 + yLift, -0.44, 2.7, 7.6, t + 6.4, scrollPhase * 0.45);
  float w3 = waveRibbon(uv + q * 0.08 - ptr * 0.5, 0.53 + yLift, 0.36, 1.75, 9.4, t + 12.1, scrollPhase * 0.8);

  vec3 emerald = vec3(0.204, 0.827, 0.600); // #34d399
  vec3 teal = vec3(0.176, 0.831, 0.749);    // #2dd4bf
  vec3 purple = vec3(0.655, 0.545, 0.980);  // #a78bfa
  vec3 indigo = vec3(0.506, 0.549, 0.973);  // #818cf8

  // Reactive primary wave blends user-selected / hovered project tint cleanly
  vec3 primaryCol = mix(mix(emerald, teal, silkField), uTintColor, 0.72);
  vec3 violetCol = mix(purple, indigo, 0.35 + 0.35 * sin(uv.x * 2.5 - t));

  // Boost aurora purple gracefully near bottom Contact hearth & when cabin stoked
  float purpleAccent = (0.85 + 0.35 * uScrollProgress + 0.22 * uStoked) * uPurpleMix;

  vec3 aurora = vec3(0.0);
  aurora += primaryCol * w1 * (0.48 + 0.28 * silkField);
  aurora += violetCol * w2 * 0.36 * purpleAccent;
  aurora += mix(teal, purple, 0.42 + 0.25 * uScrollProgress) * w3 * 0.28;
  aurora += mix(emerald, purple, 0.5) * pow(silkField, 2.2) * 0.14 * (1.0 - uHeroProgress * 0.35);

  float gain = uIntensity * heroFocal * mask;
  vec3 color = sky + aurora * gain;

  // Soft 8-bit dither to keep deep night sky gradients completely banding-free
  float dither = (hash(gl_FragCoord.xy + fract(uTime) * 19.0) - 0.5) / 255.0;
  color = clamp(color + dither, 0.0, 1.0);

  gl_FragColor = vec4(color, 1.0);
}
`;

function mulberry32(seed: number) {
  let a = seed;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createStars(count: number): Star[] {
  const rand = mulberry32(20261119);
  const tints = ["#f8fafc", "#e0f2fe", "#dbeafe", "#ede9fe", "#ccfbf1"];
  const stars: Star[] = [];

  for (let i = 0; i < count; i++) {
    const roll = rand();
    const bright = roll > 0.92;
    const mid = roll > 0.6;
    stars.push({
      x: rand(),
      y: Math.pow(rand(), 1.15) * 0.86,
      radius: bright
        ? 1.45 + rand() * 0.45
        : mid
          ? 0.9 + rand() * 0.35
          : 0.52 + rand() * 0.26,
      baseAlpha: bright
        ? 0.86 + rand() * 0.12
        : mid
          ? 0.48 + rand() * 0.28
          : 0.22 + rand() * 0.22,
      phase: rand() * Math.PI * 2,
      speed: 0.32 + rand() * 0.8,
      depth: bright ? 1.0 : mid ? 0.62 : 0.32,
      tint: tints[i % tints.length],
      glint: bright && i % 2 === 0,
    });
  }

  return stars;
}

function createFlakes(count: number): SnowFlake[] {
  const rand = mulberry32(99173);
  const flakes: SnowFlake[] = [];

  for (let i = 0; i < count; i++) {
    const layer = rand();
    flakes.push({
      x: rand(),
      y: rand(),
      radius:
        layer > 0.82
          ? 2.0 + rand() * 0.65
          : layer > 0.42
            ? 1.25 + rand() * 0.5
            : 0.72 + rand() * 0.35,
      speedScale: layer > 0.82 ? 1.24 : layer > 0.42 ? 0.92 : 0.64,
      driftAmp: 10 + rand() * 18,
      driftFreq: 0.35 + rand() * 0.52,
      phase: rand() * Math.PI * 2,
      alpha: layer > 0.82 ? 0.76 : layer > 0.42 ? 0.48 : 0.26,
      order: i / count,
    });
  }

  return flakes;
}

function readingColumnMask(
  px: number,
  width: number,
  heroProgress: number,
): number {
  const isDesktop = width >= 1024;
  const mainStart = isDesktop ? 248 : 0;
  const mainWidth = Math.max(320, width - mainStart);
  const colHalf = Math.min(480, mainWidth * 0.44);
  const xCenter = mainStart + mainWidth * 0.5;
  const dist = Math.abs(px - xCenter);
  const centerFloor = 0.66 - heroProgress * 0.24; // 0.66 in hero -> 0.42 over content
  if (dist >= colHalf) return 1.0;
  const u = dist / colHalf;
  const smooth = u * u * (3 - 2 * u);
  return centerFloor + (1 - centerFloor) * smooth;
}

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function BorealBackdropCanvas() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const {
    auroraStrength,
    auroraStrengthRef,
    stoked,
    stokedRef,
    snow,
    auroraTintRef,
  } = useBorealAtmosphere();

  const glCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const skyCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const snowRef = useRef(snow);
  const isHomeRef = useRef(isHome);
  const redrawStaticRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    snowRef.current = snow;
    isHomeRef.current = isHome;
    redrawStaticRef.current?.();
  }, [auroraStrength, stoked, snow, pathname, isHome]);

  useEffect(() => {
    const glCanvas = glCanvasRef.current;
    const skyCanvas = skyCanvasRef.current;
    if (!glCanvas || !skyCanvas) return;

    const skyCtx = skyCanvas.getContext("2d", { alpha: true });
    if (!skyCtx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const isNarrow = window.innerWidth < 768;

    const stars = createStars(isNarrow ? 72 : 132);
    const flakes = createFlakes(isNarrow ? 44 : 92);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;
    let contextLost = false;

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const currentTint: [number, number, number] = [...DEFAULT_AURORA_TINT];
    let stokedBlend = stokedRef.current ? 1 : 0;
    const initialS = auroraStrengthRef.current / 100;
    let currentGain = 0.22 + initialS * 1.18;
    let currentPurpleMix = 0.55 + initialS * 0.68;

    // Initialize WebGL Aurora Veil shader (or fall back cleanly to Canvas2D mist)
    let gl: WebGLRenderingContext | null = null;
    let glProgram: WebGLProgram | null = null;
    let glBuffer: WebGLBuffer | null = null;

    let uTimeLoc: WebGLUniformLocation | null = null;
    let uResLoc: WebGLUniformLocation | null = null;
    let uHeroLoc: WebGLUniformLocation | null = null;
    let uScrollLoc: WebGLUniformLocation | null = null;
    let uIntensityLoc: WebGLUniformLocation | null = null;
    let uPurpleMixLoc: WebGLUniformLocation | null = null;
    let uPointerLoc: WebGLUniformLocation | null = null;
    let uTintLoc: WebGLUniformLocation | null = null;
    let uStokedLoc: WebGLUniformLocation | null = null;

    const initWebGL = () => {
      try {
        const ctx = glCanvas.getContext("webgl", {
          alpha: false,
          antialias: false,
          depth: false,
          stencil: false,
          powerPreference: "high-performance",
        });
        if (!ctx || ctx.isContextLost()) return false;

        const vs = compileShader(ctx, ctx.VERTEX_SHADER, VERT_SHADER);
        const fs = compileShader(ctx, ctx.FRAGMENT_SHADER, FRAG_SHADER);
        if (!vs || !fs) {
          if (vs) ctx.deleteShader(vs);
          if (fs) ctx.deleteShader(fs);
          return false;
        }

        const program = ctx.createProgram();
        if (!program) {
          ctx.deleteShader(vs);
          ctx.deleteShader(fs);
          return false;
        }

        ctx.attachShader(program, vs);
        ctx.attachShader(program, fs);
        ctx.linkProgram(program);
        ctx.deleteShader(vs);
        ctx.deleteShader(fs);

        if (!ctx.getProgramParameter(program, ctx.LINK_STATUS)) {
          ctx.deleteProgram(program);
          return false;
        }

        const buffer = ctx.createBuffer();
        if (!buffer) {
          ctx.deleteProgram(program);
          return false;
        }

        ctx.bindBuffer(ctx.ARRAY_BUFFER, buffer);
        ctx.bufferData(
          ctx.ARRAY_BUFFER,
          new Float32Array([-1, -1, 3, -1, -1, 3]),
          ctx.STATIC_DRAW,
        );

        const posLoc = ctx.getAttribLocation(program, "aPosition");
        ctx.enableVertexAttribArray(posLoc);
        ctx.vertexAttribPointer(posLoc, 2, ctx.FLOAT, false, 0, 0);

        gl = ctx;
        glProgram = program;
        glBuffer = buffer;
        uTimeLoc = ctx.getUniformLocation(program, "uTime");
        uResLoc = ctx.getUniformLocation(program, "uResolution");
        uHeroLoc = ctx.getUniformLocation(program, "uHeroProgress");
        uScrollLoc = ctx.getUniformLocation(program, "uScrollProgress");
        uIntensityLoc = ctx.getUniformLocation(program, "uIntensity");
        uPurpleMixLoc = ctx.getUniformLocation(program, "uPurpleMix");
        uPointerLoc = ctx.getUniformLocation(program, "uPointer");
        uTintLoc = ctx.getUniformLocation(program, "uTintColor");
        uStokedLoc = ctx.getUniformLocation(program, "uStoked");
        glCanvas.style.display = "block";
        return true;
      } catch {
        return false;
      }
    };

    initWebGL();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);

      const glScale = Math.min(dpr, 1.0);
      glCanvas.width = Math.max(1, Math.round(width * glScale));
      glCanvas.height = Math.max(1, Math.round(height * glScale));
      if (gl && !contextLost) {
        gl.viewport(0, 0, glCanvas.width, glCanvas.height);
      }

      skyCanvas.width = Math.max(1, Math.round(width * dpr));
      skyCanvas.height = Math.max(1, Math.round(height * dpr));
      skyCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    let lastTime = performance.now();
    const render = (now: number, isStatic: boolean) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;
      const t = isStatic ? 8.5 : now * 0.001;

      pointer.x += (pointer.tx - pointer.x) * (isStatic ? 1 : 0.06);
      pointer.y += (pointer.ty - pointer.y) * (isStatic ? 1 : 0.06);

      const targetTint = auroraTintRef.current;
      const tintLerp = isStatic ? 1 : Math.min(1, dt * 4.2);
      currentTint[0] += (targetTint[0] - currentTint[0]) * tintLerp;
      currentTint[1] += (targetTint[1] - currentTint[1]) * tintLerp;
      currentTint[2] += (targetTint[2] - currentTint[2]) * tintLerp;

      const stokedTarget = stokedRef.current ? 1 : 0;
      stokedBlend += (stokedTarget - stokedBlend) * (isStatic ? 1 : Math.min(1, dt * 4));

      const hp = isHomeRef.current ? scrollBus.heroProgress : 1;
      const sp = scrollBus.progress;
      const vel = scrollBus.velocity;
      const s = auroraStrengthRef.current / 100;
      const targetGain = 0.22 + s * 1.18;
      const targetPurpleMix = 0.55 + s * 0.68;
      const strengthLerp = isStatic ? 1 : Math.min(1, dt * 6);
      currentGain += (targetGain - currentGain) * strengthLerp;
      currentPurpleMix += (targetPurpleMix - currentPurpleMix) * strengthLerp;

      if (gl && glProgram && !contextLost) {
        glCanvas.style.display = "block";
        gl.useProgram(glProgram);
        gl.uniform1f(uTimeLoc, t);
        gl.uniform2f(uResLoc, glCanvas.width, glCanvas.height);
        gl.uniform1f(uHeroLoc, hp);
        gl.uniform1f(uScrollLoc, sp);
        gl.uniform1f(uIntensityLoc, currentGain);
        gl.uniform1f(uPurpleMixLoc, currentPurpleMix);
        gl.uniform2f(uPointerLoc, pointer.x, pointer.y);
        gl.uniform3f(
          uTintLoc,
          currentTint[0] / 255,
          currentTint[1] / 255,
          currentTint[2] / 255,
        );
        gl.uniform1f(uStokedLoc, stokedBlend);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        skyCtx.clearRect(0, 0, width, height);
      } else {
        glCanvas.style.display = "none";
        const sky = skyCtx.createLinearGradient(0, 0, 0, height);
        sky.addColorStop(0, "#050a14");
        sky.addColorStop(1, "#080b12");
        skyCtx.fillStyle = sky;
        skyCtx.fillRect(0, 0, width, height);

        const veilAlpha = (1 - hp * 0.56) * 0.22 * currentGain;
        const g1 = skyCtx.createRadialGradient(
          width * 0.68,
          height * 0.28,
          20,
          width * 0.68,
          height * 0.28,
          width * 0.55,
        );
        g1.addColorStop(
          0,
          `rgba(${Math.round(currentTint[0])}, ${Math.round(currentTint[1])}, ${Math.round(currentTint[2])}, ${veilAlpha.toFixed(3)})`,
        );
        g1.addColorStop(0.55, `rgba(167, 139, 250, ${(veilAlpha * 0.6).toFixed(3)})`);
        g1.addColorStop(1, "rgba(5, 10, 20, 0)");
        skyCtx.fillStyle = g1;
        skyCtx.fillRect(0, 0, width, height);
      }

      // Draw Stars + Blizzard-to-Airy Snow on 2D Overlay Canvas

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const twinkle = isStatic
          ? 1
          : 0.72 + 0.28 * Math.sin(t * s.speed + s.phase);
        const sx = s.x * width - pointer.x * 8 * s.depth;
        const sy =
          s.y * height -
          pointer.y * 4 * s.depth -
          scrollBus.scroll * 0.014 * s.depth;
        if (sy < -6 || sy > height + 6) continue;

        const starAlpha = s.baseAlpha * twinkle * (1 - hp * 0.26);
        skyCtx.globalAlpha = starAlpha;
        skyCtx.fillStyle = s.tint;
        skyCtx.beginPath();
        skyCtx.arc(sx, sy, s.radius, 0, Math.PI * 2);
        skyCtx.fill();

        if (s.glint) {
          skyCtx.globalAlpha = starAlpha * 0.42;
          skyCtx.strokeStyle = s.tint;
          skyCtx.lineWidth = 0.75;
          const arm = s.radius * 3.1;
          skyCtx.beginPath();
          skyCtx.moveTo(sx - arm, sy);
          skyCtx.lineTo(sx + arm, sy);
          skyCtx.moveTo(sx, sy - arm);
          skyCtx.lineTo(sx, sy + arm);
          skyCtx.stroke();
        }
      }
      skyCtx.globalAlpha = 1;

      if (isStatic || snowRef.current === "still") {
        return;
      }

      // Blizzard clearing (hp=0) -> Sheltered airy snow (hp=1)
      const stokeCalm = 1 - stokedBlend * 0.22;
      const baseVx = (-95 * (1 - hp) + -8 * hp) * stokeCalm;
      const baseVy = 115 * (1 - hp) + 28 * hp;
      const velGust = Math.max(-42, Math.min(42, -vel * 0.65));
      const vx = baseVx + velGust;
      const vy = baseVy;
      const activeThreshold = 1.0 - hp * 0.55; // 100% squall -> 45% airy snow
      const streakBlend = (1 - hp) * 0.65;

      skyCtx.lineCap = "round";
      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.x += (vx * f.speedScale * dt) / Math.max(320, width);
        f.y += (vy * f.speedScale * dt) / Math.max(420, height);

        if (f.x < -0.05) f.x += 1.1;
        if (f.x > 1.05) f.x -= 1.1;
        if (f.y > 1.04) {
          f.y = -0.04;
        }

        if (f.order > activeThreshold) continue;

        const sway = Math.sin(t * f.driftFreq + f.phase) * f.driftAmp;
        const px = f.x * width + sway * (0.35 + hp * 0.65);
        const py = f.y * height;
        const mask = readingColumnMask(px, width, hp);
        const alpha = f.alpha * mask;

        if (streakBlend > 0.08) {
          skyCtx.strokeStyle = `rgba(226, 239, 250, ${alpha.toFixed(3)})`;
          skyCtx.lineWidth = Math.max(1, f.radius * 0.88);
          skyCtx.beginPath();
          skyCtx.moveTo(px, py);
          skyCtx.lineTo(
            px - vx * 0.017 * streakBlend,
            py - vy * 0.017 * streakBlend,
          );
          skyCtx.stroke();
        } else {
          skyCtx.fillStyle = `rgba(226, 239, 250, ${alpha.toFixed(3)})`;
          skyCtx.beginPath();
          skyCtx.arc(px, py, f.radius, 0, Math.PI * 2);
          skyCtx.fill();
        }
      }
    };

    const loop = (now: number) => {
      if (document.hidden || motionQuery.matches) {
        rafId = 0;
        return;
      }
      render(now, false);
      rafId = requestAnimationFrame(loop);
    };

    const startOrRenderStatic = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      lastTime = performance.now();
      if (motionQuery.matches) {
        render(lastTime, true);
      } else if (!document.hidden) {
        rafId = requestAnimationFrame(loop);
      }
    };

    const onVisibility = () => {
      if (document.hidden) {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      } else {
        startOrRenderStatic();
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.tx = (event.clientX / Math.max(1, width)) * 2 - 1;
      pointer.ty = (event.clientY / Math.max(1, height)) * 2 - 1;
    };

    const onPointerLeave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
    };

    const onContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
    };

    const onContextRestored = () => {
      contextLost = false;
      initWebGL();
      resize();
      startOrRenderStatic();
    };

    const onMotionChange = () => {
      startOrRenderStatic();
    };

    redrawStaticRef.current = () => {
      if (motionQuery.matches) {
        render(performance.now(), true);
      }
    };

    const onResize = () => {
      resize();
      redrawStaticRef.current?.();
    };

    resize();
    startOrRenderStatic();

    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener("change", onMotionChange);
    glCanvas.addEventListener("webglcontextlost", onContextLost);
    glCanvas.addEventListener("webglcontextrestored", onContextRestored);

    if (finePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onPointerLeave);
    }

    return () => {
      redrawStaticRef.current = null;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", onMotionChange);
      glCanvas.removeEventListener("webglcontextlost", onContextLost);
      glCanvas.removeEventListener("webglcontextrestored", onContextRestored);

      if (finePointer) {
        window.removeEventListener("pointermove", onPointerMove);
        document.documentElement.removeEventListener(
          "mouseleave",
          onPointerLeave,
        );
      }

      if (gl) {
        if (glBuffer) gl.deleteBuffer(glBuffer);
        if (glProgram) gl.deleteProgram(glProgram);
      }
    };
  }, [auroraStrengthRef, auroraTintRef, stokedRef]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050a14]"
    >
      <canvas ref={glCanvasRef} className="block h-full w-full bg-[#050a14]" />
      <canvas
        ref={skyCanvasRef}
        className="pointer-events-none absolute inset-0 block h-full w-full"
      />
    </div>
  );
}
