import { getBlogPosts } from "@/lib/blog";
import { portfolio } from "@/lib/portfolio";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const posts = await getBlogPosts();
  const items = posts.map(post => `<item><title>${esc(post.title)}</title><link>${portfolio.url}/blog/${post.slug}</link><guid isPermaLink="true">${portfolio.url}/blog/${post.slug}</guid><pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate><description>${esc(post.description)}</description>${post.tags.map(t => `<category>${esc(t)}</category>`).join("")}</item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Notes from ${esc(portfolio.name)}'s notebook</title><link>${portfolio.url}/blog</link><atom:link href="${portfolio.url}/blog/feed.xml" rel="self" type="application/rss+xml"/><description>Ideas, work in progress, and things worth writing down.</description><language>en</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
