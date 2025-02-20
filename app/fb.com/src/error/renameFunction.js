/**
 * Changelog:
 * - 09/12/2024
 */

// Function to rename a function
export function renameFunction(func, name) {
  if (func && name) {
    try {
      Object.defineProperty(func, 'name', {
        value: '<CUSTOM_NAME: ' + name + '>',
      });
    } catch (e) {}
  }
  return func;
}
