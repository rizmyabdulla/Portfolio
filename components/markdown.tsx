import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ReactNode } from "react";
import { createSlugger } from "@/lib/headings";

const textOf = (node: ReactNode): string => typeof node === "string" || typeof node === "number" ? String(node) : Array.isArray(node) ? node.map(textOf).join("") : node && typeof node === "object" && "props" in node ? textOf((node as { props: { children?: ReactNode } }).props.children) : "";

export function Markdown({ content }: { content: string }) {
  const slug = createSlugger();
  return (
    <div className="post-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        components={{
          h2: ({ children }) => <h2 id={slug(textOf(children))}>{children}</h2>,
          h3: ({ children }) => <h3 id={slug(textOf(children))}>{children}</h3>,
          a: ({ href, title, children }) => {
            const external = /^https?:\/\//i.test(href ?? "");
            return <a href={href} title={title} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>{children}</a>;
          },
          table: ({ children }) => <div className="post-table-scroll" role="region" aria-label="Article table" tabIndex={0}><table>{children}</table></div>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
