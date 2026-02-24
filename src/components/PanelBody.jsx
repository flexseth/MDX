import { useState } from 'react';

/**
 * Collapsible panel section with a clickable title header.
 *
 * Used to group related settings in the block inspector sidebar. Manages
 * its own open/closed state internally, seeded from `initialOpen`.
 *
 * Mirrors the WordPress `PanelBody` component from `@wordpress/components`.
 *
 * @param {Object}          props
 * @param {string}          [props.title]       - Panel header text.
 * @param {boolean}         [props.initialOpen] - Whether the panel starts open. Default true.
 * @param {string}          [props.className]   - Additional CSS class names.
 * @param {React.ReactNode} [props.children]    - Panel body content.
 */
export default function PanelBody( {
	title,
	initialOpen = true,
	className = '',
	children,
	...rest
} ) {
	const [ isOpen, setIsOpen ] = useState( initialOpen );

	const wrapperClass = [
		'panel-body',
		isOpen ? 'panel-body--open' : 'panel-body--closed',
		className,
	].filter( Boolean ).join( ' ' );

	return (
		<div className={ wrapperClass } { ...rest }>
			{ title && (
				<button
					type="button"
					className="panel-body__header"
					onClick={ () => setIsOpen( ( prev ) => ! prev ) }
					aria-expanded={ isOpen }
				>
					<span className="panel-body__title">{ title }</span>
					<span className="panel-body__toggle" aria-hidden="true">
						{ isOpen ? '▲' : '▼' }
					</span>
				</button>
			) }
			{ isOpen && (
				<div className="panel-body__content">
					{ children }
				</div>
			) }
		</div>
	);
}
