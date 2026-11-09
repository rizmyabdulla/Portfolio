import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { CopyLink } from "@/components/copy-link";
import { Markdown } from "@/components/markdown";
import { formatPostDate, getBlogPost, getBlogPosts } from "@/lib/blog";
import { portfolio } from "@/lib/portfolio";

type PostPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getBlogPosts()).map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getBlogPost((await params).slug);
  if (!post) return { title: "Note not found", robots: { index: false } };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${portfolio.url}/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [portfolio.name],
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getBlogPost((await params).slug);
  if (!post) notFound();
  const posts = await getBlogPosts();
  const index = posts.findIndex(candidate => candidate.slug === post.slug);
  const newer = posts[index - 1];
  const older = posts[index + 1];
  const url = `${portfolio.url}/blog/${post.slug}`;

  return (
    <div className="post-page">
      <Link className="post-back ink-link" href="/blog"><ArrowLeft size={16} aria-hidden="true" /> Back to all notes</Link>
      <article>
        <header className="post-header">
          <p className="eyebrow">a page from the notebook</p>
          <h1>{post.title}</h1>
          <p className="post-description">{post.description}</p>
          <div className="post-byline">
            <Image src="/images/portrait-cutout.png" width={34} height={34} alt="" className="profile-avatar" />
            <Link className="ink-link" href="/">{portfolio.name}</Link>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span className="post-reading"><Clock3 size={15} aria-hidden="true" /> {post.readingMinutes} min read</span>
          </div>
          {post.updated && <p className="post-updated">Updated <time dateTime={post.updated}>{formatPostDate(post.updated)}</time></p>}
          {post.tags.length > 0 && <ul className="post-tags" aria-label="Topics">{post.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
        </header>

        <Markdown content={post.content} />

        <footer className="post-signoff">
          <div><p className="eyebrow">thanks for reading</p><p>Found this interesting? Pass it on.</p></div>
          <CopyLink url={url} label="Copy article link" accessibleLabel="Copy article link" fallbackLabel="Article link" />
        </footer>
      </article>

      {(newer || older) && <nav className="post-pagination" aria-label="More posts">
        {newer ? <Link href={`/blog/${newer.slug}`}><span><ArrowLeft size={15} aria-hidden="true" /> Newer note</span><strong>{newer.title}</strong></Link> : <span />}
        {older && <Link href={`/blog/${older.slug}`}><span>Older note <ArrowRight size={15} aria-hidden="true" /></span><strong>{older.title}</strong></Link>}
      </nav>}

      <Link className="text-cta" href="/blog">Back to the notebook <ArrowLeft size={17} aria-hidden="true" /></Link>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        url,
        mainEntityOfPage: url,
        author: { "@type": "Person", name: portfolio.name, url: portfolio.url },
        publisher: { "@type": "Person", name: portfolio.name, url: portfolio.url },
        image: `${portfolio.url}/opengraph-image`,
        keywords: post.tags.join(", "),
      }).replace(/</g, "\\u003c") }} />
    </div>
  );
}
