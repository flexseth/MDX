import { useRef, useCallback } from 'react';

/**
 * Image with a draggable crosshair to set a focal point.
 *
 * Mirrors the WordPress `FocalPointPicker` component from `@wordpress/components`.
 * The focal point value uses a 0–1 coordinate system where `{ x: 0, y: 0 }` is
 * the top-left corner and `{ x: 1, y: 1 }` is the bottom-right corner.
 *
 * @param {Object}   props
 * @param {string}   props.url         - URL of the image to display as the preview.
 * @param {Object}   [props.value]     - Current focal point as `{ x, y }` (0–1 each). Default `{ x: 0.5, y: 0.5 }`.
 * @param {Function} [props.onChange]  - Callback fired with the new `{ x, y }` object.
 * @param {number}   [props.width]     - Width of the picker image container in pixels. Default 200.
 * @param {number}   [props.height]    - Height of the picker image container in pixels. Default 150.
 * @param {string}   [props.label]     - Label displayed above the picker.
 * @param {string}   [props.help]      - Help text displayed below the picker.
 * @param {string}   [props.className] - Additional CSS class names.
 */
export default function FocalPointPicker( {
	url,
	value = { x: 0.5, y: 0.5 },
	onChange,
	width = 200,
	height = 150,
	label,
	help,
	className = '',
} ) {
	const containerRef = useRef( null );
	const isDragging = useRef( false );

	const id = 'focal-point-picker';

	/**
	 * Convert a pointer event position to a clamped 0–1 focal point object.
	 *
	 * @param {PointerEvent|MouseEvent} event
	 * @return {{ x: number, y: number }}
	 */
	const getValueFromEvent = useCallback( ( event ) => {
		const rect = containerRef.current?.getBoundingClientRect();
		if ( ! rect ) return value;
		const x = Math.max( 0, Math.min( 1, ( event.clientX - rect.left ) / rect.width ) );
		const y = Math.max( 0, Math.min( 1, ( event.clientY - rect.top ) / rect.height ) );
		return {
			x: Math.round( x * 100 ) / 100,
			y: Math.round( y * 100 ) / 100,
		};
	}, [ value ] );

	const handlePointerDown = useCallback( ( event ) => {
		event.preventDefault();
		isDragging.current = true;
		containerRef.current?.setPointerCapture( event.pointerId );
		if ( onChange ) onChange( getValueFromEvent( event ) );
	}, [ onChange, getValueFromEvent ] );

	const handlePointerMove = useCallback( ( event ) => {
		if ( ! isDragging.current ) return;
		event.preventDefault();
		if ( onChange ) onChange( getValueFromEvent( event ) );
	}, [ onChange, getValueFromEvent ] );

	const handlePointerUp = useCallback( () => {
		isDragging.current = false;
	}, [] );

	const crosshairLeft = `${ value.x * 100 }%`;
	const crosshairTop = `${ value.y * 100 }%`;

	return (
		<div className={ `focal-point-picker${ className ? ` ${ className }` : '' }` }>
			{ label && (
				<label className="focal-point-picker__label" htmlFor={ id }>
					{ label }
				</label>
			) }

			<div
				ref={ containerRef }
				id={ id }
				className="focal-point-picker__image-container"
				style={ { width, height } }
				onPointerDown={ handlePointerDown }
				onPointerMove={ handlePointerMove }
				onPointerUp={ handlePointerUp }
				role="slider"
				aria-label="Focal point"
				aria-valuetext={ `x: ${ value.x }, y: ${ value.y }` }
				tabIndex={ 0 }
				onKeyDown={ ( event ) => {
					const step = 0.05;
					let { x, y } = value;
					switch ( event.key ) {
						case 'ArrowLeft':
							event.preventDefault();
							x = Math.max( 0, Math.round( ( x - step ) * 100 ) / 100 );
							break;
						case 'ArrowRight':
							event.preventDefault();
							x = Math.min( 1, Math.round( ( x + step ) * 100 ) / 100 );
							break;
						case 'ArrowUp':
							event.preventDefault();
							y = Math.max( 0, Math.round( ( y - step ) * 100 ) / 100 );
							break;
						case 'ArrowDown':
							event.preventDefault();
							y = Math.min( 1, Math.round( ( y + step ) * 100 ) / 100 );
							break;
						default:
							return;
					}
					if ( onChange ) onChange( { x, y } );
				} }
			>
				<img
					src={ url }
					alt="Focal point preview"
					className="focal-point-picker__image"
					draggable={ false }
				/>

				<div
					className="focal-point-picker__crosshair"
					style={ {
						left: crosshairLeft,
						top: crosshairTop,
					} }
					aria-hidden="true"
				/>
			</div>

			{ help && (
				<p className="focal-point-picker__help">{ help }</p>
			) }
		</div>
	);
}
