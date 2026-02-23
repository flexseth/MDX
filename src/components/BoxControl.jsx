import { useState } from 'react';

/**
 * Parses the numeric value and unit from a CSS dimension string.
 *
 * @param {string} cssValue - CSS value like '16px', '1.5em', '50%'.
 * @returns {{ num: string, unit: string }}
 */
function parseValue( cssValue ) {
	if ( ! cssValue && cssValue !== 0 ) return { num: '', unit: 'px' };
	const match = String( cssValue ).match( /^(-?[\d.]*)([a-z%]*)$/ );
	return match
		? { num: match[ 1 ], unit: match[ 2 ] || 'px' }
		: { num: '', unit: 'px' };
}

const DEFAULT_UNITS = [
	{ value: 'px',  label: 'px'  },
	{ value: 'em',  label: 'em'  },
	{ value: 'rem', label: 'rem' },
	{ value: '%',   label: '%'   },
];

const ALL_SIDES = [ 'top', 'right', 'bottom', 'left' ];

/**
 * Four-sided padding/margin/border control for CSS box model properties.
 *
 * Mirrors the WordPress `__experimentalBoxControl` component from `@wordpress/components`.
 * Supports linked (all sides equal) and individual side modes.
 *
 * @param {Object}   props
 * @param {string}   [props.label]       - Label displayed above the control.
 * @param {Object}   [props.values]      - Current values: `{ top, right, bottom, left }` as CSS strings.
 * @param {Function} [props.onChange]    - Callback fired with the updated values object.
 * @param {Array}    [props.units]       - Available units. Default: px, em, rem, %.
 * @param {Array}    [props.sides]       - Which sides to show. Default: all four.
 * @param {boolean}  [props.splitOnAxis] - Split into horizontal/vertical pairs instead of four sides.
 * @param {string}   [props.className]   - Additional CSS class names.
 */
export default function BoxControl( {
	label = 'Box Control',
	values = {},
	onChange,
	units = DEFAULT_UNITS,
	sides,
	splitOnAxis = false,
	className = '',
} ) {
	const activeSides = sides || ALL_SIDES;

	// Derive the current unit from the first non-empty value.
	const firstVal = Object.values( values ).find( ( v ) => v );
	const { unit: derivedUnit } = parseValue( firstVal );
	const [ unit, setUnit ] = useState( derivedUnit || 'px' );
	const [ isLinked, setIsLinked ] = useState( true );

	// Parse numeric strings for display (strip unit).
	const getNum = ( side ) => parseValue( values[ side ] ).num;

	const buildValue = ( num ) => ( num === '' ? '' : `${ num }${ unit }` );

	const handleChange = ( side, num ) => {
		if ( ! onChange ) return;
		if ( isLinked ) {
			const updated = {};
			activeSides.forEach( ( s ) => { updated[ s ] = buildValue( num ); } );
			onChange( { ...values, ...updated } );
		} else {
			onChange( { ...values, [ side ]: buildValue( num ) } );
		}
	};

	const handleUnitChange = ( newUnit ) => {
		setUnit( newUnit );
		if ( ! onChange ) return;
		// Re-emit values with new unit.
		const updated = {};
		activeSides.forEach( ( s ) => {
			const { num } = parseValue( values[ s ] );
			updated[ s ] = num !== '' ? `${ num }${ newUnit }` : '';
		} );
		onChange( { ...values, ...updated } );
	};

	// In linked mode, all inputs share the top value.
	const linkedNum = isLinked ? getNum( activeSides[ 0 ] ) : '';

	// Determine display sides based on splitOnAxis.
	const displaySides = splitOnAxis
		? [ { key: 'vertical', sides: [ 'top', 'bottom' ], label: 'Vertical' },
		    { key: 'horizontal', sides: [ 'right', 'left' ], label: 'Horizontal' } ]
		: activeSides.map( ( s ) => ( { key: s, sides: [ s ], label: s.charAt( 0 ).toUpperCase() + s.slice( 1 ) } ) );

	return (
		<div className={ `box-control${ className ? ` ${ className }` : '' }` }>
			<div className="box-control__header">
				<label className="box-control__label">{ label }</label>
				<div className="box-control__header-controls">
					<select
						className="box-control__unit-select"
						value={ unit }
						onChange={ ( e ) => handleUnitChange( e.target.value ) }
						aria-label="Unit"
					>
						{ units.map( ( u ) => (
							<option key={ u.value } value={ u.value }>{ u.label }</option>
						) ) }
					</select>
					<button
						type="button"
						className={ `box-control__link-toggle${ isLinked ? ' box-control__link-toggle--linked' : '' }` }
						onClick={ () => setIsLinked( ( v ) => ! v ) }
						aria-label={ isLinked ? 'Unlink sides' : 'Link sides' }
						title={ isLinked ? 'Unlink sides' : 'Link sides' }
					>
						{ isLinked ? '🔗' : '⛓️' }
					</button>
				</div>
			</div>

			{ isLinked ? (
				<div className="box-control__linked-row">
					<input
						type="number"
						className="box-control__input"
						value={ linkedNum }
						onChange={ ( e ) => handleChange( activeSides[ 0 ], e.target.value ) }
						placeholder="—"
						aria-label="All sides"
					/>
					<span className="box-control__unit-label">{ unit }</span>
				</div>
			) : (
				<div className="box-control__sides">
					{ displaySides.map( ( item ) => {
						const sideKey = item.sides[ 0 ];
						const num = splitOnAxis
							? getNum( activeSides.find( ( s ) => item.sides.includes( s ) ) || sideKey )
							: getNum( sideKey );
						return (
							<div key={ item.key } className="box-control__side">
								<input
									type="number"
									className="box-control__input"
									value={ num }
									onChange={ ( e ) => {
										item.sides.forEach( ( s ) =>
											handleChange( s, e.target.value )
										);
									} }
									placeholder="—"
									aria-label={ item.label }
								/>
								<span className="box-control__side-label">{ item.label }</span>
							</div>
						);
					} ) }
				</div>
			) }
		</div>
	);
}
