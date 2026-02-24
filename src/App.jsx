import { Routes, Route, Navigate } from 'react-router-dom';
import DocLayout from './layouts/DocLayout';
import GettingStarted from './docs/getting-started.mdx';
import AlertDocs from './docs/alert.mdx';
import BaseControlDocs from './docs/base-control.mdx';
import BoxControlDocs from './docs/box-control.mdx';
import ButtonDocs from './docs/button.mdx';
import ButtonGroupDocs from './docs/button-group.mdx';
import CardDocs from './docs/card.mdx';
import CheckboxControlDocs from './docs/checkbox-control.mdx';
import ColorPaletteDocs from './docs/color-palette.mdx';
import ColorPickerDocs from './docs/color-picker.mdx';
import ComboboxControlDocs from './docs/combobox-control.mdx';
import CustomSelectControlDocs from './docs/custom-select-control.mdx';
import DateTimePickerDocs from './docs/date-time-picker.mdx';
import DropdownMenuDocs from './docs/dropdown-menu.mdx';
import FlexDocs from './docs/flex.mdx';
import NumberControlDocs from './docs/number-control.mdx';
import PopoverDocs from './docs/popover.mdx';
import RangeControlDocs from './docs/range-control.mdx';
import SearchControlDocs from './docs/search-control.mdx';
import SelectControlDocs from './docs/select-control.mdx';
import SnackbarDocs from './docs/snackbar.mdx';
import SpacerDocs from './docs/spacer.mdx';
import TabsDocs from './docs/tabs.mdx';
import TextControlDocs from './docs/text-control.mdx';
import ToggleControlDocs from './docs/toggle-control.mdx';
import ToggleGroupControlDocs from './docs/toggle-group-control.mdx';
import ToolsPanelDocs from './docs/tools-panel.mdx';

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
				<Route path="/docs/base-control" element={ <BaseControlDocs /> } />
				<Route path="/docs/box-control" element={ <BoxControlDocs /> } />
				<Route path="/docs/button" element={ <ButtonDocs /> } />
				<Route path="/docs/button-group" element={ <ButtonGroupDocs /> } />
				<Route path="/docs/card" element={ <CardDocs /> } />
				<Route path="/docs/checkbox-control" element={ <CheckboxControlDocs /> } />
				<Route path="/docs/color-palette" element={ <ColorPaletteDocs /> } />
				<Route path="/docs/color-picker" element={ <ColorPickerDocs /> } />
				<Route path="/docs/combobox-control" element={ <ComboboxControlDocs /> } />
				<Route path="/docs/custom-select-control" element={ <CustomSelectControlDocs /> } />
				<Route path="/docs/date-time-picker" element={ <DateTimePickerDocs /> } />
				<Route path="/docs/dropdown-menu" element={ <DropdownMenuDocs /> } />
				<Route path="/docs/flex" element={ <FlexDocs /> } />
				<Route path="/docs/number-control" element={ <NumberControlDocs /> } />
				<Route path="/docs/popover" element={ <PopoverDocs /> } />
				<Route path="/docs/range-control" element={ <RangeControlDocs /> } />
				<Route path="/docs/search-control" element={ <SearchControlDocs /> } />
				<Route path="/docs/select-control" element={ <SelectControlDocs /> } />
				<Route path="/docs/snackbar" element={ <SnackbarDocs /> } />
				<Route path="/docs/spacer" element={ <SpacerDocs /> } />
				<Route path="/docs/tabs" element={ <TabsDocs /> } />
				<Route path="/docs/text-control" element={ <TextControlDocs /> } />
				<Route path="/docs/toggle-control" element={ <ToggleControlDocs /> } />
				<Route path="/docs/toggle-group-control" element={ <ToggleGroupControlDocs /> } />
				<Route path="/docs/tools-panel" element={ <ToolsPanelDocs /> } />
			</Routes>
		</DocLayout>
	);
}
