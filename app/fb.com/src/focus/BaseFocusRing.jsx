/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import React from 'react';
import stylex from '@stylexjs/stylex';

import { FocusWithinHandler } from './FocusWithinHandler';

// const styles = {
//   default: defaultStyles.focused,
//   inset: defaultStyles.focusedInset,
// };

/**
 * @typedef {Object}  BaseFosusRingProps
 * @property {(className: string) => any} children
 * @property {"default" | "inset"} focusRingPosition
 * @property {string} [mode]
 * @property {suppressFocusRing} [suppressFocusRing]
 * @property {any} [testOnly]
 */

/**
 *
 * @param {BaseFosusRingProps} baseFosusRingProps
 * @returns
 */
export const BaseFocusRing = ({
  children,
  focusRingPosition = 'default',
  mode = 'focus-visible',
  suppressFocusRing = false,
  testOnly,
}) => {
  // const focusRingPositionStyles = styles[focusRingPosition];

  return (
    <FocusWithinHandler testOnly={testOnly}>
      {(isFocus, isFocusVisible) => {
        const shouldShowFocusRing = !suppressFocusRing && isFocus && (isFocusVisible || mode === 'focus');

        return children(
          shouldShowFocusRing
            ? focusRingPosition === 'inset'
              ? defaultStyles.focusedInset
              : defaultStyles.focused
            : defaultStyles.unfocused,
        );
      }}
    </FocusWithinHandler>
  );
};

const defaultStyles = stylex.create({
  focused: {
    // eslint-disable-next-line @stylexjs/valid-styles
    '@media (forced-colors: active)': {
      outline: 'var(--focus-ring-outline-forced-colors)',
    },
    boxShadow: 'var(--focus-ring-shadow-default)',
    outline: 'none',
  },
  focusedInset: {
    boxShadow: 'var(--focus-ring-shadow-inset)',
  },
  focusedLink: {
    outline: 'var(--focus-ring-outline-link)',
  },
  unfocused: {
    outline: 'none',
  },
});

BaseFocusRing.displayName = 'BaseFocusRing.react';
BaseFocusRing.focusRingXStyle = defaultStyles.focused;
BaseFocusRing.focusRingInsetXStyle = defaultStyles.focusedInset;
BaseFocusRing.linkFocusRingXStyle = defaultStyles.focusedLink;
