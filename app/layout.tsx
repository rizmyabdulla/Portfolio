import type { Metadata } from "next";
import { Caveat_Brush, Patrick_Hand } from "next/font/google";
import { portfolio } from "@/lib/portfolio";
import "./globals.css";
import "./motion.css";
import "./portrait.css";

const display = Caveat_Brush({ weight: "400", subsets: ["latin"], variable: "--font-heading", display: "swap" });
const handwriting = Patrick_Hand({ weight: "400", subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(portfolio.url),
  authors: [{ name: portfolio.name, url: portfolio.url }],
  creator: portfolio.name,
  title: { default: `${portfolio.name} — ${portfolio.role}`, template: `%s | ${portfolio.name}` },
  description: `${portfolio.name}, software engineer and entrepreneur building web and mobile products. Explore Kordify, TellerCat, and my work in open source.`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: portfolio.url,
    siteName: portfolio.name,
    title: `${portfolio.name} — ${portfolio.role}`,
    description: portfolio.tagline,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${handwriting.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: portfolio.name,
          url: portfolio.url,
          jobTitle: portfolio.role,
          sameAs: portfolio.socials.map(social => social.url),
        }).replace(/</g, "\\u003c") }} />
        {children}
      </body>
    </html>
  );
}
