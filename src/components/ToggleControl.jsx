import { useState } from 'react';

/**
 * Toggle switch component for boolean on/off settings.
 *
 * Mirrors the WordPress `ToggleControl` component from `@wordpress/components`.
 *
 * @param {Object}   props
 * @param {string}   props.label      - Label text for the toggle.
 * @param {boolean}  props.checked    - Controlled checked state.
 * @param {Function} props.onChange   - Callback fired with the new boolean value.
 * @param {string}   [props.help]     - Optional help text displayed below the toggle.
 * @param {boolean}  [props.disabled] - Whether the toggle is disabled.
 * @param {string}   [props.className] - Additional CSS class names.
 */
export default function ToggleControl( {
	label,
	checked,
	onChange,
	help,
	disabled = false,
	className = '',
} ) {
	const id = `toggle-${ label?.toLowerCase().replace( /\s+/g, '-' ) }`;

	const handleChange = ( event ) => {
		if ( ! disabled && onChange ) {
			onChange( event.target.checked );
		}
	};

	return (
		<div className={ `toggle-control${ className ? ` ${ className }` : '' }${ disabled ? ' toggle-control--disabled' : '' }` }>
			<label className="toggle-control__label" htmlFor={ id }>
				<span className="toggle-control__text">{ label }</span>
				<span className="toggle-control__switch">
					<input
						id={ id }
						type="checkbox"
						className="toggle-control__input"
						checked={ !! checked }
						onChange={ handleChange }
						disabled={ disabled }
						aria-describedby={ help ? `${ id }-help` : undefined }
					/>
					<span className="toggle-control__track" aria-hidden="true" />
				</span>
			</label>
			{ help && (
				<p id={ `${ id }-help` } className="toggle-control__help">
					{ help }
				</p>
			) }
		</div>
	);
}
