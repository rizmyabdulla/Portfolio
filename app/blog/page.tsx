import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, PencilLine } from "lucide-react";
import { formatPostDate, getBlogPosts } from "@/lib/blog";
import { portfolio } from "@/lib/portfolio";
import { AnimatedEmoji } from "@/components/animated-emoji";

export const metadata: Metadata = {
  title: "Blog",
  description: `Notes on software, projects, and building things from ${portfolio.name}.`,
  alternates: { canonical: "/blog" },
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
      <header className="blog-intro">
        <p className="eyebrow"><PencilLine size={16} aria-hidden="true" /> words between the lines</p>
        <h1>Notes from my <span className="notebook-highlight">notebook.</span> <AnimatedEmoji name="typing" size={38} className="blog-emoji" eager /></h1>
        <p>A few ideas, some work in progress, and things worth writing down.</p>
      </header>

      {posts.length > 0 ? (
        <section aria-label="Blog posts" className="blog-posts">
          <div className="blog-list-heading"><span>{String(posts.length).padStart(2, "0")} {posts.length === 1 ? "note" : "notes"}</span><span>newest first ↓</span></div>
          {posts.map((post, index) => (
            <article key={post.slug}>
              <Link className="post-card" href={`/blog/${post.slug}`}>
                <span className="post-number" aria-hidden="true">{String(index + 1).padStart(2, "0")} /</span>
                <div className="post-card-copy">
                  <div className="post-meta"><time dateTime={post.date}>{formatPostDate(post.date)}</time><span aria-hidden="true">·</span><span>{post.readingMinutes} min read</span></div>
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                  {post.tags.length > 0 && <ul className="post-tags" aria-label="Topics">{post.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
                  <span className="post-read">Read the note <ArrowRight size={17} aria-hidden="true" /></span>
                </div>
                <ArrowUpRight className="post-card-arrow" size={27} strokeWidth={1.4} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </section>
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
