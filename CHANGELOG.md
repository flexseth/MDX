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
## [1.1.0] - 2026-02-19

Project renamed to `Gutendocs` — a documentation system for WordPress projects using MDX.

### Notes
- Non-persistent: Component resets on page refresh

### Reworked
- `ToggleControl` and `SelectControl` use state management for demos

### Added

- `ToggleControl` component — boolean toggle switch mirroring `@wordpress/components`
  - Props: `label`, `checked`, `onChange`, `help`, `disabled`, `className`
  - Accessible: keyboard navigable, focus-visible ring, ARIA `describedby` for help text
- `SelectControl` component — dropdown select mirroring `@wordpress/components`
  - Props: `label`, `value`, `options`, `onChange`, `help`, `disabled`, `className`, `children` (optgroup)
  - Controlled via `options` array or raw `<optgroup>` children
- `toggle-control.mdx` — interactive demos with stateful `EnableFeatureDemo` and `ShowDateDemo` wrappers, WordPress `edit.js` examples, `block.json` snippets, and PropsTable
- `select-control.mdx` — interactive demos with stateful `AlignmentDemo` and `FontSizeDemo` wrappers, WordPress `edit.js` examples, `block.json` snippets, and PropsTable
- Both components registered globally in `MDXComponentsProvider` — no imports needed in `.mdx` files
- Sidebar nav and routes added for `/docs/toggle-control` and `/docs/select-control`
- BEM styles for both components added to `docs.css`
- PR [#2](https://github.com/flexseth/MDX/pull/2) — fix: SelectControl value saving and ToggleControl toggling in MDX docs (merged)

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
