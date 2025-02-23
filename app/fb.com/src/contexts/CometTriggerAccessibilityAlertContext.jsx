import React, { createContext } from 'react';
import { FBLogger } from '../error/FBLogger';
import emptyFunction from 'fbjs/lib/emptyFunction';

export const CometTriggerAccessibilityAlertContext = createContext(() => {
  FBLogger('comet_ax').blameToPreviousFrame().mustfix('CometTriggerAccessibilityAlertContext was not provided.');
  return emptyFunction;
});
