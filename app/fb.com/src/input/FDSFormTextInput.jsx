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

import React, { forwardRef, useState } from 'react';
import { FDSFormInputPasswordStateIcon } from '@fb-icons/CometFormInputPasswordStateIcon';
import { CometImage } from '@fb-image/CometImage';
import { FDSIcon } from '@fb-image/FDSIcon';
import { ImageIconSource } from '@fb-image/ImageIconSource';
import { CometPressable } from '@fb-pressable/CometPressable';
import stylex from '@stylexjs/stylex';

import { BaseTextInput } from './BaseTextInput';
import { FDSFormInputWrapper } from './FDSFormInputWrapper';
import { useBaseInputValidators } from './useBaseInputValidators';

/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").FDSFormTextInputProps>
 */
export const FDSFormTextInput = forwardRef((props, ref) => {
  const {
    autoComplete,
    autoFocus_PLEASE_USE_FOCUS_REGION_INSTEAD,
    auxContent,
    disabled = false,
    emojiSkittle,
    helperText,
    helperTextIsHidden = false,
    icon,
    iconSize,
    inputMode,
    label,
    labelRef,
    maxLength,
    onBlur,
    onClick,
    onFocus,
    onValueChange,
    placeholder,
    readOnly,
    suppressFocusRing,
    testid,
    type = 'text',
    validationState,
    validator,
    value,
    xstyle,
    ...rest
  } = props;

  const { topResultReason, topResultType } = useBaseInputValidators({
    validator,
    value: value ?? '',
  });

  const isPassword = type === 'password';

  const [isPress, setPress] = useState(false);

  const isPasswordIcon = isPassword && Boolean(value);

  const PasswordIcon = isPasswordIcon ? (
    <div className={stylex(styles.dummy1)}>
      <div className={stylex(styles.dummy2)}>
        <CometPressable onPress={() => setPress(!isPress)} overlayDisabled>
          <FDSFormInputPasswordStateIcon isVisible={isPress} />
        </CometPressable>
      </div>
    </div>
  ) : null;

  const typeAfterChange = isPassword ? (isPress ? 'text' : 'password') : type;
  const normalTopResultType = topResultType !== 'CORRECT' ? topResultType : validationState;

  return (
    <FDSFormInputWrapper
      addOnStart={
        (icon && icon instanceof ImageIconSource && icon.height === 40 && (
          // x1swvt13 x47corl x6s0dn4 x78zum5 xexx8yu
          <div className={stylex(styles.icon, styles.largeImageIcon)}>
            <CometImage
              height={parseInt(icon.height.toString(), 10)}
              width={parseInt(icon.width.toString(), 10)}
              src={icon.src}
              xstyle={styles.imageIcon}
            />
          </div>
        )) ||
        (icon && (
          <div className={stylex(styles.icon)}>
            <FDSIcon color="secondary" icon={icon} size={iconSize} />
          </div>
        )) ||
        (emojiSkittle && <div className={stylex(styles.emoji)}>{emojiSkittle}</div>)
      }
      auxContent={PasswordIcon ?? auxContent}
      cursor="text"
      disabled={disabled}
      helperText={topResultReason ?? helperText}
      helperTextIsHidden={helperTextIsHidden}
      label={label}
      labelRef={labelRef}
      suppressFocusRing={suppressFocusRing}
      validationState={normalTopResultType}
      value={value}
    >
      {({ focused, helperTextID, id }) => (
        <BaseTextInput
          aria-describedby={helperTextID}
          aria-invalid={normalTopResultType === 'ERROR'}
          autoComplete={autoComplete}
          autoFocus={autoFocus_PLEASE_USE_FOCUS_REGION_INSTEAD}
          disabled={disabled}
          id={id}
          inputMode={inputMode}
          maxLength={maxLength}
          onBlur={onBlur}
          onClick={onClick}
          onFocus={onFocus}
          onValueChange={onValueChange}
          placeholder={focused ? placeholder : null}
          readOnly={readOnly}
          ref={ref}
          suppressFocusRing={true}
          testid={undefined}
          type={typeAfterChange}
          value={value}
          xstyle={[styles.input, disabled && styles.disabled, readOnly && readOnly === true && styles.readOnly, xstyle]}
          {...rest}
        />
      )}
    </FDSFormInputWrapper>
  );
});

const styles = stylex.create({
  disabled: {
    backgroundColor: 'var(--input-background-disabled)',
    color: 'var(--disabled-text)',
    cursor: 'not-allowed',
  },
  //
  dummy1: {
    display: 'flex',
  },

  dummy2: {
    paddingRight: '16px',
    paddingTop: '18px',
  },

  emoji: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: '12px',
    pointerEvents: 'none',
  },

  icon: {
    paddingLeft: '16px',
    paddingTop: '18px',
    pointerEvents: 'none',
  },

  imageIcon: {
    borderRadius: '8px',
    boxShadow: 'inset 0 0 0 1px var(--media-inner-border)',
  },

  input: {
    display: {
      default: null,
      '::-ms-clear': 'none',
      '::-ms-reveal': 'none',
    },

    backgroundColor: 'transparent',

    borderBottomStyle: 'none',
    borderLeftStyle: 'none',
    borderRightStyle: 'none',
    borderTopStyle: 'none',

    boxSizing: 'border-box',

    color: 'var(--primary-text)',

    fontSize: '1rem !important',

    fontWeight: 'normal',

    lineHeight: 1.25,

    padding: '26px 16px 10px 16px',

    paddingTop: '26px',
    paddingRight: '16px',
    paddingBottom: '10px',
    paddingLeft: '16px',

    width: '100%',
  },

  largeImageIcon: {
    alignItems: 'center',
    display: 'flex',
    paddingTop: 0,
  },

  readOnly: {
    backgroundColor: 'var(--input-background-disabled)',
  },
});
