import { useCallback, useEffect, useRef } from 'react';

export function useGetComposingState() {
  let isComposingRef = useRef(false);

  let startComposition = useCallback(() => {
    isComposingRef.current = true;
  }, []);

  let endComposition = useCallback(() => {
    isComposingRef.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener('compositionstart', startComposition);
    window.addEventListener('compositionend', endComposition);

    return function cleanup() {
      window.removeEventListener('compositionstart', startComposition);
      window.removeEventListener('compositionend', endComposition);
    };
  }, [startComposition, endComposition]);

  return function getCompositionState(event) {
    return event.isComposing || isComposingRef.current;
  };
}
