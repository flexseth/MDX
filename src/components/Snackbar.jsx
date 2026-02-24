/**
 * Brief, dismissible toast notification.
 *
 * Auto-dismissing notification that appears at the bottom of the screen.
 * Mirrors the WordPress `Snackbar` component from `@wordpress/components`.
 *
 * @param {Object}   props
 * @param {Function} [props.onRemove]  - Callback fired when the snackbar is dismissed.
 * @param {Array}    [props.actions]   - Array of { label, onClick } action objects.
 * @param {string}   [props.className] - Additional CSS class names.
 * @param {React.ReactNode} props.children - Snackbar message content.
 */
export default function Snackbar( {
	onRemove,
	actions = [],
	className = '',
	children,
	...rest
} ) {
	return (
		<div className={ `snackbar${ className ? ` ${ className }` : '' }` } { ...rest }>
			<div className="snackbar__content">
				<div className="snackbar__message">{ children }</div>
				{ actions.length > 0 && (
					<div className="snackbar__actions">
						{ actions.map( ( action, index ) => (
							<button
								key={ index }
								type="button"
								className="snackbar__action"
								onClick={ action.onClick }
							>
								{ action.label }
							</button>
						) ) }
					</div>
				) }
			</div>
			{ onRemove && (
				<button
					type="button"
					className="snackbar__dismiss"
					onClick={ onRemove }
					aria-label="Dismiss"
				>
					×
				</button>
			) }
		</div>
	);
}
