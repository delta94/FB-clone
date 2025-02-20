import React, { useEffect, useState } from 'react';
import { useToasterStateManager } from '@fb-hooks';
import { CometPlaceholder } from '@fb-placeholder/CometPlaceholder';

import { CometToasterView_DO_NOT_USE } from './CometToasterView_DO_NOT_USE';

function hasToasts(toasterState) {
  return Object.keys(toasterState.getState()).length > 0;
}

export function CometLazyToasterView_DO_NOT_USE(props) {
  const toasterState = useToasterStateManager();

  let [hasToastsInitially, setHasToastsInitially] = useState(() => {
    return hasToasts(toasterState);
  });

  useEffect(() => {
    if (hasToastsInitially) {
      return;
    }
    const findToast = hasToasts(toasterState);

    if (findToast) {
      setHasToastsInitially(true);
      return;
    }

    // eslint-disable-next-line no-var
    var listener = toasterState.addListener(() => {
      listener.remove();
      setHasToastsInitially(true);
    });
    return listener.remove;
  }, [toasterState, hasToastsInitially]);

  return hasToastsInitially ? (
    <CometPlaceholder fallback={null}>
      {/* eslint-disable-next-line react/jsx-pascal-case */}
      <CometToasterView_DO_NOT_USE loadImmediately {...props} />
    </CometPlaceholder>
  ) : undefined;
}
