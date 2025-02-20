import React, { useMemo } from 'react';
import { BaseThemeDisplayModeContext } from '@fb-contexts';
import { useCurrentDisplayMode } from '@fb-hooks';
import { stylexCompat } from '@fb-utils/stylexCompat';

const THEME_CLASSES = {
  dark: '__fb-dark-mode ',
  light: '__fb-light-mode ',
};

/**
 *
 * @param {string} val
 * @returns
 */
export function useCometTheme(val) {
  const displayMode = useCurrentDisplayMode();

  /**
   * @type {string}
   */
  let mode;

  if (val === 'invert') {
    mode = displayMode === 'light' ? 'dark' : 'light';
  } else {
    mode = val;
  }

  const wrapper = useMemo(() => {
    return ({ children }) => {
      return <BaseThemeDisplayModeContext.Provider value={mode}>{children}</BaseThemeDisplayModeContext.Provider>;
    };
  }, [mode]);

  const styles = stylexCompat.makeNamespace({
    theme: THEME_CLASSES[mode],
  });

  return [wrapper, styles];
}
