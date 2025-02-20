/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/**
 * Generates ARIA properties for a loading state or progress bar.
 * @param {number} currentValue - The current value of the progress bar.
 * @param {object} additionalProps - An optional object containing additional properties (e.g., min, max).
 * @returns {object} - An object containing ARIA properties.
 */
export function getLoadingStateAriaProps(currentValue, additionalProps) {
  let defaultValue;

  additionalProps = !currentValue
    ? {
        'aria-label': 'Loading...',
      }
    : {
        // eslint-disable-next-line no-cond-assign
        'aria-valuemax': (defaultValue = !additionalProps ? undefined : additionalProps.max) ? defaultValue : 100,
        // eslint-disable-next-line no-cond-assign
        'aria-valuemin': (defaultValue = !additionalProps ? undefined : additionalProps.min) ? defaultValue : 0,
        'aria-valuenow': currentValue,
      };
  return {
    role: 'progressbar',
    ...additionalProps,
  };
}
