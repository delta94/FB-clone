const isMac = typeof window !== 'undefined' && window.navigator ? /^Mac/.test(window.navigator.platform) : false;

/**
 * Checks if the browser supports Pointer Events.
 *
 * @type {boolean}
 */
const hasPointerEvents = typeof window !== 'undefined' && window.PointerEvent;

/**
 * Checks if the related target is within the focusWithinTarget
 *
 * @param {Object} focusWithinTarget - The target element or Scope Instance to check against.
 * @param {EventTarget | null} relatedTarget - The related target element.
 * @returns  {boolean} - True if the related target is within the focusWithinTarget, false otherwise.
 */
function isRelatedTargetWithin(focusWithinTarget, relatedTarget) {
  if (!relatedTarget) {
    return false;
  }

  // As the focusWithinTarget can be a Scope Instance (experimental API),
  // we need to use the containsNode() method. Otherwise, focusWithinTarget
  // must be a Node, which means we can use the contains() method.
  return typeof focusWithinTarget.containsNode === 'function'
    ? focusWithinTarget.containsNode(relatedTarget)
    : focusWithinTarget.contains(relatedTarget);
}

export const ReactEventHelpers = {
  hasPointerEvents,
  isMac,
  isRelatedTargetWithin,
};
