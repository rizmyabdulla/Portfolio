import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Markdown } from "../components/markdown";
import { formatPostDate, getBlogPost, parseBlogPost, publishedBlogPosts, readBlogPosts } from "../lib/blog";

function source(metadata: Record<string, unknown> = {}, content = "A small note.") {
  return ["---", ...Object.entries({ title: "A note", description: "A short summary.", date: "2026-11-09", ...metadata }).map(([key, value]) => `${key}: ${JSON.stringify(value)}`), "---", content].join("\n");
}

test("parses metadata and Markdown, normalizes tags, and estimates reading time", () => {
  const post = parseBlogPost("a-small-note", source({ tags: [" Web ", "Web", "Notes"], updated: "2026-11-10" }, "## Hello\n\nA useful **idea**."));
  assert.equal(post.slug, "a-small-note");
  assert.equal(post.title, "A note");
  assert.equal(post.date, "2026-11-09");
  assert.equal(post.updated, "2026-11-10");
  assert.equal(post.draft, false);
  assert.equal(post.readingMinutes, 1);
  assert.deepEqual(post.tags, ["Web", "Notes"]);
  assert.match(post.content, /## Hello/);
  assert.equal(parseBlogPost("long-note", source({}, "word ".repeat(600))).readingMinutes, 3);
});

test("accepts conventional unquoted YAML dates", () => {
  const post = parseBlogPost("a-note", "---\ntitle: A note\ndescription: Summary\ndate: 2026-11-09\n---\nHello.");
  assert.equal(post.date, "2026-11-09");
});

test("rejects incomplete posts, impossible dates, and malformed metadata", () => {
  for (const metadata of [
    { title: " " }, { description: null }, { date: "yesterday" }, { date: "2026-02-30" },
    { draft: "false" }, { tags: "Web" }, { tags: ["Web", ""] }, { updated: "2026-11-08" },
  ]) assert.throws(() => parseBlogPost("bad-note", source(metadata)), /Invalid blog post "bad-note\.md"/);
  assert.throws(() => parseBlogPost("empty-note", source({}, "  ")), /Markdown content/);
});

test("rejects invalid filenames and traversal attempts before loading a post", async () => {
  for (const slug of ["../portfolio", "has/slashes", "Uppercase", "two--hyphens", ""]) {
    assert.throws(() => parseBlogPost(slug, source()), /filename/);
    assert.equal(await getBlogPost(slug), undefined);
  }
});

test("lists published posts newest first with a stable tie order without mutating the input", () => {
  const input = [
    parseBlogPost("older", source({ date: "2026-11-07" })),
    parseBlogPost("zeta", source({ date: "2026-11-08" })),
    parseBlogPost("alpha", source({ date: "2026-11-08" })),
    parseBlogPost("private-draft", source({ date: "2026-11-09", draft: true })),
  ];
  const posts = publishedBlogPosts(input);
  assert.deepEqual(posts.map(post => post.slug), ["alpha", "zeta", "older"]);
  assert.ok(posts.every(post => !post.draft));
  assert.equal(input[0].slug, "older");
  assert.equal(input.length, 4);
});

test("no published content produces an empty blog", () => {
  assert.deepEqual(publishedBlogPosts([]), []);
  assert.deepEqual(publishedBlogPosts([parseBlogPost("draft", source({ draft: true }))]), []);
});

test("the filesystem loader does not expose drafts", async () => {
  const posts = await readBlogPosts();
  assert.ok(posts.every(post => !post.draft));
  assert.equal(await getBlogPost("your-next-note"), undefined);
});

test("formats dates consistently in UTC", () => {
  assert.equal(formatPostDate("2026-11-09"), "9 Nov 2026");
});

test("renders fenced code, tables, task lists, and strikethrough", () => {
  const html = renderToStaticMarkup(createElement(Markdown, { content: "## A heading\n\n```typescript\nconst note = 'hello';\n```\n\n| Idea | Next step |\n| --- | --- |\n| A note | Write |\n\n- [x] Done\n\n~~Old idea~~" }));
  assert.match(html, /<h2>A heading<\/h2>/);
  assert.match(html, /<pre><code class="language-typescript">/);
  assert.match(html, /<table>/);
  assert.match(html, /role="region" aria-label="Article table" tabindex="0"/);
  assert.match(html, /type="checkbox"/);
  assert.match(html, /<del>Old idea<\/del>/);
});

test("does not execute raw HTML or allow javascript links, and secures external links", () => {
  const html = renderToStaticMarkup(createElement(Markdown, { content: '<script>alert("bad")</script>\n\n[Unsafe](javascript:alert%281%29)\n\n[External](https://example.com)\n\n[Internal](/blog)' }));
  assert.doesNotMatch(html, /<script|href="javascript:/i);
  assert.match(html, /href="https:\/\/example.com" target="_blank" rel="noopener noreferrer"/);
  assert.match(html, /href="\/blog">Internal/);
});
