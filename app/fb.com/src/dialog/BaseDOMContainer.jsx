import React, { forwardRef, memo, useLayoutEffect, useRef } from 'react';
import { useMergeRefs } from '@fb-hooks';

export const BaseDOMContainer = memo(
  forwardRef(({ node }, ref) => {
    const storeRef = useRef(null);
    useLayoutEffect(() => {
      if (node && storeRef.current) {
        storeRef.current.appendChild(node);

        return () => {
          storeRef.current.removeChild(node);
        };
      }
    }, [node]);

    // BUG
    // const mergeRef = useMergeRefs_Legacy(ref, storeRef);
    const mergeRef = useMergeRefs(ref, storeRef);

    return <div ref={mergeRef} />;
  }),
);
