import { useCallback, useLayoutEffect, useRef } from 'react';

/**
 * Hook for creating a dynamic callback with potentially dangerous behavior.
 *
 * This hook returns a callback function that dynamically changes its behavior
 * based on the latest value passed to it. It uses useRef to store the latest
 * callback function and updates it using useLayoutEffect when the callback
 * dependency changes.
 *
 * WARNING: This approach has potential side effects and might be considered
 * dangerous. Use with caution.
 *
 * @param {Function} callback - The initial callback function.
 * @returns {Function} - The dynamic callback function.
 */
export function useDynamicCallbackDANGEROUS(callback) {
  // useRef is used to store the latest callback function
  const latestCallback = useRef(callback);

  // useLayoutEffect is used to update the stored callback when the dependency changes
  useLayoutEffect(() => {
    latestCallback.current = callback;
  }, [callback]);

  // useCallback is used to memoize the callback function
  return useCallback(function () {
    // The stored callback is invoked with the same arguments
    return latestCallback.current.apply(null, arguments);
  }, []);
}
