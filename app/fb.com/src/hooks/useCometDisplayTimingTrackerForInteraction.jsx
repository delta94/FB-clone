import { useCallback, useRef } from 'react';
// import { getCurrentVCTraces } from 'cr:449';
// import { InteractionTracingMetrics } from 'InteractionTracingMetrics';
// import performanceNow from 'fbjs/lib/performanceNow';

export function useCometDisplayTimingTrackerForInteraction({ element, isPersistent = false, interactionId }) {
  const elementRef = useRef(null);

  const onElementMount = useCallback(
    (mountedElement) => {
      if (element && elementRef.current !== mountedElement) {
        elementRef.current = mountedElement;
        if (mountedElement) {
          console.log('mountedElement', mountedElement);
          // const startTime = performanceNow();
          // if (interactionId) {
          //   InteractionTracingMetrics.addMountPoint(interactionId, startTime, mountedElement);
          // } else {
          //   InteractionTracingMetrics.currentInteractionLogger().forEach((logger) => {
          //     InteractionTracingMetrics.addMountPoint(logger.traceId, startTime, mountedElement);
          //   });
          // }
          // if (!isPersistent && getCurrentVCTraces) {
          //   const traces = getCurrentVCTraces();
          //   traces.forEach((trace) => {
          //     if (trace.interactionType !== 'INTERACTION') {
          //       trace.excludeElement(mountedElement);
          //     }
          //   });
          // }
        }
      }
    },
    [interactionId, isPersistent, element],
  );

  return onElementMount;
}
