/**
 * Contextual status notice component with optional dismiss button.
 *
 * Mirrors the WordPress `Notice` component from `@wordpress/components`.
 * Supports four severity levels (info, success, warning, error) and optional
 * dismiss functionality. For editor-only feedback; not for front-end rendering.
 *
 * @param {Object}      props
 * @param {string}      [props.status]        - Severity level: 'info', 'success', 'warning', 'error'. Default 'info'.
 * @param {ReactNode}   props.children        - Notice message content.
 * @param {boolean}     [props.isDismissible] - Shows the dismiss (×) button when true. Default true.
 * @param {Function}    [props.onRemove]      - Callback fired when the notice is dismissed.
 * @param {string}      [props.className]     - Additional CSS class names.
 * @param {string}      [props.politeness]    - ARIA live region politeness: 'assertive' or 'polite'. Default 'assertive'.
 */
export default function Notice( {
	status = 'info',
	children,
	isDismissible = true,
	onRemove,
	className = '',
	politeness = 'assertive',
} ) {
	const icons = {
		info: 'ℹ',
		success: '✓',
		warning: '!',
		error: '✕',
	};

	const wrapperClass = [
		'notice',
		`notice--${ status }`,
		isDismissible ? 'notice--dismissible' : '',
		className,
	]
		.filter( Boolean )
		.join( ' ' );

	const role = politeness === 'polite' ? 'status' : 'alert';

	return (
		<div className={ wrapperClass } role={ role } aria-live={ politeness }>
			<span className="notice__icon" aria-hidden="true">
				{ icons[ status ] || icons.info }
			</span>
			<div className="notice__content">
				{ children }
			</div>
			{ isDismissible && (
				<button
					type="button"
					className="notice__dismiss"
					onClick={ onRemove }
					aria-label="Dismiss notice"
				>
					&times;
				</button>
			) }
		</div>
	);
}
