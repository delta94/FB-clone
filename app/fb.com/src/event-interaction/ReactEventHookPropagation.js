function hasEventHookPropagationStopped(event, eventName) {
  // Check if _stopEventHookPropagation is defined and propagation for the event is stopped.
  const isPropagationStopped = event._stopEventHookPropagation?.[eventName] !== undefined;

  return !!isPropagationStopped;
}

/**
 * Stops the propagation for a specific event hook.
 *
 * @param {Object} event - The event object.
 * @param {string} eventName - The name of the event.
 */
function stopEventHookPropagation(event, eventName) {
  // Ensure _stopEventHookPropagation is initialized on the event object.
  event._stopEventHookPropagation ||= {};

  // Set the flag to true, indicating that propagation for the event should be stopped.
  event._stopEventHookPropagation[eventName] = true;
}

/**
 * Object containing utility functions for managing event hook propagation.
 */
export const ReactEventHookPropagation = {
  hasEventHookPropagationStopped,
  stopEventHookPropagation,
};
