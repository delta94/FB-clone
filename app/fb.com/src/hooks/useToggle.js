/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useCallback, useState } from 'react';

/**
 * Custom hook to toggle a boolean value.
 * @param {boolean} initialValue - The initial value for the toggle.
 * @returns {[boolean, function]} - The current value and a function to toggle it.
 */
export const useToggle = (initialValue) => {
  // If initialValue is truthy, set it to false initially.
  initialValue && (initialValue = false);

  // State to keep track of the toggle value.
  const [toggleValue, setToggleValue] = useState(initialValue);

  // Function to toggle the value.
  const toggle = useCallback((value) => {
    setToggleValue(
      !value
        ? (prevValue) => {
            return !prevValue;
          }
        : value,
    );
  }, []);

  return [toggleValue, toggle];
};
