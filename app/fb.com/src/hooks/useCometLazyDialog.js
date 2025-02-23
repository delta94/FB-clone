import React from 'react';
import FDSDialogLoadingState from 'FDSDialogLoadingState.react';
import tracePolicyFromResource from 'tracePolicyFromResource';
import useBaseLazyDialog from 'useBaseLazyDialog';

function defaultFallback(onClose) {
  return <FDSDialogLoadingState onClose={onClose} />;
}

export default function useCometLazyDialog(resource, fallback) {
  const tracePolicy = tracePolicyFromResource('comet.dialog', resource);
  return useBaseLazyDialog(resource, fallback != null ? fallback : defaultFallback, tracePolicy);
}
