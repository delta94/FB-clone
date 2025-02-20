import { useCallback, useRef } from 'react';
import { FBLogger } from '@fb-error/FBLogger';

export function useIsCalledDuringRender() {
  // eslint-disable-next-line no-unused-vars
  const renderRef = useRef(void 0);
  return useCallback(() => {
    FBLogger('comet_ui')
      .blameToPreviousFrame()
      .warn(
        'useIsCalledDuringRender should only be used for development purpose. It is implemented in a way that will not work correctly in production.',
      );
    return !1;
  }, []);
}
