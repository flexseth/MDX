import { createContext, useContext, useState } from 'react';

const TabsContext = createContext( { selectedTab: null, setSelectedTab: () => {} } );

/**
 * Modern slot-based tab component.
 *
 * Uses Tabs.TabList, Tabs.Tab, and Tabs.TabPanel sub-components.
 * Mirrors the WordPress `Tabs` component from `@wordpress/components`.
 *
 * @param {Object}   props
 * @param {string}   [props.defaultTab] - Default selected tab ID.
 * @param {string}   [props.className]  - Additional CSS class names.
 * @param {React.ReactNode} props.children - TabList and TabPanel components.
 */
export default function Tabs( {
	defaultTab,
	className = '',
	children,
	...rest
} ) {
	const [ selectedTab, setSelectedTab ] = useState( defaultTab || null );

	return (
		<TabsContext.Provider value={ { selectedTab, setSelectedTab } }>
			<div className={ `tabs${ className ? ` ${ className }` : '' }` } { ...rest }>
				{ children }
			</div>
		</TabsContext.Provider>
	);
}

/**
 * Container for Tab components.
 */
Tabs.TabList = function TabList( { children, className = '', ...rest } ) {
	return (
		<div className={ `tabs__tab-list${ className ? ` ${ className }` : '' }` } role="tablist" { ...rest }>
			{ children }
		</div>
	);
};

/**
 * Individual tab button.
 */
Tabs.Tab = function Tab( { tabId, children, className = '', ...rest } ) {
	const { selectedTab, setSelectedTab } = useContext( TabsContext );
	const isSelected = selectedTab === tabId || ( selectedTab === null && tabId );

	// Auto-select first tab if none selected
	if ( selectedTab === null && tabId ) {
		setSelectedTab( tabId );
	}

	return (
		<button
			type="button"
			className={ `tabs__tab${ isSelected ? ' tabs__tab--selected' : '' }${ className ? ` ${ className }` : '' }` }
			role="tab"
			aria-selected={ isSelected }
			onClick={ () => setSelectedTab( tabId ) }
			{ ...rest }
		>
			{ children }
		</button>
	);
};

/**
 * Tab panel content.
 */
Tabs.TabPanel = function TabPanel( { tabId, children, className = '', ...rest } ) {
	const { selectedTab } = useContext( TabsContext );
	const isSelected = selectedTab === tabId;

	if ( ! isSelected ) {
		return null;
	}

	return (
		<div className={ `tabs__tab-panel${ className ? ` ${ className }` : '' }` } role="tabpanel" { ...rest }>
			{ children }
		</div>
	);
};
