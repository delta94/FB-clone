/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';

export function useDelayedState(initialState) {
  const [state, setState] = useState(initialState);
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const setDelayedState = useCallback(
    (newState, delay = 0, callback = emptyFunction) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;

      if (delay === 0) {
        setState(newState);
        callback(newState);
      } else {
        timeoutRef.current = setTimeout(() => {
          setState(newState);
          callback(newState);
          timeoutRef.current = null;
        }, delay);
      }
    },
    [setState],
  );

  return [state, setDelayedState];
}
