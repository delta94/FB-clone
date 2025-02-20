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

import React, { forwardRef, useId } from 'react';
import { CometScreenReaderText } from '@fb-dump/CometScreenReaderText';
import stylex from '@stylexjs/stylex';

import { BaseTextArea } from './BaseTextArea';
import { CometTextInputStyles } from './CometTextInputStyles';
import { useBaseInputValidators } from './useBaseInputValidators';

const styles = stylex.create({
  r1: {
    color: 'var(--primary-text)',
    fontSize: '.9375rem',
  },

  r2: {
    color: 'inherit',
    display: 'block',
    fontSize: 'inherit',
    paddingBottom: '5px',
  },
});

export const CometTextArea_DEPRECATED = forwardRef(
  (
    {
      expandable = false,
      label,
      labelIsHidden = false,
      maxRows = Infinity,
      rows = 1,
      textAlign,
      validator,
      'aria-describedby': adb,
      autoFocus_PLEASE_USE_FOCUS_REGION_INSTEAD,
      disabled = false,
      maxLength,
      value,
      ...rest
    },
    ref,
  ) => {
    const id = useId();

    const { topResultReason, topResultType } = useBaseInputValidators({
      validator,
      value: String(value),
    });

    const ariaDescribedby = topResultReason ? id + ' ' + (adb ?? '') : adb ?? undefined;

    return (
      <label className={stylex(styles.r1)}>
        {!labelIsHidden && <div className={stylex(styles.r2)}>{label}</div>}
        <CometTextInputStyles align={textAlign} dimension="multi" disabled={disabled}>
          {(xstyle) => {
            return (
              <BaseTextArea
                {...rest}
                aria-describedby={ariaDescribedby}
                aria-invalid={topResultType === 'ERROR'}
                aria-label={labelIsHidden ? label : void 0}
                autoFocus={autoFocus_PLEASE_USE_FOCUS_REGION_INSTEAD}
                disabled={disabled}
                maxLength={maxLength}
                maxRows={expandable ? maxRows : rows}
                minRows={rows}
                ref={ref}
                value={value}
                xstyle={xstyle}
              />
            );
          }}
        </CometTextInputStyles>
        {validator ? <CometScreenReaderText id={id} text={topResultReason} /> : null}
      </label>
    );
  },
);
