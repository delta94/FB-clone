/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import { useCallback, useContext } from 'react';
import { CometTriggerAccessibilityAlertContext } from '@fb-contexts';

export const useTriggerAccessibilityAlert = () => {
  const a = useContext(CometTriggerAccessibilityAlertContext);

  return useCallback(
    (b) => {
      typeof b === 'string' && a(b);
    },
    [a],
  );
};
