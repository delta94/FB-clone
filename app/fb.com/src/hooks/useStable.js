import { useRef } from 'react';

/**
 * Custom React hook to obtain a stable reference to a value.
 *
 * @param {() => any} getValue - Function to get the value.
 * @returns {any} - The stable reference to the value.
 */
export function useStable(getValue) {
  const stableRef = useRef(null);
  const currentValue = stableRef.current;

  if (currentValue === null) {
    const value = getValue();
    stableRef.current = { value };
    return value;
  } else {
    // eslint-disable-next-line react-compiler/react-compiler
    return currentValue.value;
  }
}
