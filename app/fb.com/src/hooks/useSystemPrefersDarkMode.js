import { useLayoutEffect, useState } from 'react';
import { executionEnvironment } from '@fb-utils/ExecutionEnvironment';

const DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)';
const listeners = new Set();

if (window.matchMedia) {
  const handleMediaChange = (event) => {
    listeners.forEach((listener) => {
      return listener(event);
    });
  };
  const matchMedia = window.matchMedia(DARK_MODE_MEDIA_QUERY);
  matchMedia.addListener(handleMediaChange);
}

const CometDarkModeSetting = {};

function getSystemPrefersDarkMode(getPreference) {
  if (!executionEnvironment.canUseDOM) {
    const preference = getPreference();
    return (
      preference === 'ENABLED' || (preference === 'USE_SYSTEM' && CometDarkModeSetting.initialGuessForDarkModeOnClient)
    );
  }
  return window.matchMedia && window.matchMedia(DARK_MODE_MEDIA_QUERY).matches;
}

function useSystemPrefersDarkMode(getPreference) {
  let [prefersDarkMode, setPrefersDarkMode] = useState(() => {
    return getSystemPrefersDarkMode(getPreference);
  });

  useLayoutEffect(() => {
    let listener = function (event) {
      setPrefersDarkMode(event.matches);
    };
    listeners.add(listener);
    return () => {
      listeners['delete'](listener);
    };
  }, []);

  return prefersDarkMode;
}

export const UseSystemPrefersDarkMode = {
  getSystemPrefersDarkMode,
  useSystemPrefersDarkMode,
};
