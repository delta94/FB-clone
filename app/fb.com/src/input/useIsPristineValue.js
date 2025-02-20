/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import { useState } from 'react';
import { useStable } from '@fb-hooks';

export function useIsPristineValue(value, initialPristine) {
  const [isPristine, setIsPristine] = useState(initialPristine);

  const stableValue = useStable(() => value);

  if (isPristine && value !== stableValue) {
    setIsPristine(false);
  }

  return isPristine;
}
