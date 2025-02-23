import React from 'react';
import { CometAccessibilityAnnouncement } from '@fb-dump/CometAccessibilityAnnouncement';
import { useAccessibilityAlerts } from '@fb-hooks';

function RenderAlert({ message, options }) {
  return <CometAccessibilityAnnouncement {...options}>{message}</CometAccessibilityAnnouncement>;
}

RenderAlert.displayName = 'RenderAlert';

function RenderAlerts({ alerts }) {
  return alerts.map((alert) => <RenderAlert key={alert.key} message={alert.message} options={alert.options} />);
}

export const useCometAccessibilityAlerts = () => {
  const [alerts, triggerAccessibilityAlert] = useAccessibilityAlerts();
  const accessibilityAlerts = <RenderAlerts alerts={alerts} />;
  return { accessibilityAlerts, triggerAccessibilityAlert };
};
