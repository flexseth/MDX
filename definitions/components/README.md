# WordPress Core Components - MDX Documentation

Comprehensive, copy-paste ready documentation for WordPress Core components used in Gutenberg block development.

## Overview

This collection provides **production-ready code examples** for WordPress Core components that can be directly copied into custom blocks built with `@wordpress/create-block`. Each component includes complete, working examples following WordPress Coding Standards.

## Purpose

Create plugins and blocks with confidence by using tested, standards-compliant component examples that work out of the box. No more guessing about syntax, imports, or attribute structure—just copy, paste, and customize.

## Available Components

### Block Editor Infrastructure

#### 1. **InspectorControls** (`InspectorControls.mdx`)
Container for all sidebar controls in the block inspector
- Renders controls into the Settings sidebar
- Multiple `PanelBody` panels with collapsible sections
- Named slot groups: default, advanced, border, color, dimensions, typography
- Combined with `PanelBody` for organized settings

#### 2. **BlockControls** (`BlockControls.mdx`)
Block toolbar container for quick-access actions
- Alignment controls with `AlignmentControl`
- Custom `ToolbarButton` actions
- `MediaReplaceFlow` for media blocks
- Combined with `InspectorControls` patterns

### Form Controls

#### 3. **Button** (`Button.mdx`)
Action buttons with multiple variants, icons, and states
- Primary, secondary, tertiary, and link variants
- Icon support with positioning options
- Loading states (isBusy)
- Disabled and destructive states
- Icon-only buttons with tooltips
- Full-width buttons

#### 4. **TextControl** (`TextControl.mdx`)
Text input fields for collecting user input
- Basic text input with labels
- Help text and placeholders
- Multiple input types (text, email, tel, number, password, url)
- Integration with InspectorControls
- Multiple TextControls in one block
- Proper validation and sanitization

#### 5. **TextareaControl** (`TextareaControl.mdx`)
Multi-line text input for longer content
- Custom CSS fields, excerpts, descriptions
- Configurable rows
- Character count patterns
- JSON/code input with validation

#### 6. **CheckboxControl** (`CheckboxControl.mdx`)
Checkbox inputs for boolean and multi-select settings
- Multiple independent feature flags
- Checkbox groups with array attributes
- Indeterminate state for parent/child hierarchies
- Help text integration

#### 7. **RadioControl** (`RadioControl.mdx`)
Radio button groups for mutually exclusive option sets
- Layout mode selection
- Dynamic options from REST API
- Button size and style variants
- Help text support

#### 8. **RangeControl** (`RangeControl.mdx`)
Numeric slider controls for value selection
- Custom min/max/step values
- Opacity controls (0-1 with decimals)
- Font sizing and spacing controls
- Tick marks for discrete values
- Reset functionality
- Integration with live preview

#### 9. **ToggleControl** (`ToggleControl.mdx`)
Boolean on/off switches for settings
- Basic toggle switches
- Help text integration
- Multiple toggles for feature flags
- Conditional content display
- InspectorControls integration
- Disabled states

#### 10. **SelectControl** (`SelectControl.mdx`)
Dropdown select menus for choosing options
- Basic option selection
- Help text support
- Multiple SelectControls
- Dynamic styling based on selection
- Post type selectors
- Grouped options (optgroup)
- Number selection

#### 11. **ComboboxControl** (`ComboboxControl.mdx`)
Searchable dropdown for long option lists
- Async post/taxonomy search via REST API
- Client-side filtering of static options
- Allow reset / clear patterns
- Loading state with `isLoading` prop

#### 12. **FormTokenField** (`FormTokenField.mdx`)
Multi-value token/tag input with autocomplete
- Keyword lists and tag entry
- Async suggestions from REST API with debounce
- Max token limits with feedback
- `saveTransform` for normalizing tokens

### Color Controls

#### 13. **ColorPalette** (`ColorPalette.mdx`)
Color picker with predefined palettes
- Custom color palettes
- Theme color integration
- Multiple color pickers (background, text, border)
- Clear/reset functionality
- RGBA support for transparency
- Custom color picker option
- Integration with PanelColorSettings

#### 14. **ColorPicker** (`ColorPicker.mdx`)
Free-form color input with spectrum canvas
- Hex, RGB, and HSL input modes
- Alpha/opacity slider
- Compact dropdown pattern
- Multiple pickers with reset

### Typography Controls

#### 15. **FontSizePicker** (`FontSizePicker.mdx`)
Font size selector with theme.json integration
- Predefined size presets with labels
- Custom value fallback
- `useSetting` for theme.json font sizes
- CSS custom property output (`var(--wp--preset--font-size--*)`)
- `disableCustomFontSizes` for preset-only mode

### Spacing Controls

#### 16. **UnitControl** (`UnitControl.mdx`)
CSS dimension input with unit switching
- px, em, rem, %, vw, vh unit support
- Custom unit sets per use case
- Min/max constraints
- Four-sided spacing with Grid layout

#### 17. **BoxControl** (`BoxControl.mdx`)
Four-sided padding/margin control
- Linked and individual side modes
- Padding and margin together
- Border width application
- Custom unit sets

### Layout Components

#### 18. **PanelBody** (`PanelBody.mdx`)
Collapsible panels for sidebar settings organization
- Collapsible/expandable panels
- Multiple panels with initial open states
- PanelRow for custom layouts
- Icon support for panel headers
- Controlled open/close state
- Comprehensive settings organization

#### 19. **TabPanel** (`TabPanel.mdx`)
Tabbed settings interface for complex blocks
- General / Style / Advanced tab pattern
- Icon support on tabs
- Active tab state tracking
- Integration with `PanelBody`

#### 20. **Dropdown** (`Dropdown.mdx`)
Composable dropdown with custom trigger and panel
- Custom icon pickers
- Toolbar action menus
- Color picker popovers
- `MenuItem` and `MenuGroup` content

#### 21. **Card** (`Card.mdx`)
Structured content containers
- `CardHeader`, `CardBody`, `CardFooter`, `CardMedia` sub-components
- Size variants (small, medium, large)
- `CardDivider` between sections
- Plugin settings page layouts

### Media Components

#### 22. **MediaUpload** (`MediaUpload.mdx`)
WordPress Media Library integration for file uploads
- Single image upload
- Multiple image galleries
- Video upload support
- Background image selection
- Image size options (thumbnail, medium, large, full)
- Replace and remove functionality
- Any media type support (image, video, audio)

#### 23. **FocalPointPicker** (`FocalPointPicker.mdx`)
Visual focal point selector for background images
- Drag-and-drop focal point on image preview
- `background-position` and `object-position` output
- Hero/cover block pattern
- Keyboard-accessible coordinate inputs
- Reset on new image selection

### Feedback Components

#### 24. **Notice** (`Notice.mdx`)
Status messages in the block editor
- Info, success, warning, and error variants
- Dismissible and persistent modes
- Actions array for inline CTAs
- API fetch error handling patterns
- Inline validation in sidebar

#### 25. **Spinner** (`Spinner.mdx`)
Loading indicator for async operations
- `apiFetch` loading state
- Sidebar control placeholder while loading
- Full-block loading overlay
- Save/submit action feedback

### Overlay Components

#### 26. **Modal** (`Modal.mdx`)
Dialog overlay for confirmations and settings
- Confirmation dialogs for destructive actions
- Form modals with draft state pattern
- Toolbar-triggered settings modals
- Size variants (small, medium, large, fill)

#### 27. **Tooltip** (`Tooltip.mdx`)
Hover/focus tooltip for contextual help
- Icon-only button tooltips
- Keyboard shortcut display
- Help icons on complex controls
- Delay and placement configuration

### Content Components

#### 28. **Placeholder** (`Placeholder.mdx`)
Empty-state block UI for initial setup
- `MediaUpload` + Placeholder pattern
- Embed URL form input
- API key connection screen
- Returns `null` from `save.js` when unconfigured

#### 29. **RichText** (`RichText.mdx`)
Editable rich text with formatting options
- Editable headings (h1-h6)
- Paragraphs with formatting
- Multiple RichText fields
- Custom allowed formats
- Plain text mode (no formatting)
- Multiline support
- Lists (ordered/unordered)
- Blockquotes and styled content
- Button text (link-style)

## What Each File Includes

### ✅ Complete Code Examples
- Ready-to-use `edit.js` code
- Matching `save.js` implementations
- Proper `block.json` attribute definitions

### ✅ Multiple Use Cases
- Basic usage examples
- Advanced patterns
- InspectorControls (sidebar) integration
- Multiple components together
- Conditional rendering
- Dynamic styling

### ✅ Technical Reference
- Props reference table with descriptions
- Available options and values
- Import statements
- Dependencies

### ✅ Best Practices
- WordPress Coding Standards compliance
- Accessibility guidelines
- Common use cases
- Performance considerations
- Security best practices

### ✅ WordPress Standards
- Functional React components (ES6+)
- Proper i18n (internationalization) with `@wordpress/i18n`
- Correct attribute sources in `block.json`
- WordPress Core component usage only
- Block editor design patterns

## File Structure Compatibility

All examples follow the `@wordpress/create-block` package structure:

```
your-block/
├── src/
│   ├── edit.js          ← Copy examples here
│   ├── save.js          ← Copy save examples here
│   └── block.json       ← Copy attributes here
├── package.json
└── your-block.php
```

## How to Use This Documentation

### 1. **Find Your Component**
Browse the list above or open any `.mdx` file to find the component you need.

### 2. **Copy the Code**
Each example includes:
- Import statements
- `block.json` attributes
- Complete `edit.js` code
- Complete `save.js` code

### 3. **Paste and Customize**
- Copy the relevant sections into your block files
- Adjust text domain (`'your-text-domain'`)
- Customize labels, defaults, and styling
- Combine multiple components as needed

### 4. **Test and Deploy**
All examples are tested and follow WordPress standards, so they work immediately.

## Code Standards

All examples in this documentation follow these standards:

### React & JavaScript
- ✅ Functional components only (no class components)
- ✅ React Hooks (`useState`, `useEffect`, etc.)
- ✅ ES6+ syntax (arrow functions, destructuring, etc.)
- ✅ Proper prop destructuring
- ✅ Modern JavaScript practices

### WordPress Specific
- ✅ WordPress Coding Standards (WPCS)
- ✅ Internationalization (`__()`, `_x()`, etc.)
- ✅ WordPress Core components only
- ✅ Block editor best practices
- ✅ Proper attribute sources
- ✅ Security (sanitization, escaping, nonces)

### PHP Standards
- ✅ PHP 7.4+ syntax
- ✅ WordPress PHP Coding Standards
- ✅ Proper escaping and sanitization
- ✅ Security best practices

## Accessibility Features

All components include:
- ✅ Proper ARIA attributes
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Focus management
- ✅ Semantic HTML
- ✅ Color contrast considerations

## Browser & Version Compatibility

### WordPress Requirements
- WordPress 6.0+
- Gutenberg block editor
- PHP 7.4+
- MySQL 5.7+

### Modern Browsers
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Theme Compatibility

Examples are tested with:
- Twenty Twenty-Three
- Twenty Twenty-Four
- Astra
- GeneratePress
- OceanWP
- Neve
- Kadence
- Blocksy
- Other FSE and classic themes following WordPress standards

## Integration with Other Plugins

Components work seamlessly with:
- Gravity Forms
- WooCommerce
- The Events Calendar
- Popular page builders (when using blocks)

## Contributing

To add more component examples:

1. Follow the existing MDX format
2. Include all sections (imports, examples, props, best practices)
3. Provide multiple use cases
4. Test code examples thoroughly
5. Follow WordPress Coding Standards
6. Include accessibility considerations

## Component Quick Reference

| Component | Package | Primary Use |
|-----------|---------|-------------|
| InspectorControls | `@wordpress/block-editor` | Sidebar container |
| BlockControls | `@wordpress/block-editor` | Block toolbar |
| Button | `@wordpress/components` | Actions, CTAs |
| TextControl | `@wordpress/components` | Single-line text input |
| TextareaControl | `@wordpress/components` | Multi-line text input |
| CheckboxControl | `@wordpress/components` | Multi-boolean settings |
| RadioControl | `@wordpress/components` | Mutually exclusive options |
| RangeControl | `@wordpress/components` | Numeric sliders |
| ToggleControl | `@wordpress/components` | Boolean switches |
| SelectControl | `@wordpress/components` | Dropdown menus |
| ComboboxControl | `@wordpress/components` | Searchable dropdown |
| FormTokenField | `@wordpress/components` | Multi-value tag input |
| ColorPalette | `@wordpress/components` | Theme color swatches |
| ColorPicker | `@wordpress/components` | Free-form color input |
| FontSizePicker | `@wordpress/components` | Typography sizing |
| UnitControl | `@wordpress/components` | CSS dimension with unit |
| BoxControl | `@wordpress/components` | Padding/margin per side |
| PanelBody | `@wordpress/components` | Collapsible sidebar panels |
| TabPanel | `@wordpress/components` | Tabbed settings sections |
| Dropdown | `@wordpress/components` | Composable popover menu |
| Card | `@wordpress/components` | Structured containers |
| MediaUpload | `@wordpress/block-editor` | Media library uploads |
| FocalPointPicker | `@wordpress/components` | Background image focus |
| Notice | `@wordpress/components` | Status messages |
| Spinner | `@wordpress/components` | Loading indicator |
| Modal | `@wordpress/components` | Dialog overlays |
| Tooltip | `@wordpress/components` | Hover/focus help text |
| Placeholder | `@wordpress/components` | Empty-state block UI |
| RichText | `@wordpress/block-editor` | Editable content |

## Additional Resources

### Official Documentation
- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [WordPress Components](https://developer.wordpress.org/block-editor/reference-guides/components/)
- [Block API Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/)
- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)

### Development Tools
- [@wordpress/create-block](https://www.npmjs.com/package/@wordpress/create-block) - Scaffold blocks
- [@wordpress/scripts](https://www.npmjs.com/package/@wordpress/scripts) - Build tools
- [WordPress Code Reference](https://developer.wordpress.org/reference/) - Function reference

## License

These examples follow WordPress GPL v2 or later licensing.

## Support

For issues or questions:
1. Check the official WordPress documentation
2. Review the component's MDX file for examples
3. Consult WordPress community forums
4. Test in a clean WordPress installation

## Version History

### v2.0.0 (2026-02-20)
- Added 20 new components across 6 categories
- New categories: Block Editor Infrastructure, Feedback, Overlay, Spacing Controls, Typography Controls
- Component Quick Reference expanded from 9 to 29 entries
- Complete InspectorControls and BlockControls reference for block infrastructure
- Spacing controls: UnitControl and BoxControl
- Typography: FontSizePicker with theme.json integration
- Media: FocalPointPicker for background image focal control
- Overlay: Modal, Tooltip patterns
- Feedback: Notice, Spinner with apiFetch patterns
- Form: CheckboxControl, RadioControl, TextareaControl, ComboboxControl, FormTokenField

### v1.0.0 (2026-02-14)
- Initial release
- 9 core components documented
- Complete code examples for all components
- WordPress 6.0+ compatibility
- Full `@wordpress/create-block` integration

---

**Built for WordPress developers who value standards, accessibility, and code quality.**
