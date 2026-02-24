import { useState, useRef, useEffect } from 'react';

/**
 * Multi-value token/tag input with optional autocomplete suggestions.
 *
 * Mirrors the WordPress `FormTokenField` component from `@wordpress/components`.
 * Users type a value and press Enter or comma to create a token chip. Each token
 * has a remove button. Suggestions appear in a dropdown while the input is focused.
 *
 * @param {Object}   props
 * @param {string}   [props.label]       - Visible label above the input.
 * @param {Array}    [props.value]       - Array of current token strings. Controlled.
 * @param {Function} [props.onChange]    - Callback receiving the updated token array.
 * @param {Array}    [props.suggestions] - Array of suggestion strings for autocomplete.
 * @param {number}   [props.maxLength]   - Maximum number of tokens allowed.
 * @param {string}   [props.placeholder] - Placeholder text when no tokens and no input.
 * @param {string}   [props.help]        - Help text displayed below the field.
 * @param {boolean}  [props.disabled]    - Disables all interaction. Default false.
 * @param {string}   [props.className]   - Additional CSS class names.
 */
export default function FormTokenField( {
	label,
	value = [],
	onChange,
	suggestions = [],
	maxLength,
	placeholder = 'Add item…',
	help,
	disabled = false,
	className = '',
} ) {
	const [ inputValue, setInputValue ] = useState( '' );
	const [ isOpen, setIsOpen ] = useState( false );
	const [ activeIndex, setActiveIndex ] = useState( -1 );

	const inputRef = useRef( null );
	const wrapperRef = useRef( null );

	const id = `form-token-field-${ label?.toLowerCase().replace( /\s+/g, '-' ) ?? 'field' }`;
	const isAtLimit = maxLength !== undefined && value.length >= maxLength;

	// Filter suggestions: match input text, exclude already-added tokens.
	const filteredSuggestions = suggestions.filter(
		( s ) =>
			s.toLowerCase().includes( inputValue.toLowerCase() ) &&
			! value.includes( s )
	);

	// Close suggestion list on outside click.
	useEffect( () => {
		const handleOutsideClick = ( event ) => {
			if ( wrapperRef.current && ! wrapperRef.current.contains( event.target ) ) {
				setIsOpen( false );
				setActiveIndex( -1 );
			}
		};
		document.addEventListener( 'mousedown', handleOutsideClick );
		return () => document.removeEventListener( 'mousedown', handleOutsideClick );
	} );

	const addToken = ( token ) => {
		const trimmed = token.trim();
		if ( ! trimmed || value.includes( trimmed ) ) return;
		if ( isAtLimit ) return;
		if ( onChange ) onChange( [ ...value, trimmed ] );
		setInputValue( '' );
		setIsOpen( false );
		setActiveIndex( -1 );
	};

	const removeToken = ( token ) => {
		if ( disabled ) return;
		if ( onChange ) onChange( value.filter( ( t ) => t !== token ) );
	};

	const handleInputChange = ( event ) => {
		setInputValue( event.target.value );
		setIsOpen( true );
		setActiveIndex( -1 );
	};

	const handleInputFocus = () => {
		if ( suggestions.length > 0 ) setIsOpen( true );
	};

	const handleKeyDown = ( event ) => {
		if ( disabled ) return;

		switch ( event.key ) {
			case 'Enter':
			case ',':
				event.preventDefault();
				if ( activeIndex >= 0 && filteredSuggestions[ activeIndex ] ) {
					addToken( filteredSuggestions[ activeIndex ] );
				} else if ( inputValue.trim() ) {
					addToken( inputValue );
				}
				break;
			case 'Backspace':
				if ( inputValue === '' && value.length > 0 ) {
					removeToken( value[ value.length - 1 ] );
				}
				break;
			case 'ArrowDown':
				event.preventDefault();
				setActiveIndex( ( i ) => Math.min( i + 1, filteredSuggestions.length - 1 ) );
				break;
			case 'ArrowUp':
				event.preventDefault();
				setActiveIndex( ( i ) => Math.max( i - 1, 0 ) );
				break;
			case 'Escape':
				setIsOpen( false );
				setActiveIndex( -1 );
				break;
		}
	};

	const handleSuggestionMouseDown = ( event, suggestion ) => {
		// Prevent blur before the selection fires.
		event.preventDefault();
		addToken( suggestion );
		inputRef.current?.focus();
	};

	return (
		<div
			ref={ wrapperRef }
			className={ `form-token-field${ disabled ? ' form-token-field--disabled' : '' }${ className ? ` ${ className }` : '' }` }
		>
			{ label && (
				<label className="form-token-field__label" htmlFor={ id }>
					{ label }
				</label>
			) }

			<div
				className="form-token-field__input-container"
				onClick={ () => ! disabled && inputRef.current?.focus() }
			>
				{ value.map( ( token ) => (
					<span key={ token } className="form-token-field__token">
						{ token }
						<button
							type="button"
							className="form-token-field__token-remove"
							onClick={ ( e ) => {
								e.stopPropagation();
								removeToken( token );
							} }
							aria-label={ `Remove ${ token }` }
							disabled={ disabled }
							tabIndex={ -1 }
						>
							&times;
						</button>
					</span>
				) ) }

				{ ! isAtLimit && (
					<input
						ref={ inputRef }
						id={ id }
						type="text"
						className="form-token-field__input"
						value={ inputValue }
						onChange={ handleInputChange }
						onFocus={ handleInputFocus }
						onKeyDown={ handleKeyDown }
						placeholder={ value.length === 0 ? placeholder : '' }
						disabled={ disabled }
						autoComplete="off"
						aria-autocomplete={ suggestions.length > 0 ? 'list' : 'none' }
						aria-expanded={ isOpen && filteredSuggestions.length > 0 }
						aria-controls={ `${ id }-suggestions` }
						aria-describedby={ help ? `${ id }-help` : undefined }
					/>
				) }
			</div>

			{ isOpen && filteredSuggestions.length > 0 && (
				<ul
					id={ `${ id }-suggestions` }
					className="form-token-field__suggestions"
					role="listbox"
					aria-label={ `${ label } suggestions` }
				>
					{ filteredSuggestions.map( ( suggestion, index ) => (
						<li
							key={ suggestion }
							className={ [
								'form-token-field__suggestion',
								index === activeIndex ? 'form-token-field__suggestion--active' : '',
							]
								.filter( Boolean )
								.join( ' ' ) }
							role="option"
							aria-selected={ index === activeIndex }
							onMouseDown={ ( e ) => handleSuggestionMouseDown( e, suggestion ) }
						>
							{ suggestion }
						</li>
					) ) }
				</ul>
			) }

			{ help && (
				<p id={ `${ id }-help` } className="form-token-field__help">
					{ help }
				</p>
			) }
		</div>
	);
}
