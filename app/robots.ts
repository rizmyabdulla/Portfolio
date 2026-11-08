import type { MetadataRoute } from "next";
import { portfolio } from "@/lib/portfolio";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${portfolio.url}/sitemap.xml` };
}
