import { useState } from 'react';
import CodeBlock from './CodeBlock';

/**
 * Tabbed code block that lets users switch between multiple language examples.
 *
 * @param {Object}   props
 * @param {Array}    props.tabs - Array of { label, language, code } objects.
 */
export default function CodeTabs( { tabs = [] } ) {
	const [ activeIndex, setActiveIndex ] = useState( 0 );

	if ( ! tabs.length ) {
		return null;
	}

	const active = tabs[ activeIndex ];

	return (
		<div className="code-tabs">
			<div className="code-tabs__tablist" role="tablist">
				{ tabs.map( ( tab, i ) => (
					<button
						key={ i }
						role="tab"
						aria-selected={ i === activeIndex }
						className={ `code-tabs__tab${ i === activeIndex ? ' code-tabs__tab--active' : '' }` }
						onClick={ () => setActiveIndex( i ) }
					>
						{ tab.label || tab.language }
					</button>
				) ) }
			</div>
			<CodeBlock className={ `language-${ active.language }` }>
				{ active.code }
			</CodeBlock>
		</div>
	);
}
