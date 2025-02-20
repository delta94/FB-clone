/**
 * Changelog:
 * - 09/12/2024
 */

import React, { forwardRef, useCallback, useContext } from 'react';
import { HeroCurrentInteractionForLoggingContext } from '@fb-contexts';
import { InteractionTracingMetricsCore } from '@fb-placeholder/InteractionTracingMetricsCore';

import { ErrorBoundary } from './ErrorBoundary';
import { ErrorMetadata } from './ErrorMetadata';
import { useHeroErrorMetadata } from './useHeroErrorMetadata';
import { useHeroFailTrigger } from './useHeroFailTrigger';

function handleErrorLogging() {
  const heroContext = useContext(HeroCurrentInteractionForLoggingContext);
  const triggerFail = useHeroFailTrigger();

  return useCallback(
    (error) => {
      let interactionUUID = heroContext?.current?.interactionUUID;

      if (!interactionUUID) return;

      const interactionMetrics = InteractionTracingMetricsCore.get(interactionUUID);
      const failOnCometErrorBoundaryEnabled = interactionMetrics?.annotations?.['int']?.failOnCometErrorBoundaryEnabled;

      if (failOnCometErrorBoundaryEnabled === 1) {
        triggerFail({ error });
      }

      // Add annotation for failure
      if (
        failOnCometErrorBoundaryEnabled === 1 ||
        interactionMetrics?.annotations?.['int']?.failOnCometErrorBoundaryAnnotated === 1
      ) {
        InteractionTracingMetricsCore.addAnnotationInt(interactionUUID, 'failedOnCometErrorBoundary', 1);
      }
    },
    [heroContext, triggerFail],
  );
}

const cometErrorBoundary = (props, ref) => {
  const { augmentError, onError, type, ...restProps } = props;

  const errorMetadata = useHeroErrorMetadata();

  const logError = handleErrorLogging();

  const handleErrorCallback = useCallback(
    (error, additionalData) => {
      logError(error);
      onError?.(error, additionalData);
    },
    [onError, logError],
  );

  const augmentErrorCallback = useCallback(
    (error) => {
      augmentError?.(error);
      errorMetadata(error);

      if (type) {
        error.type = type;
        let metadata = error.metadata ?? new ErrorMetadata();
        error.metadata = metadata;
        metadata.addEntry('COMET_INFRA', 'EXPLICITLY_MARKED_ERROR_BOUNDARY', 'true');
      }
    },
    [augmentError, errorMetadata, type],
  );

  return (
    <ErrorBoundary
      {...restProps}
      onError={handleErrorCallback}
      augmentError={augmentErrorCallback}
      fallback={props.fallback}
      ref={ref}
    />
  );
};

export const CometErrorBoundary = forwardRef(cometErrorBoundary);
