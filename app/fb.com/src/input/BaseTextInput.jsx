/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React, { forwardRef, memo } from 'react';
import { BaseFocusRing } from '@fb-focus/BaseFocusRing';
import stylex from '@stylexjs/stylex';

import { BaseInput } from './BaseInput';

/**
 * Changelog:
 * - 08/01/2025
 */

const styles = stylex.create({
  root: {
    // eslint-disable-next-line @stylexjs/valid-styles
    ':disabled': {
      color: 'var(--disabled-text)',
    },
  },
});

export const BaseTextInput = memo(
  forwardRef((props, ref) => {
    const { suppressFocusRing, xstyle, ...rest } = props;

    return (
      <BaseFocusRing suppressFocusRing={suppressFocusRing}>
        {(focusClass) => {
          return <BaseInput {...rest} ref={ref} xstyle={[styles.root, focusClass, xstyle]} />;
        }}
      </BaseFocusRing>
    );
  }),
);
