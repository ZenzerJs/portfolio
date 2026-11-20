import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #080b12 0%, #0f172a 60%, #1e1b4b 100%)",
          border: "1px solid rgba(45, 212, 191, 0.45)",
          borderRadius: 8,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: "#eef2ff",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span>JS</span>
          <span style={{ color: "#2dd4bf" }}>.</span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 5,
            right: 5,
            height: 2,
            background: "linear-gradient(90deg, #2dd4bf, #a78bfa)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
