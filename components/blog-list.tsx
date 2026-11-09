"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";

export type BlogListPost = { slug: string; title: string; description: string; date: string; dateLabel: string; readingMinutes: number; tags: string[] };

export function BlogList({ posts }: { posts: BlogListPost[] }) {
  const [tag, setTag] = useState<string | null>(null);
  const tags = useMemo(() => [...new Set(posts.flatMap(post => post.tags))].sort(), [posts]);
  const shown = tag ? posts.filter(post => post.tags.includes(tag)) : posts;

  return (
    <section aria-label="Blog posts" className="blog-posts">
      {tags.length > 0 && (
        <div className="tag-filter" role="group" aria-label="Filter notes by topic">
          <button type="button" aria-pressed={tag === null} onClick={() => setTag(null)}>All</button>
          {tags.map(item => <button key={item} type="button" aria-pressed={tag === item} onClick={() => setTag(tag === item ? null : item)}>{item}</button>)}
        </div>
      )}
      <div className="blog-list-heading" aria-live="polite"><span>{String(shown.length).padStart(2, "0")} {shown.length === 1 ? "note" : "notes"}{tag ? ` · ${tag}` : ""}</span><span>newest first ↓</span></div>
      {shown.map((post, index) => (
        <article key={post.slug}>
          <Link className="post-card" href={`/blog/${post.slug}`}>
            <span className="post-number" aria-hidden="true">{String(index + 1).padStart(2, "0")} /</span>
            <div className="post-card-copy">
              <div className="post-meta"><time dateTime={post.date}>{post.dateLabel}</time><span aria-hidden="true">·</span><span>{post.readingMinutes} min read</span></div>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              {post.tags.length > 0 && <ul className="post-tags" aria-label="Topics">{post.tags.map(item => <li key={item}>{item}</li>)}</ul>}
              <span className="post-read">Read the note <ArrowRight size={17} aria-hidden="true" /></span>
            </div>
            <ArrowUpRight className="post-card-arrow" size={27} strokeWidth={1.4} aria-hidden="true" />
          </Link>
        </article>
      ))}
    </section>
  );
}
