import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, Button } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	const { inputFields = [], calculatedFields = [] } = attributes;

	// Update input field attributes
	const updateInputField = (index, key, value) => {
		const newFields = [...inputFields];
		newFields[index][key] = value;
		setAttributes({ inputFields: newFields });
	};

	// Add a new input field
	const addInputField = () => {
		setAttributes({
			inputFields: [
				...inputFields,
				{ label: '', key: '', type: 'number', placeholder: '' }
			]
		});
	};

	// Remove an input field
	const removeInputField = (index) => {
		const newFields = inputFields.filter((_, i) => i !== index);
		setAttributes({ inputFields: newFields });
	};

	// Update calculated field attributes
	const updateCalculatedField = (index, key, value) => {
		const newFields = [...calculatedFields];
		newFields[index][key] = value;
		setAttributes({ calculatedFields: newFields });
	};

	// Add a new calculated field
	const addCalculatedField = () => {
		setAttributes({
			calculatedFields: [
				...calculatedFields,
				{ label: '', key: '', formula: '' }
			]
		});
	};

	// Remove a calculated field
	const removeCalculatedField = (index) => {
		const newFields = calculatedFields.filter((_, i) => i !== index);
		setAttributes({ calculatedFields: newFields });
	};

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title="Input Fields" initialOpen={true}>
					{inputFields.map((field, index) => (
						<Fragment key={index}>
							<TextControl
								label="Label"
								value={field.label}
								onChange={(val) => updateInputField(index, 'label', val)}
							/>
							<TextControl
								label="Key (unique identifier)"
								value={field.key}
								onChange={(val) => updateInputField(index, 'key', val)}
							/>
							<SelectControl
								label="Input Type"
								value={field.type}
								options={[
									{ label: 'Number', value: 'number' },
									{ label: 'Text', value: 'text' },
									{ label: 'Email', value: 'email' },
									{ label: 'Password', value: 'password' },
									{ label: 'Tel', value: 'tel' },
									{ label: 'Date', value: 'date' },
								]}
								onChange={(val) => updateInputField(index, 'type', val)}
							/>
							<TextControl
								label="Placeholder"
								value={field.placeholder}
								onChange={(val) => updateInputField(index, 'placeholder', val)}
							/>
							<Button isDestructive onClick={() => removeInputField(index)}>
								Remove Field
							</Button>
							<hr />
						</Fragment>
					))}
					<Button isPrimary onClick={addInputField}>Add Input Field</Button>
				</PanelBody>

				<PanelBody title="Calculated Fields" initialOpen={false}>
					{calculatedFields.map((field, index) => (
						<Fragment key={index}>
							<TextControl
								label="Label"
								value={field.label}
								onChange={(val) => updateCalculatedField(index, 'label', val)}
							/>
							<TextControl
								label="Key"
								value={field.key}
								onChange={(val) => updateCalculatedField(index, 'key', val)}
							/>
							<TextControl
								label="Formula (e.g., input1 * input2 + 10)"
								value={field.formula}
								onChange={(val) => updateCalculatedField(index, 'formula', val)}
							/>
							<Button isDestructive onClick={() => removeCalculatedField(index)}>
								Remove Field
							</Button>
							<hr />
						</Fragment>
					))}
					<Button isPrimary onClick={addCalculatedField}>Add Calculated Field</Button>
				</PanelBody>
			</InspectorControls>

			<div className="roi-editor-placeholder">
				<p><strong>ROI Calculator</strong></p>
			</div>
		</div>
	);
}
