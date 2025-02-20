import React from 'react';
import { BasePortalTargetContext } from '@fb-contexts/BasePortalTargetContext';
import { BaseDOMContainer } from '@fb-dialog/BaseDOMContainer';
import { useStable } from '@fb-hooks/useStable';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

const justknobx713 = true;

const l = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
};

export const CometAppViewStack = ({ baseView, topNavigationComponent, useBodyAsPortalsContainer = false }) => {
  const node = useStable(() => {
    return ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;
  });

  return (
    <>
      <BasePortalTargetContext.Provider value={useBodyAsPortalsContainer ? document.body : node}>
        {baseView}
      </BasePortalTargetContext.Provider>
      {!useBodyAsPortalsContainer && <BaseDOMContainer node={node} />}
    </>
  );
};
