/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef } from 'react';
import stylex from '@stylexjs/stylex';
import { HeroInteraction } from 'hero-tracing';

export const CometHeroInteractionImpl = forwardRef(
  ({ htmlAttributes, pageletAriaProps, xstyle, ...restProps }, ref) => {
    return (
      <HeroInteraction
        htmlAttributes={{
          ...pageletAriaProps,
          className: stylex(xstyle),
          onMouseLeave: htmlAttributes?.onMouseLeave,
          style: htmlAttributes?.style,
        }}
        ref={ref}
        {...restProps}
      />
    );
  },
);

CometHeroInteractionImpl.displayName = 'CometHeroInteraction';
