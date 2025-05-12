/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/roi-calculator/evaluateFormula.js":
/*!***********************************************!*\
  !*** ./src/roi-calculator/evaluateFormula.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   evaluateFormula: () => (/* binding */ evaluateFormula)
/* harmony export */ });
// Evaluate a formula string with given values

// Eg
// Evaluating formula: profitPerUnit * unitsPerYear
// With values: Object { percIncrease: 0.1, hours: 24, days: 7, weeksPerYear: 50, unitsPerHour: 22500, profitPerUnit: 2, hoursInAWeek: 168, extraHours: 16.8, extraUnitsPerWeek: 378000, unitsPerYear: 18900000 }
// The result will be 37800000

function evaluateFormula(formula, values) {
  const keys = Object.keys(values);
  const vals = Object.values(values);

  // Create a dynamic function to evaluate the formula
  // Eg:
  // function anonymous(percIncrease, hours, days, weeksPerYear, unitsPerHour, profitPerUnit, hoursInAWeek, extraHours, extraUnitsPerWeek, unitsPerYear) {
  //      return profitPerUnit * unitsPerYear;
  // }
  const evaluate = new Function(...keys, `return ${formula}`);
  const result = evaluate(...vals);
  return isNaN(result) ? 'Error' : result;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************************!*\
  !*** ./src/roi-calculator/view.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _evaluateFormula__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./evaluateFormula */ "./src/roi-calculator/evaluateFormula.js");

document.addEventListener('DOMContentLoaded', () => {
  // Iterate over each ROI Calculator block on the page
  document.querySelectorAll('.roi-calculator').forEach(calc => {
    const inputs = calc.querySelectorAll('input'); // Get all input fields
    const formulas = JSON.parse(calc.dataset.calculations || '[]'); // Get formulas from the block's data attribute

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
      const valuesCopy = {
        ...values
      }; // This includes user input + calculated results

      let safetyCounter = 100; // Prevent infinite loop

      // Some formulas depend on others existing first
      // If a formula doesn't work yet, it will be stored in the remaining array.
      // This loop will keep trying to evaluate until all formulas are resolved or we hit the safety counter
      while (remaining.length && safetyCounter--) {
        for (let i = 0; i < remaining.length; i++) {
          const field = remaining[i];
          try {
            // Try evaluating with current known values
            const result = (0,_evaluateFormula__WEBPACK_IMPORTED_MODULE_0__.evaluateFormula)(field.formula, valuesCopy);
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
                    maximumFractionDigits: 2
                  });
                  if (shouldShowCurrency) {
                    formattedValue = '£' + Number(result).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    });
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
})();

/******/ })()
;
//# sourceMappingURL=view.js.map