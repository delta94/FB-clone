import React, { forwardRef } from 'react';
import { BaseView } from '@fb-layout/BaseView';
import { BaseTheme } from '@fb-theme/BaseTheme';
import { useCurrentDisplayMode } from '@fb-hooks';

const displayModeConfig = {
  dark: '__fb-dark-mode ',
  light: '__fb-light-mode ',
  type: 'CLASSNAMES',
};

export const BaseToastContentWrapper = forwardRef((props, ref) => {
  const { children, useInvertedDisplayMode, xstyle } = props;
  const currentDisplayMode = useCurrentDisplayMode();
  const invertedDisplayMode = currentDisplayMode === 'dark' ? 'light' : 'dark';

  return useInvertedDisplayMode ? (
    <BaseTheme config={displayModeConfig} displayMode={invertedDisplayMode} ref={ref} xstyle={xstyle}>
      {children}
    </BaseTheme>
  ) : (
    <BaseView ref={ref} xstyle={xstyle}>
      {children}
    </BaseView>
  );
});
