import { useRef } from 'react';

/**
 * FocalPointPicker — interactive image focal point selector.
 * Mirrors the @wordpress/components FocalPointPicker API.
 *
 * @param {Object}   props
 * @param {string}   [props.url]          - Image URL to display.
 * @param {Object}   [props.value]        - { x: number, y: number } values 0–1.
 * @param {Function} [props.onChange]     - Called with { x, y } on interaction.
 * @param {string}   [props.label]        - Label shown above the picker.
 * @param {string}   [props.help]         - Help text shown below.
 * @param {boolean}  [props.disabled]     - Disables interaction.
 * @param {string}   [props.className]    - Extra class name.
 */
export default function FocalPointPicker( {
	url,
	value = { x: 0.5, y: 0.5 },
	onChange,
	label,
	help,
	disabled = false,
	className = '',
} ) {
	const containerRef = useRef( null );
	const isDragging = useRef( false );

	const x = typeof value?.x === 'number' ? Math.max( 0, Math.min( 1, value.x ) ) : 0.5;
	const y = typeof value?.y === 'number' ? Math.max( 0, Math.min( 1, value.y ) ) : 0.5;

	function getPositionFromEvent( e ) {
		const rect = containerRef.current.getBoundingClientRect();
		const clientX = e.touches ? e.touches[ 0 ].clientX : e.clientX;
		const clientY = e.touches ? e.touches[ 0 ].clientY : e.clientY;
		return {
			x: Math.max( 0, Math.min( 1, ( clientX - rect.left ) / rect.width ) ),
			y: Math.max( 0, Math.min( 1, ( clientY - rect.top ) / rect.height ) ),
		};
	}

	function handlePointerDown( e ) {
		if ( disabled ) return;
		e.preventDefault();
		isDragging.current = true;
		const pos = getPositionFromEvent( e );
		onChange?.( pos );
	}

	function handlePointerMove( e ) {
		if ( ! isDragging.current || disabled ) return;
		e.preventDefault();
		const pos = getPositionFromEvent( e );
		onChange?.( pos );
	}

	function handlePointerUp() {
		isDragging.current = false;
	}

	function handleInputChange( axis, rawValue ) {
		const num = Math.max( 0, Math.min( 100, Number( rawValue ) ) );
		onChange?.( {
			...value,
			[ axis ]: num / 100,
		} );
	}

	const classes = [
		'focal-point-picker',
		disabled ? 'focal-point-picker--disabled' : '',
		className,
	].filter( Boolean ).join( ' ' );

	return (
		<div className={ classes }>
			{ label && <label className="focal-point-picker__label">{ label }</label> }

			<div
				ref={ containerRef }
				className="focal-point-picker__image-wrapper"
				onMouseDown={ handlePointerDown }
				onMouseMove={ handlePointerMove }
				onMouseUp={ handlePointerUp }
				onMouseLeave={ handlePointerUp }
				onTouchStart={ handlePointerDown }
				onTouchMove={ handlePointerMove }
				onTouchEnd={ handlePointerUp }
				role="presentation"
			>
				{ url ? (
					<img
						src={ url }
						alt="Focal point preview"
						className="focal-point-picker__image"
						draggable={ false }
					/>
				) : (
					<div className="focal-point-picker__placeholder">
						<span>No image</span>
					</div>
				) }

				{/* Crosshair indicator */ }
				<div
					className="focal-point-picker__crosshair"
					style={ {
						left: `${ x * 100 }%`,
						top: `${ y * 100 }%`,
					} }
					aria-hidden="true"
				>
					<div className="focal-point-picker__crosshair-h" />
					<div className="focal-point-picker__crosshair-v" />
					<div className="focal-point-picker__crosshair-dot" />
				</div>
			</div>

			<div className="focal-point-picker__inputs">
				<div className="focal-point-picker__input-group">
					<label className="focal-point-picker__input-label">X</label>
					<input
						type="number"
						className="focal-point-picker__input"
						min={ 0 }
						max={ 100 }
						step={ 1 }
						value={ Math.round( x * 100 ) }
						onChange={ ( e ) => handleInputChange( 'x', e.target.value ) }
						disabled={ disabled }
						aria-label="Focal point X position"
					/>
					<span className="focal-point-picker__input-unit">%</span>
				</div>
				<div className="focal-point-picker__input-group">
					<label className="focal-point-picker__input-label">Y</label>
					<input
						type="number"
						className="focal-point-picker__input"
						min={ 0 }
						max={ 100 }
						step={ 1 }
						value={ Math.round( y * 100 ) }
						onChange={ ( e ) => handleInputChange( 'y', e.target.value ) }
						disabled={ disabled }
						aria-label="Focal point Y position"
					/>
					<span className="focal-point-picker__input-unit">%</span>
				</div>
			</div>

			{ help && <p className="focal-point-picker__help">{ help }</p> }
		</div>
	);
}
