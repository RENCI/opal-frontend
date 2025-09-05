/**
 * Converts a string representation of a chemical formula into valid LaTeX syntax
 * with appropriate subscripts.
 * 
 * @param {string} formula The input chemical formula string.
 * @returns {string} The formatted chemical formula string with LaTeX subscripts.
 */
export const chemicalFormulaLaTeX = formula => {
  let formattedFormula = ''
  let i = 0
  while (i < formula.length) {
    let char = formula[i]
    let nextChar = formula[i + 1]
    
    // Check if current character is a letter and the next one is a digit
    if (/[A-Za-z]/.test(char) && /[0-9]/.test(nextChar)) {
      formattedFormula += char + '_{' + nextChar
      i += 2 // Skip the next character since it's already processed
      // Check for consecutive digits
      while (/[0-9]/.test(formula[i])) {
        formattedFormula += formula[i]
        i++
      }
      formattedFormula += '}'
    } else {
      formattedFormula += char
      i++
    }
  }
  return formattedFormula
}
