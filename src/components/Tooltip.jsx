/**
 * Hover-triggered tooltip wrapper.
 *
 * Wraps any child element and shows a small bubble with descriptive text when
 * the user hovers or focuses the wrapped element. Uses pure CSS :hover so there
 * is no JavaScript state required for the open/close mechanic.
 *
 * Mirrors the WordPress `Tooltip` component from `@wordpress/components`.
 *
 * @param {Object}          props
 * @param {string}          props.text        - Tooltip content displayed in the bubble (required).
 * @param {string}          [props.position]  - Bubble placement: 'top' | 'bottom' | 'left' | 'right'. Default 'top'.
 * @param {string}          [props.className] - Additional CSS class names on the wrapper element.
 * @param {React.ReactNode} props.children    - The trigger element wrapped by the tooltip.
 */
export default function Tooltip( {
	text,
	position = 'top',
	className = '',
	children,
	...rest
} ) {
	const wrapperClass = [
		'tooltip',
		`tooltip--${ position }`,
		className,
	].filter( Boolean ).join( ' ' );

	return (
		<span className={ wrapperClass } { ...rest }>
			{ children }
			<span className="tooltip__bubble" role="tooltip">
				{ text }
			</span>
		</span>
	);
}
