import { Routes, Route, Navigate } from 'react-router-dom';
import DocLayout from './layouts/DocLayout';
import GettingStarted from './docs/getting-started.mdx';
import AlertDocs from './docs/alert.mdx';
import ButtonDocs from './docs/button.mdx';
import CardDocs from './docs/card.mdx';
import ToggleControlDocs from './docs/toggle-control.mdx';
import SelectControlDocs from './docs/select-control.mdx';
import RangeControlDocs from './docs/range-control.mdx';
import TextControlDocs from './docs/text-control.mdx';
import DateTimePickerDocs from './docs/date-time-picker.mdx';
import CheckboxControlDocs from './docs/checkbox-control.mdx';
import ColorPaletteDocs from './docs/color-palette.mdx';
import ColorPickerDocs from './docs/color-picker.mdx';

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
				<Route path="/docs/range-control" element={ <RangeControlDocs /> } />
				<Route path="/docs/text-control" element={ <TextControlDocs /> } />
				<Route path="/docs/date-time-picker" element={ <DateTimePickerDocs /> } />
				<Route path="/docs/checkbox-control" element={ <CheckboxControlDocs /> } />
				<Route path="/docs/color-palette" element={ <ColorPaletteDocs /> } />
				<Route path="/docs/color-picker" element={ <ColorPickerDocs /> } />
			</Routes>
		</DocLayout>
	);
}
