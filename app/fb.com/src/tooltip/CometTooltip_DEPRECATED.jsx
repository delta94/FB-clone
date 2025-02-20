import React from 'react';
import { BaseTooltip } from '@fb-tooltip/BaseTooltip';
import { CometTooltipImpl } from '@fb-tooltip/CometTooltipImpl';

export const CometTooltip_DEPRECATED = ({
  delayMs,
  tooltipTheme_DO_NOT_USE_OR_IT_WILL_BREAK_CONTRAST_ACCESSIBILITY,
  ...props
}) => {
  return (
    <BaseTooltip
      {...props}
      delayTooltipMs={delayMs}
      tooltipImpl={CometTooltipImpl}
      tooltipTheme={tooltipTheme_DO_NOT_USE_OR_IT_WILL_BREAK_CONTRAST_ACCESSIBILITY}
    />
  );
};
