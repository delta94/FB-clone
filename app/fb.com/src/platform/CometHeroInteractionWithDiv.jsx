/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from 'react';
import stylex from '@stylexjs/stylex';

import { CometHeroInteractionImpl } from './CometHeroInteractionImpl';
import { LegacyHidden } from '@fb-layout/LegacyHidden';

const CometHeroInteractionWithDiv = forwardRef(
  ({ children, hidden, htmlAttributes, pageletAriaProps, xstyle }, ref) => {
    return (
      <LegacyHidden
        htmlAttributes={{
          className: stylex(xstyle),
          onMouseLeave: htmlAttributes?.onMouseLeave,
          style: htmlAttributes?.style,
          ...pageletAriaProps,
        }}
        mode={hidden === true ? 'hidden' : 'visible'}
        ref={ref}
      >
        {children}
      </LegacyHidden>
    );
  },
);

const DefaultCometHeroInteractionWithDiv = CometHeroInteractionImpl ?? CometHeroInteractionWithDiv;

export default DefaultCometHeroInteractionWithDiv;
