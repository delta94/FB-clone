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

import React, { forwardRef } from 'react';
import { mergeRefs } from '@fb-utils/mergeRefs';
import stylex from '@stylexjs/stylex';

import { BaseTextArea } from './BaseTextArea';
import { FDSFormInputWrapper } from './FDSFormInputWrapper';
import { useBaseInputValidators } from './useBaseInputValidators';

const styles = stylex.create({
  disabled: {
    color: 'var(--disabled-text)',
    cursor: 'not-allowed',
  },
  hideLabel: {
    marginTop: '10px',
  },
  textArea: {
    backgroundColor: 'transparent',

    borderTopColor: null,
    borderEndColor: null,
    borderBottomColor: null,
    borderStartColor: null,

    borderStyle: 'none',

    borderTopWidth: null,
    borderEndWidth: null,
    borderBottomWidth: null,
    borderStartWidth: null,

    boxSizing: 'border-box',
    color: 'var(--primary-text)',
    display: 'flex',
    fontSize: '1rem',
    fontWeight: 'normal',
    lineHeight: 1.25,
    marginBottom: '10px',
    marginTop: '26px',
    outline: 'none',
    overflowX: 'hidden',
    overflowY: 'hidden',

    // paddingEnd: "16px",
    paddingLeft: '16px',
    paddingRight: '16px',
    // paddingStart: "16px",

    resize: 'none',
    width: '100%',
  },
});

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").FDSFormTextAreaProps>
 */
export const FDSFormTextArea = forwardRef(
  (
    {
      addOnBottom,
      autoComplete,
      auxContent,
      describedBy,
      disabled = false,
      helperText,
      hideLabel = false,
      label,
      maxLength,
      maxRows,
      minRows = 3,
      onBlur,
      onFocus,
      onValueChange,
      placeholder,
      suppressFocusRing,
      testid,
      validationState,
      validator,
      value,
    },
    ref,
  ) => {
    const { topResultReason, topResultType } = useBaseInputValidators({
      validator,
      value: value ?? '',
    });

    let _validationState = topResultType !== 'CORRECT' ? topResultType : validationState;

    return (
      <FDSFormInputWrapper
        addOnBottom={addOnBottom}
        aria-describedby={describedBy}
        auxContent={auxContent}
        cursor="text"
        disabled={disabled}
        helperText={topResultReason ?? helperText}
        hideLabel={hideLabel}
        label={label}
        suppressFocusRing={suppressFocusRing}
        validationState={_validationState}
        value={value}
      >
        {({ focused, id, inputRef, inputAriaProps }) => {
          return (
            <BaseTextArea
              {...inputAriaProps}
              autoComplete={autoComplete}
              disabled={disabled}
              id={id}
              maxLength={maxLength}
              maxRows={maxRows}
              minRows={minRows}
              onBlur={onBlur}
              onFocus={onFocus}
              onValueChange={onValueChange}
              placeholder={focused ? placeholder : null}
              ref={mergeRefs(ref, inputRef)}
              suppressFocusRing
              testid={undefined}
              value={value}
              xstyle={[styles.textArea, disabled && styles.disabled, hideLabel && styles.hideLabel]}
            />
          );
        }}
      </FDSFormInputWrapper>
    );
  },
);

FDSFormTextArea.displayName = 'CometFormTextArea';
