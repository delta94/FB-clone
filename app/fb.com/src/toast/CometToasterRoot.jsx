import React, { useMemo } from 'react';
import { CometErrorBoundary } from '@fb-error/CometErrorBoundary';
import { recoverableViolation } from '@fb-error/recoverableViolation';

import { CometLazyToasterView_DO_NOT_USE } from './CometLazyToasterView_DO_NOT_USE';

const filters = new Set(['CometToastNotification']);

function onError(error) {
  recoverableViolation('The toaster is broken', 'CometAppShell', {
    error,
  });
}

// TODO
const useHideNotificationsToasts = false;

export const CometToasterRoot = (props) => {
  const { align, maxWidth } = props;

  return useMemo(() => {
    return (
      <CometErrorBoundary onError={onError}>
        {/* eslint-disable-next-line react/jsx-pascal-case */}
        <CometLazyToasterView_DO_NOT_USE
          align={align}
          // eslint-disable-next-line react-compiler/react-compiler
          filterToasts={useHideNotificationsToasts ? filters : null}
          maxWidth={maxWidth}
        />
      </CometErrorBoundary>
    );
    // eslint-disable-next-line react-compiler/react-compiler
  }, [align, maxWidth, useHideNotificationsToasts]);
};
