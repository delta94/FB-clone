/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from 'react';

import { useCometTheme } from '@fb-hooks';

import { BaseTooltipImpl } from './BaseTooltipImpl';
import { CometProgressRingIndeterminate } from './CometProgressRingIndeterminate';
import { FDSText } from '@fb-text/FDSText';

export const FDSTooltipDeferredImpl = ({ headline, tooltip, ...rest }) => {
  const [ThemeProvider, themeStyles] = useCometTheme('invert');

  return (
    <ThemeProvider>
      <BaseTooltipImpl
        {...rest}
        loadingState={<CometProgressRingIndeterminate color="dark" size={20} />}
        tooltip={
          tooltip !== null ? (
            <FDSText color="tooltip" type="body4">
              {tooltip}
            </FDSText>
          ) : null
        }
        xstyle={themeStyles}
      />
    </ThemeProvider>
  );
};

FDSTooltipDeferredImpl.displayName = 'FDSTooltipDeferredImpl';
