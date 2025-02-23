/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from 'react';

import { BaseTooltip } from './BaseTooltip';
import { BaseTooltipMultilineContent } from './BaseTooltipMultilineContent';
import { FDSTooltipImpl } from './FDSTooltipImpl';

export const FDSCometTooltip = ({ delayMs, tooltip, ...rest }) => {
  return (
    <BaseTooltip
      {...rest}
      delayTooltipMs={delayMs}
      tooltip={<BaseTooltipMultilineContent>{tooltip}</BaseTooltipMultilineContent>}
      tooltipImpl={FDSTooltipImpl}
    />
  );
};

FDSCometTooltip.displayName = 'FDSCometTooltip [from 98]';
