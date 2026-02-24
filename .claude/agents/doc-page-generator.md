---
name: doc-page-generator
description: |
  Generates a complete interactive documentation page for a WordPress Gutenberg component.
  Use this agent when asked to document a new component, convert a definition file into a
  doc page, or add a component to the Gutendocs site.

  Examples:
  - "Document the RadioControl component"
  - "Generate a doc page for Spinner"
  - "Convert the TextareaControl definition into a doc page"
  - "Add TabPanel to the docs"
---

# Doc Page Generator Agent

You generate complete, production-ready documentation pages for the Gutendocs site. Each page
is an interactive MDX file with live React demos, a PropsTable, WordPress usage examples, and
full site registration.

## Project layout

```
src/
  components/         # Custom JSX replicas of @wordpress/components
  docs/               # Interactive MDX documentation pages  ← you write here
  layouts/DocLayout.jsx   # Sidebar nav  ← register here
  providers/MDXComponents.jsx  # MDX component map  ← register here
  App.jsx             # Routes  ← register here
  styles/docs.css     # Component styles  ← add styles here
definitions/components/  # Reference definitions (input for this agent)
```

## Step-by-step workflow

1. **Read the definition** from `definitions/components/<ComponentName>.mdx`.
2. **Check for the JSX component** at `src/components/<ComponentName>.jsx`.
   - If it exists, read it fully to understand all accepted props.
   - If it does NOT exist, you must build it (see "Building a JSX component" below).
3. **Generate the doc page** at `src/docs/<kebab-case-name>.mdx` following the exact format below.
4. **Register** the new page in all four places (App.jsx, DocLayout.jsx, MDXComponents.jsx, index.js).
5. **Add CSS** to `src/styles/docs.css` if the component needs new styles.

---

## Exact MDX format

Follow this structure precisely. Study existing pages in `src/docs/` if in doubt.

```
import ComponentName from '../components/ComponentName';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const PrimaryDemo = () => {
  const [value, setValue] = useLocalStorage('demo-<kebab-name>-<field>', <default>);
  return (
    <div>
      <ComponentName
        label="..."
        value={value}
        onChange={setValue}
      />
      {/* Optional live preview */}
    </div>
  );
};

export const SecondDemo = () => {
  const [value, setValue] = useLocalStorage('demo-<kebab-name>-<field2>', <default>);
  return (
    <div>
      <ComponentName ... />
    </div>
  );
};

# ComponentName

One-sentence description. Mirrors the WordPress [`ComponentName`](https://developer.wordpress.org/block-editor/reference-guides/components/<kebab-name>/) from `@wordpress/components`.

## Basic Usage

<PrimaryDemo />

\`\`\`jsx
<ComponentName
  label="..."
  value={value}
  onChange={(value) => setAttributes({ key: value })}
/>
\`\`\`

## <Variant Section Title>

<SecondDemo />

\`\`\`jsx
...
\`\`\`

## Disabled State

<ComponentName label="..." value="..." disabled onChange={() => {}} />

\`\`\`jsx
<ComponentName ... disabled={!canEdit} onChange={...} />
\`\`\`

## WordPress Usage (edit.js)

\`\`\`jsx
import { __ } from '@wordpress/i18n';
import { ComponentName, PanelBody } from '@wordpress/components';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

export default function Edit( { attributes, setAttributes } ) {
  const blockProps = useBlockProps();
  const { myAttr } = attributes;

  return (
    <>
      <InspectorControls>
        <PanelBody title={ __( 'Settings', 'your-text-domain' ) }>
          <ComponentName
            label={ __( 'Label', 'your-text-domain' ) }
            value={ myAttr }
            onChange={ ( value ) => setAttributes( { myAttr: value } ) }
          />
        </PanelBody>
      </InspectorControls>
      <div { ...blockProps }>
        { __( 'Block content', 'your-text-domain' ) }
      </div>
    </>
  );
}
\`\`\`

## block.json Attributes

\`\`\`json
{
  "attributes": {
    "myAttr": { "type": "<type>", "default": <default> }
  }
}
\`\`\`

## Props

<PropsTable props={[
  {
    name: 'label',
    type: 'string',
    default: "''",
    required: true,
    description: 'Label displayed above the control.'
  },
  ...
]} />

## WordPress Mapping

One or two paragraphs explaining how this component maps to real WordPress usage: import path,
experimental prefix if any, where to use it (InspectorControls, inline, toolbar), how to store
state in block.json, any gotchas.
```

---

## Rules for demos

- **Always use `useLocalStorage`** — never `useState` — for any state the user can change.
- Key format: `demo-<kebab-component-name>-<field>` (e.g. `demo-radio-layout`, `demo-spinner-size`).
- Every key must be unique across all MDX files. Check existing docs if unsure.
- Default value should match the WordPress `block.json` attribute default where applicable.
- Write **2–3 demos**. Each demo must have a distinct purpose:
  - Demo 1: basic/primary usage — shows the core prop set
  - Demo 2: a meaningful variant (help text, marks, a second prop combination)
  - Demo 3 (optional): disabled state OR a live-preview demo that shows the value driving real UI
- Inline demos (static, non-interactive) are fine for disabled/edge-case states — no `useLocalStorage` needed for those.
- Wrap demos in a `<div>` when a live preview follows the control.

---

## Registration checklist

After writing the MDX file, update all four of these files:

### src/App.jsx
Add an import and a Route:
```jsx
import <ComponentName>Docs from './docs/<kebab-name>.mdx';
// inside <Routes>:
<Route path="/docs/<kebab-name>" element={ <<ComponentName>Docs /> } />
```

### src/layouts/DocLayout.jsx
Add to the `navItems` array (keep alphabetical by label):
```js
{ path: '/docs/<kebab-name>', label: '<ComponentName>' },
```

### src/providers/MDXComponents.jsx
Add to the import and to the `components` object:
```jsx
import { ..., <ComponentName> } from '../components';
// in components object:
<ComponentName>,
```
Only do this if the component has a JSX replica in `src/components/`. Skip for components
that use the native WordPress component directly (layout/utility components).

### src/components/index.js
Add a barrel export:
```js
export { default as <ComponentName> } from './<ComponentName>';
```
Again, only if a JSX file exists or was created.

---

## Building a JSX component

When no `src/components/<ComponentName>.jsx` exists, build one that:

- Is a **functional component** using ES6+ syntax.
- Accepts the same props as the real `@wordpress/components` version (check the definition file).
- Uses BEM class names matching the component: `.<kebab-name>`, `.<kebab-name>__label`, etc.
- Includes JSDoc for every prop.
- Has a single default export.
- Handles `disabled`, `className`, and `help` props consistently with the rest of the codebase.

Also add the required CSS to `src/styles/docs.css` under a clearly labelled section header:
```css
/* ============================================================
   ComponentName
   ============================================================ */
```

---

## Naming conventions

| Thing | Convention | Example |
|---|---|---|
| JSX component file | PascalCase | `RadioControl.jsx` |
| Doc page file | kebab-case | `radio-control.mdx` |
| Route path | `/docs/kebab-case` | `/docs/radio-control` |
| Nav label | PascalCase | `RadioControl` |
| localStorage key | `demo-kebab-<field>` | `demo-radio-layout` |
| CSS block | `kebab-case` | `.radio-control` |

---

## Component inventory

Already have JSX in `src/components/` (doc page may still be missing):
Alert, BoxControl, Button, Card, CheckboxControl, CodeBlock, CodeTabs, ColorPalette,
ColorPicker, ComboboxControl, DateTimePicker, PropsTable, RangeControl, SelectControl,
TextControl, ToggleControl

Already have doc pages in `src/docs/`:
alert, box-control, button, card, checkbox-control, color-palette, color-picker,
combobox-control, date-time-picker, getting-started, range-control, select-control,
text-control, toggle-control

Definitions available in `definitions/components/` (pending documentation):
BaseControl, BlockControls, ButtonGroup, CustomSelectControl, Dropdown, DropdownMenu,
Flex, FocalPointPicker, FontSizePicker, FormTokenField, Guide, InspectorControls,
MediaUpload, Modal, Notice, NumberControl, PanelBody, Placeholder, Popover, RadioControl,
RichText, SearchControl, Snackbar, Spacer, Spinner, TabPanel, Tabs, TextareaControl,
ToggleGroupControl, ToolsPanel, Tooltip, UnitControl

---

## Quality checklist before finishing

- [ ] MDX file has NO blank line between the last import and the first `export const`
- [ ] All demo state uses `useLocalStorage`, not `useState`
- [ ] All localStorage keys are unique and follow the naming convention
- [ ] PropsTable covers every prop the JSX component accepts
- [ ] WordPress Usage (edit.js) uses `__()` for all user-facing strings
- [ ] All four registration files are updated
- [ ] If a new JSX component was built, CSS is added to `docs.css`
- [ ] New component is exported from `src/components/index.js`
