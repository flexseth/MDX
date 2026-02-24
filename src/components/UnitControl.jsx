/**
 * Numeric input paired with a unit selector for CSS dimension values.
 *
 * Mirrors the WordPress `UnitControl` component from `@wordpress/components`.
 * Stores values as strings with units (e.g. '16px', '1.5rem') to match how
 * WordPress block attributes store CSS dimension values.
 *
 * @param {Object}           props
 * @param {string}           props.label     - Visible label displayed above the control.
 * @param {string}           props.value     - Current value including unit (e.g. '16px', '1.5rem').
 * @param {Function}         props.onChange  - Callback receiving the new string value with unit.
 * @param {Array}            [props.units]   - Array of unit strings. Default ['px','em','rem','%'].
 * @param {number}           [props.min]     - Minimum allowed numeric value.
 * @param {number}           [props.max]     - Maximum allowed numeric value.
 * @param {number}           [props.step]    - Step increment. Default 1.
 * @param {string|ReactNode} [props.help]    - Help text displayed below the control.
 * @param {boolean}          [props.disabled] - Disables the control when true.
 * @param {string}           [props.className] - Additional CSS class names.
 */
export default function UnitControl( {
	label,
	value = '',
	onChange,
	units = [ 'px', 'em', 'rem', '%' ],
	min,
	max,
	step = 1,
	help,
	disabled = false,
	className = '',
} ) {
	const id = `unit-${ label?.toLowerCase().replace( /\s+/g, '-' ) }`;
	const helpId = `${ id }-help`;

	// Parse the numeric portion and current unit from the composite value string.
	const parseValue = ( val ) => {
		if ( ! val ) return { number: '', unit: units[ 0 ] || 'px' };
		const match = String( val ).match( /^([\d.]*)(.*)$/ );
		if ( ! match ) return { number: '', unit: units[ 0 ] || 'px' };
		const parsedUnit = match[ 2 ] || units[ 0 ] || 'px';
		// Fall back to first available unit if stored unit is not in the list.
		const resolvedUnit = units.includes( parsedUnit ) ? parsedUnit : ( units[ 0 ] || 'px' );
		return { number: match[ 1 ], unit: resolvedUnit };
	};

	const { number, unit } = parseValue( value );

	const handleNumberChange = ( event ) => {
		if ( disabled || ! onChange ) return;
		onChange( `${ event.target.value }${ unit }` );
	};

	const handleUnitChange = ( event ) => {
		if ( disabled || ! onChange ) return;
		onChange( `${ number }${ event.target.value }` );
	};

	const wrapperClass = [
		'unit-control',
		disabled ? 'unit-control--disabled' : '',
		className,
	]
		.filter( Boolean )
		.join( ' ' );

	return (
		<div className={ wrapperClass }>
			<label className="unit-control__label" htmlFor={ id }>
				{ label }
			</label>
			<div className="unit-control__input-row">
				<input
					id={ id }
					type="number"
					className="unit-control__number"
					value={ number }
					min={ min }
					max={ max }
					step={ step }
					disabled={ disabled }
					onChange={ handleNumberChange }
					aria-describedby={ help ? helpId : undefined }
				/>
				<select
					className="unit-control__unit"
					value={ unit }
					disabled={ disabled }
					onChange={ handleUnitChange }
					aria-label={ `Unit for ${ label }` }
				>
					{ units.map( ( u ) => (
						<option key={ u } value={ u }>
							{ u }
						</option>
					) ) }
				</select>
			</div>
			{ help && (
				<p id={ helpId } className="unit-control__help">
					{ help }
				</p>
			) }
		</div>
	);
}
