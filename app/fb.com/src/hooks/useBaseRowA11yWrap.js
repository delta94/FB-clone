/**
 * Changelog:
 * - 09/12/2024
 */

import { useState } from 'react';

import { useResizeObserver } from './useResizeObserver';

/**
 *
 * @param {boolean} isReversed
 * @returns
 */
const useBaseRowA11yWrap = (isReversed) => {
  const [hasOverlap, setHasOverlap] = useState(false);

  const handleResize = (element, observerEntry) => {
    if (!isReversed) {
      return;
    }

    const children = observerEntry.children;
    if (children.length < 2) {
      return;
    }

    let previousRect = null;
    let overlapDetected = false;

    for (const child of children) {
      const rect = child.getBoundingClientRect();

      if (previousRect && Math.abs(rect.top - previousRect.top) >= Math.min(rect.height, previousRect.height) - 5) {
        overlapDetected = true;
        break;
      }

      previousRect = rect;
    }

    setHasOverlap(overlapDetected);
  };

  const resizeObserver = useResizeObserver(handleResize);

  return [hasOverlap, resizeObserver];
};

export { useBaseRowA11yWrap };
