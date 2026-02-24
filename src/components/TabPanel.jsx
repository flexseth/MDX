import { useState } from 'react';

/**
 * Tab switcher with a callback-based (render-prop) API.
 *
 * Accepts a flat `tabs` array and a `children` render-prop function that
 * receives the currently active tab object. Internal open/close state is
 * managed with `useState`; the initial tab defaults to the first entry.
 *
 * Mirrors the WordPress `TabPanel` component from `@wordpress/components`.
 *
 * @param {Object}   props
 * @param {Array}    props.tabs              - Array of tab descriptor objects.
 * @param {string}   props.tabs[].name      - Unique identifier for the tab.
 * @param {string}   props.tabs[].title     - Visible tab button label.
 * @param {string}   [props.tabs[].className] - Extra CSS class on the tab button.
 * @param {Function} props.children         - Render prop: `(activeTab) => JSX`. Receives the active tab object.
 * @param {string}   [props.initialTabName] - Name of the tab to activate on mount. Defaults to first tab.
 * @param {Function} [props.onSelect]       - Callback fired with the tab name when the user switches tabs.
 * @param {string}   [props.activeClass]    - CSS class applied to the active tab button. Default 'is-active'.
 * @param {string}   [props.className]      - Additional CSS class names on the root element.
 */
export default function TabPanel( {
	tabs = [],
	children,
	initialTabName,
	onSelect,
	activeClass = 'is-active',
	className = '',
	...rest
} ) {
	const defaultTab = initialTabName || ( tabs[ 0 ]?.name ?? '' );
	const [ activeTabName, setActiveTabName ] = useState( defaultTab );

	const handleSelect = ( name ) => {
		setActiveTabName( name );
		if ( onSelect ) {
			onSelect( name );
		}
	};

	const activeTab = tabs.find( ( tab ) => tab.name === activeTabName ) || tabs[ 0 ];

	const wrapperClass = [
		'tab-panel',
		className,
	].filter( Boolean ).join( ' ' );

	return (
		<div className={ wrapperClass } { ...rest }>
			<div className="tab-panel__tabs" role="tablist">
				{ tabs.map( ( tab ) => {
					const isActive = tab.name === activeTabName;
					const buttonClass = [
						'tab-panel__tab-button',
						isActive ? activeClass : '',
						tab.className || '',
					].filter( Boolean ).join( ' ' );

					return (
						<button
							key={ tab.name }
							type="button"
							role="tab"
							className={ buttonClass }
							aria-selected={ isActive }
							onClick={ () => handleSelect( tab.name ) }
						>
							{ tab.title }
						</button>
					);
				} ) }
			</div>
			<div className="tab-panel__content" role="tabpanel">
				{ activeTab && children( activeTab ) }
			</div>
		</div>
	);
}
