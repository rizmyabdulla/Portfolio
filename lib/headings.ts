export type Heading = { id: string; text: string; level: 2 | 3 };

export function createSlugger() {
  const seen = new Map<string, number>();
  return (text: string) => {
    const base = text.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-") || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count ? `${base}-${count}` : base;
  };
}

const plain = (text: string) => text.replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[`*_~]/g, "").trim();

export function extractHeadings(markdown: string): Heading[] {
  const slug = createSlugger();
  const headings: Heading[] = [];
  let fence: string | null = null;
  for (const line of markdown.split(/\r?\n/)) {
    const fenceMatch = line.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (fenceMatch) { fence = fence ? (line.trim().startsWith(fence[0]) ? null : fence) : fenceMatch[1]; continue; }
    if (fence) continue;
    const match = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
    if (!match) continue;
    const text = plain(match[2]);
    headings.push({ id: slug(text), text, level: match[1].length as 2 | 3 });
  }
  return headings;
}
