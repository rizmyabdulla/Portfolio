import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  draft: boolean;
  content: string;
  readingMinutes: number;
};

const postsDirectory = path.join(process.cwd(), "content", "blog");
const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function parseBlogPost(slug: string, source: string): BlogPost {
  function invalid(message: string): never {
    throw new Error(`Invalid blog post "${slug}.md": ${message}`);
  }

  if (!validSlug.test(slug)) invalid("use lowercase words separated by hyphens for the filename.");
  const { data, content } = matter(source);

  function text(field: string): string {
    const value: unknown = data[field];
    if (typeof value !== "string" || !value.trim()) invalid(`"${field}" must be a nonempty string.`);
    return value.trim();
  }

  function date(field: string): string {
    const raw: unknown = data[field];
    const value = raw instanceof Date && !Number.isNaN(raw.getTime()) ? raw.toISOString().slice(0, 10) : raw;
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) invalid(`"${field}" must be a YYYY-MM-DD date.`);
    const parsed = new Date(`${value}T00:00:00Z`);
    if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) invalid(`"${field}" must be a real calendar date.`);
    return value;
  }

  if (data.draft !== undefined && typeof data.draft !== "boolean") invalid('"draft" must be true or false.');
  if (data.tags !== undefined && (!Array.isArray(data.tags) || data.tags.some((tag: unknown) => typeof tag !== "string" || !tag.trim()))) invalid('"tags" must be a list of nonempty strings.');
  if (!content.trim()) invalid("add some Markdown content below the front matter.");

  const published = date("date");
  const updated = data.updated === undefined ? undefined : date("updated");
  if (updated && updated < published) invalid('"updated" cannot be earlier than "date".');

  return {
    slug,
    title: text("title"),
    description: text("description"),
    date: published,
    updated,
    tags: [...new Set<string>((data.tags ?? []).map((tag: string) => tag.trim()))],
    draft: data.draft ?? false,
    content: content.trim(),
    readingMinutes: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 225)),
  };
}

export function publishedBlogPosts(posts: BlogPost[]): BlogPost[] {
  return posts.filter(post => !post.draft).sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export async function readBlogPosts(): Promise<BlogPost[]> {
  let entries;
  try {
    entries = await readdir(postsDirectory, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }

  const posts = await Promise.all(entries
    .filter(entry => entry.isFile() && entry.name.endsWith(".md"))
    .map(async entry => parseBlogPost(entry.name.slice(0, -3), await readFile(path.join(postsDirectory, entry.name), "utf8"))));

  return publishedBlogPosts(posts);
}

export const getBlogPosts = cache(() => readBlogPosts());

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  if (!validSlug.test(slug)) return undefined;
  return (await getBlogPosts()).find(post => post.slug === slug);
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}
