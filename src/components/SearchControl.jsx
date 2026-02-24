/**
 * Search input with a clear (×) button.
 *
 * Used for filtering posts, taxonomy terms, or other lists in the block editor.
 * Mirrors the WordPress `SearchControl` component from `@wordpress/components`.
 *
 * @param {Object}   props
 * @param {string}   props.label        - Label text for the search input.
 * @param {string}   props.value        - Current search value (controlled).
 * @param {Function} props.onChange     - Callback fired with the new string value on change.
 * @param {string}   [props.placeholder]- Placeholder text.
 * @param {string}   [props.help]       - Optional help text displayed below the input.
 * @param {string}   [props.className]  - Additional CSS class names.
 */
export default function SearchControl( {
	label,
	value,
	onChange,
	placeholder = 'Search...',
	help,
	className = '',
	...rest
} ) {
	const id = `search-${ label?.toLowerCase().replace( /\s+/g, '-' ) }`;

	const handleChange = ( event ) => {
		if ( onChange ) {
			onChange( event.target.value );
		}
	};

	const handleClear = () => {
		if ( onChange ) {
			onChange( '' );
		}
	};

	return (
		<div className={ `search-control${ className ? ` ${ className }` : '' }` }>
			<label className="search-control__label" htmlFor={ id }>
				{ label }
			</label>
			<div className="search-control__input-wrapper">
				<span className="search-control__icon" aria-hidden="true">🔍</span>
				<input
					id={ id }
					type="search"
					className="search-control__input"
					value={ value }
					onChange={ handleChange }
					placeholder={ placeholder }
					aria-describedby={ help ? `${ id }-help` : undefined }
					{ ...rest }
				/>
				{ value && (
					<button
						type="button"
						className="search-control__clear"
						onClick={ handleClear }
						aria-label="Clear search"
					>
						×
					</button>
				) }
			</div>
			{ help && (
				<p id={ `${ id }-help` } className="search-control__help">
					{ help }
				</p>
			) }
		</div>
	);
}
