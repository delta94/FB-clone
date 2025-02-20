import { useMemo } from 'react';

/**
 * React hook for creating an unsafe ref. (Deprecated)
 *
 * This hook creates a ref object with a `current` property set to the provided value.
 * Note that using this hook is discouraged, and you should consider using the useRef hook
 * instead for creating refs in a React functional component.
 *
 * @template T - The type of the value to set as the `current` property of the ref.
 * @param {T} value - The value to set as the `current` property of the ref.
 * @return {React.MutableRefObject<T>} - A ref object with a `current` property set to the provided value.
 *
 * @deprecated This hook is deprecated. Consider using the useRef hook for creating refs
 * in a React functional component.
 *
 * @example
 * // Example usage of useUnsafeRef_DEPRECATED
 * const myValue = 'example';
 * const myRef = useUnsafeRef_DEPRECATED(myValue);
 * console.log(myRef.current); // Outputs: 'example'
 */
export function useUnsafeRef_DEPRECATED(value) {
  return useMemo(() => {
    return {
      current: value,
    };
  }, []);
}
