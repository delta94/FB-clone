// let g = "js_";
// let h = 36;
// let i = 0;

// export function uniqueID(a, b) {
//   a === undefined && (a = g);
//   b === undefined && (b = !1);
//   return b ? a : a + (i++).toString(h);
// }

let prefix = 'js_';
let base = 36;
let counter = 0;

/**
 * Generates a unique ID.
 *
 * @param {string} [customPrefix="js_"] - Custom prefix for the ID.
 * @param {boolean} [onlyPrefix=false] - If true, returns only the prefix.
 * @returns {string} - The generated unique ID.
 */
export function uniqueID(customPrefix = prefix, onlyPrefix = false) {
  return onlyPrefix ? customPrefix : customPrefix + (counter++).toString(base);
}
