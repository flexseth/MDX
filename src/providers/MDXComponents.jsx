import { MDXProvider } from '@mdx-js/react';
import { Alert, Button, Card, CodeBlock, CodeTabs, PropsTable, ToggleControl, SelectControl } from '../components';

/**
 * Maps standard markdown elements and custom components
 * for use within MDX content.
 */
const components = {
	// Override markdown elements with styled versions.
	h1: ( props ) => <h1 className="docs-heading docs-heading--1" { ...props } />,
	h2: ( props ) => <h2 className="docs-heading docs-heading--2" { ...props } />,
	h3: ( props ) => <h3 className="docs-heading docs-heading--3" { ...props } />,
	h4: ( props ) => <h4 className="docs-heading docs-heading--4" { ...props } />,
	h5: ( props ) => <h5 className="docs-heading docs-heading--5" { ...props } />,
	h6: ( props ) => <h6 className="docs-heading docs-heading--6" { ...props } />,
	a: ( props ) => <a className="docs-link" { ...props } />,
	table: ( props ) => (
		<div className="docs-table-wrapper">
			<table className="docs-table" { ...props } />
		</div>
	),
	pre: ( { children } ) => {
		// Extract props from the nested <code> element.
		const codeProps = children?.props || {};
		return <CodeBlock { ...codeProps } />;
	},
	code: ( props ) => {
		// Inline code (not inside a pre block).
		return <code className="docs-inline-code" { ...props } />;
	},

	// Custom components available in MDX without imports.
	Alert,
	Button,
	Card,
	CodeBlock,
	CodeTabs,
	PropsTable,
	ToggleControl,
	SelectControl,
};

/**
 * Wraps children with MDXProvider to inject component mappings.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function MDXComponentsProvider( { children } ) {
	return (
		<MDXProvider components={ components }>
			{ children }
		</MDXProvider>
	);
}
