import { evaluateFormula } from './evaluateFormula';

document.addEventListener('DOMContentLoaded', () => {
	// Iterate over each ROI Calculator block on the page
	document.querySelectorAll('.roi-calculator').forEach((calc) => {
		const inputs = calc.querySelectorAll('input');  // Get all input fields
		const formulas = JSON.parse(calc.dataset.calculations || '[]');  // Get formulas from the block's data attribute

		/* Function to perform calculation in real time
		* This function will be called whenever an input changes
		*/
		const calculate = () => {
			const values = {};

			// Collect all input values
			inputs.forEach(input => {
				const key = input.dataset.key;
				let value;

				// For range inputs, we get the value and update the adjacent span
				if (input.type === 'range') {		
					value = parseFloat(input.value) || 0;
					const isPercentage = input.dataset.percentage === 'yes';

					// Update the displayed value before modifying the value
					const rangeValueDisplay = input.nextElementSibling;
					if (rangeValueDisplay) {
						rangeValueDisplay.textContent = input.value + (isPercentage ? '%' : '');
					}

					// Internally use decimal if it's a percentage
					if (isPercentage) {
						value = value / 100;
					}
				} 
				// For money inputs, the value is formatted to 2 decimal places
				else if (input.dataset.type === 'money') {
					value = parseFloat(input.value) || 0;
					value = parseFloat(value.toFixed(2));
					input.value = value.toFixed(2); 
				}
				// For other input types (number, text), use the input's value
				else {
					value = parseFloat(input.value) || 0;
				}

				values[key] = value;
			});

			// Evaluate calculated fields in dependency order
			// Clone formulas to avoid modifying the original array
			const remaining = [...formulas];
			const valuesCopy = { ...values }; // This includes user input + calculated results

			let safetyCounter = 100; // Prevent infinite loop

			// Some formulas depend on others existing first
			// If a formula doesn't work yet, it will be stored in the remaining array.
			// This loop will keep trying to evaluate until all formulas are resolved or we hit the safety counter
			while (remaining.length && safetyCounter--) {
				for (let i = 0; i < remaining.length; i++) {
					const field = remaining[i];
					try {
						// Try evaluating with current known values
						const result = evaluateFormula(field.formula, valuesCopy);
						if (result !== 'Error') {
							valuesCopy[field.key] = result;

							const el = calc.querySelector(`.roi-result[data-key="${field.key}"] span`);
							if (el) {
								const fieldDefinition = formulas.find(function (f) {
									return f.key === field.key;
								});

								// This check is to determine if the field is a currency or not
								// If the field is a currency, show it as a currency
								let shouldShowCurrency = false;
								if (fieldDefinition.isCurrency === 'yes') {
									shouldShowCurrency = true;
								}

								// First check if the result is a number
								// If it's not a number, display an error message.
								// If it is a number, format it.
								let formattedValue;
								if (isNaN(result)) {
									formattedValue = 'Error';
								} else {
									let numberString = Number(result).toLocaleString(undefined, {
										maximumFractionDigits: 2,
									});

									if (shouldShowCurrency) {
										formattedValue = '£' + Number(result).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
									} else {
										formattedValue = numberString;
									}
								}

								el.textContent = formattedValue;
							}

							remaining.splice(i, 1);
							i--;
						}
					} catch (e) {
						// If error, skip and try again later
					}
				}
			}


		};

		inputs.forEach(input => input.addEventListener('input', calculate));
		calculate();
	});
});

