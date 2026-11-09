import { ImageResponse } from "next/og";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { portfolio } from "@/lib/portfolio";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getBlogPosts()).map(post => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getBlogPost((await params).slug);
  const title = post?.title ?? "Notes from my notebook";
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "80px", background: "#faf7ef", color: "#444543", border: "20px solid #d5e4e8" }}>
      <div style={{ display: "flex", fontSize: 28 }}>{portfolio.domain} / blog</div>
      <div style={{ display: "flex", fontSize: title.length > 60 ? 54 : 70, fontWeight: 700, lineHeight: 1.15 }}>{title}</div>
      <div style={{ display: "flex", fontSize: 30 }}>{portfolio.name} · {portfolio.role}</div>
    </div>,
    { ...size },
  );
}
