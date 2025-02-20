import React from 'react';
import { BaseContextualLayerAnchorRootContext } from '@fb-contexts';
import { useStable, useUnsafeRef_DEPRECATED } from '@fb-hooks';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

import { BaseDOMContainer } from './BaseDOMContainer';

export const BaseContextualLayerAnchorRoot = ({ children }) => {
  const el = useStable(() => (ExecutionEnvironment.canUseDOM ? document.createElement('div') : null));

  const baseContextualLayerAnchorRootValue = useUnsafeRef_DEPRECATED(el);

  return (
    <>
      <BaseContextualLayerAnchorRootContext.Provider value={baseContextualLayerAnchorRootValue}>
        {children}
      </BaseContextualLayerAnchorRootContext.Provider>
      <BaseDOMContainer node={el} />
    </>
  );
};

BaseContextualLayerAnchorRoot.displayName = 'BaseContextualLayerAnchorRoot';
