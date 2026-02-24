import { useState } from 'react';

/**
 * Font size selector with preset buttons and an optional custom value input.
 *
 * Mirrors the WordPress `FontSizePicker` component from `@wordpress/components`.
 *
 * @param {Object}   props
 * @param {Array}    [props.fontSizes]              - Array of `{ name, slug, size }` preset objects.
 * @param {number}   [props.value]                 - Current font size value in pixels. Controlled.
 * @param {Function} [props.onChange]              - Callback fired with the new numeric size, or `undefined` when reset.
 * @param {boolean}  [props.disableCustomFontSizes] - Hides the custom size input; only presets shown. Default false.
 * @param {boolean}  [props.withSlider]            - Shows a range slider alongside the custom input. Default false.
 * @param {string}   [props.className]             - Additional CSS class names.
 */
export default function FontSizePicker( {
	fontSizes = [],
	value,
	onChange,
	disableCustomFontSizes = false,
	withSlider = false,
	className = '',
} ) {
	const [ customInputValue, setCustomInputValue ] = useState( '' );

	const activePreset = fontSizes.find( ( f ) => f.size === value );
	const isCustom = value !== undefined && ! activePreset;

	const handlePresetClick = ( size ) => {
		if ( onChange ) onChange( size );
	};

	const handleCustomChange = ( event ) => {
		const raw = event.target.value;
		setCustomInputValue( raw );
		const parsed = parseFloat( raw );
		if ( ! isNaN( parsed ) && onChange ) {
			onChange( parsed );
		}
	};

	const handleSliderChange = ( event ) => {
		const parsed = Number( event.target.value );
		setCustomInputValue( String( parsed ) );
		if ( onChange ) onChange( parsed );
	};

	const handleReset = () => {
		setCustomInputValue( '' );
		if ( onChange ) onChange( undefined );
	};

	// Determine the displayed value in the custom input.
	const displayedCustomValue = isCustom ? ( customInputValue !== '' ? customInputValue : String( value ) ) : customInputValue;

	return (
		<div className={ `font-size-picker${ className ? ` ${ className }` : '' }` }>
			<div className="font-size-picker__header">
				<span className="font-size-picker__label">Font size</span>
				{ value !== undefined && (
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

			{ fontSizes.length > 0 && (
				<div className="font-size-picker__presets" role="group" aria-label="Preset font sizes">
					{ fontSizes.map( ( preset ) => (
						<button
							key={ preset.slug }
							type="button"
							className={ [
								'font-size-picker__preset-btn',
								value === preset.size ? 'font-size-picker__preset-btn--active' : '',
							]
								.filter( Boolean )
								.join( ' ' ) }
							onClick={ () => handlePresetClick( preset.size ) }
							aria-pressed={ value === preset.size }
							aria-label={ `${ preset.name } (${ preset.size }px)` }
							title={ `${ preset.name } — ${ preset.size }px` }
						>
							{ preset.name }
						</button>
					) ) }
				</div>
			) }

			{ ! disableCustomFontSizes && (
				<div className="font-size-picker__custom">
					<label className="font-size-picker__custom-label" htmlFor="font-size-picker-custom">
						Custom size (px)
					</label>
					<input
						id="font-size-picker-custom"
						type="number"
						className="font-size-picker__custom-input"
						value={ displayedCustomValue }
						placeholder="—"
						min={ 1 }
						onChange={ handleCustomChange }
						aria-label="Custom font size in pixels"
					/>
					{ withSlider && (
						<input
							type="range"
							className="font-size-picker__slider"
							value={ value ?? 16 }
							min={ 1 }
							max={ 100 }
							step={ 1 }
							onChange={ handleSliderChange }
							aria-label="Font size slider"
						/>
					) }
				</div>
			) }
		</div>
	);
}
