import { useEffect, useRef } from 'react';

/**
 * Focus-trapped dialog overlay for confirmations, forms, and settings.
 *
 * Mirrors the WordPress `Modal` component from `@wordpress/components`.
 * Renders a fixed overlay with a centered dialog panel. Body scroll is
 * locked while the modal is open. Close via the header button, Escape key,
 * or clicking the backdrop (when `shouldCloseOnClickOutside` is true).
 *
 * @param {Object}            props
 * @param {string}            props.title                      - Dialog title displayed in the header (required).
 * @param {Function}          props.onRequestClose             - Callback fired when the modal should close.
 * @param {boolean}           [props.isOpen=false]             - Controls whether the modal is visible.
 * @param {React.ReactNode}   [props.children]                 - Modal body content.
 * @param {string}            [props.size='medium']            - Width preset: 'small', 'medium', 'large', 'fill'.
 * @param {string}            [props.className='']             - Additional CSS classes on the dialog.
 * @param {boolean}           [props.isDismissible=true]       - Shows the close (×) button in the header.
 * @param {boolean}           [props.shouldCloseOnClickOutside=true] - Closes when clicking the backdrop.
 * @param {boolean}           [props.shouldCloseOnEsc=true]    - Closes on Escape key press.
 * @param {boolean}           [props.isFullScreen=false]       - Expands the dialog to fill the viewport.
 * @param {React.ReactNode}   [props.headerActions]            - Extra elements rendered in the modal header.
 */
export default function Modal( {
	title,
	onRequestClose,
	isOpen = false,
	children,
	size = 'medium',
	className = '',
	isDismissible = true,
	shouldCloseOnClickOutside = true,
	shouldCloseOnEsc = true,
	isFullScreen = false,
	headerActions,
} ) {
	const dialogRef = useRef( null );

	// Lock body scroll and handle keyboard events while open.
	useEffect( () => {
		if ( ! isOpen ) return;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		const handleKeyDown = ( event ) => {
			if ( shouldCloseOnEsc && event.key === 'Escape' && onRequestClose ) {
				onRequestClose();
			}
		};

		document.addEventListener( 'keydown', handleKeyDown );

		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener( 'keydown', handleKeyDown );
		};
	}, [ isOpen, shouldCloseOnEsc, onRequestClose ] );

	if ( ! isOpen ) {
		return null;
	}

	/**
	 * Handle backdrop clicks. Only fire onRequestClose when the click target
	 * is the overlay itself, not any child element inside the dialog.
	 *
	 * @param {React.MouseEvent} event
	 */
	const handleOverlayClick = ( event ) => {
		if (
			shouldCloseOnClickOutside &&
			onRequestClose &&
			event.target === event.currentTarget
		) {
			onRequestClose();
		}
	};

	const sizeClass = isFullScreen ? 'modal__dialog--full-screen' : `modal__dialog--${ size }`;
	const dialogClass = [
		'modal__dialog',
		sizeClass,
		className,
	]
		.filter( Boolean )
		.join( ' ' );

	return (
		<div
			className="modal__overlay"
			onClick={ handleOverlayClick }
			role="presentation"
		>
			<div
				ref={ dialogRef }
				className={ dialogClass }
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-title"
			>
				<div className="modal__header">
					<h1 id="modal-title" className="modal__title">
						{ title }
					</h1>
					<div className="modal__header-actions">
						{ headerActions }
						{ isDismissible && (
							<button
								type="button"
								className="modal__close"
								aria-label="Close dialog"
								onClick={ onRequestClose }
							>
								&times;
							</button>
						) }
					</div>
				</div>
				<div className="modal__content">
					{ children }
				</div>
			</div>
		</div>
	);
}
