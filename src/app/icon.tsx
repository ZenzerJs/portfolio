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
          background: "linear-gradient(135deg, #0e7490, #6d28d9)",
          borderRadius: 8,
          fontSize: 18,
          fontWeight: 700,
          color: "#eef2ff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        JS
      </div>
    ),
    { ...size },
  );
}
