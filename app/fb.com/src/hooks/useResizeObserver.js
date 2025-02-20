/**
 * Changelog:
 * - 09/12/2024
 */

import { useLayoutEffect, useRef } from 'react';
import { FBLogger } from '@fb-error/FBLogger';
import { DOMRectReadOnly } from '@fb-utils/DOMRectReadOnly';
import { gkx } from '@fb-utils/gkx';
import { ResizeObserverPolyfillDeprecated } from '@fb-utils/resize-observer-polyfill-deprecated';
import { uniqueID } from '@fb-utils/uniqueID';

/**
 *
 * @param {Function} callback
 * @returns
 */
const useResizeObserver = (callback) => {
  const cleanupRef = useRef(null);
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const observer = (target) => {
    const wrappedCallback = (a, b, c) => {
      callbackRef.current && callbackRef.current(a, b, c);
    };

    const unobserve = target === null ? null : observeElementWithCallback(target, wrappedCallback);

    cleanupRef.current && cleanupRef.current();
    cleanupRef.current = unobserve;
  };

  return observer;
};

// k
let resizeObserverInstance = null;

// l
let observedElementsMap = new Map();

// m
function getOrCreateResizeObserverInstance() {
  //
  !resizeObserverInstance && (resizeObserverInstance = new ResizeObserverPolyfillDeprecated(handleResizeEntries));
  return resizeObserverInstance;
}

// n
const handleResizeEntries = (entries) => {
  //
  const contentRectMap = new Map();
  const detailMap = new Map();
  const fullDetailsMap = new Map();

  for (const entry of entries) {
    const target = entry.target;
    let contentRect = entry.contentRect;

    // Handle conditional logic based on feature flags
    if (gkx[20942]) {
      let cachedRect = contentRectMap.get(target);
      if (!cachedRect) {
        cachedRect = calculateContentRect(target);
        contentRectMap.set(target, cachedRect);
      } else {
        contentRect = cachedRect;
      }
    }

    // Store contentRect and full details
    detailMap.set(target, contentRect);
    fullDetailsMap.set(target, {
      target,
      contentRect: entry.contentRect,
      borderBoxSize: entry.borderBoxSize,
      contentBoxSize: entry.contentBoxSize,
      devicePixelContentBoxSize: entry.devicePixelContentBoxSize,
    });
  }

  // Process observed elements
  const observedElements = new Set(observedElementsMap.keys());

  for (const [target, rect] of detailMap) {
    const callbacks = observedElementsMap.get(target);

    if (callbacks) {
      for (const [, callback] of callbacks) {
        try {
          // Call the stored callback with updated details
          callback(rect, target, fullDetailsMap);
        } catch (error) {
          FBLogger('useResizeObserver').catching(error);
        }
      }
    } else if (!observedElements.has(target)) {
      FBLogger('useResizeObserver').mustfix(
        'ResizeObserver observed resizing of an element that it should not be observing',
      );
    }
  }
};

// o
function observeElementWithCallback(element, callback) {
  //
  const uniqueId = uniqueID(); // Generate a unique ID for this observer
  let callbackMap = observedElementsMap.get(element) || new Map(); // Get existing callbacks for the element, or create a new map

  // Add the new callback to the map
  callbackMap.set(uniqueId, callback);
  observedElementsMap.set(element, callbackMap); // Update the global map with the element's callback map

  getOrCreateResizeObserverInstance().observe(element); // Start observing the element with the ResizeObserver

  // Return a cleanup function to stop observing this specific callback
  return () => createCleanupCallback(element, uniqueId);
}

// p
function createCleanupCallback(element, id) {
  //
  return function () {
    // Retrieve the map of callbacks for the given element
    const callbackMap = observedElementsMap.get(element);
    if (!callbackMap) return; // If no callbacks exist for the element, exit early

    // Remove the specific callback identified by `id`
    callbackMap.delete(id);

    // If no more callbacks exist for this element, stop observing it
    if (callbackMap.size === 0) {
      getOrCreateResizeObserverInstance().unobserve(element); // Unobserve the element
      observedElementsMap.delete(element); // Remove the element from the global map
    }
  };
}

// q
function parseCSSValue(val) {
  //
  return parseFloat(val) || 0;
}

// r
function getWindowFromElement(element) {
  //
  // Navigate through the element to get its ownerDocument's defaultView (window object)
  const defaultView = element?.ownerDocument?.defaultView;

  // Return the defaultView if available, otherwise fallback to the global window object
  return defaultView || window;
}

// s
const defaultDOMRect = DOMRectReadOnly.fromRect(); //

// t
function getPaddingValues(style) {
  //
  return {
    top: parseCSSValue(style.paddingTop),
    right: parseCSSValue(style.paddingRight),
    bottom: parseCSSValue(style.paddingBottom),
    left: parseCSSValue(style.paddingLeft),
  };
}

// u
function getBorderWidths(style) {
  //
  return {
    top: parseCSSValue(style.borderTopWidth),
    right: parseCSSValue(style.borderRightWidth),
    bottom: parseCSSValue(style.borderBottomWidth),
    left: parseCSSValue(style.borderLeftWidth),
  };
}

// v
function sumSpecifiedBorders(style) {
  //
  // Get the borders (top, right, bottom, left) from the style object
  const borders = getBorderWidths(style);

  // Collect the additional arguments (sides) passed to the function
  const sides = Array.prototype.slice.call(arguments, 1);

  // Sum up the border widths for the specified sides
  return sides.reduce((total, side) => {
    return total + parseCSSValue(borders[side]);
  }, 0);
}

// w
function calculateContentRect(element) {
  //
  let clientWidth = element.clientWidth;
  let clientHeight = element.clientHeight;
  if (!clientWidth && !clientHeight) {
    return defaultDOMRect; // `s` likely represents a default or empty DOMRect
  }

  // Get computed styles for the element
  const computedStyle = getWindowFromElement(element).getComputedStyle(element);

  let padding = getPaddingValues(computedStyle);
  let paddingHorizontal = padding.left + padding.right;
  let paddingVertical = padding.top + padding.bottom;

  let width = parseCSSValue(computedStyle.width);
  let height = parseCSSValue(computedStyle.height);

  // Adjust dimensions if the box model is border-box
  if (computedStyle.boxSizing === 'border-box') {
    if (Math.round(width + paddingHorizontal) !== clientWidth) {
      width -= sumSpecifiedBorders(computedStyle, 'left', 'right') + paddingHorizontal;
    }
    if (Math.round(height + paddingVertical) !== clientHeight) {
      height -= sumSpecifiedBorders(computedStyle, 'top', 'bottom') + paddingVertical;
    }
  }

  // Create a DOMRect with the calculated dimensions
  return DOMRectReadOnly.fromRect({
    x: padding.left,
    y: padding.top,
    width,
    height,
  });
}

export { useResizeObserver };
