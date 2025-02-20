import { useContext, useEffect, useRef } from 'react';

import { LayoutAnimationBoundaryContext } from '@fb-contexts';
import { LAYOUT_ANIMATION_EVENT } from '@fb-dialog/LayoutAnimationEvents';

export const useLayoutAnimationEvents = (callback) => {
  const context = useContext(LayoutAnimationBoundaryContext);

  const listeners = useRef([]);

  useEffect(() => {
    const targets = context?.animationEventTargets || [];

    targets.forEach((target) => {
      const listener = target.addListener(LAYOUT_ANIMATION_EVENT, callback);
      listeners.current = [...listeners.current, listener];
    });

    return () => {
      listeners.current.forEach((listener) => {
        listener.remove();
      });
      listeners.current = [];
    };
  }, [callback, context]);
};
