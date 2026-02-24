/**
 * CSS flexbox layout helper component.
 *
 * Renders a flexbox container. Used with FlexItem and FlexBlock sub-components.
 * Mirrors the WordPress `Flex` component from `@wordpress/components`.
 *
 * @param {Object}   props
 * @param {string}   [props.direction]  - Flex direction: 'row' | 'column'. Default 'row'.
 * @param {string}   [props.justify]    - Justify content: 'flex-start' | 'center' | 'space-between' | etc.
 * @param {string}   [props.align]      - Align items: 'flex-start' | 'center' | 'flex-end' | etc.
 * @param {number}   [props.gap]        - Gap between items (grid units: 1 unit = 4px).
 * @param {string}   [props.className]  - Additional CSS class names.
 * @param {React.ReactNode} props.children - FlexItem, FlexBlock, or other elements.
 */
export default function Flex( {
	direction = 'row',
	justify,
	align,
	gap,
	className = '',
	children,
	style = {},
	...rest
} ) {
	const flexStyle = {
		display: 'flex',
		flexDirection: direction,
		justifyContent: justify,
		alignItems: align,
		gap: gap ? `${ gap * 4 }px` : undefined,
		...style,
	};

	return (
		<div className={ `flex${ className ? ` ${ className }` : '' }` } style={ flexStyle } { ...rest }>
			{ children }
		</div>
	);
}

/**
 * FlexItem: fixed-width item (flex: 0 0 auto).
 */
export function FlexItem( { children, className = '', style = {}, ...rest } ) {
	return (
		<div
			className={ `flex__item${ className ? ` ${ className }` : '' }` }
			style={ { flex: '0 0 auto', ...style } }
			{ ...rest }
		>
			{ children }
		</div>
	);
}

/**
 * FlexBlock: fills available space (flex: 1 1 auto).
 */
export function FlexBlock( { children, className = '', style = {}, ...rest } ) {
	return (
		<div
			className={ `flex__block${ className ? ` ${ className }` : '' }` }
			style={ { flex: '1 1 auto', ...style } }
			{ ...rest }
		>
			{ children }
		</div>
	);
}
