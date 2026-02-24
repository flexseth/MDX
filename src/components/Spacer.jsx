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
		style.marginTop = `${ marginY * 4 }px`;
		style.marginBottom = `${ marginY * 4 }px`;
	}
	if ( marginX !== undefined ) {
		style.marginLeft = `${ marginX * 4 }px`;
		style.marginRight = `${ marginX * 4 }px`;
	}
	if ( marginTop !== undefined ) {
		style.marginTop = `${ marginTop * 4 }px`;
	}
	if ( marginBottom !== undefined ) {
		style.marginBottom = `${ marginBottom * 4 }px`;
	}
	if ( marginLeft !== undefined ) {
		style.marginLeft = `${ marginLeft * 4 }px`;
	}
	if ( marginRight !== undefined ) {
		style.marginRight = `${ marginRight * 4 }px`;
	}

	return (
		<div className={ `spacer${ className ? ` ${ className }` : '' }` } style={ style } { ...rest } />
	);
}
