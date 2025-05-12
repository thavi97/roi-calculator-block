// Evaluate a formula string with given values

// Eg
// Evaluating formula: profitPerUnit * unitsPerYear
// With values: Object { percIncrease: 0.1, hours: 24, days: 7, weeksPerYear: 50, unitsPerHour: 22500, profitPerUnit: 2, hoursInAWeek: 168, extraHours: 16.8, extraUnitsPerWeek: 378000, unitsPerYear: 18900000 }
// The result will be 37800000

export function evaluateFormula(formula, values) {
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