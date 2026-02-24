/**
 * Simulates the WordPress BlockControls slot for documentation purposes.
 *
 * In a real block, `BlockControls` from `@wordpress/block-editor` renders its
 * children into the block toolbar via WordPress's slot/fill mechanism — it does
 * not render a visible wrapper itself. This docs component renders a styled
 * toolbar preview so examples are visible outside the block editor.
 *
 * @param {Object}          props
 * @param {string}          [props.group]     - Slot group: 'default' | 'block' | 'inline' | 'other' | 'parent'. Default 'default'.
 * @param {React.ReactNode} [props.children]  - Toolbar controls to render inside the group.
 * @param {string}          [props.className] - Additional CSS class names.
 */
export default function BlockControls( {
	group = 'default',
	children,
	className = '',
} ) {
	return (
		<div className={ `block-controls${ className ? ` ${ className }` : '' }` }>
			<div className="block-controls__header">
				<span className="block-controls__label">Block Toolbar</span>
				<span className="block-controls__group-badge">group: { group }</span>
			</div>
			<div
				className={ `block-controls__toolbar block-controls__toolbar--${ group }` }
				role="toolbar"
				aria-label="Block toolbar"
			>
				{ children }
			</div>
		</div>
	);
}
