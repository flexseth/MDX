/**
 * FontSizePicker — preset font size selector with optional custom value input.
 * Mirrors the @wordpress/components FontSizePicker API.
 *
 * @param {Object}   props
 * @param {Array}    [props.fontSizes]          - Array of { name, size, slug } preset options.
 * @param {number|string} [props.value]         - Current font size value (number in px, or CSS string).
 * @param {Function} [props.onChange]           - Called with the new size value (number or undefined).
 * @param {boolean}  [props.withSlider]         - Show a range slider in addition to buttons.
 * @param {boolean}  [props.withReset]          - Show a Reset button.
 * @param {boolean}  [props.disableCustomFontSizes] - Hide the custom size input.
 * @param {string}   [props.units]              - Unit label shown next to custom input (default "px").
 * @param {string}   [props.label]              - Visible label above the control.
 * @param {string}   [props.className]          - Extra class name.
 */
export default function FontSizePicker( {
	fontSizes = [],
	value,
	onChange,
	withSlider = false,
	withReset = false,
	disableCustomFontSizes = false,
	units = 'px',
	label,
	className = '',
} ) {
	const numericValue = typeof value === 'string' ? parseFloat( value ) : value;

	const defaultPresets = fontSizes.length
		? fontSizes
		: [
				{ name: 'Small', slug: 'small', size: 13 },
				{ name: 'Normal', slug: 'normal', size: 16 },
				{ name: 'Medium', slug: 'medium', size: 20 },
				{ name: 'Large', slug: 'large', size: 24 },
				{ name: 'X-Large', slug: 'x-large', size: 32 },
		  ];

	const minSize = Math.min( ...defaultPresets.map( ( f ) => f.size ) );
	const maxSize = Math.max( ...defaultPresets.map( ( f ) => f.size ) );

	function handlePresetClick( size ) {
		onChange?.( size === numericValue ? undefined : size );
	}

	function handleCustomChange( e ) {
		const parsed = parseFloat( e.target.value );
		onChange?.( isNaN( parsed ) ? undefined : parsed );
	}

	function handleSliderChange( e ) {
		onChange?.( Number( e.target.value ) );
	}

	function handleReset() {
		onChange?.( undefined );
	}

	const classes = [ 'font-size-picker', className ].filter( Boolean ).join( ' ' );

	return (
		<div className={ classes }>
			{ label && (
				<div className="font-size-picker__header">
					<span className="font-size-picker__label">{ label }</span>
					{ withReset && (
						<button
							type="button"
							className="font-size-picker__reset"
							onClick={ handleReset }
							aria-label="Reset font size"
						>
							Reset
						</button>
					) }
				</div>
			) }

			<div className="font-size-picker__presets" role="group" aria-label="Font size presets">
				{ defaultPresets.map( ( preset ) => {
					const isActive = numericValue === preset.size;
					return (
						<button
							key={ preset.slug }
							type="button"
							className={ `font-size-picker__preset${ isActive ? ' font-size-picker__preset--active' : '' }` }
							onClick={ () => handlePresetClick( preset.size ) }
							aria-pressed={ isActive }
							title={ `${ preset.name } — ${ preset.size }${ units }` }
						>
							{ preset.name }
						</button>
					);
				} ) }
			</div>

			{ withSlider && (
				<div className="font-size-picker__slider-wrapper">
					<input
						type="range"
						className="font-size-picker__slider"
						min={ minSize }
						max={ maxSize }
						step={ 1 }
						value={ numericValue ?? minSize }
						onChange={ handleSliderChange }
						aria-label="Font size slider"
					/>
					<span className="font-size-picker__slider-value">
						{ numericValue ?? '—' }{ numericValue ? units : '' }
					</span>
				</div>
			) }

			{ ! disableCustomFontSizes && (
				<div className="font-size-picker__custom">
					<label className="font-size-picker__custom-label" htmlFor="fsp-custom-input">
						Custom
					</label>
					<div className="font-size-picker__custom-input-wrapper">
						<input
							id="fsp-custom-input"
							type="number"
							className="font-size-picker__custom-input"
							value={ numericValue ?? '' }
							onChange={ handleCustomChange }
							placeholder="—"
							min={ 1 }
							aria-label="Custom font size"
						/>
						<span className="font-size-picker__unit">{ units }</span>
					</div>
				</div>
			) }
		</div>
	);
}
