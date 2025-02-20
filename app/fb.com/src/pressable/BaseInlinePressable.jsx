import React, { forwardRef } from 'react';
import stylex from '@stylexjs/stylex';

import { CometPressable } from './CometPressable';

const styles = stylex.create({
  defaultCursor: {
    cursor: 'default',
  },
  disabled: {
    textDecoration: 'none',
  },
  disabledColor: {
    color: 'var(--disabled-text)',
  },
  disabledLink: {
    opacity: 0.5,
  },
  expanding: {
    display: 'inline-flex',
  },
  link: {
    // ':hover': {
    //   textDecorationLine: 'underline',
    // },

    textDecorationLine: {
      default: null,
      ':hover': 'underline',
    },
  },
  linkColor: {
    color: 'var(--blue-link)',
  },
  root: {
    display: 'inline',
    position: 'relative',
    userSelect: 'none',
  },
});

// type BaseInlinePressableProps = {
//   ariaLabel?: string
//   children?: any
//   color?: string
//   cursorDisabled?: boolean
//   expanding?: boolean
//   linkProps?: any
//   onPress: any
//   className?: string
// }

export const BaseInlinePressable = forwardRef(
  (
    { ariaLabel, children, color = 'blue', cursorDisabled, expanding = false, linkProps, onPress, xstyle, ...rest },
    ref,
  ) => {
    const root = [styles.root, cursorDisabled === !0 && styles.defaultCursor, expanding && styles.expanding, xstyle];
    const linkColor = color !== 'inherit' && (linkProps || onPress);

    return (
      <CometPressable
        aria-label={ariaLabel}
        linkProps={linkProps}
        onPress={onPress}
        overlayDisabled
        {...rest}
        ref={ref}
        xstyle={({ disabled, hovered }) => {
          return [
            root,
            linkColor && styles.linkColor,
            hovered && !disabled && styles.link,
            disabled && styles.disabled,
            disabled && !linkColor && styles.disabledColor,
            disabled && linkColor && styles.disabledLink,
          ];
        }}
      >
        {children}
      </CometPressable>
    );
  },
);
