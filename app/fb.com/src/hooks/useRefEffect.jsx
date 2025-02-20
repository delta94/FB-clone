import { useCallback, useRef } from 'react';

export const useRefEffect = (effect, deps) => {
  const cleanupRef = useRef(null);

  return useCallback((element) => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    if (element !== null) {
      cleanupRef.current = effect(element) || null;
    }
  }, deps);
};
