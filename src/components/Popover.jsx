import { useEffect, useRef } from 'react';

/**
 * Floating container anchored to a reference element.
 *
 * Base for custom popovers, inline color pickers, link tooltips, and overlay menus.
 * Mirrors the WordPress `Popover` component from `@wordpress/components`.
 *
 * @param {Object}   props
 * @param {HTMLElement} props.anchor    - Element to anchor the popover to.
 * @param {Function} [props.onClose]    - Callback fired when popover should close.
 * @param {string}   [props.placement]  - Placement: 'top', 'bottom', 'left', 'right', etc.
 * @param {string}   [props.className]  - Additional CSS class names.
 * @param {React.ReactNode} props.children - Popover content.
 */
export default function Popover( {
	anchor,
	onClose,
	placement = 'bottom-start',
	className = '',
	children,
	...rest
} ) {
	const popoverRef = useRef( null );

	useEffect( () => {
		const handleClickOutside = ( event ) => {
			if (
				popoverRef.current &&
				! popoverRef.current.contains( event.target ) &&
				anchor &&
				! anchor.contains( event.target )
			) {
				if ( onClose ) {
					onClose();
				}
			}
		};

		const handleEscape = ( event ) => {
			if ( event.key === 'Escape' && onClose ) {
				onClose();
			}
		};

		document.addEventListener( 'mousedown', handleClickOutside );
		document.addEventListener( 'keydown', handleEscape );

		return () => {
			document.removeEventListener( 'mousedown', handleClickOutside );
			document.removeEventListener( 'keydown', handleEscape );
		};
	}, [ anchor, onClose ] );

	// Simple positioning based on anchor (in a real implementation, use Floating UI)
	const getPosition = () => {
		if ( ! anchor ) return {};

		const rect = anchor.getBoundingClientRect();

		const positions = {
			'top': { bottom: `calc(100vh - ${ rect.top }px + 8px)`, left: `${ rect.left }px` },
			'bottom': { top: `${ rect.bottom + 8 }px`, left: `${ rect.left }px` },
			'bottom-start': { top: `${ rect.bottom + 8 }px`, left: `${ rect.left }px` },
			'bottom-end': { top: `${ rect.bottom + 8 }px`, right: `calc(100vw - ${ rect.right }px)` },
			'left': { top: `${ rect.top }px`, right: `calc(100vw - ${ rect.left }px + 8px)` },
			'right': { top: `${ rect.top }px`, left: `${ rect.right + 8 }px` },
		};

		return positions[ placement ] || positions[ 'bottom-start' ];
	};

	return (
		<div
			ref={ popoverRef }
			className={ `popover${ className ? ` ${ className }` : '' }` }
			style={ {
				position: 'fixed',
				zIndex: 1000,
				background: '#fff',
				border: '1px solid #ccc',
				borderRadius: '4px',
				boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
				...getPosition(),
			} }
			{ ...rest }
		>
			{ children }
		</div>
	);
}
