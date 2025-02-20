import { useEffect } from 'react';

import { ReactEventHookPropagation } from './ReactEventHookPropagation';
import { useReactEvent } from './ReactUseEvent';

function useContextMenu(target, options) {
  const { disabled, onContextMenu, preventDefault } = options;

  const contextmenuHandler = useReactEvent('contextmenu');

  useEffect(() => {
    const curr = target.current;
    if (curr) {
      contextmenuHandler.setListener(curr, (param) => {
        if (disabled === true) {
          return;
        }

        if (ReactEventHookPropagation.hasEventHookPropagationStopped(param, 'useContextMenu')) {
          return;
        }

        ReactEventHookPropagation.stopEventHookPropagation(param, 'useContextMenu');

        if (preventDefault !== false && !param.nativeEvent.defaultPrevented) {
          param.preventDefault();
        }

        if (onContextMenu) {
          onContextMenu(param);
        }
      });
    }
  }, [disabled, target, contextmenuHandler, preventDefault, onContextMenu]);
}

export const ReactContextMenuEvent = { useContextMenu };
