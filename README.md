# Gutendocs

A Vite + React + MDX documentation system for WordPress block and plugin development. Write component docs in Markdown with live interactive demos powered by React.

**[Live Demo →](https://gutendocs.vercel.app/)**

## Quick Start

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` — you'll see the sidebar navigation and live MDX-rendered documentation with interactive React components.

## Project Structure

| File | Purpose |
|---|---|
| `package.json` | Project config with all dependencies |
| `vite.config.js` | Vite + MDX plugin + remark-gfm |
| `index.html` | HTML entry point |
| `src/main.jsx` | React entry with Router + MDXProvider |
| `src/App.jsx` | Routes for each MDX doc page |
| `src/components/` | All documented components (see below) |
| `src/components/index.js` | Barrel export |
| `src/providers/MDXComponents.jsx` | MDXProvider mapping markdown elements + custom components |
| `src/layouts/DocLayout.jsx` | Sidebar navigation + content area |
| `src/hooks/useLocalStorage.js` | `useState` drop-in with localStorage persistence |
| `src/styles/docs.css` | Full styling for layout, components, and responsive |
| `src/docs/` | MDX documentation pages |
| `USAGE.md` | WordPress porting strategy guide |

## Components

All components mirror their `@wordpress/components` counterparts and are available globally in every `.mdx` file — no imports needed.

| Component | Description | Docs |
|---|---|---|
| `Alert` | Callout with `info`, `warning`, `success`, `error` variants | `/docs/alert` |
| `Button` | Primary / secondary / outline, three sizes | `/docs/button` |
| `Card` | Bordered container with optional title | `/docs/card` |
| `CodeBlock` | Syntax-highlighted code with Night Owl theme | — |
| `CodeTabs` | Tabbed multi-language code viewer | — |
| `ToggleControl` | Boolean toggle switch | `/docs/toggle-control` |
| `SelectControl` | Dropdown select | `/docs/select-control` |
| `RangeControl` | Numeric slider with paired input field | `/docs/range-control` |
| `TextControl` | Single-line text input | `/docs/text-control` |
| `DateTimePicker` | Date/time picker with `dateOnly` / `timeOnly` modes | `/docs/date-time-picker` |
| `ColorPalette` | Color swatch grid with optional custom picker | `/docs/color-palette` |

## Features

### MDX Compilation
`.mdx` files compile to React components at build time via `@mdx-js/rollup` — no runtime overhead.

### Global Component Injection
`MDXComponentsProvider` in `src/providers/MDXComponents.jsx` maps standard markdown elements (`h1`–`h6`, `code`, `pre`, `table`, `a`) to styled versions, and makes all custom components available in every `.mdx` file without imports.

### Persistent Demos
All interactive demos use `useLocalStorage` — a drop-in for `useState` that reads and writes `localStorage`. Demo state survives page reloads.

### GitHub Flavored Markdown
`remark-gfm` enables tables, task lists, and strikethrough in all `.mdx` files.

## Key Dependencies

- **react / react-dom** — React 18+
- **@mdx-js/rollup** — Vite/Rollup MDX plugin
- **@mdx-js/react** — MDXProvider for component injection
- **remark-gfm** — GitHub Flavored Markdown
- **react-router-dom** — Page routing
- **vite** — Dev server and bundler

## MDX Resources

- [mdxjs.com](https://mdxjs.com/) — Official MDX documentation
- [What is MDX?](https://mdxjs.com/docs/what-is-mdx/) — Overview of the format
- [Getting Started](https://mdxjs.com/docs/getting-started/) — Setup guides for various bundlers
- [Using MDX](https://mdxjs.com/docs/using-mdx/) — Component injection, layouts, and provider patterns
- [Extending MDX](https://mdxjs.com/docs/extending-mdx/) — Remark/rehype plugins
- [Packages](https://mdxjs.com/packages/) — `@mdx-js/rollup`, `@mdx-js/react`, and integrations
- [Playground](https://mdxjs.com/playground/) — Interactive MDX editor in the browser

## WordPress Porting

See [USAGE.md](./USAGE.md) for the full WordPress porting strategy, including:
- How MDXProvider maps to WordPress block context
- Server-side MDX compilation via `@mdx-js/mdx`
- Component mapping from custom components to `@wordpress/components`
- Three implementation approaches (MDX Block, Pre-compiled Pages, Hybrid)
