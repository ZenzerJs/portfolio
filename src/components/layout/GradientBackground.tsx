"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const Aurora = dynamic(() => import("@/components/Aurora"), { ssr: false });

type Star = {
  /** base position in canvas space (unwrapped) */
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  /** 0.35 (far) → 1 (near) — drives parallax, size, brightness */
  depth: number;
  hue: number;
  twinklePhase: number;
  twinkleSpeed: number;
};

// Particle density scales with viewport area, capped for performance.
function targetCount(width: number, height: number) {
  return Math.min(Math.round((width * height) / 11000), 150);
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

export function GradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, active: false });
  const scroll = useRef({ y: 0, velocity: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let frameId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let running = true;

    // Eased mouse-parallax offset for the whole field.
    let parallaxX = 0;
    let parallaxY = 0;

    const CONNECT = 138;
    const CURSOR_RADIUS = 220;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
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

    // Click burst — radial impulse on nearby stars.
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
        frameId = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(frameId);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Ease whole-field parallax toward the cursor for a subtle depth tilt.
      if (mouse.current.active) {
        const tx = (mouse.current.x - width / 2) * 0.025;
        const ty = (mouse.current.y - height / 2) * 0.025;
        parallaxX += (tx - parallaxX) * 0.05;
        parallaxY += (ty - parallaxY) * 0.05;
      } else {
        parallaxX += (0 - parallaxX) * 0.05;
        parallaxY += (0 - parallaxY) * 0.05;
      }

      // Decay scroll velocity so the "streak" boost fades after scrolling stops.
      scroll.current.velocity *= 0.9;
      const scrollBoost = Math.min(Math.abs(scroll.current.velocity) / 40, 1);

      const time = performance.now() * 0.001;
      const rx: number[] = new Array(stars.length);
      const ry: number[] = new Array(stars.length);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Cursor repel.
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

        // Drift + gentle return-to-calm damping.
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.96;
        s.vy *= 0.96;
        // Tiny idle wander so the field never fully freezes.
        s.vx += (Math.random() - 0.5) * 0.01 * s.depth;
        s.vy += (Math.random() - 0.5) * 0.01 * s.depth;

        // Wrap horizontally.
        if (s.x < 0) s.x += width;
        if (s.x > width) s.x -= width;
        if (s.y < 0) s.y += height;
        if (s.y > height) s.y -= height;

        // Rendered position: base + scroll parallax (depth) + mouse parallax (depth), wrapped.
        const px = s.x + parallaxX * s.depth;
        const py =
          ((((s.y - scroll.current.y * s.depth * 0.12) % height) + height) % height) +
          parallaxY * s.depth;
        rx[i] = px;
        ry[i] = py;
      }

      // Connections between nearby stars (constellation lines).
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = rx[i] - rx[j];
          const dy = ry[i] - ry[j];
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECT) {
            const depthAvg = (stars[i].depth + stars[j].depth) / 2;
            const alpha = (1 - dist / CONNECT) * (0.16 + scrollBoost * 0.14) * depthAvg;
            const hue = (stars[i].hue + stars[j].hue) / 2;
            ctx.strokeStyle = `hsla(${hue}, 80%, 66%, ${alpha})`;
            ctx.lineWidth = 0.5 + depthAvg * 0.6;
            ctx.beginPath();
            ctx.moveTo(rx[i], ry[i]);
            ctx.lineTo(rx[j], ry[j]);
            ctx.stroke();
          }
        }
      }

      // Cursor constellation — link the pointer to nearby stars.
      if (mouse.current.active) {
        for (let i = 0; i < stars.length; i++) {
          const dx = rx[i] - mouse.current.x;
          const dy = ry[i] - mouse.current.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CURSOR_RADIUS) {
            const alpha = (1 - dist / CURSOR_RADIUS) * 0.5 * stars[i].depth;
            ctx.strokeStyle = `hsla(${stars[i].hue}, 90%, 72%, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(mouse.current.x, mouse.current.y);
            ctx.lineTo(rx[i], ry[i]);
            ctx.stroke();
          }
        }
      }

      // Stars themselves, with twinkle + depth glow.
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const twinkle = 0.55 + 0.45 * Math.sin(time * s.twinkleSpeed + s.twinklePhase);
        const alpha = (0.25 + s.depth * 0.5) * twinkle;
        const size = s.size * (1 + scrollBoost * 0.25);

        // soft glow
        ctx.fillStyle = `hsla(${s.hue}, 85%, 72%, ${alpha * 0.28})`;
        ctx.beginPath();
        ctx.arc(rx[i], ry[i], size * 2.6, 0, Math.PI * 2);
        ctx.fill();

        // core
        ctx.fillStyle = `hsla(${s.hue}, 90%, 80%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(rx[i], ry[i], size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    function loop() {
      if (!running) return;
      draw();
      frameId = requestAnimationFrame(loop);
    }

    resize();
    loop();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("click", onClick);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="site-gradient" aria-hidden="true">
      {/* Calm aurora glow, dialed back so the constellation reads as the hero. */}
      <div className="site-gradient-aurora site-gradient-aurora--primary">
        <Aurora colorStops={["#0e7490", "#1e3a8a", "#6d28d9"]} amplitude={1.0} blend={0.6} speed={0.6} />
      </div>

      <div className="site-gradient-blob site-gradient-blob--one" />
      <div className="site-gradient-blob site-gradient-blob--two" />
      <div className="site-gradient-blob site-gradient-blob--three" />

      <canvas ref={canvasRef} className="site-gradient-particles" />

      <div className="site-gradient-grid site-gradient-grid--animated" />
      <div className="site-gradient-vignette" />
    </div>
  );
}
