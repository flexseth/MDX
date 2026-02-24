import { Routes, Route, Navigate } from 'react-router-dom';
import DocLayout from './layouts/DocLayout';
import GettingStarted from './docs/getting-started.mdx';
import AlertDocs from './docs/alert.mdx';
import BaseControlDocs from './docs/base-control.mdx';
import BlockControlsDocs from './docs/block-controls.mdx';
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
import DropdownDocs from './docs/dropdown.mdx';
import DropdownMenuDocs from './docs/dropdown-menu.mdx';
import FlexDocs from './docs/flex.mdx';
import FocalPointPickerDocs from './docs/focal-point-picker.mdx';
import FontSizePickerDocs from './docs/font-size-picker.mdx';
import FormTokenFieldDocs from './docs/form-token-field.mdx';
import GuideDocs from './docs/guide.mdx';
import InspectorControlsDocs from './docs/inspector-controls.mdx';
import MediaUploadDocs from './docs/media-upload.mdx';
import ModalDocs from './docs/modal.mdx';
import NoticeDocs from './docs/notice.mdx';
import NumberControlDocs from './docs/number-control.mdx';
import PanelBodyDocs from './docs/panel-body.mdx';
import PlaceholderDocs from './docs/placeholder.mdx';
import PopoverDocs from './docs/popover.mdx';
import RadioControlDocs from './docs/radio-control.mdx';
import RangeControlDocs from './docs/range-control.mdx';
import RichTextDocs from './docs/rich-text.mdx';
import SearchControlDocs from './docs/search-control.mdx';
import SelectControlDocs from './docs/select-control.mdx';
import SnackbarDocs from './docs/snackbar.mdx';
import SpacerDocs from './docs/spacer.mdx';
import SpinnerDocs from './docs/spinner.mdx';
import TabPanelDocs from './docs/tab-panel.mdx';
import TabsDocs from './docs/tabs.mdx';
import TextareaControlDocs from './docs/textarea-control.mdx';
import TextControlDocs from './docs/text-control.mdx';
import ToggleControlDocs from './docs/toggle-control.mdx';
import ToggleGroupControlDocs from './docs/toggle-group-control.mdx';
import ToolsPanelDocs from './docs/tools-panel.mdx';
import TooltipDocs from './docs/tooltip.mdx';
import UnitControlDocs from './docs/unit-control.mdx';

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
				<Route path="/docs/block-controls" element={ <BlockControlsDocs /> } />
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
				<Route path="/docs/dropdown" element={ <DropdownDocs /> } />
				<Route path="/docs/dropdown-menu" element={ <DropdownMenuDocs /> } />
				<Route path="/docs/flex" element={ <FlexDocs /> } />
				<Route path="/docs/focal-point-picker" element={ <FocalPointPickerDocs /> } />
				<Route path="/docs/font-size-picker" element={ <FontSizePickerDocs /> } />
				<Route path="/docs/form-token-field" element={ <FormTokenFieldDocs /> } />
				<Route path="/docs/guide" element={ <GuideDocs /> } />
				<Route path="/docs/inspector-controls" element={ <InspectorControlsDocs /> } />
				<Route path="/docs/media-upload" element={ <MediaUploadDocs /> } />
				<Route path="/docs/modal" element={ <ModalDocs /> } />
				<Route path="/docs/notice" element={ <NoticeDocs /> } />
				<Route path="/docs/number-control" element={ <NumberControlDocs /> } />
				<Route path="/docs/panel-body" element={ <PanelBodyDocs /> } />
				<Route path="/docs/placeholder" element={ <PlaceholderDocs /> } />
				<Route path="/docs/popover" element={ <PopoverDocs /> } />
				<Route path="/docs/radio-control" element={ <RadioControlDocs /> } />
				<Route path="/docs/range-control" element={ <RangeControlDocs /> } />
				<Route path="/docs/rich-text" element={ <RichTextDocs /> } />
				<Route path="/docs/search-control" element={ <SearchControlDocs /> } />
				<Route path="/docs/select-control" element={ <SelectControlDocs /> } />
				<Route path="/docs/snackbar" element={ <SnackbarDocs /> } />
				<Route path="/docs/spacer" element={ <SpacerDocs /> } />
				<Route path="/docs/spinner" element={ <SpinnerDocs /> } />
				<Route path="/docs/tab-panel" element={ <TabPanelDocs /> } />
				<Route path="/docs/tabs" element={ <TabsDocs /> } />
				<Route path="/docs/textarea-control" element={ <TextareaControlDocs /> } />
				<Route path="/docs/text-control" element={ <TextControlDocs /> } />
				<Route path="/docs/toggle-control" element={ <ToggleControlDocs /> } />
				<Route path="/docs/toggle-group-control" element={ <ToggleGroupControlDocs /> } />
				<Route path="/docs/tools-panel" element={ <ToolsPanelDocs /> } />
				<Route path="/docs/tooltip" element={ <TooltipDocs /> } />
				<Route path="/docs/unit-control" element={ <UnitControlDocs /> } />
			</Routes>
		</DocLayout>
	);
}
