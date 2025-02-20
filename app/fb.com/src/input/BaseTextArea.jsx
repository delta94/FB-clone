/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */

/**
 * Changelog:
 * - 08/01/2025
 */

import React, { forwardRef, useRef } from 'react';
import { BaseFocusRing } from '@fb-focus/BaseFocusRing';
import { useMergeRefs } from '@fb-hooks';
import stylex from '@stylexjs/stylex';

import { BaseInput } from './BaseInput';

export const BaseTextArea = forwardRef((props, ref) => {
  const { maxRows = 200, minRows = 1, suppressFocusRing = false, unresizable = false, value, xstyle, ...rest } = props;

  const normalizeValue = value ? String(value) : value;

  const inputRef = useRef(null);
  const placeholderRef = useRef(null);
  const _ref = useMergeRefs(inputRef, ref);

  const handleChange = function (event) {
    let val = event.target.value;
    const placeholderDiv = placeholderRef.current;
    if (placeholderDiv && normalizeValue) {
      val = val.endsWith('\n') ? val + ' ' : val;
      placeholderDiv.textContent = val;
    }
    rest.onChange && rest.onChange(event);
  };

  return (
    <div {...stylex.props(xstyle, styles.containerOverride)}>
      <div
        {...stylex.props(xstyle, styles.elementOverride, styles.divOverride)}
        aria-hidden="true"
        ref={placeholderRef}
      >
        {Array.from({
          length: minRows ?? 1,
        }).map((_, index) => {
          return <br key={index} />;
        })}
      </div>
      <div
        {...stylex.props(xstyle, styles.elementOverride, styles.divOverride, styles.maxHeight(maxRows ?? 220))}
        aria-hidden="true"
        ref={placeholderRef}
      >
        {normalizeValue && normalizeValue.endsWith('\n') ? normalizeValue + ' ' : normalizeValue}
      </div>
      <BaseFocusRing suppressFocusRing={suppressFocusRing}>
        {(classes) => {
          return (
            <BaseInput
              {...rest}
              onChange={handleChange}
              ref={_ref}
              type="textarea"
              value={normalizeValue}
              xstyle={[classes, unresizable === true && styles.unresizable, xstyle, styles.elementOverride]}
            />
          );
        }}
      </BaseFocusRing>
    </div>
  );
});

BaseTextArea.displayName = 'BaseTextArea';

const styles = stylex.create({
  containerOverride: {
    // backgroundColor: "transparent",
    // backgroundImage: "none",
    borderBottomWidth: '0',
    borderRightWidth: '0',
    borderLeftWidth: '0',
    // borderRightWidth: "0",
    // borderLeftWidth: "0",
    borderTopWidth: '0',
    display: 'grid',
    position: 'relative',

    backgroundColor: {
      default: 'transparent',
      ':active': 'transparent',
      ':focus': 'transparent',
      ':hover': 'transparent',
    },

    backgroundImage: {
      default: 'none',
      ':active': 'none',
      ':focus': 'none',
      ':hover': 'none',
    },

    paddingTop: null,
    paddingEnd: null,
    paddingBottom: null,
    paddingStart: null,
    paddingLeft: null,
    paddingRight: null,

    // ":active_backgroundColor": "xyftt0y",
    // ":active_backgroundImage": "xuqm82a",
    // ":focus_backgroundColor": "xyc4ar7",
    // ":focus_backgroundImage": "x19zaomo",
    // ":hover_backgroundColor": "x1n5bzlp",
    // ":hover_backgroundImage": "xn3cpwa",
  },
  divOverride: {
    overflowWrap: 'break-word',
    pointerEvents: 'none',
    visibility: 'hidden',
    whiteSpace: 'pre-wrap',
  },
  elementOverride: {
    gridColumnEnd: '1',

    gridColumnStart: '1',

    gridRowEnd: '1',

    gridRowStart: '1',
    lineHeight: 'inherit',

    marginTop: null,
    marginEnd: null,
    marginBottom: null,
    marginStart: null,
    marginLeft: null,
    marginRight: null,
  },
  maxHeight: (a) => ({
    // eslint-disable-next-line @stylexjs/valid-styles
    WebkitLineClamp_: a ?? 'initial',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 'var(--WebkitLineClamp_,revert)',
    display: '-webkit-box',
    // return [
    //   {
    //     WebkitBoxOrient: "vertical",
    //     WebkitLineClamp: "var(--WebkitLineClamp,revert)",
    //     display: "-webkit-box",
    //   },
    //   {
    //     "--WebkitLineClamp": a != null ? a : "initial",
    //   },
    // ];
  }),
  unresizable: {
    bottom: '0',
    right: '0',
    position: 'absolute',
    resize: 'none',
    left: '0',
    top: '0',
  },
});
