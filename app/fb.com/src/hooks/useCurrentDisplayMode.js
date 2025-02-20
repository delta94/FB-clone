import { useContext } from 'react';
import { BaseThemeDisplayModeContext } from '@fb-contexts';

const defaultTheme = 'light';

export function useCurrentDisplayMode() {
  const mode = useContext(BaseThemeDisplayModeContext);

  return mode ?? defaultTheme;
}
