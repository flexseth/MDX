import { NavLink } from 'react-router-dom';

const navItems = [
	{ path: '/docs/getting-started', label: 'Getting Started' },
	{ path: '/docs/alert', label: 'Alert' },
	{ path: '/docs/base-control', label: 'BaseControl' },
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
	{ path: '/docs/dropdown-menu', label: 'DropdownMenu' },
	{ path: '/docs/flex', label: 'Flex' },
	{ path: '/docs/number-control', label: 'NumberControl' },
	{ path: '/docs/popover', label: 'Popover' },
	{ path: '/docs/range-control', label: 'RangeControl' },
	{ path: '/docs/search-control', label: 'SearchControl' },
	{ path: '/docs/select-control', label: 'SelectControl' },
	{ path: '/docs/snackbar', label: 'Snackbar' },
	{ path: '/docs/spacer', label: 'Spacer' },
	{ path: '/docs/tabs', label: 'Tabs' },
	{ path: '/docs/text-control', label: 'TextControl' },
	{ path: '/docs/toggle-control', label: 'ToggleControl' },
	{ path: '/docs/toggle-group-control', label: 'ToggleGroupControl' },
	{ path: '/docs/tools-panel', label: 'ToolsPanel' },
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
