"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Loaded lazily after first paint — keeps ogl out of the critical JS path
const Aurora = dynamic(() => import("@/components/Aurora"), { ssr: false });

type GradientBackgroundProps = {
  /** Full aurora + constellation canvas. Use false on inner pages for better performance. */
  interactive?: boolean;
};

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  depth: number;
  hue: number;
  twinklePhase: number;
  twinkleSpeed: number;
};

// Sqrt scaling keeps mobile star counts low; denser on laptop/desktop monitors.
function targetCount(width: number, height: number) {
  const base = Math.round(Math.sqrt(width * height) / 24);
  return Math.min(Math.max(base, 32), 100);
}

function createStars(count: number, width: number, height: number): Star[] {
  return Array.from({ length: count }, () => {
    const depth = 0.35 + Math.random() * 0.65;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18 * depth,
      vy: (Math.random() - 0.5) * 0.18 * depth,
      size: 0.6 + depth * 1.9,
      depth,
      hue: Math.random() > 0.5 ? 162 : 268,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.6 + Math.random() * 1.4,
    };
  });
}

const CONNECT = 138;
const CURSOR_RADIUS = 220;
const GRID_CELL = CONNECT;
const ALPHA_BUCKETS = 6;

function bucketIndex(alpha: number) {
  return Math.min(ALPHA_BUCKETS - 1, Math.floor(alpha * ALPHA_BUCKETS));
}

export function GradientBackground({ interactive = true }: GradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, active: false });
  const scroll = useRef({ y: 0, velocity: 0 });
  const [auroraReady, setAuroraReady] = useState(false);

  // Defer Aurora until after first paint + idle — skip on touch devices (WebGL is costly on mobile)
  useEffect(() => {
    if (!interactive) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;

    const ric = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1500));
    const id = ric(() => setAuroraReady(true));
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id as number);
      else clearTimeout(id as number);
    };
  }, [interactive]);

  useEffect(() => {
    if (!interactive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let stars: Star[] = [];
    let frameId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let running = true;
    let lastFrame = 0;

    let parallaxX = 0;
    let parallaxY = 0;

    const lineBuckets: number[][] = Array.from({ length: ALPHA_BUCKETS }, () => []);
    const cursorBuckets: number[][] = Array.from({ length: ALPHA_BUCKETS }, () => []);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = createStars(targetCount(width, height), width, height);
    };

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onLeave = () => {
      mouse.current.active = false;
    };

    let lastScroll = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      scroll.current.velocity = y - lastScroll;
      scroll.current.y = y;
      lastScroll = y;
    };

    const onClick = (e: MouseEvent) => {
      for (const s of stars) {
        const dx = s.x + parallaxX * s.depth - e.clientX;
        const dy =
          (((s.y - scroll.current.y * s.depth * 0.12) % height) + height) % height +
          parallaxY * s.depth -
          e.clientY;
        const dist = Math.hypot(dx, dy);
        if (dist < 260 && dist > 0.01) {
          const force = (1 - dist / 260) * 4.2 * s.depth;
          s.vx += (dx / dist) * force;
          s.vy += (dy / dist) * force;
        }
      }
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running) {
        lastFrame = 0;
        frameId = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(frameId);
      }
    };

    const strokeBuckets = (
      buckets: number[][],
      rx: number[],
      ry: number[],
      strokeHue: number | ((i: number) => number),
    ) => {
      for (let b = 0; b < ALPHA_BUCKETS; b++) {
        const bucket = buckets[b];
        if (bucket.length === 0) continue;

        const alpha = (b + 0.5) / ALPHA_BUCKETS;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 0.55;
        ctx.beginPath();

        for (let k = 0; k < bucket.length; k += 4) {
          const x1 = bucket[k];
          const y1 = bucket[k + 1];
          const x2 = bucket[k + 2];
          const y2 = bucket[k + 3];
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
        }

        const hue = typeof strokeHue === "number" ? strokeHue : strokeHue(0);
        ctx.strokeStyle = `hsla(${hue}, 80%, 66%, 1)`;
        ctx.stroke();
        bucket.length = 0;
      }
      ctx.globalAlpha = 1;
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      if (mouse.current.active) {
        const tx = (mouse.current.x - width / 2) * 0.025;
        const ty = (mouse.current.y - height / 2) * 0.025;
        parallaxX += (tx - parallaxX) * 0.05;
        parallaxY += (ty - parallaxY) * 0.05;
      } else {
        parallaxX += (0 - parallaxX) * 0.05;
        parallaxY += (0 - parallaxY) * 0.05;
      }

      scroll.current.velocity *= 0.9;
      const scrollBoost = Math.min(Math.abs(scroll.current.velocity) / 40, 1);
      const t = time * 0.001;

      const rx: number[] = new Array(stars.length);
      const ry: number[] = new Array(stars.length);
      const grid = new Map<string, number[]>();

      const cellKey = (cx: number, cy: number) => `${cx},${cy}`;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        if (mouse.current.active) {
          const pdx = mouse.current.x - (s.x + parallaxX * s.depth);
          const pdy =
            mouse.current.y -
            ((((s.y - scroll.current.y * s.depth * 0.12) % height) + height) % height +
              parallaxY * s.depth);
          const d = Math.hypot(pdx, pdy);
          if (d < CURSOR_RADIUS && d > 0.01) {
            const f = (1 - d / CURSOR_RADIUS) * 0.45 * s.depth;
            s.vx -= (pdx / d) * f;
            s.vy -= (pdy / d) * f;
          }
        }

        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.96;
        s.vy *= 0.96;
        s.vx += Math.sin(t * 0.7 + s.twinklePhase) * 0.002 * s.depth;
        s.vy += Math.cos(t * 0.6 + s.twinklePhase) * 0.002 * s.depth;

        if (s.x < 0) s.x += width;
        if (s.x > width) s.x -= width;
        if (s.y < 0) s.y += height;
        if (s.y > height) s.y -= height;

        const px = s.x + parallaxX * s.depth;
        const py =
          ((((s.y - scroll.current.y * s.depth * 0.12) % height) + height) % height) +
          parallaxY * s.depth;
        rx[i] = px;
        ry[i] = py;

        const cx = Math.floor(px / GRID_CELL);
        const cy = Math.floor(py / GRID_CELL);
        const key = cellKey(cx, cy);
        const cell = grid.get(key);
        if (cell) cell.push(i);
        else grid.set(key, [i]);
      }

      for (let i = 0; i < stars.length; i++) {
        const cx = Math.floor(rx[i] / GRID_CELL);
        const cy = Math.floor(ry[i] / GRID_CELL);

        for (let ox = -1; ox <= 1; ox++) {
          for (let oy = -1; oy <= 1; oy++) {
            const neighbors = grid.get(cellKey(cx + ox, cy + oy));
            if (!neighbors) continue;

            for (const j of neighbors) {
              if (j <= i) continue;
              const dx = rx[i] - rx[j];
              const dy = ry[i] - ry[j];
              const dist = Math.hypot(dx, dy);
              if (dist < CONNECT) {
                const depthAvg = (stars[i].depth + stars[j].depth) / 2;
                const alpha = (1 - dist / CONNECT) * (0.16 + scrollBoost * 0.14) * depthAvg;
                lineBuckets[bucketIndex(alpha)].push(rx[i], ry[i], rx[j], ry[j]);
              }
            }
          }
        }
      }

      strokeBuckets(lineBuckets, rx, ry, 200);

      if (mouse.current.active) {
        for (let i = 0; i < stars.length; i++) {
          const dx = rx[i] - mouse.current.x;
          const dy = ry[i] - mouse.current.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CURSOR_RADIUS) {
            const alpha = (1 - dist / CURSOR_RADIUS) * 0.5 * stars[i].depth;
            const bucket = cursorBuckets[bucketIndex(alpha)];
            bucket.push(mouse.current.x, mouse.current.y, rx[i], ry[i]);
          }
        }
        strokeBuckets(cursorBuckets, rx, ry, 200);
      }

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const twinkle = 0.55 + 0.45 * Math.sin(t * s.twinkleSpeed + s.twinklePhase);
        const alpha = (0.25 + s.depth * 0.5) * twinkle;
        const size = s.size * (1 + scrollBoost * 0.25);

        if (s.depth > 0.55) {
          ctx.fillStyle = `hsla(${s.hue}, 85%, 72%, ${alpha * 0.28})`;
          ctx.beginPath();
          ctx.arc(rx[i], ry[i], size * 2.6, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `hsla(${s.hue}, 90%, 80%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(rx[i], ry[i], size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    function loop(now: number) {
      if (!running) return;

      const targetFps = coarsePointer ? 30 : 60;
      const minFrameMs = 1000 / targetFps;
      if (now - lastFrame < minFrameMs) {
        frameId = requestAnimationFrame(loop);
        return;
      }
      lastFrame = now;

      draw(now);
      frameId = requestAnimationFrame(loop);
    }

    // Defer canvas boot until after the hero entrance has main-thread priority
    let startTimer = 0;
    canvas.style.opacity = "0";
    const start = () => {
      resize();
      frameId = requestAnimationFrame(loop);
      canvas.style.opacity = "1";
    };
    if (window.requestIdleCallback) {
      startTimer = window.requestIdleCallback(start, { timeout: 1200 }) as unknown as number;
    } else {
      startTimer = window.setTimeout(start, 900);
    }

    window.addEventListener("resize", resize);
    if (!coarsePointer) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseleave", onLeave);
      window.addEventListener("click", onClick);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frameId);
      if (window.cancelIdleCallback) window.cancelIdleCallback(startTimer);
      else clearTimeout(startTimer);
      window.removeEventListener("resize", resize);
      if (!coarsePointer) {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseleave", onLeave);
        window.removeEventListener("click", onClick);
      }
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [interactive]);

  return (
    <div className="site-gradient" aria-hidden="true">
      {interactive ? (
        <>
          {auroraReady ? (
            <div className="site-gradient-aurora site-gradient-aurora--primary">
              <Aurora
                colorStops={["#0e7490", "#1e3a8a", "#6d28d9"]}
                amplitude={1.3}
                blend={0.72}
                speed={0.75}
              />
            </div>
          ) : null}
          <canvas ref={canvasRef} className="site-gradient-particles" />
          <div className="site-gradient-grid site-gradient-grid--animated" />
        </>
      ) : (
        <div className="site-gradient-grid" />
      )}

      <div className="site-gradient-blob site-gradient-blob--one" />
      <div className="site-gradient-blob site-gradient-blob--two" />
      <div className="site-gradient-blob site-gradient-blob--three" />

      <div className="site-gradient-vignette" />
    </div>
  );
}
