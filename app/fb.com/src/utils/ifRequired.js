export function ifRequired(moduleId, callback, fallback) {
  let module;

  if (typeof require === 'function') {
    try {
      module = require(moduleId);
    } catch (err) {
      module = null;
    }
  }

  if (module && callback) {
    return callback(module);
  } else if (!module && fallback) {
    return fallback();
  }
}
