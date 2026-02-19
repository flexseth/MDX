# Changelog

All notable changes to this project will be documented in this file.

---

## [Unreleased]

---

## [1.2.0] - 2026-02-19

### Added

- Live date display demo in `toggle-control.mdx` — "With Help Text" section now shows today's date (formatted as `Weekday, Month Day, Year`) when the toggle is switched on
- Demonstrates conditional JSX rendering inside MDX using a `useState` hook and `toLocaleDateString`
- Sidebar brand renamed from "MDX Docs" to "Gutendoc"

### Changed

- `ShowDateDemo` updated: toggle defaults to off, conditionally renders current date on enable

---

## [1.0.0] - 2026-02-19

### Added

- Initial release — MDX rendering confirmed working via Vercel deployment
- **[Live Demo](https://vercel.com/flexseths-projects/mdx-for-wordpress-documentation)** — MDX pages render React components inline with Markdown
- `@mdx-js/rollup` compiles `.mdx` files to React components at build time (no runtime overhead)
- `MDXProvider` via `@mdx-js/react` maps markdown elements and custom components globally across all docs
- `remark-gfm` plugin enables GitHub Flavored Markdown: tables, task lists, strikethrough
- Documentation pages rendering live with interactive components:
  - `getting-started.mdx` — intro with live component demos, GFM tables, JS expressions
  - `alert.mdx` — Alert variants (`info`, `warning`, `success`, `error`) with PropsTable
  - `button.mdx` — Button variants and sizes with PropsTable
  - `card.mdx` — Card nesting examples with PropsTable
- Reusable React components available globally in all `.mdx` files without imports:
  - `Alert` — callout component with four severity variants
  - `Button` — primary / secondary / outline with small / medium / large sizes
  - `Card` — bordered container with optional title header
  - `CodeBlock` — dark-themed code display with language label
  - `PropsTable` — renders prop definitions as a documentation table
- Sidebar navigation layout with responsive mobile collapse
- Vite + React dev server (`npm run dev`) and production build (`npm run build`)
- PR [#1](https://github.com/flexseth/MDX/pull/1) — fix: index page loading (merged)
