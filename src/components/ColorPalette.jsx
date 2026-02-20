/**
 * Color swatch grid for selecting from a predefined palette.
 *
 * Mirrors the WordPress `ColorPalette` component from `@wordpress/components`.
 *
 * @param {Object}    props
 * @param {Array}     props.colors                - Array of `{ name, color }` objects.
 * @param {string}    [props.value]               - Currently selected color value.
 * @param {Function}  [props.onChange]            - Callback fired with the new color string on change.
 * @param {boolean}   [props.disableCustomColors] - Hide the custom color input. Default false.
 * @param {boolean}   [props.clearable]           - Show a clear/reset button. Default true.
 * @param {string}    [props.className]           - Additional CSS class names.
 */
export default function ColorPalette( {
	colors = [],
	value,
	onChange,
	disableCustomColors = false,
	clearable = true,
	className = '',
} ) {
	const handleSwatchClick = ( color ) => {
		if ( onChange ) {
			onChange( color );
		}
	};

	const handleClear = () => {
		if ( onChange ) {
			onChange( undefined );
		}
	};

	const handleCustomChange = ( event ) => {
		if ( onChange ) {
			onChange( event.target.value );
		}
	};

	return (
		<div className={ `color-palette${ className ? ` ${ className }` : '' }` }>
			<div className="color-palette__swatches" role="listbox" aria-label="Color palette">
				{ colors.map( ( { name, color } ) => {
					const isSelected = value === color;
					return (
						<button
							key={ color }
							type="button"
							role="option"
							aria-selected={ isSelected }
							aria-label={ name }
							title={ name }
							className={ `color-palette__swatch${ isSelected ? ' color-palette__swatch--selected' : '' }` }
							style={ { backgroundColor: color } }
							onClick={ () => handleSwatchClick( color ) }
						/>
					);
				} ) }
			</div>

			{ ( clearable || ! disableCustomColors ) && (
				<div className="color-palette__actions">
					{ ! disableCustomColors && (
						<label className="color-palette__custom">
							<span className="color-palette__custom-label">Custom color</span>
							<input
								type="color"
								className="color-palette__custom-input"
								value={ value || '#000000' }
								onChange={ handleCustomChange }
								aria-label="Choose a custom color"
							/>
						</label>
					) }
					{ clearable && value && (
						<button
							type="button"
							className="color-palette__clear"
							onClick={ handleClear }
							aria-label="Clear selected color"
						>
							Clear
						</button>
					) }
				</div>
			) }

			{ value && (
				<p className="color-palette__current">
					Selected: <span
						className="color-palette__current-swatch"
						style={ { backgroundColor: value } }
						aria-hidden="true"
					/>
					<code>{ value }</code>
				</p>
			) }
		</div>
	);
}
