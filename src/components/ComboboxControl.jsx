import { useState, useRef, useEffect } from 'react';

/**
 * Searchable combobox (autocomplete dropdown) for selecting from long option lists.
 *
 * Mirrors the WordPress `ComboboxControl` component from `@wordpress/components`.
 * Filtering is controlled externally via `onFilterValueChange` — the parent is
 * responsible for updating the `options` array in response to the filter text.
 *
 * @param {Object}         props
 * @param {string}         props.label                  - Label text displayed above the input.
 * @param {*}              [props.value]                - Currently selected option value. Controlled.
 * @param {Array}          [props.options]              - Array of `{ value, label }` objects.
 * @param {Function}       [props.onChange]             - Callback fired with the selected value, or `null` when cleared.
 * @param {Function}       [props.onFilterValueChange]  - Callback fired with the current filter text as the user types.
 * @param {string|ReactNode} [props.help]              - Optional help text displayed below the control.
 * @param {boolean}        [props.isLoading]            - Show a loading indicator in the dropdown.
 * @param {Object}         [props.messages]             - Override default UI strings. Supports `{ noResultsFound }`.
 * @param {string}         [props.className]            - Additional CSS class names.
 */
export default function ComboboxControl( {
	label,
	value,
	options = [],
	onChange,
	onFilterValueChange,
	help,
	isLoading = false,
	messages = {},
	className = '',
} ) {
	const [ isOpen, setIsOpen ] = useState( false );
	const [ inputValue, setInputValue ] = useState( '' );
	const [ activeIndex, setActiveIndex ] = useState( -1 );

	const inputRef = useRef( null );
	const wrapperRef = useRef( null );

	const noResultsText = messages.noResultsFound || 'No results found.';
	const id = `combobox-${ label?.toLowerCase().replace( /\s+/g, '-' ) }`;

	// Sync the text input with the selected option label when not actively filtering.
	useEffect( () => {
		if ( ! isOpen ) {
			if ( value !== null && value !== undefined && value !== '' ) {
				const selected = options.find( ( o ) => o.value === value );
				setInputValue( selected ? selected.label : '' );
			} else {
				setInputValue( '' );
			}
		}
	}, [ value, options, isOpen ] );

	// Close the dropdown on click outside.
	useEffect( () => {
		const handleOutsideClick = ( event ) => {
			if ( wrapperRef.current && ! wrapperRef.current.contains( event.target ) ) {
				closeAndRestore();
			}
		};
		document.addEventListener( 'mousedown', handleOutsideClick );
		return () => document.removeEventListener( 'mousedown', handleOutsideClick );
	} ); // eslint-disable-line react-hooks/exhaustive-deps

	const closeAndRestore = () => {
		setIsOpen( false );
		setActiveIndex( -1 );
		// Restore the display label for the current value.
		if ( value !== null && value !== undefined && value !== '' ) {
			const selected = options.find( ( o ) => o.value === value );
			setInputValue( selected ? selected.label : '' );
		} else {
			setInputValue( '' );
		}
	};

	const handleInputChange = ( event ) => {
		const text = event.target.value;
		setInputValue( text );
		setIsOpen( true );
		setActiveIndex( -1 );
		if ( onFilterValueChange ) onFilterValueChange( text );
	};

	const handleFocus = () => {
		setIsOpen( true );
		if ( onFilterValueChange ) onFilterValueChange( '' );
	};

	const handleSelect = ( option ) => {
		setInputValue( option.label );
		setIsOpen( false );
		setActiveIndex( -1 );
		if ( onChange ) onChange( option.value );
		if ( onFilterValueChange ) onFilterValueChange( '' );
	};

	const handleClear = () => {
		setInputValue( '' );
		setIsOpen( false );
		setActiveIndex( -1 );
		if ( onChange ) onChange( null );
		if ( onFilterValueChange ) onFilterValueChange( '' );
		inputRef.current?.focus();
	};

	const handleKeyDown = ( event ) => {
		if ( ! isOpen && event.key === 'ArrowDown' ) {
			setIsOpen( true );
			return;
		}
		if ( ! isOpen ) return;

		switch ( event.key ) {
			case 'ArrowDown':
				event.preventDefault();
				setActiveIndex( ( i ) => Math.min( i + 1, options.length - 1 ) );
				break;
			case 'ArrowUp':
				event.preventDefault();
				setActiveIndex( ( i ) => Math.max( i - 1, 0 ) );
				break;
			case 'Enter':
				event.preventDefault();
				if ( activeIndex >= 0 && options[ activeIndex ] ) {
					handleSelect( options[ activeIndex ] );
				}
				break;
			case 'Escape':
				closeAndRestore();
				break;
		}
	};

	const hasValue = value !== null && value !== undefined && value !== '';

	return (
		<div
			ref={ wrapperRef }
			className={ `combobox-control${ className ? ` ${ className }` : '' }` }
		>
			<label className="combobox-control__label" htmlFor={ id }>
				{ label }
			</label>

			<div className="combobox-control__input-wrapper">
				<input
					ref={ inputRef }
					id={ id }
					type="text"
					className="combobox-control__input"
					value={ inputValue }
					onChange={ handleInputChange }
					onFocus={ handleFocus }
					onKeyDown={ handleKeyDown }
					role="combobox"
					aria-expanded={ isOpen }
					aria-autocomplete="list"
					aria-controls={ `${ id }-listbox` }
					aria-activedescendant={
						activeIndex >= 0 ? `${ id }-option-${ activeIndex }` : undefined
					}
					aria-describedby={ help ? `${ id }-help` : undefined }
					autoComplete="off"
				/>

				{ hasValue && (
					<button
						type="button"
						className="combobox-control__clear"
						onClick={ handleClear }
						aria-label="Clear selection"
						tabIndex={ -1 }
					>
						&times;
					</button>
				) }

				<span className="combobox-control__chevron" aria-hidden="true">
					&#9660;
				</span>
			</div>

			{ isOpen && (
				<ul
					id={ `${ id }-listbox` }
					className="combobox-control__listbox"
					role="listbox"
					aria-label={ label }
				>
					{ isLoading ? (
						<li className="combobox-control__loading" role="status">
							Loading&hellip;
						</li>
					) : options.length === 0 ? (
						<li className="combobox-control__no-results">
							{ noResultsText }
						</li>
					) : (
						options.map( ( option, index ) => (
							<li
								key={ option.value }
								id={ `${ id }-option-${ index }` }
								className={ [
									'combobox-control__option',
									index === activeIndex
										? 'combobox-control__option--active'
										: '',
									option.value === value
										? 'combobox-control__option--selected'
										: '',
								]
									.filter( Boolean )
									.join( ' ' ) }
								role="option"
								aria-selected={ option.value === value }
								// Use onMouseDown to fire before onBlur closes the dropdown.
								onMouseDown={ ( event ) => {
									event.preventDefault();
									handleSelect( option );
								} }
							>
								{ option.label }
							</li>
						) )
					) }
				</ul>
			) }

			{ help && (
				<p id={ `${ id }-help` } className="combobox-control__help">
					{ help }
				</p>
			) }
		</div>
	);
}
