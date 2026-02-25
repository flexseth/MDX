import { useState, useRef, useEffect } from 'react';

/**
 * Composable dropdown with a custom trigger and popover panel.
 *
 * Mirrors the WordPress `Dropdown` component from `@wordpress/components`.
 * Both the toggle button and popover content are provided as render props,
 * making this fully composable for any picker, menu, or contextual panel.
 *
 * @param {Object}   props
 * @param {Function} props.renderToggle      - Render prop for the trigger element. Receives `{ isOpen, onToggle, onClose }`.
 * @param {Function} props.renderContent     - Render prop for the popover content. Receives `{ onToggle, onClose }`.
 * @param {string}   [props.className]       - Additional CSS class names on the wrapper.
 * @param {string}   [props.contentClassName] - Additional CSS class names on the popover panel.
 * @param {Object}   [props.popoverProps]    - Positioning options. Supports `placement`: 'bottom-start' | 'bottom-end' | 'bottom' (default).
 * @param {boolean}  [props.defaultOpen]     - Whether the dropdown starts open. Default false.
 * @param {Function} [props.onToggle]        - Callback fired with the new `isOpen` boolean when the dropdown toggles.
 * @param {Function} [props.onClose]         - Callback fired when the dropdown closes.
 */
export default function Dropdown( {
	renderToggle,
	renderContent,
	className = '',
	contentClassName = '',
	popoverProps = {},
	defaultOpen = false,
	onToggle: onToggleCallback,
	onClose: onCloseCallback,
} ) {
	const [ isOpen, setIsOpen ] = useState( defaultOpen );
	const wrapperRef = useRef( null );

	const close = () => {
		setIsOpen( false );
		if ( onToggleCallback ) onToggleCallback( false );
		if ( onCloseCallback ) onCloseCallback();
	};

	const toggle = () => {
		const next = ! isOpen;
		setIsOpen( next );
		if ( onToggleCallback ) onToggleCallback( next );
		if ( ! next && onCloseCallback ) onCloseCallback();
	};

	// Close on click outside.
	useEffect( () => {
		if ( ! isOpen ) return;
		const handleOutside = ( event ) => {
			if ( wrapperRef.current && ! wrapperRef.current.contains( event.target ) ) {
				close();
			}
		};
		document.addEventListener( 'mousedown', handleOutside );
		return () => document.removeEventListener( 'mousedown', handleOutside );
	}, [ isOpen ] ); // eslint-disable-line react-hooks/exhaustive-deps

	// Close on Escape key.
	useEffect( () => {
		if ( ! isOpen ) return;
		const handleKeyDown = ( event ) => {
			if ( event.key === 'Escape' ) close();
		};
		document.addEventListener( 'keydown', handleKeyDown );
		return () => document.removeEventListener( 'keydown', handleKeyDown );
	}, [ isOpen ] ); // eslint-disable-line react-hooks/exhaustive-deps

	// Derive popover alignment class from placement prop.
	const placement = popoverProps.placement || 'bottom-start';
	const placementClass = `dropdown__popover--${ placement.replace( '-', '_' ) }`;

	return (
		<div
			ref={ wrapperRef }
			className={ `dropdown${ className ? ` ${ className }` : '' }` }
		>
			{ renderToggle( { isOpen, onToggle: toggle, onClose: close } ) }

			{ isOpen && (
				<div
					className={ [
						'dropdown__popover',
						placementClass,
						contentClassName,
					]
						.filter( Boolean )
						.join( ' ' ) }
					role="dialog"
				>
					{ renderContent( { onToggle: toggle, onClose: close } ) }
				</div>
			) }
		</div>
	);
}
