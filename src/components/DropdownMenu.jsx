import { useState, useRef, useEffect } from 'react';

/**
 * Pre-built dropdown menu with trigger button and controls array.
 *
 * Simpler than Dropdown for standard menu patterns.
 * Mirrors the WordPress `DropdownMenu` component from `@wordpress/components`.
 *
 * @param {Object}   props
 * @param {string}   props.icon     - Icon to display in the trigger button (text or element).
 * @param {string}   props.label    - Accessible label for the trigger button.
 * @param {Array}    props.controls - Array of { title, icon?, onClick, isDestructive? } or array of arrays.
 * @param {string}   [props.className] - Additional CSS class names.
 */
export default function DropdownMenu( {
	icon,
	label,
	controls = [],
	className = '',
	...rest
} ) {
	const [ isOpen, setIsOpen ] = useState( false );
	const containerRef = useRef( null );

	useEffect( () => {
		if ( ! isOpen ) return;

		const handleClickOutside = ( event ) => {
			if ( containerRef.current && ! containerRef.current.contains( event.target ) ) {
				setIsOpen( false );
			}
		};

		document.addEventListener( 'mousedown', handleClickOutside );
		return () => document.removeEventListener( 'mousedown', handleClickOutside );
	}, [ isOpen ] );

	const handleToggle = () => setIsOpen( ( prev ) => ! prev );

	const handleItemClick = ( onClick ) => {
		if ( onClick ) {
			onClick();
		}
		setIsOpen( false );
	};

	// Normalize controls to always be array of arrays
	const groups = Array.isArray( controls[ 0 ] ) ? controls : [ controls ];

	return (
		<div className={ `dropdown-menu${ className ? ` ${ className }` : '' }` } ref={ containerRef } { ...rest }>
			<button
				type="button"
				className="dropdown-menu__toggle"
				onClick={ handleToggle }
				aria-label={ label }
				aria-expanded={ isOpen }
			>
				{ icon }
			</button>
			{ isOpen && (
				<div className="dropdown-menu__popover">
					{ groups.map( ( group, groupIndex ) => (
						<div key={ groupIndex } className="dropdown-menu__group">
							{ group.map( ( control, controlIndex ) => (
								<button
									key={ controlIndex }
									type="button"
									className={ `dropdown-menu__item${ control.isDestructive ? ' dropdown-menu__item--destructive' : '' }` }
									onClick={ () => handleItemClick( control.onClick ) }
								>
									{ control.icon && <span className="dropdown-menu__item-icon">{ control.icon }</span> }
									<span className="dropdown-menu__item-title">{ control.title }</span>
								</button>
							) ) }
						</div>
					) ) }
				</div>
			) }
		</div>
	);
}
