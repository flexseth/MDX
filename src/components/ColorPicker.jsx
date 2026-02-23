/**
 * Parses a color string into a hex value and alpha channel.
 *
 * Accepts hex strings (`#rrggbb`) or CSS `rgba(r, g, b, a)` strings.
 *
 * @param {string} color - The color string to parse.
 * @returns {{ hex: string, alpha: number }}
 */
function parseColor( color ) {
	if ( ! color ) return { hex: '#000000', alpha: 1 };

	const rgbaMatch = color.match(
		/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\s*\)/
	);

	if ( rgbaMatch ) {
		const r = parseInt( rgbaMatch[ 1 ], 10 );
		const g = parseInt( rgbaMatch[ 2 ], 10 );
		const b = parseInt( rgbaMatch[ 3 ], 10 );
		const a = rgbaMatch[ 4 ] !== undefined ? parseFloat( rgbaMatch[ 4 ] ) : 1;
		const hex =
			'#' +
			[ r, g, b ]
				.map( ( v ) => v.toString( 16 ).padStart( 2, '0' ) )
				.join( '' );
		return { hex, alpha: a };
	}

	// Assume hex string.
	return { hex: color, alpha: 1 };
}

/**
 * Converts a hex color and alpha value to an `rgba()` CSS string.
 *
 * @param {string} hex   - Hex color string (`#rrggbb`).
 * @param {number} alpha - Opacity value between 0 and 1.
 * @returns {string}
 */
function hexToRgba( hex, alpha ) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
	if ( ! result ) return `rgba(0, 0, 0, ${ alpha })`;
	const r = parseInt( result[ 1 ], 16 );
	const g = parseInt( result[ 2 ], 16 );
	const b = parseInt( result[ 3 ], 16 );
	return `rgba(${ r }, ${ g }, ${ b }, ${ alpha })`;
}

/**
 * Free-form color input with spectrum canvas, hex text input,
 * and an optional opacity slider.
 *
 * Mirrors the WordPress `ColorPicker` component from `@wordpress/components`.
 *
 * @param {Object}   props
 * @param {string}   [props.color]        - Current color value (hex or rgba). Controlled.
 * @param {Function} [props.onChange]     - Callback fired with the new color string on change.
 * @param {boolean}  [props.enableAlpha]  - Show the opacity/alpha slider. Default false.
 * @param {string}   [props.defaultValue] - Fallback color used when `color` is empty.
 * @param {string}   [props.className]    - Additional CSS class names.
 */
export default function ColorPicker( {
	color,
	onChange,
	enableAlpha = false,
	defaultValue = '#000000',
	className = '',
} ) {
	const { hex, alpha } = parseColor( color || defaultValue );

	const emitChange = ( newHex, newAlpha ) => {
		if ( ! onChange ) return;
		if ( enableAlpha ) {
			onChange( hexToRgba( newHex, newAlpha ) );
		} else {
			onChange( newHex );
		}
	};

	const handleColorInput = ( event ) => {
		emitChange( event.target.value, alpha );
	};

	const handleAlphaInput = ( event ) => {
		emitChange( hex, parseFloat( event.target.value ) );
	};

	const handleTextInput = ( event ) => {
		if ( onChange ) onChange( event.target.value );
	};

	const displayValue = enableAlpha ? hexToRgba( hex, alpha ) : hex;

	return (
		<div className={ `color-picker${ className ? ` ${ className }` : '' }` }>
			{ /* Spectrum proxy — native color input styled as a large swatch */ }
			<label className="color-picker__spectrum" aria-label="Choose color">
				<input
					type="color"
					className="color-picker__native"
					value={ hex }
					onChange={ handleColorInput }
				/>
				<span
					className="color-picker__preview"
					style={ { backgroundColor: displayValue } }
					aria-hidden="true"
				/>
				<span className="color-picker__spectrum-label">Click to open picker</span>
			</label>

			{ enableAlpha && (
				<div className="color-picker__alpha">
					<label className="color-picker__alpha-label" htmlFor="color-picker-alpha">
						Opacity
					</label>
					<div className="color-picker__alpha-row">
						<input
							id="color-picker-alpha"
							type="range"
							className="color-picker__alpha-slider"
							min="0"
							max="1"
							step="0.01"
							value={ alpha }
							onChange={ handleAlphaInput }
							aria-label="Opacity"
						/>
						<span className="color-picker__alpha-value">
							{ Math.round( alpha * 100 ) }%
						</span>
					</div>
				</div>
			) }

			<div className="color-picker__input-row">
				<input
					type="text"
					className="color-picker__text-input"
					value={ displayValue }
					onChange={ handleTextInput }
					aria-label="Color code"
					spellCheck={ false }
				/>
			</div>
		</div>
	);
}
