import { useState, useRef, useEffect } from 'react';

/**
 * Composable dropdown with a custom trigger and floating panel.
 *
 * Mirrors the WordPress `Dropdown` component from `@wordpress/components`.
 * Open/close state is managed internally. Both the trigger and the panel
 * content are defined as render props, giving full control over their markup.
 * Clicking outside the component or pressing Escape closes the panel.
 *
 * @param {Object}   props
 * @param {Function} props.renderToggle          - Render prop for the trigger element.
 *                                                 Receives `{ isOpen, onToggle, onClose }`.
 * @param {Function} props.renderContent         - Render prop for the panel content.
 *                                                 Receives `{ onToggle, onClose }`.
 * @param {string}   [props.position='bottom left'] - Panel placement relative to the trigger.
 *                                                 Accepts 'bottom left', 'bottom right',
 *                                                 'top left', 'top right'.
 * @param {string}   [props.className='']        - Additional CSS classes on the wrapper element.
 * @param {string}   [props.contentClassName=''] - Additional CSS classes on the panel element.
 * @param {Function} [props.onToggle]            - Callback fired when open state changes; receives the new boolean.
 * @param {Function} [props.onClose]             - Callback fired when the dropdown closes.
 * @param {boolean}  [props.defaultOpen=false]   - Whether the dropdown starts in the open state.
 */
export default function Dropdown( {
	renderToggle,
	renderContent,
	position = 'bottom left',
	className = '',
	contentClassName = '',
	onToggle,
	onClose,
	defaultOpen = false,
} ) {
	const [ isOpen, setIsOpen ] = useState( defaultOpen );
	const wrapperRef = useRef( null );

	// Close on click outside.
	useEffect( () => {
		if ( ! isOpen ) return;

		const handleClickOutside = ( event ) => {
			if ( wrapperRef.current && ! wrapperRef.current.contains( event.target ) ) {
				handleClose();
			}
		};

		const handleEscape = ( event ) => {
			if ( event.key === 'Escape' ) {
				handleClose();
			}
		};

		document.addEventListener( 'mousedown', handleClickOutside );
		document.addEventListener( 'keydown', handleEscape );

		return () => {
			document.removeEventListener( 'mousedown', handleClickOutside );
			document.removeEventListener( 'keydown', handleEscape );
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ isOpen ] );

	/**
	 * Toggle the open state and fire the optional onToggle callback.
	 */
	const handleToggle = () => {
		const nextOpen = ! isOpen;
		setIsOpen( nextOpen );
		if ( onToggle ) {
			onToggle( nextOpen );
		}
		if ( ! nextOpen && onClose ) {
			onClose();
		}
	};

	/**
	 * Close the dropdown and fire the optional onClose callback.
	 */
	const handleClose = () => {
		setIsOpen( false );
		if ( onToggle ) {
			onToggle( false );
		}
		if ( onClose ) {
			onClose();
		}
	};

	// Derive BEM modifier from the position string (e.g. 'bottom left' → 'bottom-left').
	const positionModifier = position.replace( ' ', '-' );

	const contentClass = [
		'dropdown__content',
		`dropdown__content--${ positionModifier }`,
		contentClassName,
	]
		.filter( Boolean )
		.join( ' ' );

	const wrapperClass = [ 'dropdown', className ].filter( Boolean ).join( ' ' );

	return (
		<div ref={ wrapperRef } className={ wrapperClass }>
			<div className="dropdown__trigger">
				{ renderToggle( { isOpen, onToggle: handleToggle, onClose: handleClose } ) }
			</div>
			{ isOpen && (
				<div className={ contentClass }>
					{ renderContent( { onToggle: handleToggle, onClose: handleClose } ) }
				</div>
			) }
		</div>
	);
}
