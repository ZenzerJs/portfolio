import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = "Jayden Saha — Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #080b12 0%, #0f172a 45%, #1e1b4b 100%)",
          color: "#eef2ff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
            fontSize: 18,
            color: "#2dd4bf",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#2dd4bf",
              boxShadow: "0 0 16px rgba(45, 212, 191, 0.8)",
            }}
          />
          {profile.availability}
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: 24,
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#cbd5e1",
            lineHeight: 1.4,
            maxWidth: 900,
          }}
        >
          {profile.role}
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 16,
            fontSize: 20,
            color: "#94a3b8",
          }}
        >
          <span>AI Agents</span>
          <span style={{ color: "#2dd4bf" }}>·</span>
          <span>Full-Stack</span>
          <span style={{ color: "#a78bfa" }}>·</span>
          <span>Machine Learning</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
