# my-portfolio

A personal portfolio and Markdown blog built with Next.js, React, TypeScript, and Tailwind CSS. The design combines lined paper, handwritten typography, and blue and yellow highlights.

- Responsive project showcase, profile, and contact links.
- Markdown articles with tags, reading times, and draft support.
- Search and social metadata, structured data, and an XML sitemap.
- Animated emojis, paper tooltips, and interactive hover effects with reduced-motion support.

## Run locally

Requires Node.js 20.9 or newer and npm.

```powershell
npm ci
npm run dev
```

Open http://localhost:3000.

## Customize

- `lib/portfolio.ts`: site name, domain, profile, projects, skills, and contact links.
- `app/globals.css`: paper, ink, highlights, layout, and responsive rules.
- `components/hero-portrait.tsx` and `app/portrait.css`: portrait composition and animated SVG scribbles.
- `public/projects/`: project preview images.
- `public/images/portrait-cutout.png`: transparent portrait used in the hero and profile avatars.
- `content/blog/`: Markdown articles and draft templates.
- `app/blog/blog.css`: blog and article styles.
- `app/motion.css`: emoji, tooltip, and hover styles.
- `lib/emojis.ts` and `public/emojis/`: emoji labels, animations, and static fallbacks.

The footer's motion control pauses animations and saves the preference in the browser. System reduced-motion settings are respected by default.

Page titles, author names, and structured data use the shared site configuration. When changing the brand, also update the favicon in `app/icon.svg`.

## Check and build

```powershell
npm test
npm run lint
npm run typecheck
npm run build
npm start
```

Google fonts are self-hosted by Next.js after being downloaded at build time, so the first build needs internet access. Retain `package-lock.json` and use `npm ci` for reproducible installs.

## Blog

The blog is at `/blog`; each article is at `/blog/<filename-without-md>`. Posts live in `content/blog/` and are rendered from Markdown, with tables, fenced code blocks, task lists, and strikethrough support. Raw HTML is disabled.

To publish a note, create a file such as `content/blog/my-new-note.md`:

```markdown
---
title: "My new note"
description: "A short summary for the blog list and search previews."
date: "2026-11-09"
tags: ["Engineering", "Notes"]
draft: false
---

Your introduction goes here.

## A heading

The rest of your article.
```

Use lowercase words separated by hyphens in filenames. `title`, `description`, and `date` are required. `tags` and `draft` are optional; `draft` defaults to `false`. Add an optional `updated: "2026-11-10"` when revising an article. Dates must use `YYYY-MM-DD`; an update cannot predate the original article.

`your-next-note.md` is an unpublished template. Posts with `draft: true` are excluded from the list, article routes, and sitemap. Published posts sort by date, newest first, and have reading times, canonical URLs, article metadata, and structured data. Remove all published files for the empty state. Add images to `public/blog/` and reference them as `![Description](/blog/image.jpg)` in Markdown.

Posts are generated at build time: run `npm run build` and redeploy after adding, editing, removing, or publishing a post. There is no CMS or login to configure. To preview a draft locally, temporarily set `draft: false` while running `npm run dev`; restore it before deploying if it is not ready.

`npm test` checks metadata validation, ordering, draft exclusion, missing content, date formatting, Markdown rendering, and unsafe-link handling.

## Deployment

Deploy as a Next.js project using `npm run build` and `npm start`, or use a hosting provider with Next.js support. Configure the production URL in `lib/portfolio.ts` and follow the host's custom domain and DNS instructions. Rebuild after updating site content or configuration.

## Acknowledgments

Emoji artwork: [emoji.gg](https://emoji.gg/). Individual source URLs are recorded in `public/emojis/sources.json`.
