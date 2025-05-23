import { useBlockProps, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, FontSizePicker, Button } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	const {
		inputFields = [],
		calculatedFields = [],
		backgroundColor = '#286cfc',
		textColor = '#ffffff',
		sliderColor = '#00cc66',
		fontSize = '16px',
	} = attributes;

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

				{/* Adjust the color settings */}
				<PanelColorSettings
					title="Color Settings"
					initialOpen={true}
					colorSettings={[
						{
							label: 'Background Color',
							value: backgroundColor,
							onChange: (color) => setAttributes({ backgroundColor: color }),
						},
						{
							label: 'Text Color',
							value: textColor,
							onChange: (color) => setAttributes({ textColor: color }),
						},
						{
							label: 'Slider Color',
							value: sliderColor,
							onChange: (color) => setAttributes({ sliderColor: color }),
						},
					]}
				/>

				{/* Adjust the font size */}
				<PanelBody title="Font Size" initialOpen={true}>
					<FontSizePicker
						value={fontSize}
						onChange={(newSize) => setAttributes({ fontSize: newSize })}
						withSlider
						fontSizes={[
							{ name: 'Small', slug: 'small', size: '14px' },
							{ name: 'Medium', slug: 'medium', size: '16px' },
							{ name: 'Large', slug: 'large', size: '20px' },
							{ name: 'Extra Large', slug: 'extra-large', size: '24px' },
						]}
					/>
				</PanelBody>

				{/* Create the input fields */}
				<PanelBody title="Input Fields" initialOpen={true}>
					{inputFields.map((field, index) => (
						<Fragment key={index}>
							{/* Edit the label */}
							<TextControl
								label="Label"
								value={field.label}
								onChange={(val) => updateInputField(index, 'label', val)}
							/>

							{/* Edit the key */}
							<TextControl
								label="Key"
								value={field.key}
								onChange={(val) => updateInputField(index, 'key', val)}
							/>

							{/* Select the field type */}
							<SelectControl
								label="Input Type"
								value={field.type}
								options={[
									{ label: 'Number', value: 'number' },
									{ label: 'Money', value: 'money' },
									{ label: 'Text', value: 'text' },
									{ label: 'Slider', value: 'range' },
								]}
								onChange={(val) => updateInputField(index, 'type', val)}
							/>

							{/* This field determines whether the value are percentages */}
							{field.type === 'range' && (
								<SelectControl
									label="Is Percentage"
									value={field.isPercentage || 'no'}
									options={[
										{ label: 'Yes', value: 'yes' },
										{ label: 'No', value: 'no' },
									]}
									onChange={(val) => updateInputField(index, 'isPercentage', val)}
								/>
							)}

							{/* Adjust the minimum value */}
							<TextControl
								label="Min Value"
								value={field.min}
								onChange={(val) => {
									// Update the min value and ensure max is not smaller than min
									const newMin = parseFloat(val) || 0;
									if (field.max && newMin > parseFloat(field.max)) {
										updateInputField(index, 'max', newMin);
									}
									updateInputField(index, 'min', newMin);
								}}
								type="number"
								step="1"
								placeholder="Enter minimum value"
							/>

							{/* Adjust the maximum value */}
							<TextControl
								label="Max Value"
								value={field.max}
								// Update the max value and ensure min is not larger than max
								onChange={(val) => {									
									const newMax = parseFloat(val) || 0;
									if (field.min && newMax < parseFloat(field.min)) {
										updateInputField(index, 'min', newMax);
									}
									updateInputField(index, 'max', newMax);
								}}
								type="number"
								step="1"
								placeholder="Enter maximum value"
							/>

							{/* Adjust the step value */}
							<TextControl
								label="Step"
								value={field.step}
								onChange={(val) => {
									updateInputField(index, 'step', val);
								}}
								type="number"
								step="0.01"
								placeholder="Enter step value (Default: 1)"
							/>
							<Button isDestructive onClick={() => removeInputField(index)}>
								Remove Field
							</Button>
							<hr />
						</Fragment>
					))}
					<Button onClick={addInputField}>Add Input Field</Button>
				</PanelBody>

				{/* Adjust the calculated fields */}
				<PanelBody title="Calculated Fields" initialOpen={false}>
					{calculatedFields.map((field, index) => (
						<Fragment key={index}>
							{/* Edit the label */}
							<TextControl
								label="Label"
								value={field.label}
								onChange={(val) => updateCalculatedField(index, 'label', val)}
							/>

							{/* Edit the key */}
							<TextControl
								label="Key"
								value={field.key}
								onChange={(val) => updateCalculatedField(index, 'key', val)}
							/>

							{/* Edit the formula */}
							<TextControl
								label="Formula (e.g., key1 * key2 + 10)"
								value={field.formula}
								onChange={(val) => updateCalculatedField(index, 'formula', val)}
							/>

							{/* This field determines whether the value is a currency */}
							<SelectControl
								label="Is Currency"
								value={field.isCurrency || 'no'}
								options={[
									{ label: 'Yes', value: 'yes' },
									{ label: 'No', value: 'no' },
								]}
								onChange={(val) => updateCalculatedField(index, 'isCurrency', val)}
							/>

							<Button isDestructive onClick={() => removeCalculatedField(index)}>
								Remove Field
							</Button>
							<hr />
						</Fragment>
					))}
					<Button onClick={addCalculatedField}>Add Calculated Field</Button>
				</PanelBody>
			</InspectorControls>

			<div className="roi-editor-placeholder">
				<p><strong>ROI Calculator</strong></p>
				<p>Please configure the block using the editor on the right pane</p>
			</div>
		</div>
	);
}
