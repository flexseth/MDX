import { Routes, Route, Navigate } from 'react-router-dom';
import DocLayout from './layouts/DocLayout';
import GettingStarted from './docs/getting-started.mdx';
import AlertDocs from './docs/alert.mdx';
import ButtonDocs from './docs/button.mdx';
import CardDocs from './docs/card.mdx';
import ToggleControlDocs from './docs/toggle-control.mdx';
import SelectControlDocs from './docs/select-control.mdx';

/**
 * Application root with documentation routes.
 */
export default function App() {
	return (
		<DocLayout>
			<Routes>
				<Route path="/" element={ <Navigate to="/docs/getting-started" replace /> } />
				<Route path="/docs/getting-started" element={ <GettingStarted /> } />
				<Route path="/docs/alert" element={ <AlertDocs /> } />
				<Route path="/docs/button" element={ <ButtonDocs /> } />
				<Route path="/docs/card" element={ <CardDocs /> } />
				<Route path="/docs/toggle-control" element={ <ToggleControlDocs /> } />
				<Route path="/docs/select-control" element={ <SelectControlDocs /> } />
			</Routes>
		</DocLayout>
	);
}
