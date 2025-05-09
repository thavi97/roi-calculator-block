import { evaluateFormula } from './evaluateFormula';

document.addEventListener('DOMContentLoaded', () => {
	// Iterate over each ROI Calculator block on the page
	document.querySelectorAll('.roi-calculator').forEach((calc) => {
		const inputs = calc.querySelectorAll('input');  // Get all input fields
		const resultElems = calc.querySelectorAll('.roi-result');  // Get all result display elements
		const formulas = JSON.parse(calc.dataset.calculations || '[]');  // Get formulas from the block's data attribute

		// Function to perform calculation
		const calculate = () => {
			const values = {};

			// Collect all input values
			inputs.forEach(input => {
				const key = input.dataset.key;
				let value;

				if (input.type === 'range') {
					// For range inputs, we get the value and update the adjacent span
					value = parseFloat(input.value) || 0;

					const isPercentage = input.dataset.percentage === 'yes';

					// Update the displayed value of the range slider dynamically
					const rangeValueDisplay = input.nextElementSibling;
					if (rangeValueDisplay) {
						rangeValueDisplay.textContent = value + (isPercentage ? '%' : '');
					}
				} else {
					// For other input types (number, text), use the input's value
					value = parseFloat(input.value) || 0;
				}

				values[key] = value;
			});

			// Evaluate calculated fields in dependency order
			// Clone formulas to avoid modifying the original array
			const remaining = [...formulas];
			const valuesCopy = { ...values }; // This includes user input + calculated results

			let safetyCounter = 100; // Prevent infinite loop

			while (remaining.length && safetyCounter--) {
				for (let i = 0; i < remaining.length; i++) {
					const field = remaining[i];
					try {
						// Try evaluating with current known values
						const result = evaluateFormula(field.formula, valuesCopy);

						if (result !== 'Error') {
							valuesCopy[field.key] = result;

							// Update DOM
							const el = calc.querySelector(`.roi-result[data-key="${field.key}"] span`);
							if (el) {
								el.textContent = isNaN(result) ? 'Error' : result.toFixed(2);
							}

							// Remove from remaining to calculate
							remaining.splice(i, 1);
							i--; // Adjust index after removal
						}
					} catch (e) {
						// If error, skip and try again later
					}
				}
			}


		};

		// Event listeners for input changes to trigger the calculation
		inputs.forEach(input => input.addEventListener('input', calculate));

		// Initial calculation to set the default result values
		calculate();
	});
});

