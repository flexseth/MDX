import { useState, useRef, useEffect, useId } from 'react';

/**
 * FormTokenField — tag/token input with autocomplete suggestions.
 * Mirrors the @wordpress/components FormTokenField API.
 *
 * @param {Object}   props
 * @param {Array}    [props.value]           - Array of currently selected token strings.
 * @param {Array}    [props.suggestions]     - Array of suggestion strings for autocomplete.
 * @param {Function} [props.onChange]        - Called with new token array when tokens change.
 * @param {string}   [props.label]           - Visible label above the field.
 * @param {string}   [props.placeholder]     - Input placeholder text.
 * @param {number}   [props.maxLength]       - Maximum number of tokens allowed.
 * @param {boolean}  [props.disabled]        - Disables all interaction.
 * @param {string}   [props.help]            - Help text shown below the field.
 * @param {string}   [props.className]       - Extra class name.
 * @param {boolean}  [props.tokenizeOnSpace] - Add token on spacebar press (default false).
 */
export default function FormTokenField( {
	value = [],
	suggestions = [],
	onChange,
	label,
	placeholder = 'Add item…',
	maxLength,
	disabled = false,
	help,
	className = '',
	tokenizeOnSpace = false,
} ) {
	const [ inputValue, setInputValue ] = useState( '' );
	const [ isOpen, setIsOpen ] = useState( false );
	const [ activeIndex, setActiveIndex ] = useState( -1 );
	const inputRef = useRef( null );
	const listRef = useRef( null );
	const blurTimerRef = useRef( null );
	const generatedId = useId();
	const suggestionsId = label
		? `formtoken-${ label.toLowerCase().replace( /\s+/g, '-' ).replace( /[^a-z0-9-_]/g, '' ) }`
		: `formtoken-${ generatedId }`;

	const filtered = inputValue.trim()
		? suggestions.filter(
				( s ) =>
					s.toLowerCase().includes( inputValue.toLowerCase() ) &&
					! value.includes( s )
		  )
		: suggestions.filter( ( s ) => ! value.includes( s ) );

	const isAtMax = maxLength !== undefined && value.length >= maxLength;

	useEffect( () => {
		setActiveIndex( -1 );
	}, [ inputValue ] );

	useEffect( () => {
		return () => {
			if ( blurTimerRef.current ) {
				clearTimeout( blurTimerRef.current );
			}
		};
	}, [] );

	function addToken( token ) {
		const trimmed = token.trim();
		if ( ! trimmed || value.includes( trimmed ) || isAtMax ) return;
		onChange?.( [ ...value, trimmed ] );
		setInputValue( '' );
		setIsOpen( false );
		inputRef.current?.focus();
	}

	function removeToken( index ) {
		const next = value.filter( ( _, i ) => i !== index );
		onChange?.( next );
		inputRef.current?.focus();
	}

	function handleKeyDown( e ) {
		if ( disabled ) return;

		if ( e.key === 'Enter' ) {
			e.preventDefault();
			if ( activeIndex >= 0 && filtered[ activeIndex ] ) {
				addToken( filtered[ activeIndex ] );
			} else if ( inputValue.trim() ) {
				addToken( inputValue );
			}
		} else if ( e.key === ' ' && tokenizeOnSpace && inputValue.trim() ) {
			e.preventDefault();
			addToken( inputValue );
		} else if ( e.key === 'Backspace' && ! inputValue && value.length ) {
			removeToken( value.length - 1 );
		} else if ( e.key === 'ArrowDown' ) {
			e.preventDefault();
			setActiveIndex( ( i ) => Math.min( i + 1, filtered.length - 1 ) );
			setIsOpen( true );
		} else if ( e.key === 'ArrowUp' ) {
			e.preventDefault();
			setActiveIndex( ( i ) => Math.max( i - 1, 0 ) );
		} else if ( e.key === 'Escape' ) {
			setIsOpen( false );
			setActiveIndex( -1 );
		}
	}

	function handleInputChange( e ) {
		setInputValue( e.target.value );
		setIsOpen( true );
	}

	function handleSuggestionMouseDown( e, suggestion ) {
		e.preventDefault(); // Prevent input blur before selection.
		addToken( suggestion );
	}

	const classes = [
		'form-token-field',
		disabled ? 'form-token-field--disabled' : '',
		className,
	].filter( Boolean ).join( ' ' );

	return (
		<div className={ classes }>
			{ label && (
				<label
					className="form-token-field__label"
					onClick={ () => inputRef.current?.focus() }
				>
					{ label }
				</label>
			) }

			<div
				className="form-token-field__input-container"
				onClick={ () => ! disabled && inputRef.current?.focus() }
			>
				{ value.map( ( token, i ) => (
					<span key={ token + i } className="form-token-field__token">
						<span className="form-token-field__token-text">{ token }</span>
						{ ! disabled && (
							<button
								type="button"
								className="form-token-field__token-remove"
								onClick={ ( e ) => {
									e.stopPropagation();
									removeToken( i );
								} }
								aria-label={ `Remove ${ token }` }
							>
								×
							</button>
						) }
					</span>
				) ) }

				{ ! isAtMax && (
					<input
						ref={ inputRef }
						type="text"
						className="form-token-field__input"
						value={ inputValue }
						onChange={ handleInputChange }
						onFocus={ () => {
							if ( blurTimerRef.current ) {
								clearTimeout( blurTimerRef.current );
								blurTimerRef.current = null;
							}
							setIsOpen( true );
						} }
						onBlur={ () => {
							blurTimerRef.current = setTimeout( () => {
								setIsOpen( false );
								blurTimerRef.current = null;
							}, 150 );
						} }
						onKeyDown={ handleKeyDown }
						placeholder={ value.length === 0 ? placeholder : '' }
						disabled={ disabled }
						aria-label={ label || 'Token input' }
						aria-expanded={ isOpen && filtered.length > 0 }
						aria-autocomplete="list"
						aria-controls={ suggestionsId }
					/>
				) }
			</div>

			{ isOpen && filtered.length > 0 && (
				<ul
					id={ suggestionsId }
					ref={ listRef }
					className="form-token-field__suggestions"
					role="listbox"
				>
					{ filtered.map( ( suggestion, i ) => (
						<li
							key={ suggestion }
							className={ `form-token-field__suggestion${ i === activeIndex ? ' form-token-field__suggestion--active' : '' }` }
							role="option"
							aria-selected={ i === activeIndex }
							onMouseDown={ ( e ) => handleSuggestionMouseDown( e, suggestion ) }
							onMouseEnter={ () => setActiveIndex( i ) }
						>
							{ suggestion }
						</li>
					) ) }
				</ul>
			) }

			{ help && <p className="form-token-field__help">{ help }</p> }
		</div>
	);
}
