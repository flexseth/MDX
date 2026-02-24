/**
 * Animated loading indicator for async operations.
 *
 * Mirrors the WordPress `Spinner` component from `@wordpress/components`.
 * Always control visibility externally with a state variable — never render
 * unconditionally. The spinner itself is decorative; pair with a visually
 * hidden loading message for screen reader users.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS class names.
 */
export default function Spinner( { className = '' } ) {
	const wrapperClass = [
		'spinner',
		className,
	]
		.filter( Boolean )
		.join( ' ' );

	return (
		<div className={ wrapperClass } role="presentation" aria-hidden="true">
			<div className="spinner__icon" />
		</div>
	);
}
