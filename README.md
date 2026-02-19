# MDX Working Example for React Component Documentation

A working MDX project that demonstrates how to write React component documentation using MDX (Markdown + JSX). Built with Vite + React, this serves as a foundation for porting MDX-based component documentation into WordPress.

**[Live Demo on Vercel](https://vercel.com/flexseths-projects/mdx-for-wordpress-documentation)**

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
| `src/components/Alert.jsx` | Info/warning/success/error callouts |
| `src/components/Button.jsx` | Primary/secondary/outline buttons |
| `src/components/Card.jsx` | Titled card container |
| `src/components/CodeBlock.jsx` | Styled code blocks with language labels |
| `src/components/PropsTable.jsx` | Auto-generated props documentation table |
| `src/components/index.js` | Barrel export |
| `src/providers/MDXComponents.jsx` | MDXProvider mapping markdown elements + custom components |
| `src/layouts/DocLayout.jsx` | Sidebar navigation + content area |
| `src/styles/docs.css` | Full styling for layout, components, and responsive |
| `src/docs/getting-started.mdx` | Intro with live component demos, GFM tables, expressions |
| `src/docs/alert.mdx` | Alert docs with all variants + PropsTable |
| `src/docs/button.mdx` | Button docs with variants/sizes + PropsTable |
| `src/docs/card.mdx` | Card docs with nesting examples + PropsTable |
| `USAGE.md` | WordPress porting strategy guide |

## MDX Resources

- [mdxjs.com](https://mdxjs.com/) — Official MDX documentation
- [What is MDX?](https://mdxjs.com/docs/what-is-mdx/) — Overview of the format
- [Getting Started](https://mdxjs.com/docs/getting-started/) — Setup guides for various bundlers and frameworks
- [Using MDX](https://mdxjs.com/docs/using-mdx/) — Component injection, layouts, and provider patterns
- [Extending MDX](https://mdxjs.com/docs/extending-mdx/) — Remark/rehype plugins (e.g. `remark-gfm`)
- [Packages](https://mdxjs.com/packages/) — `@mdx-js/rollup`, `@mdx-js/react`, and other integrations
- [Playground](https://mdxjs.com/playground/) — Interactive MDX editor in the browser

## Key Dependencies

- **react / react-dom** — React 18+
- **@mdx-js/rollup** — Vite/Rollup MDX plugin (compiles `.mdx` to React components)
- **@mdx-js/react** — MDXProvider for component injection
- **remark-gfm** — GitHub Flavored Markdown (tables, strikethrough, task lists)
- **react-router-dom** — Page routing for doc navigation
- **vite** — Dev server and bundler

## Features

### MDX Compilation
`.mdx` files are compiled into React components at build time by the `@mdx-js/rollup` plugin. This means you can write standard Markdown with embedded JSX — no runtime compilation overhead.

### MDXProvider Component Mapping
The `MDXComponentsProvider` in `src/providers/MDXComponents.jsx` maps:
- Standard markdown elements (`h1`–`h6`, `code`, `pre`, `table`, `a`) to styled custom components
- Custom components (`Alert`, `Button`, `Card`, `CodeBlock`, `PropsTable`) available globally in all `.mdx` files without imports

### Reusable Components
- **Alert** — Callouts with `info`, `warning`, `success`, and `error` variants
- **Button** — `primary`, `secondary`, and `outline` variants with `small`, `medium`, `large` sizes
- **Card** — Bordered container with optional title header
- **CodeBlock** — Dark-themed code display with language label
- **PropsTable** — Renders structured prop definitions as a documentation table

### Documentation Pages
Each `.mdx` page demonstrates:
- Live React components rendered inline with Markdown
- JavaScript expressions (`{new Date().getFullYear()}`)
- Props documentation via `PropsTable`
- GFM features (tables, task lists, strikethrough)
- WordPress component mapping notes

### Responsive Layout
Sidebar navigation collapses to a horizontal nav bar on mobile viewports.

## WordPress Porting

See [USAGE.md](./USAGE.md) for the full WordPress porting strategy, including:
- How MDXProvider maps to WordPress block context
- Server-side MDX compilation via `@mdx-js/mdx`
- Component mapping from custom components to `@wordpress/components`
- Three implementation approaches (MDX Block, Pre-compiled Pages, Hybrid)
