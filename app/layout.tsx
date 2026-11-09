import type { Metadata } from "next";
import { Caveat_Brush, Patrick_Hand } from "next/font/google";
import { portfolio } from "@/lib/portfolio";
import { JsonLd } from "@/lib/jsonld";
import "./globals.css";
import "./motion.css";
import "./portrait.css";
import "./enhancements.css";

const display = Caveat_Brush({ weight: "400", subsets: ["latin"], variable: "--font-heading", display: "swap" });
const handwriting = Patrick_Hand({ weight: "400", subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(portfolio.url),
  authors: [{ name: portfolio.name, url: portfolio.url }],
  creator: portfolio.name,
  title: { default: `${portfolio.name} — ${portfolio.role}`, template: `%s | ${portfolio.name}` },
  description: `${portfolio.name}, software engineer and entrepreneur building web and mobile products. Explore Kordify, TellerCat, and my work in open source.`,
  openGraph: {
    type: "website",
    url: portfolio.url,
    siteName: portfolio.name,
    title: `${portfolio.name} — ${portfolio.role}`,
    description: portfolio.tagline,
  },
  twitter: { card: "summary_large_image", title: `${portfolio.name} — ${portfolio.role}`, description: portfolio.tagline },
  alternates: { canonical: "/", types: { "application/rss+xml": "/blog/feed.xml" } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${handwriting.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem("my-portfolio:theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}})()` }} /></head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <JsonLd data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Person", "@id": `${portfolio.url}/#person`, name: portfolio.name, url: portfolio.url, jobTitle: portfolio.role, description: portfolio.about, image: `${portfolio.url}/images/portrait-cutout.png`, ...(portfolio.email ? { email: portfolio.email } : {}), sameAs: portfolio.socials.map(social => social.url) },
            { "@type": "WebSite", "@id": `${portfolio.url}/#website`, url: portfolio.url, name: `${portfolio.name} — ${portfolio.role}`, inLanguage: "en", publisher: { "@id": `${portfolio.url}/#person` } },
            { "@type": "ProfilePage", url: portfolio.url, mainEntity: { "@id": `${portfolio.url}/#person` } },
          ],
        }} />
        {children}
      </body>
    </html>
  );
}
