/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
import stylex from '@stylexjs/stylex';

const alignStyles = stylex.create({
  center: {
    textAlign: 'center',
  },
  end: {
    textAlign: 'right',
  },
  inherit: {
    textAlign: 'inherit',
  },
  start: {
    textAlign: 'left',
  },
});

const dimensionStyles = stylex.create({
  multi: {
    paddingTop: '8px',
    paddingRight: '12px',
    paddingBottom: '8px',
    paddingLeft: '12px',
    resize: 'none',
  },
  single: {
    height: '36px',
  },
});

const styles = stylex.create({
  disabled: {
    cursor: 'not-allowed',
  },
  input: {
    // backgroundColor: "var(--comment-background)",
    // borderTopColor: "var(--divider)",
    // borderRightColor: "var(--divider)",
    // borderBottomColor: "var(--divider)",
    // borderLeftColor: "var(--divider)",
    borderTopLeftRadius: '6px',
    borderTopRightRadius: '6px',
    borderBottomRightRadius: '6px',
    borderBottomLeftRadius: '6px',
    borderTopStyle: 'solid',
    borderRightStyle: 'solid',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'solid',
    borderTopWidth: '1px',
    borderRightWidth: '1px',
    borderBottomWidth: '1px',
    borderLeftWidth: '1px',
    boxSizing: 'border-box',
    color: 'var(--primary-text)',
    fontSize: 'inherit',
    fontWeight: 500,
    paddingTop: '8px',
    paddingRight: '12px',
    paddingBottom: '8px',
    paddingLeft: '12px',
    width: '100%',

    '::placeholder': {
      color: 'var(--placeholder-text)',
    },

    // ":focus": {
    //   backgroundColor: "transparent",
    //   borderColor: "var(--accent)",
    //   boxShadow:
    //     "0 0 0 3px hsla(var(--accent-h),var(--accent-s),var(--accent-l),.2) inset",
    //   backgroundImage:
    //     "linear-gradient(var(--hover-overlay),var(--hover-overlay))",
    // },

    backgroundColor: {
      default: 'var(--comment-background)',
      ':focus': 'transparent',
    },

    borderTopColor: {
      default: 'var(--divider)',
      ':focus': 'var(--accent)',
    },
    borderRightColor: {
      default: 'var(--divider)',
      ':focus': 'var(--accent)',
    },
    borderBottomColor: {
      default: 'var(--divider)',
      ':focus': 'var(--accent)',
    },
    borderLeftColor: {
      default: 'var(--divider)',
      ':focus': 'var(--accent)',
    },

    boxShadow: {
      default: null,
      ':focus': '0 0 0 3px hsla(var(--accent-h),var(--accent-s),var(--accent-l),.2) inset',
    },

    backgroundImage: {
      default: null,
      ':hover': 'linear-gradient(var(--hover-overlay),var(--hover-overlay))',
    },

    // "c_backgroundColor": "xyc4ar7",
    // ":focus_borderTopColor": "x10lcxz4",
    // ":focus_borderEndColor": "xzt8jt4",
    // ":focus_borderBottomColor": "xiighnt",
    // ":focus_borderStartColor": "xviufn9",
    // ":focus_boxShadow": "x1b3pals",
    // ":hover_backgroundImage": "x10bruuh",
  },
});

export const CometTextInputStyles = ({ children, align = 'start', dimension = 'single', disabled = false }) => {
  return children([styles.input, disabled && styles.disabled, alignStyles[align], dimensionStyles[dimension]]);
};
