# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build to dist/
npm run preview  # Preview the production build
```

There is no test runner in this project.

## Architecture

**Gutendocs** is a Vite + React + MDX documentation site for WordPress block/plugin component documentation. It has no backend — everything is compiled at build time.

### Data flow

1. `.mdx` files in `src/docs/` are the source of truth for each component's documentation page.
2. Vite's `@mdx-js/rollup` plugin compiles each `.mdx` file into a React component at build time.
3. `src/App.jsx` statically imports every compiled MDX module and maps each to a route via `react-router-dom`.
4. `MDXComponentsProvider` (`src/providers/MDXComponents.jsx`) wraps the entire app in `MDXProvider`, injecting all custom components globally so `.mdx` files can use them without any import statements.
5. `DocLayout` (`src/layouts/DocLayout.jsx`) provides the sidebar + content shell around every page.

### Adding a new component

Three files must be updated in sync:

1. **`src/components/<ComponentName>.jsx`** — the React component implementation
2. **`src/components/index.js`** — add a barrel export
3. **`src/providers/MDXComponents.jsx`** — import and register in the `components` map
4. **`src/docs/<component-name>.mdx`** — the documentation page
5. **`src/App.jsx`** — add a `Route` for the new doc page
6. **`src/layouts/DocLayout.jsx`** — add the page to `navItems`

### MDX doc page structure

Each `.mdx` file follows this pattern:

```mdx
import ComponentName from '../components/ComponentName';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const MyDemo = () => {
  const [value, setValue] = useLocalStorage('demo-<component>-<field>', defaultValue);
  return <ComponentName value={value} onChange={setValue} />;
};

# ComponentName

Description...

<MyDemo />

```jsx
// WordPress usage code example
```

## Props

<PropsTable props={[...]} />

## WordPress Mapping

...
```

### Persistent demo state

All interactive demos **must** use `useLocalStorage` from `src/hooks/useLocalStorage.js` instead of `useState`. Key format: `demo-<component-name>-<field-name>`. Every key must be unique across all MDX files. See `MEMORY.md` for the full pattern.

### Key components

- **`CodeBlock`** — syntax-highlighted code via `prism-react-renderer` using the Night Owl theme. Used automatically by `MDXProvider` for all fenced code blocks.
- **`CodeTabs`** — tabbed multi-language code viewer for side-by-side language examples.
- **`PropsTable`** — renders a structured props reference table from a JSON array passed as a prop.

### Style

All styling lives in `src/styles/docs.css`. CSS class naming follows a `doc-*` / `docs-*` BEM-like convention. No CSS modules or CSS-in-JS.

### Purpose of components

Each component mirrors its `@wordpress/components` counterpart. The doc pages show:
- Live interactive demos
- Copy-paste WordPress `edit.js` code
- `block.json` attribute examples
- A `PropsTable` for the API
- A "WordPress Mapping" section explaining how the custom component maps to native WP
