import React, { forwardRef } from 'react';
import stylex from '@stylexjs/stylex';
import { testID } from '@fb-utils/testID';

import { LegacyHidden } from '@fb-layout/LegacyHidden';

export const BaseContextualLayerDefaultContainer = forwardRef(
  (
    {
      children,
      hidden,
      // presencePayload,
      stopClickPropagation,
      testid,
      xstyle,
    },
    ref,
  ) => {
    return (
      <LegacyHidden
        htmlAttributes={{
          ...testID(testid),
          className: stylex(xstyle),
          onClick: stopClickPropagation === true ? (e) => e.stopPropagation() : undefined,
        }}
        mode={hidden ? 'hidden' : 'visible'}
        ref={ref}
      >
        {children}
      </LegacyHidden>
    );
  },
);

BaseContextualLayerDefaultContainer.displayName = `BaseContextualLayerDefaultContainer [from ${__filename}]`;
