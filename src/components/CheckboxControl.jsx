import { useRef, useEffect } from 'react';

/**
 * Checkbox input component for boolean and multi-select settings.
 *
 * Mirrors the WordPress `CheckboxControl` component from `@wordpress/components`.
 * Supports an `indeterminate` state for parent/child checkbox hierarchies.
 *
 * @param {Object}          props
 * @param {string}          props.label           - Label text for the checkbox.
 * @param {boolean}         props.checked         - Controlled checked state.
 * @param {Function}        props.onChange        - Callback fired with the new boolean value on change.
 * @param {string|ReactNode} [props.help]         - Optional help text displayed below the checkbox.
 * @param {boolean}         [props.indeterminate] - Sets the indeterminate (mixed) state. Cannot be set via HTML attribute; requires a ref.
 * @param {boolean}         [props.disabled]      - Whether the checkbox is disabled.
 * @param {string}          [props.className]     - Additional CSS class names.
 * @param {string}          [props.id]            - HTML id attribute; auto-generated from label if omitted.
 */
export default function CheckboxControl( {
	label,
	checked,
	onChange,
	help,
	indeterminate = false,
	disabled = false,
	className = '',
	id: idProp,
	...rest
} ) {
	const inputRef = useRef( null );
	const id = idProp || `checkbox-${ label?.toLowerCase().replace( /\s+/g, '-' ) }`;

	// The `indeterminate` property cannot be set via a JSX attribute — it must be
	// applied directly to the DOM node after render.
	useEffect( () => {
		if ( inputRef.current ) {
			inputRef.current.indeterminate = indeterminate;
		}
	}, [ indeterminate ] );

	const handleChange = ( event ) => {
		if ( ! disabled && onChange ) {
			onChange( event.target.checked );
		}
	};

	const wrapperClass = [
		'checkbox-control',
		disabled ? 'checkbox-control--disabled' : '',
		className,
	]
		.filter( Boolean )
		.join( ' ' );

	return (
		<div className={ wrapperClass }>
			<label className="checkbox-control__label" htmlFor={ id }>
				<input
					ref={ inputRef }
					id={ id }
					type="checkbox"
					className="checkbox-control__input"
					checked={ !! checked }
					onChange={ handleChange }
					disabled={ disabled }
					aria-checked={ indeterminate ? 'mixed' : undefined }
					aria-describedby={ help ? `${ id }-help` : undefined }
					{ ...rest }
				/>
				<span className="checkbox-control__text">{ label }</span>
			</label>
			{ help && (
				<p id={ `${ id }-help` } className="checkbox-control__help">
					{ help }
				</p>
			) }
		</div>
	);
}
