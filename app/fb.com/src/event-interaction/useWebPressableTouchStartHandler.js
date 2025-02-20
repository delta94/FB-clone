import { useEffect } from 'react';
import { useDynamicCallbackDANGEROUS } from '@fb-hooks';
import UserAgent from 'fbjs/lib/UserAgent';

import { passiveEventListenerUtil } from './passiveEventListenerUtil';

const isSafariOrMobileSafari = UserAgent.isBrowser('Safari') || UserAgent.isBrowser('Mobile Safari');

let preventTextSelectionOnSafari = isSafariOrMobileSafari
  ? (event) => {
      const body = !window ? undefined : !window.document ? undefined : window.document.body;
      if (!body) {
        return;
      }

      body.style.WebkitUserSelect = 'none';

      const eventOptions = passiveEventListenerUtil.makeEventOptions({
        passive: !0,
      });

      const restoreSelection = () => {
        body.style.WebkitUserSelect = null;
        document.removeEventListener('touchend', event, eventOptions);
      };
      document.addEventListener('touchend', event, eventOptions);

      return restoreSelection;
    }
  : null;

function isElementInDocument(element) {
  return typeof document !== 'undefined' && typeof document.contains === 'function'
    ? document.contains(element)
    : false;
}

export function useWebPressableTouchStartHandler(ref, touchManager, callback) {
  const dynamicCallback = useDynamicCallbackDANGEROUS(callback);

  useEffect(() => {
    const element = ref.current;
    const body = window?.document?.body;

    if (!element || !body || !element.addEventListener || !isElementInDocument(element)) {
      return;
    }

    let touchHandler = null;

    // Register touch start behavior
    if (touchManager) {
      touchManager.register(element, dynamicCallback);

      touchHandler = (event) => {
        event.preventDefault();
        touchManager.onTouchStart();
      };
    }

    // Combine handlers
    const combinedHandler = (event) => {
      if (touchHandler) touchHandler(event);
      if (isSafariOrMobileSafari) preventTextSelectionOnSafari(event);
    };

    const eventOptions = passiveEventListenerUtil.makeEventOptions({
      passive: !touchManager,
    });

    element.addEventListener('touchstart', combinedHandler, eventOptions);

    // Cleanup
    return () => {
      if (touchManager) touchManager.unRegister(element);
      element.removeEventListener('touchstart', combinedHandler, eventOptions);
    };
  }, [dynamicCallback, ref, touchManager]);
}
