/**
 * Dropdown select component for choosing from predefined options.
 *
 * Mirrors the WordPress `SelectControl` component from `@wordpress/components`.
 *
 * @param {Object}   props
 * @param {string}   props.label      - Label text for the select.
 * @param {string}   props.value      - Currently selected value.
 * @param {Function} props.onChange   - Callback fired with the new string value.
 * @param {Array}    [props.options]  - Array of `{ label, value }` option objects.
 * @param {string}   [props.help]     - Optional help text displayed below the select.
 * @param {boolean}  [props.disabled] - Whether the select is disabled.
 * @param {string}   [props.className] - Additional CSS class names.
 * @param {React.ReactNode} [props.children] - Advanced: optgroup children (replaces options).
 */
export default function SelectControl( {
	label,
	value,
	onChange,
	options,
	help,
	disabled = false,
	className = '',
	children,
} ) {
	const id = `select-${ label?.toLowerCase().replace( /\s+/g, '-' ) }`;

	const handleChange = ( event ) => {
		if ( ! disabled && onChange ) {
			onChange( event.target.value );
		}
	};

	return (
		<div className={ `select-control${ className ? ` ${ className }` : '' }${ disabled ? ' select-control--disabled' : '' }` }>
			<label className="select-control__label" htmlFor={ id }>
				{ label }
			</label>
			<select
				id={ id }
				className="select-control__select"
				value={ value }
				onChange={ handleChange }
				disabled={ disabled }
				aria-describedby={ help ? `${ id }-help` : undefined }
			>
				{ children ?? options?.map( ( option ) => (
					<option key={ option.value } value={ option.value }>
						{ option.label }
					</option>
				) ) }
			</select>
			{ help && (
				<p id={ `${ id }-help` } className="select-control__help">
					{ help }
				</p>
			) }
		</div>
	);
}
