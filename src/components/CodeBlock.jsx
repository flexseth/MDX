import { Highlight, themes } from 'prism-react-renderer';

/**
 * Styled code block with syntax highlighting and optional language label.
 *
 * @param {Object} props
 * @param {string} props.className - Class from MDX (e.g. 'language-jsx').
 * @param {React.ReactNode} props.children - Code string content.
 */
export default function CodeBlock( { className, children } ) {
	const language = className?.replace( 'language-', '' ) || 'text';
	const code = typeof children === 'string' ? children.trimEnd() : String( children ?? '' ).trimEnd();

	return (
		<div className="code-block">
			<div className="code-block__header">
				<span className="code-block__language">{ language }</span>
			</div>
			<Highlight code={ code } language={ language } theme={ themes.nightOwl }>
				{ ( { className: hlClassName, style, tokens, getLineProps, getTokenProps } ) => (
					<pre className={ `code-block__pre ${ hlClassName }` } style={ style }>
						{ tokens.map( ( line, i ) => (
							<div key={ i } { ...getLineProps( { line } ) }>
								{ line.map( ( token, key ) => (
									<span key={ key } { ...getTokenProps( { token } ) } />
								) ) }
							</div>
						) ) }
					</pre>
				) }
			</Highlight>
		</div>
	);
}
