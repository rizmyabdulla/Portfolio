import { ImageResponse } from "next/og";
import { portfolio } from "@/lib/portfolio";

export const alt = `${portfolio.name} - ${portfolio.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "90px", background: "#faf7ef", color: "#444543", border: "20px solid #d5e4e8" }}>
      <div style={{ display: "flex", fontSize: 24, marginBottom: 32 }}>{portfolio.domain}</div>
      <div style={{ display: "flex", fontSize: 74, fontWeight: 700, background: "#b0d4f1", padding: "8px 18px", alignSelf: "flex-start" }}>{portfolio.name}</div>
      <div style={{ display: "flex", fontSize: 32, marginTop: 34 }}>{portfolio.role}</div>
      <div style={{ display: "flex", fontSize: 24, marginTop: 18 }}>{portfolio.tagline}</div>
    </div>,
    { ...size },
  );
}
