import { NavLink } from 'react-router-dom';

const navItems = [
	{ path: '/docs/getting-started', label: 'Getting Started' },
	{ path: '/docs/alert', label: 'Alert' },
	{ path: '/docs/button', label: 'Button' },
	{ path: '/docs/card', label: 'Card' },
	{ path: '/docs/toggle-control', label: 'ToggleControl' },
	{ path: '/docs/select-control', label: 'SelectControl' },
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
