import type { Heading } from "@/lib/headings";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length < 2) return null;
  return (
    <nav className="post-toc" aria-labelledby="toc-title">
      <p id="toc-title">On this page</p>
      <ol>
        {headings.map(heading => (
          <li key={heading.id} className={heading.level === 3 ? "toc-sub" : undefined}><a href={`#${heading.id}`}>{heading.text}</a></li>
        ))}
      </ol>
    </nav>
  );
}
