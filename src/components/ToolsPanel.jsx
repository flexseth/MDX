import { createContext, useContext, useState } from 'react';

const ToolsPanelContext = createContext( {
	panelId: '',
	displayedItems: new Set(),
	toggleItem: () => {},
} );

/**
 * Modern sidebar panel that lets users show/hide individual controls.
 *
 * Used by all new core blocks in WP 6.x+. Works with ToolsPanelItem sub-components.
 * Mirrors the WordPress `ToolsPanel` component from `@wordpress/components`.
 *
 * @param {Object}   props
 * @param {string}   props.label      - Panel label text.
 * @param {Function} [props.resetAll] - Callback to reset all values to defaults.
 * @param {string}   [props.className] - Additional CSS class names.
 * @param {React.ReactNode} props.children - ToolsPanelItem components.
 */
export default function ToolsPanel( {
	label,
	resetAll,
	className = '',
	children,
	...rest
} ) {
	const panelId = `tools-panel-${ label?.toLowerCase().replace( /\s+/g, '-' ) }`;
	const [ displayedItems, setDisplayedItems ] = useState( new Set() );
	const [ menuOpen, setMenuOpen ] = useState( false );

	const toggleItem = ( itemLabel, isShown ) => {
		setDisplayedItems( ( prev ) => {
			const next = new Set( prev );
			if ( isShown ) {
				next.add( itemLabel );
			} else {
				next.delete( itemLabel );
			}
			return next;
		} );
	};

	const handleResetAll = () => {
		if ( resetAll ) {
			resetAll();
		}
		setDisplayedItems( new Set() );
		setMenuOpen( false );
	};

	return (
		<ToolsPanelContext.Provider value={ { panelId, displayedItems, toggleItem } }>
			<div className={ `tools-panel${ className ? ` ${ className }` : '' }` } { ...rest }>
				<div className="tools-panel__header">
					<h3 className="tools-panel__label">{ label }</h3>
					<button
						type="button"
						className="tools-panel__menu-button"
						onClick={ () => setMenuOpen( ( prev ) => ! prev ) }
						aria-label="Options"
					>
						⋮
					</button>
				</div>
				{ menuOpen && (
					<div className="tools-panel__dropdown-menu">
						<button
							type="button"
							className="tools-panel__reset-all"
							onClick={ handleResetAll }
						>
							Reset all
						</button>
					</div>
				) }
				<div className="tools-panel__content">
					{ children }
				</div>
			</div>
		</ToolsPanelContext.Provider>
	);
}

/**
 * Individual control item within a ToolsPanel.
 */
export function ToolsPanelItem( {
	label,
	hasValue,
	onDeselect,
	isShownByDefault = false,
	children,
	className = '',
	...rest
} ) {
	const { displayedItems, toggleItem } = useContext( ToolsPanelContext );
	const isShown = isShownByDefault || displayedItems.has( label ) || hasValue();

	if ( ! isShown ) {
		// Render a placeholder item in the options menu
		return null;
	}

	const handleRemove = () => {
		if ( onDeselect ) {
			onDeselect();
		}
		toggleItem( label, false );
	};

	return (
		<div className={ `tools-panel-item${ className ? ` ${ className }` : '' }` } { ...rest }>
			<div className="tools-panel-item__content">
				{ children }
			</div>
			{ ! isShownByDefault && (
				<button
					type="button"
					className="tools-panel-item__reset"
					onClick={ handleRemove }
					aria-label={ `Reset ${ label }` }
				>
					↺
				</button>
			) }
		</div>
	);
}
