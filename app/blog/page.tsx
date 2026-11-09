import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, PencilLine } from "lucide-react";
import { formatPostDate, getBlogPosts } from "@/lib/blog";
import { portfolio } from "@/lib/portfolio";
import { JsonLd } from "@/lib/jsonld";
import { BlogList } from "@/components/blog-list";
import { AnimatedEmoji } from "@/components/animated-emoji";

export const metadata: Metadata = {
  title: "Blog",
  description: `Notes on software, projects, and building things from ${portfolio.name}.`,
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/feed.xml" } },
  openGraph: {
    type: "website",
    title: `Notes from my notebook | ${portfolio.name}`,
    description: "A few ideas, some work in progress, and things worth writing down.",
    url: `${portfolio.url}/blog`,
  },
};

export default async function Blog() {
  const posts = await getBlogPosts();

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Blog", url: `${portfolio.url}/blog`, name: `Notes from ${portfolio.name}'s notebook`, author: { "@type": "Person", name: portfolio.name, url: portfolio.url }, blogPost: posts.map(post => ({ "@type": "BlogPosting", headline: post.title, url: `${portfolio.url}/blog/${post.slug}`, datePublished: post.date })) }} />
      <header className="blog-intro">
        <p className="eyebrow"><PencilLine size={16} aria-hidden="true" /> words between the lines</p>
        <h1>Notes from my <span className="notebook-highlight">notebook.</span> <AnimatedEmoji name="typing" size={38} className="blog-emoji" eager /></h1>
        <p>A few ideas, some work in progress, and things worth writing down.</p>
      </header>

      {posts.length > 0 ? (
        <BlogList posts={posts.map(({ slug, title, description, date, readingMinutes, tags }) => ({ slug, title, description, date, dateLabel: formatPostDate(date), readingMinutes, tags }))} />
      ) : (
        <section className="blog-empty" aria-labelledby="empty-title">
          <BookOpen size={38} strokeWidth={1.3} aria-hidden="true" />
          <h2 id="empty-title">A fresh page, for now.</h2>
          <p>The first note is still taking shape. Come back soon.</p>
          <Link className="text-cta" href="/">Explore my projects <ArrowRight size={17} aria-hidden="true" /></Link>
        </section>
      )}

      <aside className="blog-endnote"><span aria-hidden="true">✳</span><p>Prefer to talk things through? <Link className="ink-link" href="/#contact">Say hello <ArrowUpRight size={15} aria-hidden="true" /></Link>.</p></aside>
    </>
  );
}
