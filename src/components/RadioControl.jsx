/**
 * Radio button group component for selecting a single option from a set.
 *
 * Mirrors the WordPress `RadioControl` component from `@wordpress/components`.
 * Renders a `<fieldset>` with a `<legend>` for proper accessibility semantics.
 *
 * @param {Object}           props
 * @param {string}           props.label              - Group label displayed above the radio buttons.
 * @param {string}           props.selected            - Value of the currently selected option.
 * @param {Array}            props.options             - Array of `{ label, value }` objects.
 * @param {Function}         props.onChange            - Callback receiving the newly selected value string.
 * @param {string|ReactNode} [props.help]              - Descriptive text displayed below the group.
 * @param {boolean}          [props.disabled]          - Disables all radio buttons when true.
 * @param {string}           [props.className]         - Additional CSS class names on the wrapper.
 * @param {boolean}          [props.hideLabelFromVision] - Visually hides the legend (still read by screen readers).
 */
export default function RadioControl( {
	label,
	selected,
	options = [],
	onChange,
	help,
	disabled = false,
	className = '',
	hideLabelFromVision = false,
} ) {
	const groupName = `radio-${ label?.toLowerCase().replace( /\s+/g, '-' ) }`;
	const helpId = `${ groupName }-help`;

	const handleChange = ( event ) => {
		if ( ! disabled && onChange ) {
			onChange( event.target.value );
		}
	};

	const wrapperClass = [
		'radio-control',
		disabled ? 'radio-control--disabled' : '',
		className,
	]
		.filter( Boolean )
		.join( ' ' );

	const legendClass = [
		'radio-control__label',
		hideLabelFromVision ? 'radio-control__label--hidden' : '',
	]
		.filter( Boolean )
		.join( ' ' );

	return (
		<fieldset
			className={ wrapperClass }
			aria-describedby={ help ? helpId : undefined }
		>
			<legend className={ legendClass }>{ label }</legend>

			{ options.map( ( option ) => {
				const optionId = `${ groupName }-${ option.value }`;
				return (
					<div key={ option.value } className="radio-control__option">
						<input
							id={ optionId }
							type="radio"
							className="radio-control__input"
							name={ groupName }
							value={ option.value }
							checked={ selected === option.value }
							onChange={ handleChange }
							disabled={ disabled }
						/>
						<label htmlFor={ optionId } className="radio-control__option-label">
							{ option.label }
						</label>
					</div>
				);
			} ) }

			{ help && (
				<p id={ helpId } className="radio-control__help">
					{ help }
				</p>
			) }
		</fieldset>
	);
}
