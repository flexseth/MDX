/**
 * Foundational wrapper for custom form controls.
 *
 * Provides label, help text, and proper accessibility wiring (htmlFor/id association).
 * Mirrors the WordPress `BaseControl` component from `@wordpress/components`.
 *
 * @param {Object}   props
 * @param {string}   props.id          - ID for the control (used for htmlFor association).
 * @param {string}   props.label       - Label text for the control.
 * @param {string}   [props.help]      - Optional help text displayed below the control.
 * @param {string}   [props.className] - Additional CSS class names.
 * @param {React.ReactNode} props.children - The form control input element(s).
 */
export default function BaseControl( {
	id,
	label,
	help,
	className = '',
	children,
	...rest
} ) {
	const baseId = id || `base-control-${ label?.toLowerCase().replace( /\s+/g, '-' ) }`;

	return (
		<div className={ `base-control${ className ? ` ${ className }` : '' }` } { ...rest }>
			{ label && (
				<label className="base-control__label" htmlFor={ baseId }>
					{ label }
				</label>
			) }
			<div className="base-control__field">
				{ children }
			</div>
			{ help && (
				<p id={ `${ baseId }-help` } className="base-control__help">
					{ help }
				</p>
			) }
		</div>
	);
}
