import { useLayoutEffect } from 'react';
import { CometStyleXDarkTheme } from '@fb-theme/CometStyleXDarkTheme';
import { CometStyleXDefaultTheme } from '@fb-theme/CometStyleXDefaultTheme';
import { DspFDSWebLegacyThemeUsage } from '@fb-theme/DspFDSWebLegacyThemeUsage';

const COLOR_SCHEME_META_NAME = 'color-scheme';
const THEME_COLOR_META_NAME = 'theme-color';
const NAV_BAR_BACKGROUND = 'nav-bar-background';

/**
 * Hook to set dark mode meta content based on the provided flag.
 *
 * @param {boolean} isDarkMode - Indicates whether dark mode is enabled.
 */
function useCometSetDarkModeMetaContent(isDarkMode) {
  useLayoutEffect(() => {
    setDarkModeMetaContent(isDarkMode);
  }, [isDarkMode]);
}

/**
 * Sets the dark mode meta content and updates the theme color.
 *
 * @param {boolean} isDarkMode - Indicates whether dark mode is enabled.
 */
function setDarkModeMetaContent(isDarkMode) {
  setDarkModeMetaColorScheme(isDarkMode);
  const theme = isDarkMode ? CometStyleXDarkTheme : CometStyleXDefaultTheme;
  Object.assign(theme, isDarkMode ? DspFDSWebLegacyThemeUsage.dark : DspFDSWebLegacyThemeUsage.light);
  setMetaThemeColor(theme[NAV_BAR_BACKGROUND]);
}

/**
 * Sets the meta tag for color scheme.
 *
 * @param {boolean} isDarkMode - Indicates whether dark mode is enabled.
 */
function setDarkModeMetaColorScheme(isDarkMode) {
  const content = isDarkMode ? 'dark' : 'light';
  let metaTag = document.querySelector(`meta[name="${COLOR_SCHEME_META_NAME}"]`);

  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute('name', COLOR_SCHEME_META_NAME);
    metaTag.setAttribute('content', content);
    document.querySelector('head')?.appendChild(metaTag);
  } else {
    metaTag.setAttribute('content', content);
  }
}

/**
 * Sets the meta tag for theme color.
 *
 * @param {string} color - The theme color to set.
 */
function setMetaThemeColor(color) {
  let metaTag = document.querySelector(`meta[name="${THEME_COLOR_META_NAME}"]`);

  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute('name', THEME_COLOR_META_NAME);
    metaTag.setAttribute('content', color);
    document.querySelector('head')?.appendChild(metaTag);
  } else {
    metaTag.setAttribute('content', color);
  }
}

export const UseCometSetDarkModeMetaContent = {
  useCometSetDarkModeMetaContent,
  setDarkModeMetaContent,
  setDarkModeMetaColorScheme,
  setMetaThemeColor,
};
