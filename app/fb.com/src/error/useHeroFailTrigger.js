import { useCallback, useContext } from 'react';
import { HeroCurrentInteractionForLoggingContext, HeroInteractionContext } from '@fb-contexts';
import { InteractionTracingMetricsCore } from '@fb-placeholder/InteractionTracingMetricsCore';
import performanceNow from 'fbjs/lib/performanceNow';

let MAX_DESCRIPTION_LENGTH = 1000;

// Helper function to truncate descriptions longer than MAX_DESCRIPTION_LENGTH
function truncateDescription(description) {
  description = description ?? '';
  return description.length > MAX_DESCRIPTION_LENGTH
    ? description.slice(0, MAX_DESCRIPTION_LENGTH) + '...'
    : description;
}

// Main function
export function useHeroFailTrigger() {
  const heroCurrentInteraction = useContext(HeroCurrentInteractionForLoggingContext);
  const heroInteractionContext = useContext(HeroInteractionContext.Context);

  return useCallback(
    (errorDetails) => {
      const { description, error } = errorDetails;
      let errorMessage = error?.message;

      // Format error message if messageFormat is available
      if (error?.messageFormat) {
        let messageIndex = 0;
        errorMessage = error.messageFormat.replace(/%s/g, () => error.messageParams?.[messageIndex++] || 'unknown');
      }

      // Combine description and error message
      const combinedMessage = [truncateDescription(description), truncateDescription(errorMessage)]
        .filter(Boolean)
        .join(', ');
      const interactionUUID = heroCurrentInteraction?.current?.interactionUUID;

      if (!interactionUUID) return;

      // Get interaction metrics and check if it's already marked as an error
      const interactionMetrics = InteractionTracingMetricsCore.get(interactionUUID);
      if (interactionMetrics?.annotations?.['int']?.isError === 1) return;

      // Add error metadata to interaction metrics
      InteractionTracingMetricsCore.addMetadata(interactionUUID, 'isError', 1);
      InteractionTracingMetricsCore.addMetadata(interactionUUID, 'errorComponent', combinedMessage);

      // Add opes_mids annotation if available
      if (error?.opes_mids) {
        Array.isArray(error.opes_mids) &&
          InteractionTracingMetricsCore.addAnnotationStringArray(interactionUUID, 'opes_mids', error.opes_mids);
      }

      // Add subspan for the error with pagelet information
      const pageletStack = heroInteractionContext.pageletStack;
      if (interactionMetrics) {
        InteractionTracingMetricsCore.addSubspan(
          interactionUUID,
          `Error: ${combinedMessage}`,
          'HeroTracing',
          pageletStack.start,
          performanceNow(),
          {
            pagelet: pageletStack[pageletStack.length - 1],
            pageletStack: pageletStack,
            spanType: 'Error',
          },
        );
      }
    },
    [heroInteractionContext, heroCurrentInteraction],
  );
}
