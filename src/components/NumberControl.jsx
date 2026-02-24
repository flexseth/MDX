/**
 * Numeric text input with increment/decrement spin buttons.
 *
 * Distinct from RangeControl (slider) — use when you need direct numeric entry.
 * Mirrors the WordPress `NumberControl` component from `@wordpress/components`.
 *
 * @param {Object}   props
 * @param {string}   props.label          - Label text for the input.
 * @param {number}   props.value          - Current numeric value (controlled).
 * @param {Function} props.onChange       - Callback fired with the new number on change.
 * @param {number}   [props.min]          - Minimum allowed value.
 * @param {number}   [props.max]          - Maximum allowed value.
 * @param {number}   [props.step]         - Step increment for spin buttons.
 * @param {string}   [props.help]         - Optional help text displayed below the input.
 * @param {string}   [props.spinControls] - 'custom' | 'none' | 'native'. Default 'custom'.
 * @param {boolean}  [props.disabled]     - Whether the input is disabled.
 * @param {string}   [props.className]    - Additional CSS class names.
 */
export default function NumberControl( {
	label,
	value,
	onChange,
	min,
	max,
	step = 1,
	help,
	spinControls = 'custom',
	disabled = false,
	className = '',
	...rest
} ) {
	const id = `number-${ label?.toLowerCase().replace( /\s+/g, '-' ) }`;

	const handleChange = ( event ) => {
		if ( ! disabled && onChange ) {
			const newValue = parseFloat( event.target.value );
			onChange( isNaN( newValue ) ? event.target.value : newValue );
		}
	};

	const increment = () => {
		if ( disabled || ! onChange ) return;
		const newValue = ( value || 0 ) + step;
		if ( max === undefined || newValue <= max ) {
			onChange( newValue );
		}
	};

	const decrement = () => {
		if ( disabled || ! onChange ) return;
		const newValue = ( value || 0 ) - step;
		if ( min === undefined || newValue >= min ) {
			onChange( newValue );
		}
	};

	return (
		<div className={ `number-control${ className ? ` ${ className }` : '' }${ disabled ? ' number-control--disabled' : '' }` }>
			<label className="number-control__label" htmlFor={ id }>
				{ label }
			</label>
			<div className="number-control__input-wrapper">
				<input
					id={ id }
					type="number"
					className="number-control__input"
					value={ value ?? '' }
					onChange={ handleChange }
					min={ min }
					max={ max }
					step={ step }
					disabled={ disabled }
					aria-describedby={ help ? `${ id }-help` : undefined }
					{ ...rest }
				/>
				{ spinControls === 'custom' && (
					<div className="number-control__spin-buttons">
						<button
							type="button"
							className="number-control__spin-button number-control__spin-button--up"
							onClick={ increment }
							disabled={ disabled || ( max !== undefined && value >= max ) }
							aria-label="Increment"
						>
							▲
						</button>
						<button
							type="button"
							className="number-control__spin-button number-control__spin-button--down"
							onClick={ decrement }
							disabled={ disabled || ( min !== undefined && value <= min ) }
							aria-label="Decrement"
						>
							▼
						</button>
					</div>
				) }
			</div>
			{ help && (
				<p id={ `${ id }-help` } className="number-control__help">
					{ help }
				</p>
			) }
		</div>
	);
}
