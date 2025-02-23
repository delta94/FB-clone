import { useCallback, useEffect, useRef, useState } from 'react';

export const useAccessibilityAlerts = () => {
  // Holds the cleanup function for the currently active alert.
  const cleanupRef = useRef(null);
  // Stores all active alerts in a Map.
  const alertsMapRef = useRef(new Map());
  // Generates unique keys for each alert.
  const nextKeyRef = useRef(0);
  // State to store the current list of alerts.
  const [alerts, setAlerts] = useState([]);

  // When the hook unmounts, ensure the current alert is cleaned up.
  useEffect(() => {
    return () => {
      if (cleanupRef.current != null) {
        cleanupRef.current();
      }
    };
  }, []);

  // Create an alert and return a cleanup function that removes it.
  const createAlert = useCallback((message, options) => {
    const key = nextKeyRef.current++;
    const alert = { key, message, options };
    alertsMapRef.current.set(key, alert);
    setAlerts(Array.from(alertsMapRef.current.values()));

    return function cleanup() {
      alertsMapRef.current.delete(key);
      setAlerts(Array.from(alertsMapRef.current.values()));
    };
  }, []);

  // Trigger an alert: clean up any previous alert, create a new one,
  // and store its cleanup function.
  const triggerAlert = useCallback(
    (message, options) => {
      if (cleanupRef.current != null) {
        cleanupRef.current();
      }
      const cleanup = createAlert(message, options);
      cleanupRef.current = cleanup;
      return cleanup;
    },
    [createAlert],
  );

  return [alerts, triggerAlert];
};
