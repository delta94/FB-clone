import React, { forwardRef } from 'react';
import { BaseView } from '@fb-layout/BaseView';

import { BaseThemeProvider } from './BaseThemeProvider';

export const BaseTheme = forwardRef((props, ref) => {
  const { config, displayMode, style, xstyle, ...rest } = props;

  const child = (internalClass, internalStyle) => (
    <BaseView {...rest} ref={ref} style={{ ...internalStyle, ...style }} xstyle={[internalClass, xstyle]} />
  );

  return (
    <BaseThemeProvider
      //
      config={config}
      displayMode={displayMode}
      children={child}
    />
  );
});
