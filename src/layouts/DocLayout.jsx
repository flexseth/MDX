import { NavLink } from 'react-router-dom';

const navItems = [
	{ path: '/docs/getting-started', label: 'Getting Started' },
	{ path: '/docs/alert', label: 'Alert' },
	{ path: '/docs/base-control', label: 'BaseControl' },
	{ path: '/docs/block-controls', label: 'BlockControls' },
	{ path: '/docs/box-control', label: 'BoxControl' },
	{ path: '/docs/button', label: 'Button' },
	{ path: '/docs/button-group', label: 'ButtonGroup' },
	{ path: '/docs/card', label: 'Card' },
	{ path: '/docs/checkbox-control', label: 'CheckboxControl' },
	{ path: '/docs/color-palette', label: 'ColorPalette' },
	{ path: '/docs/color-picker', label: 'ColorPicker' },
	{ path: '/docs/combobox-control', label: 'ComboboxControl' },
	{ path: '/docs/custom-select-control', label: 'CustomSelectControl' },
	{ path: '/docs/date-time-picker', label: 'DateTimePicker' },
	{ path: '/docs/dropdown', label: 'Dropdown' },
	{ path: '/docs/dropdown-menu', label: 'DropdownMenu' },
	{ path: '/docs/flex', label: 'Flex' },
	{ path: '/docs/focal-point-picker', label: 'FocalPointPicker' },
	{ path: '/docs/font-size-picker', label: 'FontSizePicker' },
	{ path: '/docs/form-token-field', label: 'FormTokenField' },
	{ path: '/docs/guide', label: 'Guide' },
	{ path: '/docs/inspector-controls', label: 'InspectorControls' },
	{ path: '/docs/media-upload', label: 'MediaUpload' },
	{ path: '/docs/modal', label: 'Modal' },
	{ path: '/docs/notice', label: 'Notice' },
	{ path: '/docs/number-control', label: 'NumberControl' },
	{ path: '/docs/panel-body', label: 'PanelBody' },
	{ path: '/docs/placeholder', label: 'Placeholder' },
	{ path: '/docs/popover', label: 'Popover' },
	{ path: '/docs/radio-control', label: 'RadioControl' },
	{ path: '/docs/range-control', label: 'RangeControl' },
	{ path: '/docs/rich-text', label: 'RichText' },
	{ path: '/docs/search-control', label: 'SearchControl' },
	{ path: '/docs/select-control', label: 'SelectControl' },
	{ path: '/docs/snackbar', label: 'Snackbar' },
	{ path: '/docs/spacer', label: 'Spacer' },
	{ path: '/docs/spinner', label: 'Spinner' },
	{ path: '/docs/tab-panel', label: 'TabPanel' },
	{ path: '/docs/tabs', label: 'Tabs' },
	{ path: '/docs/textarea-control', label: 'TextareaControl' },
	{ path: '/docs/text-control', label: 'TextControl' },
	{ path: '/docs/toggle-control', label: 'ToggleControl' },
	{ path: '/docs/toggle-group-control', label: 'ToggleGroupControl' },
	{ path: '/docs/tools-panel', label: 'ToolsPanel' },
	{ path: '/docs/tooltip', label: 'Tooltip' },
	{ path: '/docs/unit-control', label: 'UnitControl' },
];

/**
 * Documentation page layout with sidebar navigation.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content (MDX output).
 */
export default function DocLayout( { children } ) {
	return (
		<div className="doc-layout">
			<aside className="doc-sidebar">
				<div className="doc-sidebar__brand">
					<h2>Gutendocs</h2>
				</div>
				<nav className="doc-sidebar__nav">
					<ul>
						{ navItems.map( ( item ) => (
							<li key={ item.path }>
								<NavLink
									to={ item.path }
									className={ ( { isActive } ) =>
										`doc-sidebar__link${ isActive ? ' doc-sidebar__link--active' : '' }`
									}
								>
									{ item.label }
								</NavLink>
							</li>
						) ) }
					</ul>
				</nav>
			</aside>
			<main className="doc-content">
				{ children }
			</main>
		</div>
	);
}
