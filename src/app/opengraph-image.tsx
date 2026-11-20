import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = "Jayden Saha — CS Student · Full-Stack & AI Systems";
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
          justifyContent: "space-between",
          padding: "56px 72px",
          background: "linear-gradient(135deg, #080b12 0%, #0f172a 55%, #1e1b4b 100%)",
          color: "#eef2ff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px 56px",
            background: "rgba(15, 23, 42, 0.72)",
            border: "1px solid rgba(148, 163, 184, 0.22)",
            borderRadius: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 18,
                fontWeight: 500,
                color: "#2dd4bf",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#2dd4bf",
                }}
              />
              <span>{profile.availability}</span>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 18,
                color: "#94a3b8",
                letterSpacing: "0.02em",
              }}
            >
              {profile.location}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 84,
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                color: "#eef2ff",
              }}
            >
              {profile.name}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 30,
                color: "#cbd5e1",
                lineHeight: 1.4,
                maxWidth: 920,
              }}
            >
              {profile.role}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 28,
              borderTop: "1px solid rgba(148, 163, 184, 0.18)",
              fontSize: 20,
              color: "#94a3b8",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span>AI Agents</span>
              <span style={{ color: "#2dd4bf" }}>·</span>
              <span>Full-Stack</span>
              <span style={{ color: "#a78bfa" }}>·</span>
              <span>Machine Learning</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", fontWeight: 700, color: "#eef2ff" }}>
              <span>JS</span>
              <span style={{ color: "#2dd4bf" }}>.</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
