# Changelog

All notable changes to this project will be documented in this file.

---

## [Unreleased]

### Added
- `BoxControl` component — four-sided value editor (padding, margin, border-width) mirroring `@wordpress/components`
  - Props: `label`, `value`, `onChange`, `units`, `splitOnAxis`, `allowReset`, `resetValues`, `sides`, `className`
  - Linked/unlinked toggle syncs all four sides or edits each independently
  - `splitOnAxis` collapses inputs to Vertical / Horizontal pairs
  - Unit picker (px, em, rem, %) applied across all sides simultaneously
  - `box-control.mdx` — three interactive persistent demos:
    - `PaddingDemo` — padding editor with live preview box (key: `demo-box-padding`)
    - `BorderWidthDemo` — border-width editor with live bordered element (key: `demo-box-border`)
    - `VerticalHorizontalDemo` — `splitOnAxis` mode for vertical/horizontal control (key: `demo-box-axes`)
  - Registered in `MDXProvider`, barrel export, route `/docs/box-control`, sidebar nav, and `docs.css`
- `Dropdown` component — composable dropdown with render-prop trigger and popover panel mirroring `@wordpress/components`
  - Props: `renderToggle`, `renderContent`, `popoverProps` (placement), `className`, `contentClassName`, `defaultOpen`, `onToggle`, `onClose`
  - Closes on outside click and Escape key; popover aligns via `placement` option
  - `dropdown.mdx` — three interactive persistent demos:
    - `StyleMenuDemo` — text menu with checkmark on selected item (key: `demo-dropdown-style`)
    - `IconPickerDemo` — 3×3 symbol grid picker with large preview (key: `demo-dropdown-icon`)
    - `ColorSwatchDemo` — colored circle trigger opens an 8-swatch palette (key: `demo-dropdown-color`)
  - Registered in `MDXProvider`, barrel export, route `/docs/dropdown`, sidebar nav, and `docs.css`
- `ComboboxControl` component — searchable autocomplete dropdown mirroring `@wordpress/components`
  - Props: `label`, `value`, `options`, `onChange`, `onFilterValueChange`, `help`, `isLoading`, `messages`, `className`
  - Full keyboard navigation: arrow keys, Enter to select, Escape to close
  - Built-in × clear button, chevron indicator, "no results" and loading states
  - Filtering is parent-controlled via `onFilterValueChange` — supports both static and async (REST API) option lists
  - `combobox-control.mdx` — three interactive persistent demos:
    - `CountriesDemo` — 16-country list with client-side filtering (key: `demo-combobox-country`)
    - `FontFamilyDemo` — font picker with live preview paragraph (key: `demo-combobox-font`)
    - `NoResultsDemo` — custom empty state message (key: `demo-combobox-noresults`)
  - Includes ComboboxControl vs SelectControl comparison table
  - Registered in `MDXProvider`, barrel export, route `/docs/combobox-control`, sidebar nav, and `docs.css`
- `ColorPicker` component — free-form color picker mirroring `@wordpress/components`
  - Props: `color`, `onChange`, `enableAlpha`, `defaultValue`, `copyFormat`, `className`
  - Spectrum proxy via native `<input type="color">` overlaid on a large preview swatch
  - Optional opacity slider (`enableAlpha`) — `onChange` returns `rgba()` string when enabled
  - Hex text input showing the current color code
  - `color-picker.mdx` — three interactive persistent demos:
    - `BasicDemo` — basic picker driving live text color preview (key: `demo-colorpicker-basic`)
    - `AlphaDemo` — `enableAlpha` with checkerboard transparency visualization (key: `demo-colorpicker-alpha`)
    - `ResetDemo` — picker with reset-to-default button and accent border preview (key: `demo-colorpicker-reset`)
  - Includes ColorPicker vs ColorPalette comparison table
  - Registered in `MDXProvider`, barrel export, route `/docs/color-picker`, sidebar nav, and `docs.css`
- `CheckboxControl` component — labeled checkbox mirroring `@wordpress/components`
  - Props: `label`, `checked`, `onChange`, `help`, `indeterminate`, `disabled`, `className`, `id`
  - `indeterminate` state applied via DOM ref (cannot be set as a JSX attribute); sets `aria-checked="mixed"` automatically
  - `checkbox-control.mdx` — three interactive persistent demos:
    - `BasicDemo` — single checkbox reveals a live title preview (key: `demo-checkbox-show-title`)
    - `MultipleDemo` — three checkboxes drive a simulated post card with title, date, and excerpt (keys: `demo-checkbox-show-title-multi`, `demo-checkbox-show-excerpt`, `demo-checkbox-show-date`)
    - `HelpTextDemo` — checkbox with `help` prop for lazy-load setting (key: `demo-checkbox-lazy-load`)
  - Registered in `MDXProvider`, barrel export, route `/docs/checkbox-control`, sidebar nav

---

## [1.8.1] - 2026-02-20

### Changed
- Renamed GitHub Copilot agent file from `my-agent.agent.md` to `MDX-Gutendocs-creator.md` to match the agent's `name` field

---

## [1.8.0] - 2026-02-19

### Added

- `ColorPalette` component — color swatch grid mirroring `@wordpress/components`
  - Props: `colors`, `value`, `onChange`, `disableCustomColors`, `clearable`, `className`
  - Clickable swatches with selected state ring, hover scale, and smooth transitions
  - Optional custom color `<input type="color">` for freeform selection
  - `clearable` button to reset selection back to `undefined`
  - Live selected color preview (swatch + code value) below the palette
- `color-palette.mdx` — three interactive persistent demos:
  - `BackgroundDemo` — pick a background color for a live preview box
  - `TextColorDemo` — restricted palette (`disableCustomColors`) drives live text color
  - `BorderDemo` — clearable palette controls a bordered box (`clearable`)
- All demos persist state via `useLocalStorage` (keys: `demo-colorpalette-background`, `demo-colorpalette-text`, `demo-colorpalette-border`)
- Registered in `MDXProvider`, barrel export, route `/docs/color-palette`, sidebar nav, and `docs.css`

---

## [1.7.2] - 2026-02-19

### Fixed
- Missing imports across components and doc pages

---

## [1.7.1] - 2026-02-19

### Fixed
- `RangeControl` slider touch targets for mobile accessibility — improved hit area and pointer handling to prevent accidental mis-taps on small screens

---

## [1.7.0] - 2026-02-19

### Added
- `DateTimePicker` component — date and time picker mirroring `@wordpress/components`
  - Props: `label`, `value`, `onChange`, `currentDate` (WordPress block attribute alias), `is12Hour`, `help`, `disabled`, `className`, `dateOnly`, `timeOnly`
  - Supports date-only, time-only, or combined date + time modes
  - ISO 8601 string interface for full WordPress block attribute compatibility
- `date-time-picker.mdx` — three interactive persistent demos:
  - `BasicDemo` — full date + time picker (key: `demo-datetime-basic`)
  - `DateOnlyDemo` — date-only mode (key: `demo-datetime-date-only`)
  - `TimeOnlyDemo` — time-only mode (key: `demo-datetime-time-only`)
- Registered in `MDXProvider`, barrel export, route `/docs/date-time-picker`, sidebar nav, and `docs.css`

---

## [1.6.0] - 2026-02-19

### Added
- `CodeBlock` — upgraded with full syntax highlighting via `prism-react-renderer` using the Night Owl theme
- `CodeTabs` component — tabbed multi-language code viewer
  - Props: `tabs` — array of `{ label, language, code }` objects
  - Renders a tab bar for switching between code snippets; active tab highlighted
- Both components registered globally in `MDXProvider`

---

## [1.5.0] - 2026-02-19

### Added
- `TextControl` component — single-line text input mirroring `@wordpress/components`
  - Props: `label`, `value`, `onChange`, `help`, `placeholder`, `type`, `disabled`, `className`, `autoComplete`
  - Controlled component; supports all standard HTML input types
- `text-control.mdx` — three interactive persistent demos:
  - `BasicDemo` — plain text input (key: `demo-text-basic`)
  - `EmailDemo` — email type input (key: `demo-text-email`)
  - `HeadingDemo` — dual inputs driving a live heading/subheading preview (keys: `demo-text-heading`, `demo-text-subheading`)
- Registered in `MDXProvider`, barrel export, route `/docs/text-control`, sidebar nav, and `docs.css`

---

## [1.4.0] - 2026-02-19

### Added
- `RangeControl` component — numeric slider mirroring `@wordpress/components`
  - Props: `label`, `value`, `onChange`, `min`, `max`, `step`, `help`, `disabled`, `withInputField`, `className`
  - Paired numeric input field, min/max labels, keyboard accessible, focus-visible ring
- `range-control.mdx` — three interactive persistent demos:
  - `FontSizeDemo` — drag to resize live sample text (12–48px)
  - `OpacityDemo` — control element transparency (0–1, step 0.1)
  - `ColumnsDemo` — live CSS grid redraws column count (1–6)
- All demos persist state via `useLocalStorage` (keys: `demo-range-font-size`, `demo-range-opacity`, `demo-range-columns`)
- Registered in `MDXProvider`, barrel export, route `/docs/range-control`, sidebar nav, and `docs.css`

---

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