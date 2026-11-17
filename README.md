# Prince Jecco-Obi — Portfolio

Personal site and blog. Built with Astro, mostly static, minimal by design.

## Stack

- **Astro 6** — static output, view transitions between pages
- **Tailwind CSS v4** — styling, no component library
- **React** — a couple of small islands (blog category filter)
- **MDX** — blog posts, via Astro content collections
- **Lenis** — smooth scroll
- **Astro Expressive Code** — code blocks in posts

## Content

- **Works** (`src/data/projects.ts`) — a curated list of repo names; stars, language, and last-updated are fetched live from the GitHub API at build time, so nothing here goes stale
- **Writings** (`src/content/blog/*.mdx`) — posts filed under `dev`, `gaming`, or `misc`; set `draft: true` to keep one out of production without deleting it

## Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                           |
| :----------------- | :----------------------------------------------- |
| `pnpm install`      | Installs dependencies                            |
| `pnpm dev`          | Starts local dev server at `localhost:4321`      |
| `pnpm build`        | Build the production site to `./dist/`           |
| `pnpm preview`      | Preview the build locally, before deploying      |
| `pnpm astro ...`    | Run CLI commands like `astro add`, `astro check` |

## Before deploying

- [ ] Fill in the real project blurbs in `src/data/projects.ts`
