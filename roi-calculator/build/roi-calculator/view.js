/******/ (() => { // webpackBootstrap
/*!************************************!*\
  !*** ./src/roi-calculator/view.js ***!
  \************************************/
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.roi-calculator').forEach(calc => {
    const inputs = calc.querySelectorAll('input');
    const resultElems = calc.querySelectorAll('.roi-result');
    const formulas = JSON.parse(calc.dataset.calculations || '[]'); // Get formulas from the block

    // Function to perform calculation
    const calculate = () => {
      const values = {};

      // Collect all input values
      inputs.forEach(input => {
        const key = input.dataset.key;
        let value = parseFloat(input.value) || 0;

        // Handle different input types (e.g., number, text, etc.)
        if (input.type === 'number' || input.type === 'tel') {
          value = parseFloat(input.value) || 0;
        } else if (input.type === 'text' || input.type === 'email') {
          value = input.value.trim();
        }

        // Store the value by key (same as in the editor)
        values[key] = value;
      });

      // Update the result elements based on the formula for each calculated field
      formulas.forEach(field => {
        try {
          // Evaluate the formula using the current input values
          const result = Function(...Object.keys(values), `return ${field.formula}`)(...Object.values(values));
          const el = calc.querySelector(`.roi-result[data-key="${field.key}"] span`);

          // Update the result value or show an error
          if (el) {
            el.textContent = isNaN(result) ? 'Error' : result.toFixed(2);
          }
        } catch {
          const el = calc.querySelector(`.roi-result[data-key="${field.key}"] span`);
          if (el) el.textContent = 'Error';
        }
      });
    };

    // Add event listeners to input fields
    inputs.forEach(input => input.addEventListener('input', calculate));

    // Perform calculation once on load to set initial values
    calculate();
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map