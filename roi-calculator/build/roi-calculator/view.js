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
function evaluateFormula(formula, values) {
  const keys = Object.keys(values);
  const vals = Object.values(values);
  const fn = new Function(...keys, `return ${formula}`);
  const result = fn(...vals);
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
    const resultElems = calc.querySelectorAll('.roi-result'); // Get all result display elements
    const formulas = JSON.parse(calc.dataset.calculations || '[]'); // Get formulas from the block's data attribute

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
      const valuesCopy = {
        ...values
      }; // This includes user input + calculated results

      let safetyCounter = 100; // Prevent infinite loop

      while (remaining.length && safetyCounter--) {
        for (let i = 0; i < remaining.length; i++) {
          const field = remaining[i];
          try {
            // Try evaluating with current known values
            const result = (0,_evaluateFormula__WEBPACK_IMPORTED_MODULE_0__.evaluateFormula)(field.formula, valuesCopy);
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
})();

/******/ })()
;
//# sourceMappingURL=view.js.map