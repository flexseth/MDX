# GitHub Copilot Agent Prompt — CheckboxControl Documentation

## Task

Create a `CheckboxControl` documentation page for the Gutendocs site, following the exact structure of existing component pages (e.g. `toggle-control.mdx`, `text-control.mdx`).

## Branch

- **New branch:** `feature/checkbox-control`
- **Base branch:** `feature/wp-form-controls`

## Files to Create or Modify

### 1. CREATE `src/components/CheckboxControl.jsx`

A React component that mirrors the WordPress `CheckboxControl` from `@wordpress/components`.

**Requirements:**
- Functional component with JSDoc comment block
- Props: `label`, `checked`, `onChange`, `help`, `indeterminate`, `disabled`, `className`, `id`
- `indeterminate` must be applied via a `useRef` + `useEffect` (not a JSX attribute — the DOM property requires direct assignment)
- CSS class naming: `checkbox-control`, `checkbox-control__label`, `checkbox-control__input`, `checkbox-control__text`, `checkbox-control__help`, `checkbox-control--disabled`
- Auto-generate `id` from `label` if `id` prop is omitted
- Set `aria-checked="mixed"` when `indeterminate` is true
- Set `aria-describedby` pointing to help text element when `help` is provided

### 2. EDIT `src/components/index.js`

Add a barrel export for `CheckboxControl` (alphabetical position, after `Card`):

```js
export { default as CheckboxControl } from './CheckboxControl';
```

### 3. EDIT `src/providers/MDXComponents.jsx`

- Import `CheckboxControl` from `../components`
- Register it in the `components` map (alphabetical order)

### 4. CREATE `src/docs/checkbox-control.mdx`

Follow the MDX page pattern from existing docs. **All demo state must use `useLocalStorage`, not `useState`.**

**Page sections (in order):**

```
imports (CheckboxControl + useLocalStorage)

export const BasicDemo ...
export const MultipleDemo ...
export const HelpTextDemo ...

# CheckboxControl
[description + WP docs link]

## Basic Usage
<BasicDemo />
[jsx code block]

## Multiple Checkboxes
<MultipleDemo />
[jsx code block]

## With Help Text
<HelpTextDemo />
[jsx code block]

## Disabled State
[static CheckboxControl with disabled prop — no state needed]
[jsx code block]

## WordPress Usage (edit.js)
[full edit.js code block with InspectorControls + PanelBody]

## block.json Attributes
[json code block]

## Props
<PropsTable props={[...]} />

## WordPress Mapping
[prose paragraph]
```

**localStorage keys (must be unique project-wide):**
- `demo-checkbox-show-title` — BasicDemo, boolean, default `false`
- `demo-checkbox-show-title-multi` — MultipleDemo title, boolean, default `true`
- `demo-checkbox-show-excerpt` — MultipleDemo excerpt, boolean, default `false`
- `demo-checkbox-show-date` — MultipleDemo date, boolean, default `false`
- `demo-checkbox-lazy-load` — HelpTextDemo, boolean, default `false`

**Demo descriptions:**
1. **BasicDemo** — single `CheckboxControl` labeled "Show Title". When checked, renders a preview `<h3>Block Title</h3>` below.
2. **MultipleDemo** — three checkboxes (showTitle, showExcerpt, showDate) that control a simulated post card preview. Include a fallback message when all are unchecked.
3. **HelpTextDemo** — single checkbox labeled "Lazy load images" with the `help` prop set to an explanation string.

### 5. EDIT `src/App.jsx`

Add import and route:
```jsx
import CheckboxControlDocs from './docs/checkbox-control.mdx';
// ...
<Route path="/docs/checkbox-control" element={ <CheckboxControlDocs /> } />
```

Place before the `color-palette` route to maintain alphabetical ordering.

### 6. EDIT `src/layouts/DocLayout.jsx`

Add nav item in alphabetical position (after Card, before ToggleControl):
```js
{ path: '/docs/checkbox-control', label: 'CheckboxControl' },
```

### 7. EDIT `CHANGELOG.md`

Add an entry under `[Unreleased]` describing the new component, its props, and demo keys.

---

## PR Details

**Title:** `feat: add CheckboxControl documentation page`

**Body:**

```markdown
## Summary

- Adds `CheckboxControl` component mirroring `@wordpress/components`
- Creates `checkbox-control.mdx` with three interactive demos, full WordPress `edit.js` example, `block.json` snippet, PropsTable, and WordPress Mapping section
- Wires component into MDXProvider, barrel export, App routes, and sidebar nav
- All demo state persists across reloads via `useLocalStorage`

## Demos

| Demo | localStorage Key | Default |
|------|-----------------|---------|
| BasicDemo | `demo-checkbox-show-title` | `false` |
| MultipleDemo (title) | `demo-checkbox-show-title-multi` | `true` |
| MultipleDemo (excerpt) | `demo-checkbox-show-excerpt` | `false` |
| MultipleDemo (date) | `demo-checkbox-show-date` | `false` |
| HelpTextDemo | `demo-checkbox-lazy-load` | `false` |

## Acceptance Criteria

- [ ] `npm run dev` → `/docs/checkbox-control` renders without errors
- [ ] All three demos are interactive and persist state on page reload
- [ ] "CheckboxControl" appears in sidebar nav in alphabetical position
- [ ] PropsTable, CodeBlock sections render correctly
- [ ] `npm run build` completes without errors
- [ ] `indeterminate` prop applies correctly via DOM ref (not JSX attribute)
```

---

## Reference

- **Existing pattern to follow:** `src/docs/toggle-control.mdx`, `src/docs/text-control.mdx`
- **Component to mirror:** [WordPress CheckboxControl](https://developer.wordpress.org/block-editor/reference-guides/components/checkbox-control/)
- **Gutenberg source:** https://github.com/WordPress/gutenberg/tree/trunk/packages/components/src/checkbox-control
- **Definition file:** `definitions/components/CheckboxControl.mdx`
