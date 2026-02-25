import React from 'react';

/**
 * Modern radio-style group of toggle buttons for selecting a single option.
 *
 * Preferred over RadioControl in WP 6.x+ blocks.
 * Mirrors the WordPress `ToggleGroupControl` component from `@wordpress/components`.
 *
 * @param {Object}   props
 * @param {string}   props.label     - Label text for the control group.
 * @param {string}   props.value     - Currently selected value.
 * @param {Function} props.onChange  - Callback fired with the new selected value.
 * @param {boolean}  [props.isBlock] - Whether to render as block (full width).
 * @param {string}   [props.help]    - Optional help text.
 * @param {string}   [props.className] - Additional CSS class names.
 * @param {React.ReactNode} props.children - ToggleGroupControlOption components.
 */
export default function ToggleGroupControl( {
	label,
	value,
	onChange,
	isBlock = false,
	help,
	className = '',
	children,
	...rest
} ) {
	const id = `toggle-group-${ label?.toLowerCase().replace( /\s+/g, '-' ) }`;

	const clonedChildren = React.Children.map( children, ( child ) => {
		if ( ! React.isValidElement( child ) ) return child;
		return React.cloneElement( child, { selectedValue: value, onChange } );
	} );

	return (
		<div className={ `toggle-group-control${ isBlock ? ' toggle-group-control--block' : '' }${ className ? ` ${ className }` : '' }` } { ...rest }>
			<label className="toggle-group-control__label" id={ `${ id }-label` }>
				{ label }
			</label>
			<div
				className="toggle-group-control__group"
				role="radiogroup"
				aria-labelledby={ `${ id }-label` }
			>
				{ clonedChildren }
			</div>
			{ help && (
				<p id={ `${ id }-help` } className="toggle-group-control__help">
					{ help }
				</p>
			) }
		</div>
	);
}

/**
 * Text-based toggle option.
 */
export function ToggleGroupControlOption( {
	value,
	label,
	selectedValue,
	onChange,
	...rest
} ) {
	const handleClick = () => {
		if ( onChange ) {
			onChange( value );
		}
	};

	const isSelected = value === selectedValue;

	return (
		<button
			type="button"
			className={ `toggle-group-control__option${ isSelected ? ' toggle-group-control__option--selected' : '' }` }
			role="radio"
			aria-checked={ isSelected }
			onClick={ handleClick }
		>
			{ label }
		</button>
	);
}

/**
 * Icon-based toggle option.
 */
export function ToggleGroupControlOptionIcon( {
	value,
	icon,
	label,
	...rest
} ) {
	const { value: selectedValue, onChange } = rest;

	const handleClick = () => {
		if ( onChange ) {
			onChange( value );
		}
	};

	const isSelected = value === selectedValue;

	return (
		<button
			type="button"
			className={ `toggle-group-control__option toggle-group-control__option--icon${ isSelected ? ' toggle-group-control__option--selected' : '' }` }
			role="radio"
			aria-checked={ isSelected }
			aria-label={ label }
			onClick={ handleClick }
			title={ label }
		>
			{ icon }
		</button>
	);
}
