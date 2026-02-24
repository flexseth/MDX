/**
 * Multi-line text input component for longer content.
 *
 * Mirrors the WordPress `TextareaControl` component from `@wordpress/components`.
 * Use for custom CSS, excerpts, captions, descriptions, or any content requiring
 * more than one line of input.
 *
 * @param {Object}           props
 * @param {string}           props.label              - Visible label displayed above the textarea.
 * @param {string}           props.value              - Controlled value of the textarea.
 * @param {Function}         props.onChange            - Callback fired with the updated string value on change.
 * @param {number}           [props.rows]              - Number of visible text rows. Default 4.
 * @param {string}           [props.placeholder]       - Placeholder text shown when the textarea is empty.
 * @param {string|ReactNode} [props.help]              - Help text displayed below the textarea.
 * @param {boolean}          [props.disabled]          - Disables the textarea when true.
 * @param {string}           [props.className]         - Additional CSS class names.
 * @param {boolean}          [props.hideLabelFromVision] - Visually hides the label (still accessible).
 * @param {string}           [props.id]               - HTML id; auto-generated from label if omitted.
 */
export default function TextareaControl( {
	label,
	value,
	onChange,
	rows = 4,
	placeholder,
	help,
	disabled = false,
	className = '',
	hideLabelFromVision = false,
	id: idProp,
	...rest
} ) {
	const id = idProp || `textarea-${ label?.toLowerCase().replace( /\s+/g, '-' ) }`;

	const handleChange = ( event ) => {
		if ( ! disabled && onChange ) {
			onChange( event.target.value );
		}
	};

	const wrapperClass = [
		'textarea-control',
		disabled ? 'textarea-control--disabled' : '',
		className,
	]
		.filter( Boolean )
		.join( ' ' );

	const labelClass = [
		'textarea-control__label',
		hideLabelFromVision ? 'textarea-control__label--hidden' : '',
	]
		.filter( Boolean )
		.join( ' ' );

	return (
		<div className={ wrapperClass }>
			<label className={ labelClass } htmlFor={ id }>
				{ label }
			</label>
			<textarea
				id={ id }
				className="textarea-control__textarea"
				value={ value }
				rows={ rows }
				placeholder={ placeholder }
				disabled={ disabled }
				onChange={ handleChange }
				aria-describedby={ help ? `${ id }-help` : undefined }
				{ ...rest }
			/>
			{ help && (
				<p id={ `${ id }-help` } className="textarea-control__help">
					{ help }
				</p>
			) }
		</div>
	);
}
