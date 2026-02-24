/**
 * Flexible spacing utility for controlled gaps between elements.
 *
 * Adds consistent vertical or horizontal spacing using the WordPress grid-unit system (1 unit = 4px).
 * Mirrors the WordPress `Spacer` component from `@wordpress/components`.
 *
 * @param {Object} props
 * @param {number} [props.marginY]      - Vertical margin (top + bottom) in grid units.
 * @param {number} [props.marginX]      - Horizontal margin (left + right) in grid units.
 * @param {number} [props.marginTop]    - Top margin in grid units.
 * @param {number} [props.marginBottom] - Bottom margin in grid units.
 * @param {number} [props.marginLeft]   - Left margin in grid units.
 * @param {number} [props.marginRight]  - Right margin in grid units.
 * @param {string} [props.className]    - Additional CSS class names.
 */
export default function Spacer( {
	marginY,
	marginX,
	marginTop,
	marginBottom,
	marginLeft,
	marginRight,
	className = '',
	...rest
} ) {
	const style = {};

	if ( marginY !== undefined ) {
		style.paddingTop = `${ marginY * 4 }px`;
		style.paddingBottom = `${ marginY * 4 }px`;
	}
	if ( marginX !== undefined ) {
		style.paddingLeft = `${ marginX * 4 }px`;
		style.paddingRight = `${ marginX * 4 }px`;
	}
	if ( marginTop !== undefined ) {
		style.paddingTop = `${ marginTop * 4 }px`;
	}
	if ( marginBottom !== undefined ) {
		style.paddingBottom = `${ marginBottom * 4 }px`;
	}
	if ( marginLeft !== undefined ) {
		style.paddingLeft = `${ marginLeft * 4 }px`;
	}
	if ( marginRight !== undefined ) {
		style.paddingRight = `${ marginRight * 4 }px`;
	}

	return (
		<div className={ `spacer${ className ? ` ${ className }` : '' }` } style={ style } { ...rest } />
	);
}
