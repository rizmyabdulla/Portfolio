# Rizmy Abdullah — Portfolio

A Next.js App Router portfolio for **rizmyabdulla.dev**, with a warm lined-paper background, handwritten typography, blue and yellow marker highlights, and notebook illustrations.

## Run locally

Requires Node.js 20.9 or newer and npm.

```powershell
npm ci
npm run dev
```

Open http://localhost:3000. The directory is named `Portfolio`; the npm package is lowercase to follow npm naming rules.

## Customize

- `lib/portfolio.ts`: name, domain, introduction, about text, projects, email, and social URLs.
- `app/globals.css`: paper, ink, highlights, layout, and responsive rules.
- `components/notebook-art.tsx`: original initials illustration.
- `public/projects/`: local screenshots of Kordify and TellerCat.
- `public/images/rizmy-avatar.png`: public GitHub profile avatar.

The name, Software Engineer & Entrepreneur role, domain, email, social links, and projects were supplied by Rizmy. The bio and selected skills were adapted from the [public GitHub profile](https://github.com/rizmyabdulla/RizmyAbdulla). Product descriptions were checked against [Kordify](https://getkordify.com) and [TellerCat](https://tellercat.com). LinkedIn blocks automated reading, so no biography or employment details were taken from it. Dated age and education claims from the GitHub README are omitted.

## Check and build

```powershell
npm run lint
npm run typecheck
npm run build
npm start
```

Google fonts are self-hosted by Next.js after being downloaded at build time, so the first build needs internet access. Retain `package-lock.json` and use `npm ci` for reproducible installs.

## Deployment

Deploy the `Portfolio` directory as a Next.js project. Set the custom domain to `rizmyabdulla.dev` with your hosting provider and add its DNS records at your registrar. Canonical URLs, robots.txt, sitemap.xml, favicon, and Open Graph image already use that domain. This source does not configure DNS or publish the site.

## Design reference

Inspired by Caleb Ephrem's [portfolio](https://github.com/calebephrem/portfolio): lined paper, handwritten fonts, highlighter accents, and playful paper shapes. This is a fresh implementation with original copy and SVG artwork; it does not reuse Caleb's photos, identity, posts, or projects. The reference is MIT-licensed.
