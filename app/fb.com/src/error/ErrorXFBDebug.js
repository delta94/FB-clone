/**
 * Changelog:
 * - 09/12/2024
 */

// Debug info list and max size
const maxDebugInfo = 5;
const debugInfoList = [];

// Error handling metadata utilities
export const ErrorXFBDebug = {
  add(debugInfo) {
    debugInfoList.push(debugInfo);
    if (debugInfoList.length > maxDebugInfo) {
      debugInfoList.shift();
    }
  },
  addFromXHR(xhr) {
    const allHeaders = xhr.getAllResponseHeaders();
    if (allHeaders && allHeaders.indexOf('X-FB-Debug') >= 0) {
      const debugHeader = xhr.getResponseHeader('X-FB-Debug');
      if (debugHeader) {
        ErrorXFBDebug.add(debugHeader);
      }
    }
  },
  getAll() {
    return debugInfoList;
  },
};
