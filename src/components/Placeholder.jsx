/**
 * Empty-state UI container for blocks that have not been configured yet.
 *
 * Displays an icon slot, a label, optional instructions text, and an action
 * area for buttons or form inputs. Mirrors the standard WordPress Placeholder
 * pattern used by Image, Video, Cover, and Embed core blocks.
 *
 * Mirrors the WordPress `Placeholder` component from `@wordpress/components`.
 *
 * @param {Object}          props
 * @param {string}          [props.label]        - Block name or placeholder title.
 * @param {string}          [props.instructions] - Brief guidance text shown below the label.
 * @param {React.ReactNode} [props.icon]         - Icon node displayed in the placeholder header.
 * @param {boolean}         [props.isColumnLayout] - Stack children vertically instead of in a row.
 * @param {string}          [props.className]    - Additional CSS class names.
 * @param {React.ReactNode} [props.children]     - Action buttons, inputs, or other interactive elements.
 */
export default function Placeholder( {
	label,
	instructions,
	icon,
	isColumnLayout = false,
	className = '',
	children,
	...rest
} ) {
	const wrapperClass = [
		'placeholder',
		className,
	].filter( Boolean ).join( ' ' );

	const fieldsetClass = [
		'placeholder__fieldset',
		isColumnLayout ? 'placeholder__fieldset--column' : '',
	].filter( Boolean ).join( ' ' );

	return (
		<div className={ wrapperClass } { ...rest }>
			<div className="placeholder__label-row">
				{ icon && (
					<span className="placeholder__icon" aria-hidden="true">
						{ icon }
					</span>
				) }
				{ label && (
					<strong className="placeholder__label">{ label }</strong>
				) }
			</div>
			{ instructions && (
				<p className="placeholder__instructions">{ instructions }</p>
			) }
			{ children && (
				<div className={ fieldsetClass }>
					{ children }
				</div>
			) }
		</div>
	);
}
