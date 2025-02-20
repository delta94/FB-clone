/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

import React from 'react';
import { FBLogger } from '@fb-error/FBLogger';
import emptyFunction from 'fbjs/lib/emptyFunction';

export const CometTriggerAccessibilityAlertContext = React.createContext(() => {
  FBLogger('comet_ax').blameToPreviousFrame().mustfix('CometTriggerAccessibilityAlertContext was not provided.');
  return emptyFunction;
});
