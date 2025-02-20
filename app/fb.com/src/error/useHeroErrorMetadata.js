/**
 * Changelog:
 * - 09/12/2024
 */

import { useCallback, useContext } from 'react';
import { HeroCurrentInteractionForLoggingContext, HeroInteractionContext } from '@fb-contexts';
import { InteractionTracingMetrics } from '@fb-placeholder/InteractionTracingMetrics';
import { QPLEvent } from '@fb-utils/QPLEvent';

import { ErrorMetadata } from './ErrorMetadata';

/**
 * Custom React hook for obtaining hero error metadata.
 *
 * @returns {function} - A callback function to update error metadata.
 */
export function useHeroErrorMetadata() {
  const currentInteractionContext = useContext(HeroCurrentInteractionForLoggingContext);
  const heroInteractionContext = useContext(HeroInteractionContext.Context);
  const pageletStack = heroInteractionContext.pageletStack;

  return useCallback(
    (errorInfo) => {
      let errorMetadata = errorInfo.metadata || new ErrorMetadata();
      errorInfo.metadata = errorMetadata;

      const interactionUUID = currentInteractionContext.current?.interactionUUID;

      if (interactionUUID) {
        const interactionMetrics = InteractionTracingMetrics.get(interactionUUID);

        if (pageletStack) {
          errorMetadata.addEntry('COMET_INFRA', 'INTERACTION_PAGELET_STACK', pageletStack.join(','));
        }

        if (interactionMetrics && !interactionMetrics.qplAction) {
          if (interactionMetrics.qplEvent) {
            errorMetadata.addEntry(
              'COMET_INFRA',
              'INTERACTION_QPL_EVENT',
              String(QPLEvent.getMarkerId(interactionMetrics.qplEvent)),
            );
          }

          if (interactionMetrics.tracePolicy) {
            errorMetadata.addEntry('COMET_INFRA', 'INTERACTION_TRACE_POLICY', interactionMetrics.tracePolicy);
          }
        }
      }
    },
    [currentInteractionContext, pageletStack],
  );
}
