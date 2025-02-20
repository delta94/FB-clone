import { useLayoutEffect, useRef, useState } from 'react';

export function useTooltipDelayedContent({ delayContentMs, isVisible }) {
  const isVisibleRef = useRef(isVisible);
  const timeoutRef = useRef(null);
  const [isPending, setPending] = useState(() => isVisible && !isVisibleRef.current && delayContentMs > 0);

  useLayoutEffect(() => {
    if (isVisible && !isVisibleRef.current && delayContentMs > 0) {
      setPending(true);
      timeoutRef.current = setTimeout(() => {
        setPending(false);
        timeoutRef.current = null;
      }, delayContentMs);
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    } else if (timeoutRef.current) {
      setPending(false);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    isVisibleRef.current = isVisible;
  }, [delayContentMs, isVisible, isVisibleRef]);

  return { isPending };
}
