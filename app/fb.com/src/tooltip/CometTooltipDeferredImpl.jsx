import React, { memo } from 'react';
import { BaseTooltipImpl } from './BaseTooltipImpl';
// import CometProgressRingIndeterminate from 'CometProgressRingIndeterminate.react';
import { FDSTextPairing } from '@fb-text/FDSTextPairing';
import { useCometTheme } from '@fb-hooks';

export const CometTooltipDeferredImpl = memo((props) => {
  const { tooltipTheme, headline, tooltip, ...restProps } = props;

  const [ThemeProvider, themeClassNames] = useCometTheme(tooltipTheme ?? 'invert');

  // const loadingState = <CometProgressRingIndeterminate color="dark" size={20} />;
  const loadingState = <div>Loading...</div>;
  const tooltipContent = tooltip ? (
    <FDSTextPairing body={tooltip} bodyColor="primary" headline={headline} headlineColor="primary" level={4} />
  ) : null;

  const baseTooltip = (
    <BaseTooltipImpl {...restProps} loadingState={loadingState} tooltip={tooltipContent} xstyle={themeClassNames} />
  );

  return <ThemeProvider>{baseTooltip}</ThemeProvider>;
});
