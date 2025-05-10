import { useBlockProps, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl,  Button } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	const {
		inputFields = [],
		calculatedFields = [],
		backgroundColor = '#286cfc',
		textColor = '#ffffff',
		sliderColor = '#00cc66',
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

				<PanelBody title="Input Fields" initialOpen={true}>
					{inputFields.map((field, index) => (
						<Fragment key={index}>
							<TextControl
								label="Label"
								value={field.label}
								onChange={(val) => updateInputField(index, 'label', val)}
							/>
							<TextControl
								label="Key"
								value={field.key}
								onChange={(val) => updateInputField(index, 'key', val)}
							/>
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
							<TextControl
								label="Max Value"
								value={field.max}
								onChange={(val) => {
									// Update the max value and ensure min is not larger than max
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
			</div>
		</div>
	);
}
