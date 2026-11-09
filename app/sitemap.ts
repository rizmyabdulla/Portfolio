import type { MetadataRoute } from "next";
import { portfolio } from "@/lib/portfolio";
import { getBlogPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  const latest = posts.length ? new Date(`${posts[0].updated ?? posts[0].date}T00:00:00Z`) : undefined;
  return [
    { url: portfolio.url, lastModified: latest, changeFrequency: "monthly", priority: 1 },
    { url: `${portfolio.url}/blog`, lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map(post => ({ url: `${portfolio.url}/blog/${post.slug}`, lastModified: new Date(`${post.updated ?? post.date}T00:00:00Z`), priority: 0.7 })),
  ];
}
