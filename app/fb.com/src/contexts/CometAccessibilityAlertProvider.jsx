import React from 'react';
import { CometTriggerAccessibilityAlertContext } from '@fb-contexts';
import { useCometAccessibilityAlerts } from '@fb-hooks';

export const CometAccessibilityAlertProvider = ({ children }) => {
  const { accessibilityAlerts, triggerAccessibilityAlert } = useCometAccessibilityAlerts();

  return (
    <CometTriggerAccessibilityAlertContext.Provider value={triggerAccessibilityAlert}>
      {children}
      {accessibilityAlerts}
    </CometTriggerAccessibilityAlertContext.Provider>
  );
};
