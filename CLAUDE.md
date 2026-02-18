# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal academic portfolio website for **Emmanuel Adeloju**, a PhD candidate in Learning, Literacies and Technology at Arizona State University. Research focus: Human-AI Interaction and Data Science Education.

- **Live site**: https://prodholly.github.io/EmmanuelAdeloju/
- **Framework**: Jekyll with the [al-folio](https://github.com/alshedivat/al-folio) academic theme
- **Hosting**: GitHub Pages

## Build & Development Commands

```bash
# Install dependencies
bundle install

# Serve locally with live reload
bundle exec jekyll serve --liveload

# Build for production
bundle exec jekyll build

# Serve with Docker (alternative)
docker compose up
```

## Content Architecture

All content lives in Markdown files with YAML front matter. Key content directories:

| Directory | Purpose |
|-----------|---------|
| `_pages/` | Static pages (about, CV, blog, publications, teaching, etc.) |
| `_posts/` | Blog posts (currently LLM/data sensemaking tutorials) |
| `_news/` | News/announcements shown on the homepage |
| `_bibliography/papers.bib` | Publications in BibTeX format (rendered via jekyll-scholar) |
| `_projects/` | Project showcase entries |
| `_teachings/` | Teaching materials and course info |
| `_data/` | Structured data (CV entries, navigation, etc.) |

## Site Configuration

- **`_config.yml`** — Main config: site metadata, name, URL (`baseurl: /EmmanuelAdeloju`), navbar, social links, theme settings
- **`_sass/`** — Custom SCSS overrides on top of al-folio theme
- **`assets/`** — Images, PDFs, JS, and other static files

## Important Guidelines

- **Do not restructure or restyle the site** — the layout and design have been carefully set up. Only make targeted content changes when asked.
- Blog posts use the naming convention `YYYY-MM-DD-slug.md`.
- News items in `_news/` appear on the homepage in chronological order.
- Publications are managed via `_bibliography/papers.bib` — add entries in BibTeX format.
