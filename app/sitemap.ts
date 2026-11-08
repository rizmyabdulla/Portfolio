import type { MetadataRoute } from "next";
import { portfolio } from "@/lib/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: portfolio.url, changeFrequency: "monthly", priority: 1 }];
}
