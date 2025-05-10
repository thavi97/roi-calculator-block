export function evaluateFormula(formula, values) {
    const keys = Object.keys(values);
    const vals = Object.values(values);
    const fn = new Function(...keys, `return ${formula}`);
    const result = fn(...vals);
    return isNaN(result) ? 'Error' : result;
}
