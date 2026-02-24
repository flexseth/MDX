import { useState, useRef, useEffect } from 'react';

/**
 * Improved custom select dropdown with keyboard navigation.
 *
 * Unlike native <select>, this renders a stylized listbox with custom option rendering.
 * Mirrors the WordPress `CustomSelectControl` (v2) component from `@wordpress/components`.
 *
 * @param {Object}   props
 * @param {string}   props.label    - Label text for the control.
 * @param {Array}    props.options  - Array of { key, name, hint?, style? } option objects.
 * @param {Object}   props.value    - Currently selected option object.
 * @param {Function} props.onChange - Callback fired with { selectedItem } on selection.
 * @param {string}   [props.help]   - Optional help text.
 * @param {string}   [props.className] - Additional CSS class names.
 */
export default function CustomSelectControl( {
	label,
	options = [],
	value,
	onChange,
	help,
	className = '',
	...rest
} ) {
	const [ isOpen, setIsOpen ] = useState( false );
	const [ highlightedIndex, setHighlightedIndex ] = useState( -1 );
	const containerRef = useRef( null );
	const id = `custom-select-${ label?.toLowerCase().replace( /\s+/g, '-' ) }`;

	const selectedOption = value || options[ 0 ];

	useEffect( () => {
		if ( ! isOpen ) return;

		const handleClickOutside = ( event ) => {
			if ( containerRef.current && ! containerRef.current.contains( event.target ) ) {
				setIsOpen( false );
			}
		};

		document.addEventListener( 'mousedown', handleClickOutside );
		return () => document.removeEventListener( 'mousedown', handleClickOutside );
	}, [ isOpen ] );

	const handleToggle = () => setIsOpen( ( prev ) => ! prev );

	const handleSelect = ( option ) => {
		if ( onChange ) {
			onChange( { selectedItem: option } );
		}
		setIsOpen( false );
	};

	const handleKeyDown = ( event ) => {
		if ( ! isOpen ) {
			if ( event.key === 'Enter' || event.key === ' ' ) {
				setIsOpen( true );
				event.preventDefault();
			}
			return;
		}

		switch ( event.key ) {
			case 'ArrowDown':
				setHighlightedIndex( ( prev ) => Math.min( prev + 1, options.length - 1 ) );
				event.preventDefault();
				break;
			case 'ArrowUp':
				setHighlightedIndex( ( prev ) => Math.max( prev - 1, 0 ) );
				event.preventDefault();
				break;
			case 'Enter':
			case ' ':
				if ( highlightedIndex >= 0 ) {
					handleSelect( options[ highlightedIndex ] );
				}
				event.preventDefault();
				break;
			case 'Escape':
				setIsOpen( false );
				event.preventDefault();
				break;
		}
	};

	return (
		<div className={ `custom-select-control${ className ? ` ${ className }` : '' }` } ref={ containerRef } { ...rest }>
			<label className="custom-select-control__label" htmlFor={ id }>
				{ label }
			</label>
			<div
				id={ id }
				className="custom-select-control__button"
				role="button"
				tabIndex={ 0 }
				onClick={ handleToggle }
				onKeyDown={ handleKeyDown }
				aria-haspopup="listbox"
				aria-expanded={ isOpen }
			>
				<span style={ selectedOption?.style }>{ selectedOption?.name || 'Select...' }</span>
				<span className="custom-select-control__arrow">{ isOpen ? '▲' : '▼' }</span>
			</div>
			{ isOpen && (
				<ul className="custom-select-control__menu" role="listbox">
					{ options.map( ( option, index ) => (
						<li
							key={ option.key }
							className={ `custom-select-control__option${ option.key === selectedOption?.key ? ' custom-select-control__option--selected' : '' }${ index === highlightedIndex ? ' custom-select-control__option--highlighted' : '' }` }
							role="option"
							aria-selected={ option.key === selectedOption?.key }
							onClick={ () => handleSelect( option ) }
							onMouseEnter={ () => setHighlightedIndex( index ) }
						>
							<div style={ option.style }>
								<div className="custom-select-control__option-name">{ option.name }</div>
								{ option.hint && (
									<div className="custom-select-control__option-hint">{ option.hint }</div>
								) }
							</div>
						</li>
					) ) }
				</ul>
			) }
			{ help && (
				<p id={ `${ id }-help` } className="custom-select-control__help">
					{ help }
				</p>
			) }
		</div>
	);
}
