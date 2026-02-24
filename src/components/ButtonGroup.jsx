/**
 * Groups related buttons visually into a single cohesive unit.
 *
 * Removed borders between buttons to create a connected row.
 * Mirrors the WordPress `ButtonGroup` component from `@wordpress/components`.
 *
 * @param {Object}   props
 * @param {string}   [props.className] - Additional CSS class names.
 * @param {React.ReactNode} props.children - Button components to group.
 */
export default function ButtonGroup( {
	className = '',
	children,
	...rest
} ) {
	return (
		<div className={ `button-group${ className ? ` ${ className }` : '' }` } role="group" { ...rest }>
			{ children }
		</div>
	);
}
