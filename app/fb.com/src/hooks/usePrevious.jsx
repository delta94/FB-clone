/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useEffect, useRef } from 'react';

export function usePrevious(value) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
