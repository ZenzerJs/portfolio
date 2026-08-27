"use client";

import React, { useRef, useState, type ReactNode } from "react";
import "./BorderGlow.css";

export interface BorderGlowProps {
  children?: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  style?: React.CSSProperties;
}

function parseHSL(hslStr: string): { h: number; s: number; l: number } {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 172, s: 75, l: 55 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildBoxShadow(glowColor: string, intensity: number): string {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  // Purely outward halo shadows — never floods the card interior
  const layers: [number, number, number, number, number][] = [
    [0, 0, 1, 0, 70],
    [0, 0, 4, 0, 55],
    [0, 0, 10, 1, 40],
    [0, 0, 22, 2, 25],
    [0, 0, 40, 3, 15],
  ];
  return layers
    .map(([x, y, blur, spread, alpha]) => {
      const a = Math.min(alpha * intensity, 100);
      return `${x}px ${y}px ${blur}px ${spread}px hsl(${base} / ${a}%)`;
    })
    .join(", ");
}

const GRADIENT_POSITIONS = [
  "80% 55%",
  "69% 34%",
  "8% 6%",
  "41% 38%",
  "86% 85%",
  "82% 18%",
  "51% 4%",
];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildMeshGradients(colors: string[]): string[] {
  const gradients: string[] = [];
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    gradients.push(`radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`);
  }
  gradients.push(`linear-gradient(${colors[0]} 0 100%)`);
  return gradients;
}

export const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "172 75 55",
  backgroundColor = "rgba(15, 23, 42, 0.55)",
  borderRadius = 28,
  glowRadius = 35,
  glowIntensity = 1.0,
  coneSpread = 12,
  colors = ["#2dd4bf", "#a78bfa", "#38bdf8"],
  style = {},
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorAngle, setCursorAngle] = useState(45);
  const [edgeProximity, setEdgeProximity] = useState(0);

  const getCenterOfElement = (el: HTMLElement) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  };

  const getEdgeProximity = (el: HTMLElement, x: number, y: number) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  };

  const getCursorAngle = (el: HTMLElement, x: number, y: number) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    const radians = Math.atan2(dy, dx);
    let degrees = radians * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    return degrees;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setEdgeProximity(getEdgeProximity(card, x, y));
    setCursorAngle(getCursorAngle(card, x, y));
  };

  const colorSensitivity = edgeSensitivity + 15;
  const borderOpacity = isHovered
    ? Math.max(0, (edgeProximity * 100 - colorSensitivity) / (100 - colorSensitivity))
    : 0;
  const glowOpacity = isHovered
    ? Math.max(0, (edgeProximity * 100 - edgeSensitivity) / (100 - edgeSensitivity))
    : 0;

  const meshGradients = buildMeshGradients(colors);
  const borderBg = meshGradients.map((g) => `${g} border-box`).join(", ");
  const angleDeg = `${cursorAngle.toFixed(2)}deg`;

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => {
        setIsHovered(false);
        setEdgeProximity(0);
      }}
      className={`relative isolate rounded-[inherit] border border-[var(--panel-border)] backdrop-blur-md transition-shadow duration-300 ${className}`}
      style={{
        background: backgroundColor,
        borderRadius: `${borderRadius}px`,
        transform: "translate3d(0, 0, 0.01px)",
        ...style,
      }}
    >
      {/* 1. DIRECTIONAL BORDER GLOW: Only nearest edge lights up, center is 100% hollow */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-[1]"
        style={{
          opacity: borderOpacity,
          maskImage: `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread + 14}%, transparent ${100 - coneSpread - 14}%, black ${100 - coneSpread}%)`,
          WebkitMaskImage: `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread + 14}%, transparent ${100 - coneSpread - 14}%, black ${100 - coneSpread}%)`,
          transition: isHovered ? "opacity 0.15s ease-out" : "opacity 0.4s ease-in-out",
        }}
      >
        <div
          className="border-glow-stroke"
          style={{
            background: borderBg,
          }}
        />
      </div>

      {/* 2. OUTER DIRECTIONAL HALO: Only outside nearest edge */}
      <span
        className="absolute pointer-events-none z-[-1] rounded-[inherit]"
        style={{
          inset: `${-glowRadius}px`,
          maskImage: `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread + 16}%, transparent ${100 - coneSpread - 16}%, black ${100 - coneSpread}%)`,
          WebkitMaskImage: `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread + 16}%, transparent ${100 - coneSpread - 16}%, black ${100 - coneSpread}%)`,
          opacity: glowOpacity,
          mixBlendMode: "screen",
          transition: isHovered ? "opacity 0.15s ease-out" : "opacity 0.4s ease-in-out",
        }}
      >
        <span
          className="absolute rounded-[inherit]"
          style={{
            inset: `${glowRadius}px`,
            boxShadow: buildBoxShadow(glowColor, glowIntensity),
          }}
        />
      </span>

      {/* 3. CELL CONTENT: Exact same glass styling, crystal clear text */}
      <div className="relative w-full h-full z-[2] rounded-[inherit] overflow-visible">
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
