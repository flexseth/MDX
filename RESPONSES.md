# Agent Responses — CheckboxControl

## Session: 2026-02-23

### Component Selected

**CheckboxControl** — chosen as the first undocumented form control (alphabetically) in `definitions/components/`. It fits naturally into the existing sidebar grouping alongside ToggleControl, SelectControl, etc., and follows the same `@wordpress/components` pattern.

---

### Files Created

| File | Description |
|------|-------------|
| `src/components/CheckboxControl.jsx` | React component mirroring WP `CheckboxControl`. Uses `useRef`+`useEffect` to set the `indeterminate` DOM property, which cannot be set via a JSX attribute. |
| `src/docs/checkbox-control.mdx` | Documentation page with three interactive demos, WordPress `edit.js` example, `block.json` snippet, PropsTable, and WordPress Mapping section. |
| `PROMPT.md` | Structured prompt for the GitHub Copilot coding agent to generate or validate this PR. |

### Files Modified

| File | Change |
|------|--------|
| `src/components/index.js` | Added barrel export for `CheckboxControl` |
| `src/providers/MDXComponents.jsx` | Imported and registered `CheckboxControl` in the components map |
| `src/App.jsx` | Added import and `/docs/checkbox-control` route |
| `src/layouts/DocLayout.jsx` | Added `CheckboxControl` nav item (alphabetical: after Card, before ToggleControl) |
| `CHANGELOG.md` | Added entry under `[Unreleased]` |

---

### Demo State Keys

All demos use `useLocalStorage` — no `useState` anywhere in the MDX file.

| Demo | Key | Type | Default |
|------|-----|------|---------|
| BasicDemo | `demo-checkbox-show-title` | boolean | `false` |
| MultipleDemo (showTitle) | `demo-checkbox-show-title-multi` | boolean | `true` |
| MultipleDemo (showExcerpt) | `demo-checkbox-show-excerpt` | boolean | `false` |
| MultipleDemo (showDate) | `demo-checkbox-show-date` | boolean | `false` |
| HelpTextDemo | `demo-checkbox-lazy-load` | boolean | `false` |

---

### Branch & PR

- **Branch:** `feature/checkbox-control` (from `feature/wp-form-controls`)
- **PR title:** `feat: add CheckboxControl documentation page`
- **PR prompt:** See `PROMPT.md` for full GitHub Copilot agent prompt

---

### Implementation Notes

1. **`indeterminate` prop** — The `indeterminate` state on a checkbox cannot be expressed in HTML or set via a JSX attribute. It must be applied directly to the DOM node. The component handles this with a `useRef` passed to the `<input>` and a `useEffect` that syncs `inputRef.current.indeterminate = indeterminate` whenever the prop changes. `aria-checked="mixed"` is also set for accessibility.

2. **Demo isolation** — Each demo uses unique `localStorage` keys to avoid cross-page collisions. The `MultipleDemo` uses a separate key (`demo-checkbox-show-title-multi`) rather than reusing `demo-checkbox-show-title` from `BasicDemo`.

3. **Static demos** — The Disabled State example is rendered as a static inline JSX component directly in the MDX body (no `export const` wrapper needed) since it has no interactive state.

---

### Next Component

The next alphabetically-available undocumented component is **ColorPicker** (`definitions/components/ColorPicker.mdx`).
